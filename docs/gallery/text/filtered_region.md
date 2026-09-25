---
category: maps
description: "Filter country IDs while keeping a fixed longitude/latitude view."
---

# Filtering and bounds

The two [GeoMap](../../elements/text/GeoMap.md) panels share
`fit-to={{ bounds: [4, 44, 25, 56] }}`. The first draws the whole source; the
second uses `world_countries({ ids })` to keep Germany, Poland, Czechia, Austria,
and Switzerland. Their scale and placement agree because bounds fitting does
not depend on source geometry.

`ids` filters features before borders are built. It keeps the shared TopoJSON
arc table, so internal borders still work. The same option is available on
`us_states`, `geojson`, and `topojson`. Preserve leading zeros in string IDs.

Bounds mean `[west, south, east, north]` in degrees. They frame the region,
without clipping individual features to a geographic box. The water background
therefore also shows wherever countries have been omitted. Use `fit-to="data"`
to fit the selected countries themselves, or `fit-to={{ ids }}` to fit a subset
while still drawing the full source.

Both panels nest the same geographic Polyline and Points for a
Berlin–Prague–Vienna route. Each map supplies its projection to those children.
See [Making maps](../../guides/text/maps.md) for the full workflow.

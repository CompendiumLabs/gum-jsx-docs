---
category: maps
description: "Filter country IDs while keeping a fixed longitude/latitude view."
---

# Filtering and bounds

The two [GeoMap](../../elements/text/GeoMap.md) panels share
`bounds={[4, 44, 25, 56]}`. The first draws the whole source; the
second uses `world_countries({ ids })` to keep Germany, Poland, Czechia, Austria,
and Switzerland. Their scale and placement agree because bounds fitting does
not depend on source geometry.

`ids` filters features before borders are built. It keeps the shared TopoJSON
arc table, so internal borders still work. The same option is available on
`us_states`, `geojson`, and `topojson`. Preserve leading zeros in string IDs.

Bounds mean `[west, south, east, north]` in degrees. They fit the region and
clip all map content to its projected outline, preserving the projection's
proportions and leaving unused allocation transparent. Within the bounds, the
water background also shows wherever countries have been omitted. Bounds override
`fit-to`; omit them to use `fit-to="data"` for the selected countries themselves,
or `fit-to={ids}` to fit a subset while still drawing the full source.

Both panels nest the same geographic Polyline and Points for a
Berlin–Prague–Vienna route. Each map supplies its projection to those children.
See [Making maps](../../guides/text/maps.md) for the full workflow.

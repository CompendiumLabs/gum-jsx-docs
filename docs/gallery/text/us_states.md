---
category: maps
description: "Render US states with Albers USA insets, FIPS-keyed fills, and shared borders."
---

# US states

`us_states()` supplies the bundled 1:10m state atlas. Its feature IDs are
two-digit FIPS strings, so California is `06`, not `6`. Use these IDs in
the `styles` dictionary to highlight states independently of the feature order,
for example `styles={{ '06': { fill: red } }}`.

The `albersUsa` projection places Alaska and Hawaii in insets and clips other
territories. It fits the data by default. `border-mode="interior"` draws only
shared state boundaries; the filled shapes supply the coastlines. Interior
borders require a TopoJSON source such as this atlas.

**TextFigure** composes a measured heading, an aspect-sized [GeoMap](../../elements/text/GeoMap.md), and a
wrapping caption. The outer width and base typography set the design scale;
padding, gaps, and map details use ems, and the content determines the height.

See [world countries](world_choropleth.md) for country-level fills and
[GeoJSON edge cases](geojson_edges.md) for small sources defined directly in JSX.

---
category: maps
description: "Compare Equal Earth, Natural Earth, equirectangular, and Mercator projections."
---

# Projection gallery

The four [GeoMap](../../elements/text/GeoMap.md) panels share one `world_countries()` source, equal column
widths, and a common map aspect. Only `projection` changes, making the different shapes and
distributions of area easy to compare. Each map fits the sphere within its panel
using `map-padding`.

The card list generates **Frame** panels in a two-column **Grid**. Each panel's
**TextCol** measures the title above its map. Adding a projection creates another
cell, and longer titles determine the row height. Country fills and borders use
the same shared palette in every panel. A pale blue `background` fills each
projection's outline, leaving the white frame visible outside it.

For a clipped globe view, see [projected city markers](globe_markers.md).
For fitting to a subset of countries, see [selected-region fit](selected_region.md).

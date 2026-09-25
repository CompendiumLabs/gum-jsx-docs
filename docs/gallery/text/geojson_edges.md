---
category: maps
description: "Show polygon holes, RFC 7946 winding, and two shapes meeting at the antimeridian."
---

# GeoJSON edge cases

Both small GeoJSON fixtures are defined directly in the example. `geojson()`
accepts RFC 7946 coordinates and winding by default, then normalizes them for
the spherical projection pipeline. The left polygon has an outer ring and an
inner ring; the inner ring leaves a visible hole.

The right source contains two polygons meeting at ±180° longitude. Rotating the
equirectangular view by 180° puts their shared edge in the center. Both panels
use `fit-to="data"` to fit their small sources instead of the whole sphere.

The panels share a two-column **Grid**. Each **Frame** contains a **TextCol**
with a measured title and an aspect-sized map; **TextFigure** places the caption
after the grid. No page coordinates are needed for this comparison.

These are synthetic teaching shapes. For bundled geographic sources, see
[world countries](world_choropleth.md) and [US states](us_states.md).

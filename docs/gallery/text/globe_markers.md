---
category: maps
description: "Place city markers on an orthographic globe and omit points on the far side."
---

# Projected city markers

The map and marker helper share the same source, projection, rotation, fit
target, and viewport. `project_geo_point(source, view, width, height, [lon, lat])`
returns coordinates in the map's local pixel space, or `null` when the point is
clipped. Filtering those null results keeps the markers and visible-city list
in agreement.

The shared `view.map_padding` value is a number of pixels for the helper. The
**GeoMap** receives the same value through `map-padding={px(view.map_padding)}`.
The map and its marker circles live in one fitted **Group**, with `mapSize` shared
by the group and projection helper. Scaling the group keeps the geography and
markers together. The ocean circle's diameter follows the same size and padding.

An **HStack** allocates space between that canvas and a **TextCol**. **Bullets**
lays out the visible-city list, and the explanatory note follows it naturally;
adding a city or wrapping its name requires no new text coordinates.

The orthographic view faces the Americas. Tokyo is on the far side and is omitted
from the markers. See [selected-region fit](selected_region.md) for drawing a
route with a shared projection.

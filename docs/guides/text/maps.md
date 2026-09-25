---
category: maps
description: "Build a map from geographic data, feature styles, a fitted view, and projected annotations."
---

# Making maps

`@gum-jsx/maps` provides one element, [GeoMap](../../elements/text/GeoMap.md),
plus helpers for sources and projections. A map combines three choices:
which geography to draw, how to project it, and how to style its features.
Ordinary Gum elements then supply titles, markers, labels, and legends.

The CLI and editor include the maps bindings. This is a complete starting point:

```jsx
<GeoMap
  source={world_countries()}
  width={px(640)}
  background={interp(white, blue, 0.15)}
  fill={interp(white, green, 0.25)}
/>
```

It draws the bundled countries in the default Natural Earth I projection.
No file loading, imports, or network requests are needed in evaluated JSX.

## Start with a source

| Helper | When to use it |
|---|---|
| `world_countries()` | A bundled world map; country IDs include `"840"` for the US and `"392"` for Japan |
| `us_states()` | Bundled US states and territories; use `projection="albersUsa"` for Alaska and Hawaii insets |
| `geojson(data, options?)` | Your own longitude/latitude geometry, feature, or feature collection |
| `topojson(data, objectName, options?)` | A named Topology object with shared boundary arcs |

Coordinates are always `[longitude, latitude]` in degrees. Load external files
in the host before constructing the figure. GeoJSON defaults to RFC 7946 polygon
winding; see [GeoJSON edge cases](../../gallery/text/geojson_edges.md) for holes
and antimeridian cuts.

Keep stable feature IDs when preparing data. `styles` uses those IDs, including
leading zeros such as Brazil's `"076"` and California's `"06"`. If IDs live in
feature properties, use `geojson(data, { id_property: 'code' })` or the equivalent
`topojson` option. Every feature needs an explicit, unique ID when styles are used.

## Style features and water separately

`fill` is the default land color. `styles` can be an ID-to-style dictionary:

```jsx
<GeoMap
  source={world_countries()}
  fill={lightgray}
  styles={{
    '840': { fill: green },
    '392': { fill: purple, stroke: slate, stroke_width: px(1) },
  }}
/>
```

For data-driven colors, use a callback such as
`styles={id => ({ fill: colors[id] })}`. Missing fields and undefined results
inherit the map's style. Callbacks run once at construction, so resizing does
not resample your data. With `source-resource`, use the dictionary form.
The [world countries](../../gallery/text/world_choropleth.md) and
[US states](../../gallery/text/us_states.md) examples demonstrate both forms.

`background` paints the projected sphere behind the features. It supplies the
water color while the area outside the projection remains transparent. An outer
[Box](../../elements/text/Box.md) can give the surrounding page a different color.
Lakes show the background only where the source represents them as holes.

Use `border-color` and `border-width` for the shared borders. TopoJSON draws
those borders once; `border-mode="interior"` keeps only shared boundaries.
Per-feature strokes draw afterward, which is useful for a selected-country
outline. Use `border-mode="none"` if you want only those feature strokes.

## Choose the view

Start with `naturalEarth1` for a world illustration, `equalEarth` for an
equal-area world map, `orthographic` for a globe, or `albersUsa` for US states.
The [projection gallery](../../gallery/text/projection_gallery.md) compares
world-map outlines.

| Control | What it changes |
|---|---|
| `fit-to="sphere"` | Fits the whole projected globe; the default except for Albers USA |
| `fit-to="data"` | Fits all source geometry; useful for a regional source |
| `fit-to={{ ids: ['276', '040'] }}` | Fits selected features from a larger source; surrounding geography still draws |
| `center={[30, 20]}` | Pans 30° east, 20° north to the viewport midpoint after fitting the scale |
| `rotate={[-30, -20, 0]}` | Turns the globe toward 30° east, 20° north before projection |

`center` and `rotate` solve different problems. Panning moves the finished
projection and can crop its edges. It does not reveal the far side of an
orthographic globe; use rotation to change which hemisphere faces the viewer.
Omit `center` to keep the fit target centered automatically. Albers USA has fixed
center and rotation and uses data fitting rather than sphere fitting.

`map-padding` leaves space around the fitted geography. It is independent of
padding on an outer Box. Try [selected-region fit](../../gallery/text/selected_region.md)
for a regional map and route.

## Add markers and labels

Place the map and its annotations as siblings in a
[Group](../../elements/text/Group.md). A Group uses local layout coordinates;
longitude and latitude must first pass through the map projection.

`project_geo_point(source, view, width, height, [longitude, latitude])` returns
local pixel coordinates or `null` when the projection clips the point.
Use those coordinates as `x={px(point[0])}` and `y={px(point[1])}` on a
[Circle](../../elements/text/Circle.md) or [Text](../../elements/text/Text.md).
Skip null results so a far-side point does not appear on the visible globe.

The map and helper must share the source, view settings, and actual map size.
In the helper's `view` object, use underscore keys and give `map_padding` as a
number of pixels. On GeoMap, convert it with
`map-padding={px(view.map_padding)}`. A fixed geographic canvas inside a fitted
Group keeps the map and annotations aligned as the whole composition scales.
Surrounding headings and captions can still use normal text layout.

For many markers, call `prepare_geo_source(source)` once and reuse the prepared
source with `project_geo_point`. The lower-level
`create_geo_projection(prepared, view, width, height)` returns a fitted D3
projection, but calling it directly does not test spherical visibility.
See [projected city markers](../../gallery/text/globe_markers.md) for a larger
annotation example, and [Rendering](./rendering.md) for embedding Gum in a host.

The runnable example below draws the same source and two cities in a world map
and a Pacific-facing globe. Both panels share country styles and marker data;
each panel projects its markers with its own view. Only the geographic canvas
has fixed dimensions. Text, gaps, and panel placement use ordinary layout.

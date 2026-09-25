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

Pass `ids` to a source helper to draw only selected features:
`world_countries({ ids: ['276', '040'] })` keeps Germany and Austria;
`us_states({ ids: ['06', '32'] })` keeps California and Nevada. `geojson` and
`topojson` accept the same option for your own data, including `id_property`
matching. Source order and shared borders are preserved; unknown IDs are errors.
Omitting `ids` retains everything, while `ids: []` selects nothing.

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
| `fit-to={{ bounds: [5, 45, 18, 56] }}` | Fits a longitude/latitude box independently of source features |
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

Source filtering chooses what to draw; fitting chooses the view. Combine the two:

```jsx
<GeoMap
  source={world_countries({ ids: ['276', '040'] })}
  fit-to={{ bounds: [5, 45, 18, 56] }}
  fill={green} background={lightgray}
/>
```

Bounds are `[west, south, east, north]` in degrees. They frame a geographic
rectangle without cutting source features to its edges. West greater than east
means the box crosses the antimeridian; rotate the view if you want the region
away from the projection seam. Bounds do not change globe visibility. See
[Filtering and bounds](../../gallery/text/filtered_region.md) for matching views
with different sources, and [GeoMap](../../elements/text/GeoMap.md) for validation rules.

## Add markers and labels

Nest [Points](../../elements/text/Points.md), [Arrow](../../elements/text/Arrow.md),
or other marks inside GeoMap. Their numeric pairs are longitude/latitude in
degrees. For labels or individual shapes, put longitude in the direct child's
`x` and latitude in `y`:

```jsx
<GeoMap source={world_countries()}>
  <Points points={[[-122.42, 37.77]]} point-size={px(8)} fill={red} />
  <Text x={-122.42} y={37.77} anchor={['start', 'end']}>San Francisco</Text>
</GeoMap>
```

The map projects children using its current allocated size and view settings,
including fitting, padding, center, rotation, and point visibility. Markers on
the far side of an orthographic globe disappear automatically. Text stays upright,
and marker sizes, fonts, and arrowheads use ordinary layout lengths.

For a curved route, provide sampled longitude/latitude pairs to Arrow. A
projection maps existing points without adding samples, so a two-point Arrow
remains straight between the projected endpoints. Set its stroke explicitly,
since children inherit the map's style. See [Map routes](../../gallery/text/map_routes.md)
and [Projections](./projections.md) for examples and seam-handling limitations.

For overlays outside the GeoMap subtree,
`project_geo_point(source, view, width, height, [longitude, latitude])` still
returns local pixels or `null` for a hidden point. Use the same source, view, and
actual size, and wrap returned coordinates in `px(...)`. Helper `map_padding`
is a number of pixels. See [projected city markers](../../gallery/text/globe_markers.md)
for that pattern. Prepare a reused source with `prepare_geo_source` once;
`create_geo_projection` returns a fitted D3 projection for lower-level work,
but directly calling it does not check visibility.

The runnable example below draws the same source and two cities in a world map
and a Pacific-facing globe. Both panels share country styles and marker data;
each panel projects its marker children with its own view. Only the geographic canvas
has fixed dimensions. Text, gaps, and panel placement use ordinary layout.

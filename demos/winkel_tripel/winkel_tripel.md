# Winkel Tripel with a custom Gum projection

`winkel_tripel.jsx` is the complete showcase: world outlines, a 30° graticule,
a sampled great-circle route, geographic labels, and three comparison panels.
`winkel_tripel_minimal.jsx` is a short example containing just the projection,
graticule, and a marker.

Both are standalone Gum source files. The CLI supplies core and maps bindings;
there are no imports, extra plugins, or network requests in either example.

## Render

From this directory, with the Gum CLI installed:

```sh
gum winkel_tripel.jsx -o winkel_tripel.svg
gum winkel_tripel.jsx -o winkel_tripel.png --ratio 2
gum winkel_tripel_minimal.jsx -o winkel_tripel_minimal.svg
```

The supplied SVG is a vector export; the PNG is rendered at twice the design
resolution. The full design is 1400 × 1480.41 layout pixels and hugs its content.

## The custom projection

The key is `Graph projection={winkelTripel}`. `GeoMap` currently accepts named
presets; this example uses the general coordinate callback on `Graph`.

Source points use `[longitude, latitude]` in degrees. Graph expands each tuple
to `{x: longitude, y: latitude}` before calling the projection. The callback
converts to radians and returns the average Aitoff and equirectangular
coordinates as `{x, y}`. The equirectangular standard parallel is
`acos(2 / Math.PI)`, approximately 50.467°. At the origin, `alpha / sin(alpha)`
uses its limit of 1 to avoid division by zero.

```jsx
<Graph
  projection={winkelTripel}
  xlim={[-(Math.PI + 2) / 2, (Math.PI + 2) / 2]}
  ylim={[-Math.PI / 2, Math.PI / 2]}
  aspect={(Math.PI + 2) / Math.PI}
>
  <CoordLine points={longitudeLatitudeSamples} fill={none} stroke={blue} />
</Graph>
```

- `xlim` and `ylim` describe **projected output**, not degrees. Matching the
  graph aspect to those spans preserves the projection's proportions.
- `CoordLine`, `Arrow`, `Points`, and direct-child numeric `pos` labels all
  use the same projection. Labels stay upright; strokes and markers use em sizes.
- Curves need samples: the callback transforms supplied vertices, so two
  endpoints alone produce a straight segment. The route uses 121 spherical samples.
- The world map uses the shared border mesh from
  `prepare_geo_source(world_countries())`. Lines break at the ±180° seam with
  `null` separators, and shorter segments are sampled at most 2° apart.
- This is an outline example, centered on Greenwich. It does not implement
  polygon clipping, filled countries, an inverse, or arbitrary recentering.
  General routes crossing the seam also need to be split before drawing.

The comparison panels share the same `MapFrame` component. Changing `project`
and `halfWidth` changes the coordinate system while keeping their input grid.

## Verification and references

The showcase callback was checked against D3's `winkel3Raw` on a 5° global grid,
plus origin and near-origin cases (2,705 points total), including both poles and
both antimeridian edges. The short example uses the same formula. Both examples
were rendered with Gum; the final layouts were visually inspected.

- [D3 Winkel Tripel reference implementation](https://github.com/d3/d3-geo-projection/blob/main/src/winkel3.js)
- [D3 Aitoff reference implementation](https://github.com/d3/d3-geo-projection/blob/main/src/aitoff.js)
- [World Atlas / Natural Earth data](https://github.com/topojson/world-atlas)

The showcase uses the world-atlas 2.0.2 data bundled with Gum.

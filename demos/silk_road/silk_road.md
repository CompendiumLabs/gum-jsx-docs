# The Silk Road

A map of 23 major historic waypoints, made with the gum-jsx plugin and Gum's `GeoMap` component.

- **silk_road.png** — high-resolution image, suitable for sharing.
- **silk_road.svg** — scalable vector artwork with self-contained font outlines.
- **silk_road.jsx** — editable Gum JSX source, including the waypoint and route data.

## Reading the map

The map combines selected overland connections used at different times in antiquity and the Middle Ages. It is an overview of a changing network, not a reconstruction for one year. Route curves represent approximate connections between centers; they do not trace surveyed historic roads. Both colors show historic trade links; dashed links provide additional context, not a ranking of historical importance.

City markers use approximate geographic positions. Historic names are paired with modern names where helpful. Modern coastlines provide orientation, while political boundaries are omitted. Mountain symbols are illustrative. Maritime routes and many smaller branches are outside this map's scope.

## Historical references

- [UNESCO — About the Silk Roads](https://www.unesco.org/en/silk-roads/about-silk-roads): the changing network, trade, and cultural exchange.
- [UNESCO — Cities along the Silk Roads](https://en.unesco.org/silkroad/silk-road-themes/cities-silk-roads): historic trade centers.
- [UNESCO World Heritage Centre — Chang’an–Tianshan Corridor](https://whc.unesco.org/en/list/1442/): the network linking central China with Central Asia.
- [UNESCO World Heritage Centre — Zarafshan–Karakum Corridor](https://whc.unesco.org/en/list/1675/): connections across the Central Asian oasis region.

Geographic base: Gum's bundled [world-atlas](https://github.com/topojson/world-atlas) country geometry, derived from [Natural Earth](https://www.naturalearthdata.com/). The map uses a Mercator projection and omits country border strokes.

## Render or revise

With a current Gum CLI installed:

```sh
gum silk_road.jsx -o silk_road.svg
gum silk_road.jsx -o silk_road.png --ratio 2
```

Edit `places` for labels and coordinates, `routes` for the network, and `C` for colors. Titles, legends, and captions use Gum's measured stack layout; geographic positions use `pos={[longitude, latitude]}`.

City markers, region names, and water labels use the default centered anchor.
City-name boxes keep the per-place edge anchors in `places[].a`, which attach
their labels beside the leader lines. The north label keeps `anchor="start"`,
and latitude labels keep their explicit right-edge anchors.

# Route 66 — The Mother Road

A vintage-style map of historic U.S. Route 66, created with Gum JSX. It follows the corridor from Chicago to Santa Monica, highlighting eight states and 15 selected stops.

The map uses a Mercator projection, approximate city coordinates, and state boundaries bundled with Gum. Local turns and alternate historic alignments are omitted, so it is intended as an overview rather than a navigation map.

## Files

- `route_66.jsx` — editable Gum JSX source.
- `route_66.svg` — scalable vector image.
- `route_66.png` — image exported at 2× resolution.
- `route_66.pdf` — PDF for printing or sharing.

## Render

With the current Gum CLI installed, run these commands from the directory containing `route_66.jsx`:

```sh
gum route_66.jsx -o route_66.svg
gum route_66.jsx -o route_66.png --ratio 2
gum route_66.jsx -o route_66.pdf
```

## Customize

In `route_66.jsx`, edit `C` for colors, `states` for state labels, `route` for the corridor’s longitude/latitude waypoints, and `stops` for city markers and label offsets. Change `mapW`, `mapH`, and `view` to adjust the map’s size and geographic extent, then render again.

State labels use geographic positions with `pos={s.label}` inside `GeoMap`. City markers and their labels use projected pixel positions with `pos={local(...)}` in the surrounding `Group`.

Shield text, state names, and city markers use the default centered anchor. City labels keep `anchor={[side, 'center']}` to place them beside their leader lines. The legend, ocean label, and north indicator keep `anchor="start"` so their positions mark their top-left corners. The map and stop Groups omit `pos` and retain their start anchor at the parent Group's origin.

## Sources

- [National Park Service: Route 66](https://www.nps.gov/articles/000/route-66-national.htm) — historical context and approximate length.
- [NPS Route 66 archive](https://npgallery.nps.gov/ROSI/About) — endpoints and eight-state sequence.
- Gum’s bundled US-atlas data — state boundaries. The route line is an illustrative set of waypoints, not an official road survey.

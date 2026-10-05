# The travels of Xuanzang

An annotated map of Xuanzang’s journey from China to India and back, **629–645 CE**, made with Gum. It includes rounded routes, direction arrows, a detail map of Buddhist pilgrimage sites, and thin white modern country boundaries.

## Files

| File | Purpose |
| --- | --- |
| `xuanzang-travels.jsx` | Editable map source, route data, labels, and styling |
| `xuanzang-travels.svg` | Scalable vector export with embedded letterforms |
| `xuanzang-travels.png` | High-resolution image, 3200 × 3050 pixels |
| `xuanzang-map-notes.md` | Historical sources and geographic conventions |

## Render

Requires **Gum CLI** (`npm install -g gum-jsx`) with Node.js 24+ or Bun 1.4.2+. The source uses `pos={[x, y]}` for positioned elements. The base map is bundled with Gum.

Run these commands from this folder:

```sh
gum xuanzang-travels.jsx -o xuanzang-travels.svg
gum xuanzang-travels.jsx -o xuanzang-travels.png --ratio 2
```

## Customize

In `xuanzang-travels.jsx`:

- **Colors and boundaries:** edit `C` and `countryBorders`.
- **Routes and stops:** edit `places` and the route arrays; coordinates are `[longitude, latitude]`.
- **Corner rounding:** adjust `routeRadius`. Direction arrows derive their positions from the route segments.
- **Label placement:** edit `labels` for the main map and `Detail` for the inset.

After editing, render again and check labels and arrows for overlap.

## Reading the map

Rust marks the westward journey, green shows travels in India, and dashed blue marks the return. Routes connect selected stops approximately; dates and some visits are debated. The white boundaries show modern geographic context. See `xuanzang-map-notes.md` for sources and limitations.

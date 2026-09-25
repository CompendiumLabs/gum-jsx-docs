---
category: maps
description: "Color world countries by stable feature IDs on an Equal Earth map."
---

# World countries

`world_countries()` supplies the bundled 1:110m world atlas as a TopoJSON source.
Pass it to **GeoMap** and use `fill-by-id` to highlight individual countries;
unlisted features use the map's `fill`. IDs are strings, including leading zeros
such as `076` for Brazil and `036` for Australia.

Every feature needs an explicit ID for these joins. The accessor supplies stable
local IDs for the three atlas features that lack numeric IDs. It returns a fresh
copy with the atlas version and URL recorded in `provenance`.

The `equalEarth` projection fits the whole sphere. Shared TopoJSON borders are
drawn once, after the country fills. The CLI includes the map elements and data
accessors by default, so this example runs without imports or plugin flags.

**TextFigure** places the heading, aspect-sized map, and measured caption in a
column. Only the outer design width and base typography are specified; text and
spacing determine the remaining layout. `fit` scales the finished composition
for a smaller preview without changing the map's proportions.

Compare the [projection gallery](projection_gallery.md), try
[US states](us_states.md), or zoom with a [selected-region fit](selected_region.md).

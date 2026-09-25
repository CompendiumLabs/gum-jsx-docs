## References

Read the relevant pages when choosing components or resolving a layout question;
there is no need to load the entire catalog. Each reference includes its
runnable JSX example.

- [Guides](references/guides.md): the language, units, sizing, styles, helpers,
  fonts, math setup, and host rendering APIs.
- [Elements by category](references/elements.md): layout, geometry, plotting,
  maps, networks, text, math, and special elements, including `PngImage`.
- [Gallery](references/gallery.md): complete figures and focused examples,
  grouped by category. Start from a close example when it fits the request.

Useful starting points:

- Layout: [Units](references/guides/units.md), [Sizing](references/guides/sizing.md),
  [Fitting](references/guides/fitting.md), [Stacks](references/guides/stack.md),
  [Box](references/elements/Box.md), [Grid](references/elements/Grid.md), and
  [Group](references/elements/Group.md).
- Plots: [Plot](references/elements/Plot.md), [Graph](references/elements/Graph.md),
  [SymLine](references/elements/SymLine.md), and [BarPlot](references/elements/BarPlot.md).
  Plot axes use linear scales. `bounds="frame"` sizes and aligns the data area;
  leave space for the labels and titles outside it.
  [Projections](references/guides/projections.md) covers polar Graph callbacks
  and geographic marks. Supply explicit output limits and sampled paths.
- Maps: [Making maps](references/guides/maps.md) walks through sources, styles,
  views, and annotations. [GeoMap](references/elements/GeoMap.md) documents the
  element and its helpers. Start with `world_countries()` or `us_states()`;
  nest markers and labels inside GeoMap, or see
  [map routes](references/gallery/map_routes.md) for a sampled Arrow.
  [Filtering and bounds](references/gallery/filtered_region.md) combines source
  `ids` selection with `fit-to={{ bounds: [west, south, east, north] }}`.
- Diagrams: [Network](references/elements/Network.md) connects named
  [Node](references/elements/Node.md) frames, or any element with an `id`, using
  [Edge](references/elements/Edge.md).
  It does not automatically arrange nodes or avoid obstacles.
  Use [Overlay](references/elements/Overlay.md) for annotations around a measured base.
- Text and math: [Text](references/elements/Text.md),
  [TitleFrame](references/elements/TitleFrame.md), [math authoring](references/guides/math.md),
  and [Shape Algebra](references/gallery/shape_algebra.md).
- Complete compositions: [Transformer](references/gallery/transformer.md),
  [Pendulum Physics](references/gallery/pendulum_physics.md), and
  [Two Columns](references/gallery/two_column.md).
- Host integration: [Rendering](references/guides/rendering.md),
  [Fonts](references/guides/fonts.md), and [Custom elements](references/guides/custom_elements.md).

For features without a dedicated component, compose supported primitives or
explain the limitation.

## References

Read the relevant pages when choosing components or resolving a layout question;
there is no need to load the entire catalog. Each reference includes its
runnable JSX example.

- [Guides](references/guides.md): the language, units, sizing, styles, helpers,
  fonts, math setup, and host rendering APIs.
- [Elements by category](references/elements.md): layout, geometry, plotting,
  networks, text, math, and special elements, including `PngImage`.
- [Gallery](references/gallery.md): complete figures and focused examples,
  grouped by category. Start from a close example when it fits the request.

Useful starting points:

- Layout: [Units](references/guides/Units.md), [Sizing](references/guides/Sizing.md),
  [Fitting](references/guides/Fitting.md), [Stacks](references/guides/Stack.md),
  [Box](references/elements/Box.md), [Grid](references/elements/Grid.md), and
  [Group](references/elements/Group.md).
- Plots: [Plot](references/elements/Plot.md), [Graph](references/elements/Graph.md),
  [SymLine](references/elements/SymLine.md), and [BarPlot](references/elements/BarPlot.md).
  Plot axes use linear scales. `bounds="frame"` sizes and aligns the data area;
  leave space for the labels and titles outside it.
- Diagrams: [Network](references/elements/Network.md) connects named
  [Node](references/elements/Node.md) frames, or any element with an `id`, using
  [Edge](references/elements/Edge.md).
  It does not automatically arrange nodes or avoid obstacles.
  Use [Overlay](references/elements/Overlay.md) for annotations around a measured base.
- Text and math: [Text](references/elements/Text.md),
  [TitleFrame](references/elements/TitleFrame.md), [math authoring](references/guides/Math.md),
  and [Shape Algebra](references/gallery/shape_algebra.md).
- Complete compositions: [Transformer](references/gallery/transformer.md),
  [Pendulum Physics](references/gallery/pendulum_physics.md), and
  [Two Columns](references/gallery/two_column.md).
- Host integration: [Rendering](references/guides/Rendering.md),
  [Fonts](references/guides/Fonts.md), and [Custom elements](references/guides/CustomElements.md).

For features without a dedicated component, compose supported primitives or
explain the limitation.

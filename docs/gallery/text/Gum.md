# Gum

*Category*: core

Gum describes diagrams with JSX and renders them as SVG. The reference pages
describe the elements, layout rules, and rendering APIs.

## Start here

1. Use [Svg](../../elements/text/Svg.md) for the viewport.
2. Use [TextBox](../../elements/text/TextBox.md) or [TextFrame](../../elements/text/TextFrame.md) for padded document content.
3. Arrange content with [TextCol](../../elements/text/TextCol.md), [HStack](../../elements/text/HStack.md), or [Group](../../elements/text/Group.md).
4. Add [shapes](../../elements/text/Rect.md) and [Text](../../elements/text/Text.md).

**TextBox**, **TextFrame**, and **TextCol** fill available width and pass it to
automatically sized content. Explicit child widths are respected. Use
`width="fit"` for a compact document component. [Box](../../elements/text/Box.md),
[Frame](../../elements/text/Frame.md), and [VStack](../../elements/text/VStack.md)
provide primitives that size to their content by default.

Each page has a matching executable example. Download or edit the linked JSX;
it needs no imports when evaluated by the Gum CLI.

## Three rules worth learning

- Raw **length** numbers are fractions. Write `px(100)` for 100 pixels or
  `em(2)` for two local font sizes. A raw `width={100}` means 100 times the
  established parent width, not 100 pixels. See [Units](./Units.md).
- Stack growth and shrinkage are explicit. A column can measure aspect figures
  from a supplied width, but does not infer a shared width from their combined
  height. See [Sizing](./Sizing.md) and [Stack](./Stack.md).
- **Text** keeps its font size during layout. [Fit](../../elements/text/Fit.md) is the explicit operation
  that scales an entire drawing, including its glyphs and strokes.

There is no browser DOM or React runtime behind these elements. JSX constructs
immutable descriptions; a layout pass creates geometry; SVG rendering serializes
that result. The [rendering API](./Rendering.md) exposes each stage separately.

## Run the example

With `@gum-jsx/cli` installed globally, save the example below as `hello.jsx`:

```sh
gum hello.jsx
gum hello.jsx -o hello.svg
```

The first command uses kitty graphics. See [CLI](./CLI.md) for PNG, tree, JSON,
viewport overrides, and other terminal options.

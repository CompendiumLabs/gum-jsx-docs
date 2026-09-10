# Text

*Category*: text

*Inherits*: [Group](/docs/Group) > [Element](/docs/Element)

Displays text and other elements. There is no font size: a text on its own fills the figure, and inside a stack it is set at the stack's em, wrapping to the width it is offered. To set the text color, use `color` instead of `fill` or `stroke`.

By default, whitespace (including newlines) is collapsed, and `width` is the width the text wraps at, in em, and the width of its box. With `fit`, the text is instead set once (on one line, or wrapped at its `width`) and scaled to whatever slot it gets, the way a title in a figure scales with the figure; a `height` on a fitted text makes it that tall.

Set `whitespace="preserve"` (or `"pre"`) for preformatted plain text: spaces, indentation,
explicit newlines, and blank lines are preserved, with no automatic wrapping. All lines use
the same text size. The block is as wide as its widest line; `width` can make it wider but
does not squeeze long lines. Use `scale` to change its size within a text container.
Tabs advance to the next `tab-size` column (default 4). CRLF and CR newlines become LF.

Pass source as a string expression or template literal; JSX formatting-only whitespace is
ignored. String children concatenate exactly in this mode; nested elements are not supported.
No trimming or dedenting is performed, so a trailing newline adds a final blank line.

```jsx
<Text whitespace="preserve">{`First line
    Indented line

Last line`}</Text>
```

[Verbatim](/docs/Verbatim) is the convenience form with preserved whitespace and a monospace font.

Text size follows from width: `width` is measured in the text's own em, so a narrower width in the same space makes larger text. `scale` says the same thing the other way round, as a multiple of the surrounding text's em: `scale={2}` inside a [TextCol](/docs/TextCol) is a heading twice the body size, and the text's box comes out `width * scale` wide in the surrounding em. Every text element carries its box in em (width, height, and the position of the first line's math axis), which is how a [MathText](/docs/MathText) places a text block by its first line and how the text containers size themselves.

The math elements use the same `scale` option, including `MathText`, `Latex`,
and `Tex`. Nested scales multiply. A scaled `Text` inside another `Text`
stays a single inline block, aligned by its first line's math axis; give it
its own `width` if it needs wrapping. Like inline math, it may extend beyond
the surrounding fixed line height.

There are two wrapper elements related to text:

- [TextBox](/docs/TextBox) / **TextFrame** can handle text with a border and background
- [TextCol](/docs/TextCol), [TextRow](/docs/TextRow), and [TextGrid](/docs/TextGrid) lay out text blocks in em, and a [TextFigure](/docs/TextFigure) sizes a figure among them

There are two default fonts that are always provided: `sans = 'IBM Plex Sans'` and `mono ='IBM Plex Mono'`. There are three availabe font weights: `light = 300`, `regular = 400`, and `bold = 700`. The default weight is `light`. You can use these global variables anywhere.

Parameters:
- `children` — the text to display
- `width` = `null` — the width in em to wrap the text at, and of its box; without one, a text in a stack wraps to the width it is offered, and on its own it is one line
- `height` — a height of its own in em; the text sits in the box by its `align`
- `fit` = `false` — scale the text to its slot like a figure, rather than setting it at the surrounding em
- `scale` = `1` — the size of the text relative to the surrounding text's em
- `whitespace` = `'normal'` — collapse whitespace, or `'pre'` / `'preserve'` to preserve it without wrapping
- `tab-size` = `4` — tab stops in columns for preserved text
- `gap` = `0` — extra line spacing, in em: lines sit `1 + gap` apart
- `justify` = `'left'` — the horizontal justification of the text
- `color` = `black` — sets the text color using both stroke and fill (this is the usual way)
- `font-family` = `sans` — the font family (for display and size calculations)
- `font-weight` = `300` — the font weight (for display and size calculations)

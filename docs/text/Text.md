# Text

*Category*: text

*Inherits*: [VStack](/docs/VStack) > [Element](/docs/Element)

Displays text and other elements. Note that you will typically not set the font size of the text here, as this will fill the entire space with the provided text. To set the text color, use `color` instead of `fill` or `stroke`.

If `width` is specified, the text will be wrapped to that width. In either case, single newlines will be respected, though whitespace will be compressed.

Text size follows from width: `width` is measured in the text's own em, so a narrower width in the same space makes larger text. `scale` says the same thing the other way round, as a multiple of the surrounding text's em: `scale={2}` inside a **TextStack** is a heading twice the body size, and the text's box comes out `width * scale` wide in the surrounding em. Every text element carries its box in em (width, height, and the position of the first line's math axis), which is how a [MathText](/docs/MathText) places a text block by its first line and how the text containers size themselves.

There are two wrapper elements related to text:

- [TextBox](/docs/TextBox) / **TextFrame** can handle text with a border and background
- **TextStack** can handle multiple lines of text that are passed in as an array

There are two default fonts that are always provided: `sans = 'IBM Plex Sans'` and `mono ='IBM Plex Mono'`. There are three availabe font weights: `light = 300`, `regular = 400`, and `bold = 700`. The default weight is `light`. You can use these global variables anywhere.

Parameters:
- `children` — the text to display
- `width` = `null` — the width (in ems) to wrap the text at (if `null`, the text will not be wrapped)
- `scale` = `1` — the size of the text relative to the surrounding text's em
- `spacing` = `0.2` — the spacing between lines of text
- `justify` = `'left'` — the horizontal justification of the text
- `color` = `black` — sets the text color using both stroke and fill (this is the usual way)
- `font-family` = `sans` — the font family (for display and size calculations)
- `font-weight` = `300` — the font weight (for display and size calculations)

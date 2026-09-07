# Verbatim

*Category*: text

*Inherits*: [Text](/docs/Text)

Preformatted plain text for code, terminal output, and aligned text. This is `Text` with
`whitespace="preserve"`, `font-family={mono}`, and `justify="left"` as defaults.
All can be overridden. Lines stay left-aligned even when a surrounding frame or
stack centers the block; set `justify` on `Verbatim` to change their alignment.

Pass a string expression or template literal. Spaces and blank lines are preserved,
tabs advance to the next `tab-size` column (default 4), and lines never wrap automatically.
All lines share one text size; the widest line determines the natural width.
`width` adds room if wider than the source, while `scale` changes the size in a text container.

Use `Box` or `Frame` for padding and decoration. `TextCol`, `TextRow`, and `Slide`
place verbatim blocks using the same em metrics as ordinary text.

Source is not trimmed or dedented. Nested elements and syntax highlighting are not supported.
See [Text](/docs/Text) for the shared font, spacing, alignment, and size options.

# One paragraph, two widths
*Category*: text

Both columns query the same styled **Text** description, at widths of 408px and
224px. The font remains 18px while line breaks and measured heights change.
The layout pass reuses prepared glyph measurements across those allocations.

The custom parent draws outlines around the measured paragraph boxes. Compare
the allocations with tree output. See [Text](../../elements/text/Text.md),
[Span](../../elements/text/Span.md), and [Custom elements](./CustomElements.md).

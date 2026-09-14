# Span

*Category*: text

Span changes inherited style for part of a [Text](./Text.md) element. Its children
may be strings, numbers, nested Spans, and arrays. It has no independent box
during inline layout: padding, width, and flex allocation do not create an
inline badge or a separately positioned run.

```jsx
<Text>
  {"One "}<Span font_weight={bold}>important</Span>{" word."}
</Text>
```

Font family, size, weight, style, color, and line height may be overridden. em or
fractional font_size is relative to the surrounding font size. Nested Spans
inherit the resolved style of their containing Span. Use `color`, not fill,
for glyph color.

Styled runs share line breaking and baselines. A Span boundary inside a word
does not create a new break opportunity, and a style-equivalent Span does not
break kerning. Larger runs contribute their own font metrics to the shared line
box. Span is not a superscript, subscript, arbitrary baseline shift, or rich
inline-element system.

Keep literal text on one source line, use text expressions, or include newlines
intentionally: Text retains explicit newlines. The example mixes styles within
one paragraph and highlights the middle of an otherwise unbroken word.

# Text

*Category*: text

Text lays out shaped glyphs at a fixed font size. It wraps into lines when given
a finite width; changing that width reflows the paragraph instead of scaling
the font. Use [Fit](Fit.md) only when you intentionally want to scale a finished
text fragment.

## Content and formatting

Supply either a `text` string or children, not both. Children may be strings,
numbers, [Spans](Span.md), or nested arrays of those values. Null and boolean
children are ignored. Other elements, including shapes, are not inline content.

| Prop | Default | Meaning |
| --- | --- | --- |
| font_family | IBM Plex Sans | Registered family name |
| font_size | px(16) | Glyph size; em/fractions use the inherited font size |
| font_weight | 400 | Numeric weight |
| font_style | normal | normal or italic |
| color | black | Glyph fill; the shape fill prop does not color text |
| line_height | em(1.2) | Line box height, relative to the local font size |
| wrap | true | Permit wrapping at legal word-break positions |
| whitespace | normal | normal or pre |
| tab_size | 4 | Positive integer tab-stop interval in pre mode |
| text_align | left | left, center, or right within the allocated text width |

Font and color props inherit through containers. wrap, whitespace, tab_size,
and text_align are local Text options. See [Fonts](Fonts.md) for the bundled
families, weight matching, and host font loading.

## Wrapping and whitespace

In normal mode, horizontal spaces/tabs collapse and hard-line edges are trimmed.
Both normal and pre retain explicit newlines. pre preserves spaces and expands
tabs; it does not turn wrapping off. For literal code or a small aligned table,
use whitespace="pre" together with wrap={false} and a monospaced font.

```jsx
<Text font_family={mono} whitespace="pre" wrap={false}
  text={"name\tcount\nalpha\t12"} />
```

Wrap happens at legal Unicode break positions, not at every character. An
unbreakable word wider than its budget overflows; it is not shrunk or silently
ellipsized. A trailing newline adds a blank line. Empty text has no natural size
or ink. Line height controls spacing, not glyph scaling: very tight lines can
overlap or extend beyond their line boxes.

In an [HStack](HStack.md), use basis={0} grow={1} on a paragraph to give it the
remaining width. A fixed-height text frame does not automatically fit its text
vertically. Align the Text element using its parent; text_align only aligns
lines inside the Text rectangle.

SVG output contains glyph paths and an accessible text label, not native SVG
text. This makes font rendering self-contained, but the paths are not ordinary
selectable text.

[Runnable source](../code/Text.jsx) · [Typography showcase](../../gala/text/typography_card.md)

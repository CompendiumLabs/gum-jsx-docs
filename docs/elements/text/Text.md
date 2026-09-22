# Text

*Category*: text

**Text** lays out shaped glyphs at a fixed font size. It wraps into lines when given
a finite width; changing that width reflows the paragraph instead of scaling
the font. Use [fitting](../../gallery/text/Sizing.md#fitting) only when you intentionally want to scale a finished
text fragment.

## Content and formatting

Supply text as children. Children may be strings,
numbers, [Spans](./Span.md), other elements, or nested arrays of those values.
Null and boolean children are ignored. Each embedded element is an indivisible
inline item, aligned by its baseline or bottom edge. Give figures concrete sizes.

| Property | Default | Meaning |
| --- | --- | --- |
| `font-family` | `sans` | Registered family name |
| `font-size` | `px(16)` | Glyph size; em/fractions use the inherited font size |
| `font-weight` | `regular` | Numeric weight |
| `font-style` | `"normal"` | normal or italic |
| `color` | `black` | Glyph fill; the shape fill prop does not color text |
| `line-height` | `em(1.2)` | Prose line strut; inline elements may enlarge the line |
| `wrap` | `true` | Permit wrapping at legal word-break positions |
| `whitespace` | `"normal"` | normal or pre |
| `tab-size` | `4` | Positive integer tab-stop interval in pre mode |
| `justify` | `"start"` | start, center, end, or a fraction from 0 to 1 within the allocated text width |

Font and color props inherit through containers. wrap, whitespace, `tab-size`,
and `justify` are local **Text** options. See [Fonts](../../gallery/text/Fonts.md) for the bundled
families, weight matching, and host font loading.

## Wrapping and whitespace

Literal JSX text strips outer blank lines and common source indentation by default,
so the following label measures exactly like `<Text>Revenue</Text>`:

```jsx
<Text>
  Revenue
</Text>
```

Internal text line breaks and spaces beside inline spans remain. Formatting-only
multiline children between tags are ignored. See [JSX whitespace](../../gallery/text/JSX.md#jsx-whitespace)
for the full rules and examples.

In normal mode, horizontal spaces/tabs collapse and hard-line edges are trimmed.
Both normal and pre retain explicit newlines. pre preserves spaces and expands
tabs; it does not turn wrapping off. For literal code or a small aligned table,
use `whitespace="pre"` together with `wrap={false}` and a monospaced font. Use a string
expression child to bypass JSX source cleanup; pre alone does not
preserve source indentation or outer blank lines.

```jsx
<Text font-family={mono} whitespace="pre" wrap={false}>
  {"name\tcount\nalpha\t12"}
</Text>
```

Wrap happens at legal Unicode break positions, not at every character. An
unbreakable word wider than its budget overflows; it is not shrunk or silently
ellipsized. A trailing newline adds a blank line. Empty text has no natural size
or ink. Line height controls spacing, not glyph scaling: very tight lines can
overlap or extend beyond their line boxes.

Inline elements enlarge a line using their logical above/below-baseline extents;
ink overhang alone does not enlarge it. A formula stays at its natural size and
overflows if it cannot fit. [Tex](./Tex.md) is the usual inline math choice;
[Latex](./Latex.md) retains its display-style default. See
[math inside prose](../../gallery/text/InlineMath.md) for examples.

In an [HStack](./HStack.md), use `grow={1}` on an unsized paragraph to give it the
remaining width. Its basis defaults to zero under a finite row budget; use
`basis="auto"` to start from its measured width. A fixed-height text frame does not
automatically fit its text vertically. Align the **Text** element using its parent; `justify` only aligns
lines inside the **Text** rectangle.

SVG output contains glyph paths and an accessible text label, not native SVG
text. This makes font rendering self-contained, but the paths are not ordinary
selectable text.

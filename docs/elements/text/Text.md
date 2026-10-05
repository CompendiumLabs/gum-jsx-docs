---
category: text
description: "Text lays out shaped glyphs at a fixed font size."
---

# Text

**Text** lays out shaped glyphs at a fixed font size. It wraps into lines when given
a finite width; changing that width reflows the paragraph instead of scaling
the font. Use [fitting](../../guides/text/sizing.md#fitting) only when you intentionally want to scale a finished
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
| `font-weight` | `regular` | Numeric 1–1000, or `"light"`, `"regular"`/`"normal"`, `"bold"` (300, 400, 700) |
| `font-style` | `"normal"` | normal or italic |
| `color` | `black` | Glyph fill; the shape fill prop does not color text |
| `halo-color` | `none` | Rounded outline behind the glyphs |
| `halo-width` | `em(0.08)` | Visible outward extent; px is fixed, em/fractions use the local font size |
| `line-height` | `em(1.2)` | Prose line strut; inline elements may enlarge the line |
| `wrap` | `true` | Permit wrapping at legal word-break positions |
| `whitespace` | `"normal"` | normal or pre |
| `tab-size` | `4` | Positive integer tab-stop interval in pre mode |
| `justify` | `"start"` | start, center, end, or a fraction from 0 to 1 within the allocated text width |

Font, color, and halo props inherit through containers. wrap, whitespace, `tab-size`,
and `justify` are local **Text** options. See [Fonts](../../guides/text/fonts.md) for the bundled
families, weight matching, and host font loading.

## Halos

Use a halo to keep labels readable over lines, grids, and colored regions:

```jsx
<Text halo-color={white} halo-width={em(0.08)}>
  River Thames
</Text>
```

Setting `halo-color` enables the default width. Width is the distance outside the
glyph: `px(2)` adds a two-pixel rim. Fractions and percentages refer to the local
font size, so `0.08`, `"8%"`, and `em(0.08)` are equivalent. Set `halo-color={none}`
or `halo-width={0}` to disable an inherited halo, including on a **Span**.

All halo outlines paint before the paragraph's foreground, including across span
boundaries and overlapping lines. Halos expand ink and overflow without changing
wrapping, advances, baselines, or label placement. Leave enough padding at clipped
viewport edges. As with other drawings, translucent paints can accumulate alpha.

Live and mixed text modes keep the foreground selectable and draw the halo with
glyph paths. Color emoji have no outline and remain unchanged. Math glyphs and
rules do not yet support halos. Generated labels accept the same options through
scoped props such as `label-halo-color` and `title-halo-width`.
See the [text halo example](../../gallery/text/text_halos.md).

## Wrapping and whitespace

Literal JSX text strips outer blank lines and common source indentation by default,
so the following label measures exactly like `<Text>Revenue</Text>`:

```jsx
<Text>
  Revenue
</Text>
```

Internal text line breaks and spaces beside inline spans remain. Formatting-only
multiline children between tags are ignored. See [JSX whitespace](../../guides/text/jsx.md#jsx-whitespace)
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
[math inside prose](../../gallery/text/inline_math.md) for examples.

In an [HStack](./HStack.md), use `grow={1}` on an unsized paragraph to give it the
remaining width. Its basis defaults to zero under a finite row budget; use
`basis="auto"` to start from its measured width. A fixed-height text frame does not
automatically fit its text vertically. Align the **Text** element using its parent; `justify` only aligns
lines inside the **Text** rectangle.

SVG output contains glyph paths and an accessible text label, not native SVG
text. This makes font rendering self-contained, but the paths are not ordinary
selectable text.

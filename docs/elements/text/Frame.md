---
category: layout
description: "Surround one element with padding, background, and a default border."
---

# Frame

**Frame** is [Box](./Box.md) with a default `border-width={px(1)}`. It has the same
single-content rule, sizing, padding, background, border radius, alignment, and clipping.

| Property | Default | Meaning |
|---|---|---|
| `aspect` | — | Preferred outer-frame width/height ratio |
| `padding` | `0` | Length or [Box padding shorthand](./Box.md) |
| `border-width` | `px(1)` | Border thickness inside the frame |
| `border-color` | Resolved color | Border paint |
| `background` | `none` | This **Frame**'s background |
| `border-radius` | `0` | Scalar, `{ x, y }` / `[x, y]` pair, or [side/corner object](./Box.md) |
| `align` | `"start"` | Content alignment on both axes, or `{ x, y }` / `[x, y]` |
| `clip` | `false` | Clip content inside the rounded border |

The default border color comes from inherited color. Supplying `border-width`
overrides the default; setting it to zero removes the border.
There is no default padding or default background.

Use `width={px(240)} aspect={1}` for a 240×240 square frame. The ratio includes
the border and padding; it does not stretch the content. Height can also derive
width. Two fixed dimensions and min/max limits override the preferred ratio.

Use `border-radius={{ t: em(0.4) }}` to round only the top corners. The keys are
`t`, `b`, `l`, `r`, `tl`, `tr`, `bl`, and `br` (bottom-right). Corner values
override side values, and each value accepts a scalar or elliptical pair:

```jsx
<Frame border-radius={{ t: [em(0.75), em(0.4)], tr: 0 }} background={white}>
  <Text>Rounded top-left corner</Text>
</Frame>
```

Unspecified corners stay square. See [Box](./Box.md) for units, precedence,
clamping, and clipping behavior. Single numbers and pairs retain their meaning.

**Frame**'s border occupies space inside its outer dimensions. A naturally sized
frame adds two border widths to each content dimension, plus any padding.
The example uses em padding so the space around the label follows its font size.

In a stack, put basis/grow/shrink on the **Frame** if the frame is the allocated item.
Neither a border nor an unsized shape inside it makes a **Frame** automatically flexible.

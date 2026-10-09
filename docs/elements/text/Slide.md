---
category: text
description: "Lay out a 16:9 slide with a measured title and flexible content area."
---

# Slide

Slide extends [Page](./Page.md) with a title and flexible body layout. Use it on
its own, or put Slides directly inside a [Document](./Document.md) to make a deck.

| Property | Default | Meaning |
|---|---|---|
| `title` | — | String or **Element** placed above the body |
| `title-style` / `title-*` | `em(1.6)`, `bold` | Nested or flat text options for a generated title |
| `font-size` | Document default or inherited | Base font size for body text, title scale, padding, and gaps |
| `width` / `height` | Natural | Slide dimensions; use pixels for a standalone slide or shared Document dimensions |
| `aspect` | `16 / 9` | Preferred ratio, used when neither the slide nor its Document supplies one |
| `padding` | `em(1.5)` | Slide-edge lengths; accepts [Box padding forms](./Box.md) |
| `gap` | `em(0.8)` | Space between the title and body |
| `background` | `none` | Explicit **Slide** background paint |
| `clip` | `false` | Clip content to the 16:9 slide frame |

A 16:9 canvas with a measured title and flexible content area. `title` is a string
or **Element**; `title-style` overrides default 1.6em bold text. The base font
comes from **Document** defaults or inherits from a layout parent (16px otherwise).
Set `font-size` on **Slide** to override it for one slide. Defaults:
1.5em padding, 0.8em gap, transparent background. `clip` optionally hides paint outside
the slide (false by default).

Document can supply shared dimensions, aspect, background, typography, and theme.
Slide props override those defaults. A standalone Slide is already an output
viewport, so rendering does not add a Page wrapper and host `wrap` options do
not apply. Existing Page-wrapped slides remain supported.

Scoped `title-` props accept generated text options, including `title-color`,
`title-font-size`, and `title-wrap`. They override matching fields in `title-style`.
Supplied title **Element**s retain their own props.

Explicit dimensions or parent offers determine the viewport; natural width is
480px with a 16:9 height. A single child fills the area below the title, respecting
its explicit dimensions, `align-self` overrides, and min/max limits. A plain **Plot** needs
no height calculation; a supplied **TextCol** or **HStack** receives the body
allocation directly, so its own flex layout can use the remaining space.

Multiple children use **TextCol** and ordinary stack rules, with 0.6em gaps.
Use `grow={1}` on figures that should share the remaining height with text:

```jsx
<Slide fit font-size={px(15)} title="Results">
  <Plot grow={1} />
  <Text>A caption below the plot.</Text>
</Slide>
```

For a **TextFigure**, put `grow={1}` on its figure child to leave room for the
caption. Explicitly oversized content or too much text can still overflow.
Resizing does not multiply the type scale; use `fit` for a scaled copy of a
finished slide.

For side-by-side content, place an **HStack** in the body and give its direct
children grow weights. Use `aspect` on plots, relative font sizes on labels, and
`em()` padding and gaps. The [math slide](../../gallery/text/math_slides.md) uses
this pattern with only one pixel value: its base font size.

# Slide

*Category*: text

| Property | Default | Meaning |
|---|---|---|
| `title` | — | String or **Element** placed above the body |
| `title-style` / `title-*` | `em(1.6)`, `bold` | Nested or flat text options for a generated title |
| `font-size` | Inherited | Base font size for body text, title scale, padding, and gaps |
| `padding` | `em(1.5)` | Slide-edge lengths; accepts [Box padding forms](./Box.md) |
| `gap` | `em(0.8)` | Space between the title and body |
| `background` | `none` | Explicit **Slide** background paint |
| `clip` | `false` | Clip content to the 16:9 slide frame |

A 16:9 canvas with a measured title and flexible content area. `title` is a string
or **Element**; `title-style` overrides default 1.6em bold text. The base font
inherits from **Svg** or another parent (16px without a parent override). Set
`font-size` on **Slide** only when it should differ from its parent. Defaults:
1.5em padding, 0.8em gap, transparent background. `clip` optionally hides paint outside
the slide (false by default).

Scoped `title-` props accept generated text options, including `title-color`,
`title-font-size`, and `title-wrap`. They override matching fields in `title-style`.
Supplied title **Element**s retain their own props.

Explicit dimensions or parent offers determine the viewport; natural width is
480px with a 16:9 height. A single child fills the area below the title, respecting
its explicit dimensions, `width="fit"`, and min/max limits. A plain **Plot** needs
no height calculation; a supplied **TextCol** or **HStack** receives the body
allocation directly, so its own flex layout can use the remaining space.

Multiple children use **TextCol** and ordinary stack rules, with 0.6em gaps.
Use `grow={1}` on figures that should share the remaining height with text:

```jsx
<Svg width={px(960)} height={px(540)} font-size={px(18)}>
  <Slide title="Results">
    <Plot grow={1} />
    <Text>A caption below the plot.</Text>
  </Slide>
</Svg>
```

For a **TextFigure**, put `grow={1}` on its figure child to leave room for the
caption. Explicitly oversized content or too much text can still overflow.
Resizing does not multiply the type scale; use **Fit** for a scaled copy of a
finished slide.

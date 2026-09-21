# RoundedRect

*Category*: geometry

| Property | Default | Meaning |
|---|---|---|
| `border-radius` | `0.125` of the shorter side | Scalar, `{ x, y }` / `[x, y]` pair, or [side/corner object](./Box.md) |

**RoundedRect** is [Rect](./Rect.md) with a default corner radius of 0.125 of its
shorter side. It accepts the same sizing and paint props, has no children, and
does not imply a particular aspect ratio.

Override `border-radius` with px, em, a fraction, or an `{ x, y }` / `[x, y]` pair. A scalar keeps
the corners circular; a pair permits elliptical corners. `border-radius={0}` removes
the rounding. A large radius is capped at half each side, which is convenient
for a pill shape.

A side/corner object selects which corners to round, replacing the uniform
default. For example, `border-radius={{ t: px(12) }}` leaves the bottom corners square.
See [Rect](./Rect.md) for all radius forms.

```jsx
<RoundedRect width={px(160)} height={px(64)} border-radius={px(32)}
  fill={green} stroke={none} />
```

Rounding changes the geometry, not the layout size. For a rounded container
with text, padding, or clipping, use [Box](./Box.md) or [Frame](./Frame.md) with a
`border-radius` instead. Shapes cannot wrap children.

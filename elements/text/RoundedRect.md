# RoundedRect

*Category*: geometry

| Property | Default | Meaning |
|---|---|---|
| radius | `0.125` of the shorter side | Scalar corner radius or independent `{ x, y }` / `[x, y]` radii |

RoundedRect is [Rect](./Rect.md) with a default corner radius of 0.125 of its
shorter side. It accepts the same sizing and paint props, has no children, and
does not imply a particular aspect ratio.

Override `radius` with px, em, a fraction, or an `{ x, y }` / `[x, y]` pair. A scalar keeps
the corners circular; a pair permits elliptical corners. radius={0} removes
the rounding. A large radius is capped at half each side, which is convenient
for a pill shape.

```jsx
<RoundedRect width={px(160)} height={px(64)} radius={px(32)}
  fill={green} stroke={none} />
```

Rounding changes the geometry, not the layout size. For a rounded container
with text, padding, or clipping, use [Box](./Box.md) or [Frame](./Frame.md) with a
radius instead. Shapes cannot wrap children.

[Runnable source](../code/RoundedRect.jsx) · [Style](../../topics/text/Style.md)

# Ellipse

*Category*: geometry

Ellipse draws an axis-aligned ellipse in its allocated rectangle. Unlike
[Circle](Circle.md), it has no intrinsic aspect ratio. Set both dimensions or
supply one dimension and an aspect to control its proportions.

`center` and `radius` accept `{ x, y }` or `[x, y]` pairs.
`center` defaults to `{ x: 0.5, y: 0.5 }`. `radius`
defaults to `{ x: 0.5, y: 0.5 }`. Both pairs use the ellipse's own width for x
fractions and height for y fractions; px and em are also accepted.

```jsx
<Ellipse width={px(160)} height={px(96)}
  radius={[0.4, px(24)]} fill="#2c7567" />
```

Radii must be nonnegative. Explicit radii and centers do not change layout size,
and may extend outside it. Ellipse accepts shared sizing and paint props and
has no content children. There is no element-level rotation prop; a rotated
outline can instead be constructed with [Path](Path.md).

[Runnable source](../code/Ellipse.jsx) · [Units](Units.md)

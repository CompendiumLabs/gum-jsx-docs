# Circle

*Category*: geometry

| Property | Default | Meaning |
|---|---|---|
| `center` | `[0.5, 0.5]` | Center in the **Circle**'s local rectangle |
| `radius` | `0.5` | Radius relative to the shorter side, or a px/em length |

**Circle** has an intrinsic 1:1 aspect. Without a definite size its natural fallback
is 16 × 16px; specifying width alone normally produces a circle of that diameter.

`center` is an `{ x, y }` or `[x, y]` pair, defaulting to `[0.5, 0.5]` in the shape's
own rectangle. `radius` is a scalar length, defaulting to 0.5 of the shorter
side. Thus a default **Circle** remains circular and centered even inside a
nonsquare allocation.

```jsx
<Circle width={px(160)} height={px(80)}
  center={[0.25, 0.5]} radius={px(28)} fill={green} />
```

Coordinates and radius affect the drawing, not the allocated size. Moving the
center or enlarging the radius can put ink outside that rectangle. Radius must
be nonnegative; it is not automatically clamped to fit. A stroke also adds ink
outside the circular boundary. See [Group](./Group.md) for positioning the entire
element and [Ellipse](./Ellipse.md) for unequal x/y radii.

**Circle** has no children. Compose a label with a stack or position it separately
in a **Group**; do not nest **Text** inside the shape.

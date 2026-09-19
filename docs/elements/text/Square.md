# Square

*Category*: geometry

| Property | Default | Meaning |
|---|---|---|
| `radius` | `0` | Scalar, `{ x, y }` / `[x, y]` pair, or [side/corner object](./Box.md) |

**Square** is a rectangle with an intrinsic 1:1 aspect and square drawing geometry.
Setting just width or height normally determines the other dimension:

```jsx
<Square width={px(80)} fill={green} stroke={none} />
```

If an allocation is not square, **Square** draws the largest centered square that
fits inside it. Its layout rectangle still has the allocated dimensions. This
differs from [Rect](./Rect.md) `aspect={1}`: **Rect** expresses an aspect preference but
paints its entire final rectangle, even if that preference is overridden.

`radius` works as on **Rect**, relative to the drawn square's sides. Paint comes from
the shared [style](../../gallery/text/Style.md). The natural fallback is 16 × 16px.

An intrinsic aspect is local to this leaf. A [VStack](./VStack.md) containing a
**Square** does not inherit a square aspect, infer a shared width from its total
height, or automatically grow the **Square**. Give the stack a width or choose
explicit child flex allocation when that relationship matters.

The example allocates a 2:1 rectangle to each shape at the offered width. **Square** remains
square; **Rect** paints the full allocation. The enclosing **Frame**s reveal the sizes.

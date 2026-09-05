# RoundedRect

*Category*: geometry

*Inherits*: [Path](/docs/Path) > [Element](/docs/Element)

A rectangle with circular corners. It fills its allocated rectangle unless an `aspect` is specified. Unlike [Rect](/docs/Rect), it supports separate rounding for each corner.

`rounded` uses the same drawing unit as `stroke-width`: `<RoundedRect rounded={12} border={2} />` has a corner radius of twelve stroke units and a border two units wide. At the root, these are 12 and 2 pixels when the figure's longest dimension equals `Svg.unit-size` (1000 by default). Both scale with the figure, independently of the rectangle's size and aspect. A container that rebases stroke units also rebases rounding.

A pair `[x, y]` specifies the horizontal and vertical corner offsets. The arc stays circular, using the smaller offset. Four entries specify the top-left, top-right, bottom-right, and bottom-left corners; each entry may itself be a pair. For example, `rounded={[12, 0, 12, 0]}` rounds two opposite corners.

If neighboring corner offsets would overlap, all four corners shrink proportionally to fit. Negative radii become zero. Rounding does not change the rectangle's layout size or aspect.

Parameters:

- `rounded` = `0` — a radius, an x/y pair, or four corner values in stroke units; `true` uses the default radius of `10`
- `border` = `1` — stroke width in the same units; `stroke-width` can override it
- `fill`, `stroke`, and other drawing attributes — as for [Path](/docs/Path)

[Box](/docs/Box), [Frame](/docs/Box), and [TextBox](/docs/TextBox) pass their rounding through to this element. Text frames use the same stroke units for their corners; changing text `scale` alone does not change the radius.

Numeric rectangle rounding previously meant a box fraction, or em in text frames. Existing figures using that convention need their values updated to stroke units.

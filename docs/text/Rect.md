# Rect

*Category*: geometry

*Inherits*: [Element](/docs/Element)

This makes a rectangle. Without any arguments it will fill its entire allocated space. Unless otherwise specified, it has a `null` aspect. Use **Square** for a square with a unit aspect.

Specifying a `rounded` argument rounds all four corners. A scalar gives circular corners; a pair gives separate x and y radii for elliptical corners. Radii use the same drawing units as `stroke-width`: `rounded={12}` gives a radius of twelve stroke units regardless of the rectangle's size or aspect. Oversized radii are clamped to fit the box, and negative values become zero. To specify different roundings for each corner, use [RoundedRect](/docs/RoundedRect).

Parameters:
- `rounded` = `null` — corner radius in stroke units, either a scalar or an x/y pair; `true` for `10`, `false` for no rounding

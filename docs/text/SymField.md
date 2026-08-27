# SymField

*Category*: symbolic

*Inherits*: **Field** > [Group](/docs/Group) > [Element](/docs/Element)

Draws a vector field by cloning a shape at every point of a regular grid and spinning each copy to face a given direction. The other symbolic elements trace out a path through their sample points; **SymField** instead samples the rectangular grid spanned by `xlim` and `ylim` and asks `func` which way to point at each of those points.

`func` takes `(x, y)` and returns an angle in **degrees**. The default shape is an [Arrow](/docs/Arrow) lying flat along the x-axis, so an angle of `0` points right and the angle turns it clockwise on screen. That rotation is applied in screen space, so unlike [Arc](/docs/Arc)'s angles it is *not* flipped by the coordinate system: `90` points down even inside a [Graph](/docs/Graph) whose y-axis runs upward.

Pass any element as `shape` to draw something other than an arrow; it is cloned once per grid point with `pos`, `size`, and `spin` set. Note that `size` is the size of each shape rather than a layout parameter — use `point-size` to set it, and wrap the field in a [Frame](/docs/Frame) or [Box](/docs/Box) to place it.

Parameters:
- `func` — a function mapping `(x, y)` to the angle in degrees of the shape at that point (required)
- `xlim`/`ylim` — a pair of numbers specifying the extent of the grid in each direction
- `N` = `10` — number of grid points per side, or an `[Nx, Ny]` pair for a non-square grid
- `point-size` = `0.75 / N` — the size of each shape, leaving a quarter of the cell as spacing. Set this explicitly when `N` is a pair
- `shape` = [Arrow](/docs/Arrow) — the element cloned at each grid point
- `arrow-size` = `0.5` — arrowhead size of the default arrow shape
- `coord` — the coordinate rectangle of the field, inferred from `xlim`/`ylim` when omitted

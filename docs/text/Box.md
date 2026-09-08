# Box

*Category*: layout

*Inherits*: [Group](/docs/Group) > [Element](/docs/Element)

This is a simple container class allowing you to add padding, margins, and a border to a single **Element**. It's pretty versatile and is often used to set up the outermost positioning of a figure. Mirroring the standard CSS definitions, padding is space inside the border and margin is space outside the border. This has no border by default, but there is a specialized subclass of this called **Frame** that defaults to `border = 1`.

**Box** differs from [Group](/docs/Group) in how it takes its shape. A group fills whatever it is placed in and fits each child into its rect. A box is a container: given a size by its parent (the root, a stack, or another box), it lays its content out for the padded area and takes the shape of what comes back. The content is the first child with no rect of its own. So a figure gives the box its aspect, a bare element fills it, and a column keeps its text size and hugs its height: wrapping something in a box does not change what is inside. With an `aspect` of its own the box fits the size at that aspect, and with `flex` it fills it; content that does not fit the area of such a box is scaled into it, so a label in a fixed-aspect frame shrinks to fit rather than wrapping. Children at a rect of their own are placed by it, as in a group, which is handy for shifting an element while the box keeps the shape of the first child.

There are multiple ways to specify padding and margins. If given as a scalar, it is constant across all sides. If two values are given, they correspond to the horizontal and vertical sides. If four values are given, they correspond to `[left, top, right, bottom]`.

The `adjust` flag controls whether padding/margins are adjusted for the aspect ratio. If `true`, horizontal and vertical components are scaled so that their ratio is equal to the `child` element's aspect ratio. This yields padding/margins of constant apparent size regardless of aspect ratio. If `false`, the inputs are used as-is.

Parameters:
- `padding` = `0` / `0.1` — the padding to be added (inside border)
- `margin` = `0` / `0.1` — the margin to be added (outside border)
- `border` = `0` / `1` — the border width in stroke units
- `rounded` = `0` / `10` — corner radius in stroke units, per corner as for [RoundedRect](/docs/RoundedRect); `true` uses `10`
- `fill` = `null` — the background color to use (default is no fill)
- `aspect` — an aspect for the box to fit its size at; by default it takes its content's shape
- `flex` = `false` — fill the size given instead of taking the content's shape
- `adjust` = `true` — whether to adjust values for aspect ratio
- `shape` = `Rect` — the shape class to use for the border
- `clip` = `false` — whether to clip the contents to the border shape

Subunit names:
- `border` — keywords to pass to border, such as `stroke` or `stroke-dasharray`

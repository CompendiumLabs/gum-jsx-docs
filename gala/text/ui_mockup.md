# UI Mockup

An interface rather than a figure: notification cards floating over graph paper, one of them holding a [Plot](/docs/Plot). All of it is one local component. `Message` is a rounded [Frame](/docs/Box) around a [VStack](/docs/Stack) of a filled title [Box](/docs/Box), a rule, and a body box, and it spreads `{...attr}` onto the frame, so each call site supplies the `pos` and `width`.

The title bar is the interesting piece. A column hugs its children, so the header box would come out only as wide as its text; `align="stretch"` makes it take the column's width instead, which spans the gray band across the card and pins the column to the card's width, so `justify="left"` puts the title and the body against the left edge. Drop it and the column shrinks to its widest line and floats in the middle. The divider is an [HLine](/docs/UnitLine) with `height={0}`: no room in the stack, but it still spans its slot, so it draws a hairline right at the boundary.

The sizes come from one number. `em={0.03}` on the [Group](/docs/Group) is coordinate units per em, so an em is three percent of the frame height and the cards' widths are in that unit (`30` for the plot, `16` for the notifications). Nothing has a height: the plot card is as tall as the plot at its `aspect`, a notification as tall as its text wraps to. Each is centered on its `pos`, so changing the `em` rescales the cards and their text together without moving the composition.

The background is a [Mesh2D](/docs/Mesh) at low opacity. It fills the group's whole rectangle, so the outer **Frame** needs `clip` to keep it inside the rounded corners, and `border={2}` because clipping cuts the border line in half.

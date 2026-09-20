# UI Mockup

*Category*: layout

Overlapping desktop-style windows combine a live plot, a fine background grid, and wrapped message text.

Window is a reusable single-content Frame containing a vertical stack. Window
positions and widths are fractions of the desktop canvas; their text determines
natural height. The plot uses an aspect ratio instead of a pixel height. Source
order controls the overlapping layers.

A fitted Slide supplies the canvas. Its base font size is the only pixel value;
padding, gaps, corners, and typography use relative sizes.

See [Frame](../../elements/text/Frame.md).

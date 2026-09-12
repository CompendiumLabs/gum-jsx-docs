# Frame

*Category*: layout

Frame is [Box](Box.md) with a default `border_width={px(1)}`. It has the same
single-content rule, sizing, padding, background, radius, alignment, and clipping.

The default border color comes from inherited color. Supplying border_width
overrides the default; setting it to zero removes the border.
There is no default padding or default background.

Frame's border occupies space inside its outer dimensions. A naturally sized
frame adds two border widths to each content dimension, plus any padding.
The example uses em padding so the space around the label follows its font size.

In a stack, put basis/grow/shrink on the Frame if the frame is the allocated item.
Neither a border nor an unsized shape inside it makes a Frame automatically flexible.

[Runnable source](../code/Frame.jsx).

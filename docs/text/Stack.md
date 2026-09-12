# Stacks

*Category*: layout

[HStack](HStack.md) places children left to right. [VStack](VStack.md) places them
top to bottom. There is no separate Stack constructor; this page documents their
shared rules.

The stacking direction is the **main axis**; the perpendicular direction is the
**cross axis**. Stack children are elements, arrays, fragments, or conditional
elements, not bare strings.

| Stack prop | Default | Meaning |
|---|---|---|
| gap | 0 | Length between adjacent children, with no outside gap |
| align | "start" | Cross-axis positioning; "start", "center", "end", "stretch", or 0–1 |
| justify | "start" | Main-axis positioning; "start", "center", "end", or 0–1 |
| justify | — | Also "space_between", "space_around", or "space_evenly" |
| width / height and limits | — | Common sizing of the stack's frame |

HStack additionally supports `align="baseline"`. Use a single alignment value
for stacks; per-axis alignment objects and tuples belong to Box/Fit.

## Explicit flex

The immediate stack parent reads these props from each **direct child**:

| Child prop | Meaning |
|---|---|
| basis | Starting main-axis length; otherwise preferred dimension, otherwise natural size |
| grow | Share of surplus; default 0 |
| shrink | Shortage weight, multiplied by original basis; default 0 |
| min_width / max_width, etc. | Limits on the main-axis allocation |

The allocator reserves gaps, clamps bases, and distributes surplus or shortage.
Items at limits freeze while the rest receive the remaining allocation.
Insufficient shrinkage leaves overflow; a stack does not clip itself.

`basis={0} grow={1}` divides remaining space evenly among equivalent children.
`grow={1}` alone adds equal surplus to potentially different natural bases.
`width={0.5}` means half the full established parent width, not half of what
remains after gaps. Fractional widths/bases/gaps require definite references.

Put flex on a wrapping Box, Frame, or nested stack when that wrapper is the
direct child. Flex props do not inherit or pass through wrappers.
[Spacer](Spacer.md) has explicit zero-basis/grow-one defaults.

## Measurement and placement

The stack passes cross-axis offers inward while measuring natural main-axis
bases. Finite main-axis offers supply a flex budget, but the stack hugs what
is used unless its own size or an exact allocation establishes a larger frame.
On an entirely natural axis, children simply pack; an own minimum can also
provide room for explicit growth.

Text reflows at its allocated width. Stretch can require another child query:
a column selects its shared width before packing heights; a row selects height
after width allocation and text reflow. Selected sizes never become speculative
percentage references.

Justify and align position completed allocations. Text's own text_align is
separate. Distributed spacing only adds positive free space; center/end may
position overflowing content outside the frame.

There is no automatic grow/shrink for unsized graphics, no derived composite
aspect, and no common-cross-axis fitting search. Give a column of aspect figures
a width, give a row a height, or choose explicit flex allocations. See [Sizing](Sizing.md).

[Runnable source](../code/Stack.jsx).

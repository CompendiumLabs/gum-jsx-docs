# VStack

*Category*: layout

Arrange elements top to bottom. Height is the main axis and width is the cross
axis. See [Stack](../../guides/text/stack.md) for all props and allocation rules.

| Property | Default | Meaning |
|---|---|---|
| `aspect` | — | Preferred width/height ratio of the whole stack |
| `gap` | `0` | Space between adjacent children |
| `align` | `"start"` | Cross-axis (horizontal) alignment |
| `justify` | `"start"` | Main-axis (vertical) packing and distributed spacing |

| Direct child prop | Default | Meaning |
|---|---|---|
| `align-self` | `Stack's align` | Override this child's horizontal alignment |

A supplied width passes inward: paragraphs wrap at that width and unsized aspect
figures derive their heights from it. The stack then adds the resulting child
heights and gaps.

Height alone does not reverse that process. An unsized **Square** in a height-only
column retains its 16×16 natural size unless given an explicit allocation.
Two different aspect figures do not automatically infer one shared width.
An explicit `aspect` on the stack can derive its width from height, or vice versa:
`width={px(240)} aspect={1}` allocates a 240×240 column before flex and child
alignment. This sizes the column's box without scaling its children;
see [Sizing](../../guides/text/sizing.md).

## Choose the sizing information

The attached example fills the offered width. Both **Rect** figures receive that
width and their heights follow their aspects, 1 and 2. With no gap,
H = W/1 + W/2. For a desired total height of 500px, the host can offer a width
of 1000/3; the source needs no fixed pixel dimensions.

Alternatively, `grow={2}` and `grow={1}` on children without explicit heights
divide a 500px height budget into the needed 2:1 proportions. Those weights are a
decision by the author; they are not inferred from the aspects.

With a finite height budget, unsized growing children start from zero. An explicit
height supplies their basis instead, and `basis="auto"` measures natural heights
when none are specified. Without a height budget, grow retains natural measurement.

**Text** does not grow its font to occupy a height allocation. Exact height can
leave space around its normal-sized lines or report overflow if they do not fit.
Use `fit` on the stack only when scaling the whole result is the goal.

## Alignment

Align controls horizontal position; justify controls vertical packing. Defaults
are start. A direct child's `align-self` overrides the stack's align, accepting
start, center, end, fill, stretch, or 0–1. Omitted values use the parent's align.
Stretch imposes the selected shared width, which can trigger text reflow.
Fill allocates that width only to unspecified or fill-width children, respecting
explicit widths, child alignment overrides, and min/max limits.
Child containers' own align values continue to position their
contents. **VStack** does not accept baseline alignment, including via `align-self`.

[TextCol](./TextCol.md) supplies document defaults: `width="fill"` and `align="fill"`.

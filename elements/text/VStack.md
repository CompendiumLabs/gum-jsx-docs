# VStack

*Category*: layout

Arrange elements top to bottom. Height is the main axis and width is the cross
axis. See [Stack](../../topics/text/Stack.md) for all props and allocation rules.

| Property | Default | Meaning |
|---|---|---|
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

## Choose the sizing information

For the attached example, the author wants 500px of total height from **Rect**
aspects 1 and 2. With no gap, H = W/1 + W/2, so the chosen column width is 1000/3.
Both figures receive that width and their heights follow.

Alternatively, `basis={0} grow={2}` and `basis={0} grow={1}` explicitly divide
a 500px height budget into the needed 2:1 proportions. Those weights are a
decision by the author; they are not inferred from the aspects.

**Text** does not grow its font to occupy a height allocation. Exact height can
leave space around its normal-sized lines or report overflow if they do not fit.
Use **Fit** only when scaling the whole result is the goal.

## Alignment

Align controls horizontal position; justify controls vertical packing. Defaults
are start. A direct child's `align-self` overrides the stack's align, accepting
start, center, end, stretch, or 0–1. Omitted values use the parent's align.
Only stretching children receive the selected shared width, which can trigger
text reflow. Child containers' own align values continue to position their
contents. **VStack** does not accept baseline alignment, including via `align-self`.

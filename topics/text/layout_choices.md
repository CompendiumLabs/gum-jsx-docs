# Layout choices

Three identical-width rows show three explicit allocation policies. Each row
owns a definite width; its border makes unused space visible. Every rectangle
uses the row's known height, but only rows two and three opt into main-axis
growth.

| Row | Child props | Result |
| --- | --- | --- |
| Fixed bases | `width={px(60)}`, default `grow=0` | Two 60px rectangles, then unused space |
| Equal shares | `basis={0}`, `grow={1}` on both | Each gets half the space after the gap |
| Weighted shares | `basis={0}`, `grow={2}` and `grow={1}` | A 2:1 division after the gap |

A grow factor distributes extra space after bases, bounds, and gaps have been
accounted for. Zero bases make these examples simple ratios of the available
space; nonzero bases would be preserved before the extra space was added.

This is not automatic shape filling or composite aspect inference. The parent
supplies a budget and the direct children state their flex policy. For
aspect-sensitive vertical stacks, a known shared width is often clearer than
trying to derive it from a total height.

Try changing both grow factors in the last row to 1, or give one child a
`max_width` to see space redistribute after its limit is reached.

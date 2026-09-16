# Layout choices

*Category*: layout

Three identical-width rows show three explicit allocation policies. Each row
owns a definite width; its border makes unused space visible. Every rectangle
uses the row's known height, but only rows two and three opt into main-axis
growth.

**TextBox**, **TextCol**, and **TextFrame** pass the available width down through
the document. The row still sets its height and its children's flex policy explicitly.

| Row | Child props | Result |
| --- | --- | --- |
| Fixed bases | `width={px(60)}`, default `grow=0` | Two 60px rectangles, then unused space |
| Equal shares | `grow={1}` on both unsized children | Each gets half the space after the gap |
| Weighted shares | `grow={2}` and `grow={1}` on unsized children | A 2:1 division after the gap |

A grow factor distributes extra space after bases, bounds, and gaps have been
accounted for. Unsized growing children default to zero bases under the row's
finite budget, making these examples simple ratios of the available space.
Explicit dimensions or bases are preserved before surplus is added. Use
`basis="auto"` to start from content measurements; see [Growth bases](./stack_basis.md).

This is not automatic shape filling or composite aspect inference. The parent
supplies a budget and the direct children state their flex policy. For
aspect-sensitive vertical stacks, a known shared width is often clearer than
trying to derive it from a total height.

Try changing both grow factors in the last row to 1, or give one child a
`max-width` to see space redistribute after its limit is reached.

# Attach

*Category*: layout

Attach an **Element** outside one content child. Supply attachment and children;
side defaults to bottom. offset is a layout length (0); at selects a fractional
location on the content edge (0.5), and `child-anchor` selects the attachment's
own point along that edge (0.5).

| Property | Default | Meaning |
|---|---|---|
| `attachment` | — | **Element** placed outside the content frame |
| `side` | `"bottom"` | Content edge used for the attachment |
| `offset` | `0` | Distance between the content and attachment |
| `at` | `0.5` | Fractional position along the content edge |
| `child-anchor` | `0.5` | Attachment point aligned with `at` |

Both `at` and `child-anchor` are scalar numbers: 0 selects the start of the
edge, 0.5 its center, and 1 its end. For top/bottom attachments they act
horizontally; for left/right attachments they act vertically. For example,
`side="bottom" at={1} child-anchor={1}` aligns the caption's right edge
with the content's right edge.

The wrapper's own `anchor` still controls its placement in **Group**/**Graph**/**Overlay**,
independently of `child-anchor`. Use `child-anchor` in JSX and
`child_anchor` in host property objects.
This replaces the earlier `Attach.align` prop.

The main child determines the frame. The attachment reports ink/overflow
without reserving space. Use outer **Box** padding when needed; **Plot** measures and
reserves its own labels automatically.

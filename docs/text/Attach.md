# Attach

*Category*: layout

Attach an Element outside one content child. Supply attachment and children;
side defaults to bottom. offset is a layout length (0); at selects a fractional
location on the content edge (0.5), and attachment_anchor selects the attachment's
own point along that edge (0.5).

Both at and attachment_anchor are scalar numbers: 0 selects the start of the
edge, 0.5 its center, and 1 its end. For top/bottom attachments they act
horizontally; for left/right attachments they act vertically. For example,
`side="bottom" at={1} attachment-anchor={1}` aligns the caption's right edge
with the content's right edge.

The wrapper's own `anchor` still controls its placement in Group/Graph/Overlay,
independently of `attachment_anchor`. Use `attachment-anchor` or
`attachment_anchor` in JSX, and `attachment_anchor` in host property objects.
This replaces the earlier `Attach.align` prop.

The main child determines the frame. The attachment reports ink/overflow
without reserving space. Use outer Box padding when needed; Plot measures and
reserves its own labels automatically.

[Runnable source](../code/Attach.jsx).

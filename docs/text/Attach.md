# Attach

*Category*: layout

Attach an Element outside one content child. Supply attachment and children;
side defaults to bottom. offset is a layout length (0); at selects a fractional
location on the content edge (0.5), and align selects the attachment's own point
along that edge (0.5).

The main child determines the frame. The attachment reports ink/overflow
without reserving space. Use outer Box padding when needed; Plot measures and
reserves its own labels automatically.

[Runnable source](../code/Attach.jsx).

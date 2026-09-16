# Clipped and unclipped canvases
*Category*: layout

Both 180×100 canvases query the same immutable artwork. The left canvas retains
all paint; the right clips it to the canvas rectangle. Clipping changes visible
ink while the fragment tree still records the full positioned allocations and
overflow.

Use tree output with `--stats` to inspect reuse of the shared child fragments.
See [Group](../../elements/text/Group.md) for canvas clipping,
[Box clipping](./box_clip.md) for rounded borders, and
[Reusing fragments](./repeated.md) for explicit placement reuse.

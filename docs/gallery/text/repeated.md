---
category: api
description: "Use tree output with --stats to inspect allocations and layout queries."
---

# Reusing fragments
A custom parent queries one **Rect** description at two exact sizes. It places the
smaller fragment twice and the larger fragment once. Placing a completed fragment
does not run layout again; all three rectangles keep the same 3px stroke.

Use tree output with `--stats` to inspect allocations and layout queries. See
[Custom elements](../../guides/text/custom_elements.md) for the parent protocol and
[Rendering](../../guides/text/rendering.md) for the source-to-fragment pipeline.

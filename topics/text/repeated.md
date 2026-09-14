# Reusing fragments
*Category*: api

A custom parent queries one **Rect** description at two exact sizes. It places the
smaller fragment twice and the larger fragment once. Placing a completed fragment
does not run layout again; all three rectangles keep the same 3px stroke.

Use tree output with `--stats` to inspect allocations and layout queries. See
[Custom elements](./CustomElements.md) for the parent protocol and
[Rendering](./Rendering.md) for the source-to-fragment pipeline.

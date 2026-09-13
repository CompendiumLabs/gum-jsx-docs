# TextFigure

*Category*: text

A figure followed by an optional caption (string or Element). caption_style
styles generated text, gap defaults to 0.5em, and Box props control outer
decoration. Children must be figure Elements. Give a figure an em/px height;
the caption reflows at the shared column width.

Scoped caption_ props accept generated text options, including caption_color,
caption_font_size, and caption_wrap. They override matching fields in
caption_style. Supplied caption Elements retain their own props.

[Runnable source](../code/TextFigure.jsx).

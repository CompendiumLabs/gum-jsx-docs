# TitleBox

*Category*: text

TitleBox composes an optional title above text or figure children inside a Box.
title is a string or Element; title_style overrides default bold text.
Scoped title_ props accept text options, including title_color, title_font_size,
and title_wrap. They override matching fields in title_style. Supplied title
Elements retain their own props.
gap defaults to 0.6em, padding to 0.75em. TitleFrame adds a 1px border.
Other props follow [Box](./Box.md). Titles are measured content inside the box;
edge-attached title decoration is deferred.

[Runnable source](../code/TitleBox.jsx).

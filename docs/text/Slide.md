# Slide

*Category*: text

*Inherits*: [Group](/docs/Group) > [Element](/docs/Element)

Create a presentation slide with a title and some content. A slide is a fixed-aspect canvas (16:9 by default) holding a [TitleFrame](/docs/TitleFrame) that fills the canvas inside the margin. The content is a [TextCol](/docs/TextCol) of the children: strings, [Text](/docs/Text), [Bullets](/docs/Bullets), a [TextRow](/docs/TextRow) of columns, and any other `Element`s stack vertically with `gap` em between them.

Text size is set by `em`, the em as a fraction of the slide height, so `em={0.05}` fits twenty lines top to bottom and the content width in em follows from the frame. Without `em`, `width` is the content width in em and the size follows from that. Either way the column spans the content width, and a child's `scale` sizes it relative to the slide's em, so `<Text scale={2}>` is a heading twice the body size.

Content taller than the frame's area is handled by `overflow`: shrunk to fit (the default), clipped, or an error. The `overflow` property on the resulting element is the ratio of the content height to the area's, so a value above `1` means it did not fit. Both `margin` and `padding` are given as fractions of the slide height, so they are the same distance in every direction.

Parameters:
- `children` = `[]` — a list of strings or `Element`s to stack vertically
- `title` — the slide title, a string or `Element`
- `aspect` = `16/9` — the aspect ratio of the slide canvas; `'auto'` fits the canvas to the content
- `em` — the text size, as a fraction of the slide height
- `width` = `25` — the width of the content in ems, which sets the text size when `em` is not given
- `gap` = `0.5` — the space between content elements in em
- `overflow` = `'shrink'` — what to do with content taller than the frame: `shrink`, `clip`, or `error`
- `margin` = `0.05` — the space between the canvas edge and the frame
- `padding` = `0.1` — the space between the frame and the content
- `justify` = `'left'` — the horizontal justification of the text
- `valign` = `'center'` — the vertical alignment of the content when it does not fill the frame
- `align` = `'center'` — the horizontal alignment of the content when it is shrunk to fit
- `background` — the fill color of the whole canvas
- `border` = `1` — the frame border width
- `border-stroke` = `'#bbb'` — the frame border color
- `rounded` = `0.01` — the frame corner rounding
- `title-size` = `0.1` — the size of the title box relative to the frame height
- `fill` — the fill color of the frame

Subunits:
- `title` — the title element
- `text` — the text elements

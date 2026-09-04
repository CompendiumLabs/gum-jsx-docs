# Slide

*Category*: text

*Inherits*: [Box](/docs/Box) > [Group](/docs/Group) > [Element](/docs/Element)

Create a presentation slide with a title and some content. A slide is a fixed-aspect canvas (16:9 by default) holding a [TitleFrame](/docs/TitleFrame) that fills the canvas inside the margin. The content is a `TextStack` of the children: strings, [Text](/docs/Text), [Bullets](/docs/Bullets), and any other `Element`s are arrayed vertically and the given `width` is applied to the text elements.

Text size follows from `width`: the content fills the width of the frame, so one em is the content width divided by `width`. A child that sets its own `width` keeps it, and `scale` is the same thing said the other way round, so `<Text scale={2}>` makes a heading twice the size of the body text. If the content is too tall for the frame it is shrunk to fit the height instead. The `overflow` property on the resulting element gives the ratio of content height to available height, so a value above `1` means the content was shrunk.

Both `margin` and `padding` are given as fractions of the slide height, so they are the same distance in every direction.

Parameters:
- `children` = `[]` — a list of strings or `Element`s to array vertically
- `title` — the slide title, a string or `Element`
- `aspect` = `16/9` — the aspect ratio of the slide canvas
- `width` = `25` — the width of the content in ems, which sets the text size
- `margin` = `0.05` — the space between the canvas edge and the frame
- `padding` = `0.1` — the space between the frame and the content
- `spacing` = `0.05` — the spacing between content elements
- `justify` = `'left'` — the horizontal justification of the text
- `valign` = `'center'` — the vertical alignment of the content when it does not fill the frame
- `background` — the fill color of the whole canvas
- `border` = `1` — the frame border width
- `border-stroke` = `'#bbb'` — the frame border color
- `rounded` = `0.01` — the frame corner rounding
- `title-size` = `0.1` — the size of the title box relative to the frame height
- `fill` — the fill color of the frame

Subunits:
- `title` — the title element
- `text` — the text elements

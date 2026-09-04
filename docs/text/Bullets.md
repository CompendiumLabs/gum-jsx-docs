# Bullets

*Category*: text

*Inherits*: [VStack](/docs/Stack) > [Group](/docs/Group) > [Element](/docs/Element)

A bulleted list. Each child becomes an item: strings and [Text](/docs/Text) elements are wrapped to the list width minus the indent, with a marker placed in the indent level with the first line. A [Latex](/docs/Latex) equation, or anything else carrying em metrics, is placed at the text's size with a marker beside it; other elements span the item width as they are. A nested `Bullets` child becomes a sub-list, indented without a marker of its own.

All widths are in em, so text in a `Bullets` comes out the same size as a `Text` with the same `width`. This makes it fit naturally inside a [Slide](/docs/Slide), which sets `width` on all of its children.

Parameters:
- `children` — the list items: strings, `Text` elements, other elements, or nested `Bullets`
- `width` = `25` — the total width of the list in ems
- `scale` = `1` — the size of the list's text relative to the surrounding text's em; an item's own `scale` sizes that item, and its marker moves to stay level with its first line
- `marker` = `'•'` — the marker string or element placed beside each item
- `indent` = `1.5` — the width of the marker column in ems
- `gap` = `0.5` — the vertical space between items in ems
- `spacing` — the total stack spacing fraction; overrides `gap` when given
- `justify` = `'left'` — the horizontal justification of item text
- `font-family`/`font-weight`/`font-style` — font settings for the item text
- `text-*` — additional arguments forwarded to each item's `Text`

# Bullets

*Category*: text

*Inherits*: [Stack](/docs/Stack) > [Group](/docs/Group) > [Element](/docs/Element)

A bulleted list: a column of rows, each a marker in the indent beside its item, level with the item's first line. Strings and [Text](/docs/Text) elements are wrapped to the list width minus the indent. A [Latex](/docs/Latex) equation, or anything else carrying em metrics, keeps its size beside its marker; any other element takes the item width. A nested `Bullets` child becomes a sub-list, indented without a marker of its own.

All widths are in em, so text in a `Bullets` comes out the same size as a `Text` with the same `width`, and a list without a `width` of its own wraps to the width a column offers it. This makes it fit naturally inside a [Slide](/docs/Slide) or a [TextCol](/docs/TextCol).

Parameters:
- `children` — the list items: strings, `Text` elements, other elements, or nested `Bullets`
- `width` = `25` — the total width of the list in em, when nothing offers it one
- `scale` = `1` — the size of the list's text relative to the surrounding text's em; an item's own `scale` sizes that item, and its marker stays level with its first line
- `marker` = `'•'` — the marker string or element placed beside each item
- `indent` = `0.75` — the width of the marker column in em
- `gap` = `0.5` — the vertical space between items in em
- `justify` = `'left'` — the horizontal justification of item text
- `font-family`/`font-weight`/`font-style` — font settings for the item text
- `text-*` — additional arguments forwarded to each item's `Text`

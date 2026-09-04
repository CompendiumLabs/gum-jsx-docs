# MathBox

*Category*: math

*Inherits*: [Group](/docs/Group) > [Element](/docs/Element)

Wraps one item in a math box of its own, with padding, a fixed width, a chosen anchor, and an atom class for spacing. It is the bridge from ordinary gum elements into math. Any [Element](/docs/Element) dropped into a [MathText](/docs/MathText) is already an atom (a box as wide as its aspect and one em tall, centred on the baseline, classed as ordinary, so it butts up against its neighbors), and a **MathBox** is how to say what it should be instead: `klass="mbin"` makes a custom glyph space like `+`, `klass="mrel"` like `=`, which is how the gallery's Scenic Route arrow takes its place in a row. A math child works too, a LaTeX string or a math element, when it needs padding or a fixed width: `\boxed` and `\fbox` are a **MathBox** with a frame drawn around it, and a box with `width` and `justify` lines terms up in a column.

The box itself draws nothing. It keeps the child's own spacing classes unless `klass` overrides them, and places the child by its ink, so a child that overhangs its layout box (as `\rlap` does) still overhangs.

Parameters:
- `children` — the one item to box: a LaTeX string, a math element, or any ordinary `Element`
- `padding` = `0` — padding around the child in em, given as for [Box](/docs/Box): a scalar, `[horizontal, vertical]`, or `[left, top, right, bottom]`
- `width` — the width of the inner box in em; defaults to the child's own. In a wider box the child is placed by `justify`
- `justify` = `center` — where the child sits in a wider box: `left`, `center`, or `right`
- `anchor` — where the math axis crosses the box, measured down from its top in em; defaults to keeping the child where it was, so a smaller value hangs the box lower
- `klass` — the atom class the box takes in a row, one of `mord`, `mop`, `mbin`, `mrel`, `mopen`, `mclose`, `mpunct`, `minner`, or `none`; defaults to the child's own classes, `mord` for an ordinary element
- `style` = `text` — the TeX style a string child is parsed in

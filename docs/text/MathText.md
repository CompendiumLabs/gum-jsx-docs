# MathText

*Category*: math

*Inherits*: [HStack](/docs/HStack) > [Group](/docs/Group) > [Element](/docs/Element)

Arranges math items in a horizontal row with automatic inter-atom spacing. Strings and numbers are parsed as LaTeX (as in [Latex](/docs/Latex)), nested **MathText** is flattened, and ordinary gum [Element](/docs/Element) values can be mixed inline as well.

Spacing between neighbors is derived from their atom classes like `mord`, `mbin`, and `mrel`. An ordinary `Element` counts as an ordinary atom (`mord`) with no spacing of its own; wrap it in a [MathBox](/docs/MathBox) to give it padding or another class.

Parameters:
- `children` — math items, nested arrays of math items, or ordinary `Element`s
- `style` = `text` — TeX style used when parsing string and scalar children
- `strut` = `false` — reserve a minimum top-level math line box
- all usual stack layout parameters are also accepted

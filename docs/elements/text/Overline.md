---
category: math
description: "Draw a rule above a cramped math operand while keeping its baseline."
---

# Overline

Draw a rule above a cramped math operand while keeping its baseline. This is
the direct counterpart of `\overline{…}`.

| Property | Default | Meaning |
| --- | --- | --- |
| children | Empty | Overlined operand. |
| thickness | TeX rule thickness | Nonnegative line thickness. |
| fill | Inherited color | Optional rule paint. |

`thickness` defaults to the active style's TeX rule thickness. The rule spans
the body's advance, with a gap of three thicknesses and one extra thickness
above the line. `fill` changes only the rule; `color` changes the expression.
Zero thickness omits the rule and its padding. The result is an ordinary atom.

Use [Accent](Accent.md) with `accent="bar"` for a short fixed accent, or
[Underline](Underline.md) for a rule beneath the body.

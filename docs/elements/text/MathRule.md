---
category: math
description: "A filled horizontal rule centered on the math axis."
---

# MathRule

A filled horizontal rule centered on the math axis. Its default thickness is 0.04 em.

| Property | Default | Meaning |
| --- | --- | --- |
| width | `em(1)` | Rule length, using ordinary Gum sizing. |
| thickness | `em(0.04)` | Stroke thickness represented by a filled rectangle. |
| shift | Absent | When supplied, place the bottom this far above the baseline, instead of centering on the axis. |
| fill | Inherited color | Optional rule paint override. |

The parsed form is `\rule[shift]{width}{height}`. Its dimensions preserve TeX
units: point sizes remain fixed in scripts, while em/ex use the local text size.
Nonpositive TeX dimensions have no ink; negative width retains signed advance.
The parsed rule is an ordinary atom. A direct `MathRule` defaults to no atom
class and accepts `klass`, `left`, and `right` overrides.

Common font, color, and sizing properties follow [Gum units](../../guides/text/units.md).
Math preserves separate logical advance, outline ink, baseline, and math-axis guides.
See [math authoring](../../guides/text/math.md) for supported TeX and font setup.

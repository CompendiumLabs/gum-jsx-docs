# Frac

*Category*: math

A fraction with numerator and denominator styles, baseline shifts, and clearance around its rule. Generalized fractions can omit the rule or add delimiters.

| Property | Default | Meaning |
| --- | --- | --- |
| children | Required | Exactly two operands: numerator, then denominator. |
| has_bar | `true` | Draw the fraction rule; false uses no-bar clearance. |
| thickness | Style metric | Rule thickness as a Gum length, such as `px(2)` or `em(0.04)`. |
| continued | `false` | Reserve a continued-fraction numerator strut and omit right-side padding/delimiter. |
| padding | TeX null-delimiter space | Horizontal padding on sides without a delimiter. |
| left_delim / right_delim | Absent | Delimiters selected at the style's fraction delimiter height. |
| style / size_index | Inherited | Fraction style and optional TeX size index. |
| klass / left / right | `"mord"` | Classes exposed by the fraction. |

TeX supports `\frac`, `\dfrac`, `\tfrac`, `\cfrac`, binomials, infix
`\over`/`\atop`/`\choose`, and `\genfrac`. Generalized fractions preserve
bar thickness, delimiters, and style. Absolute TeX dimensions keep their size
in scripts; public Gum `em()` thickness uses the active math em.

The denominator is cramped. Without a bar, clearance is measured between the
two operands rather than reserving space around an invisible rule. See
[ordinary formulas](../../gallery/text/MathExpressions.md).

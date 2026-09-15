# Underline

*Category*: math

Draw a rule beneath a math operand. The operand keeps its baseline, and the
rule spans its advance. Strings parse as TeX; ordinary Gum elements also work.

| Property | Default | Meaning |
| --- | --- | --- |
| children | Empty | Underlined operand. |
| thickness | TeX rule thickness | Nonnegative line thickness. |
| fill | Inherited color | Optional rule paint. |

`thickness` defaults to the active style's TeX rule thickness. Three rule
thicknesses separate body and line; one more thickness follows the line.
`fill` overrides the rule color, while `color` applies to the whole expression.
Zero thickness omits the rule and its padding. Negative thickness is invalid.

The result is an ordinary atom, equivalent to `\underline{…}`. Use
[Overline](Overline.md) for a rule above the body, or
[Accent](Accent.md) for an under-arrow or tilde.

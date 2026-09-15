# RaiseBox

*Category*: math

Move an operand vertically relative to the surrounding baseline. `shift`
defaults to zero; positive lengths raise the operand and negative lengths
lower it. Strings parse as TeX. Use [TextMode](TextMode.md) for literal prose.

| Property | Default | Meaning |
| --- | --- | --- |
| children | Empty | Shifted operand. |
| shift | `0` | Vertical displacement; positive raises the operand. |

The body keeps its natural size and ink. Its baseline/axis guides change, so
math rows and surrounding prose account for its new position. The result is
an ordinary atom. TeX's `\raisebox{dimension}{text}` accepts a text body with
optional `$…$` math; explicit point dimensions retain their size in scripts.

Use [VCenter](VCenter.md) to center on the math axis or [Smash](Smash.md) to
suppress line extents.

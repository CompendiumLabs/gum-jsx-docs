# Pmb

*Category*: math

Poor-man's bold: draw the same operand twice, with the second copy offset by
0.02 em horizontally and 0.01 em downward. Advance, baseline, and logical
height remain unchanged; the extra ink is retained as overhang.

| Property | Default | Meaning |
| --- | --- | --- |
| children | Empty | Overprinted operand. |
| klass / left / right | `"mord"` | Atom classes of the completed box. |

Strings parse as TeX. The direct element is an ordinary atom unless `klass`
overrides it. Parsed `\pmb{…}` preserves a binary or relation argument's
classification. For actual bold font outlines, prefer `\mathbf`,
`\boldsymbol`, or the face controls on [TextMode](TextMode.md).

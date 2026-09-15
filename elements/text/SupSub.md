# SupSub

*Category*: math

Attach superscripts, subscripts, or operator limits to one math operand. Placement uses the base's character nucleus and italic correction.

| Property | Default | Meaning |
| --- | --- | --- |
| children | Empty | Base operand: an element or TeX source. |
| sup / sub | Absent | Superscript and subscript operands. |
| limits | Base policy | Override with `"auto"`, `"always"`, `"never"`, or a boolean. |
| style / size_index | Inherited | Base math style and optional TeX size index. |
| klass / left / right | Base classes | Reclassify the complete scripted atom. |

Superscripts inherit crampedness; subscripts are always cramped. Nesting reaches
script and then scriptscript size, where it stops shrinking. A subscript starts
at the base advance; a superscript also includes its italic correction.

[MathOp](MathOp.md) supplies the default limit policy. Explicit `\limits` and
`\nolimits` are preserved by the TeX adapter. See
[ordinary formulas](../../topics/text/MathExpressions.md) for complete examples.

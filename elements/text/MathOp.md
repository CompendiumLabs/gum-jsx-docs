# MathOp

*Category*: math

A named function or large operator. Symbols grow in display style; names stay upright on the baseline. Scripts read the operator's limit policy.

| Property | Default | Meaning |
| --- | --- | --- |
| text / children | Empty | A name, operator glyph, TeX symbol command, or a composed math operand. |
| symbol | Inferred | Select a Size font for a large operator rather than an upright name. |
| limits | Operator default | `"auto"` stacks limits in display style; `"always"` forces stacking; `"never"` keeps side scripts. Booleans mean always/never. |
| center | Symbol/body dependent | Center a glyph operator on the math axis. Named text stays on the baseline. |
| style / size_index | Inherited | Math style and optional TeX font-size index. |
| klass / left / right | `"mop"` | Atom classes exposed to the surrounding row. |

Sums and products default to automatic limits. Integrals default to side scripts;
`limits="always"` or TeX `\limits` overrides that in text and display styles.
Use [SupSub](SupSub.md) to attach limits or side scripts.

Operator logical height includes TeX's font metrics; its drawn ink remains
independent. This keeps limits clear of a summation sign and scripts near the
ends of an integral. See [math authoring](../../topics/text/Math.md).

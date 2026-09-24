# MathArray

*Category*: math

A naturally sized math table. Each column takes the widest cell advance, and
each row shares a baseline with enough height and depth for its tallest cells.
The complete table is an ordinary math atom centered on the math axis.

| Property | Default | Meaning |
| --- | --- | --- |
| children | Empty | Nested row arrays, or flat JSX cells chunked by `ncol`. Cells can be TeX strings, elements, or `null` for an empty cell. |
| ncol | Alignment count, or `1` | Number of columns when chunking flat children. |
| cols | Centered columns | A string such as `"r|c:l"`, or column descriptors. `l`, `c`, `r` align cells; `|` and `:` draw solid and dashed separators. |
| colsep | `em(0.5)` | Gap on each side of a column. Adjacent columns normally have twice this gap. |
| outer | `false` | Also apply column gaps at the left and right edges. |
| stretch | `1` | Positive multiplier for each row's 1.2-em minimum strut. Tall cells can enlarge it. |
| jot | `false` | Add `em(0.3)` of leading between rows, with none after the last. |
| rowgaps | Empty | Optional lengths after rows. Positive values deepen the row's minimum strut; negative values move the next row upward. |
| hlines | Empty | Rules at row boundaries, including before the first and after the last row. `false` is solid, `true` is dashed; multiple flags make multiple rules. |
| thickness | `em(0.04)` | Rule thickness. Zero omits the ink. |
| fill | Inherited color | Rule paint, independent of cell colors. |
| small | `false` | Default to script cells, half-height struts, and smallmatrix column spacing. |
| cell_style | Inherited, or `"script"` when small | Default math style for cells, independently of the table's style. Explicit styles within a cell still apply. |
| style / size_index | Inherited | Table math style and optional TeX size index. |
| klass / left / right | `"mord"` | Atom classes exposed by the complete table. |

Column descriptors use `{ type: "align", align: "l", pregap: em(0), postgap: em(1) }`
or `{ type: "separator", separator: "|" }`. Explicit pre/post gaps override
`colsep`; `outer` still controls whether the edge gaps apply. Adjacent vertical
rules have `em(0.2)` between their centerlines, and stacked horizontal rules
have `em(0.25)`. Horizontal and vertical rule ink meets at the corners without
changing column advances.

Use an empty `<MathText />` to reserve an empty cell in flat JSX. Whitespace and
conditional children in that form are skipped. Pass nested row arrays through
`children` when constructing **MathArray** in JavaScript; JSX flattens expression
arrays. Nested row data preserves cell
positions. Ragged rows are allowed. A zero-row table is empty; an explicit empty
row still reserves its strut.

Cells keep their natural size. Width offers do not wrap or shrink the table;
small exact allocations report overflow. For wrapping prose cells, give
[Text](Text.md) a width; give figures and plots explicit dimensions. Use
the [fit prop](../../guides/text/sizing.md#fitting) on the table when scaling is intended. A surrounding
[Bracket](Bracket.md) selects delimiters after measuring all cells and rules.

See [matrices and arrays](../../gallery/text/MathArrays.md) and
[aligned equations](../../gallery/text/AlignedMath.md) for TeX environments.

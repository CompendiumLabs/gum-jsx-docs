# Bracket

*Category*: math

An atom with left/right fences fitted to its complete body. Middle delimiters use the same measured extent and do not enlarge their own sizing target.

| Property | Default | Meaning |
| --- | --- | --- |
| children | Empty | Body elements or TeX source; with middle delimiters, one run per interval. |
| delim | `"round"` | Named pair: round, square, curly, or angle. |
| left_delim / right_delim | Named pair | Individual glyphs/commands; null omits a fence, while `"."` reserves TeX null-delimiter space. |
| middle | Absent | One delimiter string, or an array separating the body runs. |
| level | Automatic | Fixed level from `1` to `4`, corresponding to big through Bigg. |
| delimiter_height | Body extent | Fixed requested height as a Gum length; use this or level. |
| style / size_index | Inherited | Math style and optional TeX size index. |
| klass / left / right | `"minner"` | Classes exposed to the surrounding row. |

TeX `\left…\middle…\right` uses the same group measurement. Nested groups
measure independently. `\big`, `\Big`, `\bigg`, `\Bigg`, and their l/m/r
variants select fixed delimiter levels and the corresponding atom classes.

Missing glyphs in a Size font are skipped. Beyond the largest available glyph,
ordinary fences scale uniformly; vertical bars preserve their width. Extensible
piece assembly is not implemented. See [math authoring](../../topics/text/Math.md).

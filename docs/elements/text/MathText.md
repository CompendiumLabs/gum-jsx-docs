---
category: math
description: "Parse and space a sequence of TeX and math elements."
---

# MathText

A TeX-spaced source sequence. It parses string children, classifies atoms, cancels unary binary operators, and inserts the appropriate glue.
Use [MathChoice](MathChoice.md) for four style-dependent child branches.

| Property | Default | Meaning |
| --- | --- | --- |
| children | Empty | TeX source, math elements, or an array of both. |
| style | Inherited or `"text"` | Math style; script styles scale once and use tight spacing. |
| size_index | Inherited or `6` | TeX size declaration; selects its own text/script/scriptscript size table. |
| strut | `false` | Add a one-em minimum line box. |
| klass / left / right | Sequence edges | Overrides turn a nested sequence into a grouped atom. |
| macros | Empty | Local map from TeX command names to replacement strings. |
| warnings | `"error"` | KaTeX compatibility warnings: error, warn, or ignore. |
| on_error | `"throw"` | Throw a typed formula error, or render a visible diagnostic. |

Common font, color, and sizing properties follow [Gum units](../../guides/text/units.md).
Math preserves separate logical advance, outline ink, baseline, and math-axis guides.
See [math authoring](../../guides/text/math.md) for supported TeX and font setup.

# Accent

*Category*: math

Put a glyph or a width-fitting decoration over an operand. Strings parse as TeX;
elements, including ordinary Gum figures, keep their natural size.

| Property | Default | Meaning |
| --- | --- | --- |
| children | Empty | Accented operand. |
| accent | `"hat"` | Command name, with or without a leading backslash. |
| stretchy | Inferred from the name | Fit a drawn decoration to the body. |
| under | `false` | Place a stretchy decoration beneath the body. |
| shifty | `true` | Apply a single character's font skew. |
| mode | `"math"` | Symbol table for a fixed glyph; `"text"` supports text accents. |
| head-curve | `0.7` | Barb curvature from `0` to `1` for drawn arrow accents, including `vec`. |

Fixed accents include `hat`, `bar`, `vec`, `dot`, `ddot`, `acute`, `grave`,
`breve`, `check`, `tilde`, and `mathring`. Wide hats, checks, and tildes fit the
measured width, including a figure's width. Arrows, groups, and line segments
use the [MathStretch](MathStretch.md) names.

The body is cramped for an over-accent. A [SupSub](SupSub.md) around an accented
single character attaches its scripts to the original character; an accented
compound operand supplies its complete decorated box. Fixed accent overhang
does not enlarge advance. Stretchy accents can enlarge a narrow operand to
their minimum width. The result is an ordinary math atom.

See [math decorations](../../topics/text/MathDecorations.md).

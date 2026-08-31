# Accent

*Category*: math

*Inherits*: **MathGroup** > [Group](/docs/Group) > [Element](/docs/Element)

Sets an accent glyph over a base, as [Latex](/docs/Latex) does for `\hat{x}`, `\vec{v}`, `\bar{y}`, `\tilde{n}`, `\dot{q}` and the other accent commands. Scripts go on the accent rather than the base: `sup` and `sub` attach to the base character itself, so the accent does not lift them and `\hat{x}^2` sets its `2` where `x^2` does.

The accent is named by its LaTeX command in `label`. The wide accents (`\widehat`, `\widetilde`, `\widecheck`) use the same glyph as their narrow forms here; the stretchy arrow accents (`\overrightarrow` and friends) are drawn by [MathStretch](/docs/MathStretch) instead. Text-mode accents such as `\'`, `\"` and `\c` live in the text symbol table and need `mode="text"`.

Parameters:
- `children` — the base, a LaTeX string or a single math element
- `label` — the accent command, such as `\hat`, `\bar`, `\tilde`, `\vec`, `\dot`, `\ddot`, `\check`, `\breve`, `\acute`, or `\grave`
- `sup` / `sub` — scripts on the base, elements or LaTeX strings
- `style` = `text` — the math style of the base (`display`, `text`, `script`, or `scriptscript`)
- `mode` = `math` — the symbol table to look the accent up in, `math` or `text`
- `color` — the colour of the accent glyph

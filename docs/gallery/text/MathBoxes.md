# Math boxes and invisible layout

*Category*: math

Math keeps logical dimensions separate from drawing bounds. Phantom, smash,
and lap deliberately change one without changing the other.

| Command | Dimensions | Ink |
| --- | --- | --- |
| `\phantom{…}` | Keep width, height, and depth. | Hidden. |
| `\hphantom{…}` | Keep horizontal advance only. | Hidden. |
| `\vphantom{…}` | Keep height and depth only. | Hidden. |
| `\smash{…}` | Keep advance; suppress height and depth. | Retained. |
| `\smash[t]{…}` / `\smash[b]{…}` | Suppress only height / depth. | Retained. |
| `\mathrlap{…}` / `\mathllap{…}` / `\mathclap{…}` | Zero advance; retain height and depth. | Right of / left of / centered on the insertion point. |

The direct elements are [Phantom](../../elements/text/Phantom.md),
[Smash](../../elements/text/Smash.md), and [Lap](../../elements/text/Lap.md).
A lap has zero advance; a negative kern actually moves the next atom backward.
Physical boxes remain nonnegative even when a sequence's total advance is negative.
Nested explicit colors and backgrounds cannot make phantom ink reappear.

Suppressed dimensions stay suppressed when the expression is put in a math
row or prose line. Ink survives in the fragment's independent bounds. Give
an explicit SVG enough padding; its viewport still clips overhang. The
comparison script includes this ink when rasterizing, including leading laps.

## Frames, cancellation, and position

[Enclose](../../elements/text/Enclose.md) supplies frames, background colors,
diagonal cancellation, and strikeout. TeX supports `\boxed`, `\fbox`,
`\colorbox`, `\fcolorbox`, `\cancel`, `\bcancel`, `\xcancel`, and text-mode
`\sout`. Frames add padding and preserve the body's baseline. Cancellation
retains the original logical box and draws its lines over the body.

`\rule[shift]{width}{height}` draws a filled rectangle with its bottom at
`shift` above the baseline. Positive and negative shifts are supported; a
nonpositive width or height has no ink. Its direct counterpart is
[MathRule](../../elements/text/MathRule.md). TeX point dimensions keep their
size in script styles; TeX em/ex dimensions use the local text size.

[RaiseBox](../../elements/text/RaiseBox.md) changes an operand's position relative
to the baseline; [VCenter](../../elements/text/VCenter.md) centers it on the
math axis. `\hbox{…}` is a literal text box with optional `$…$` math, useful
inside `\raisebox` and `\vcenter`.

[Pmb](../../elements/text/Pmb.md) overprints an operand to simulate bold while
retaining its advance. Real bold font commands are covered in
[math fonts and macros](../../guides/text/math_fonts.md). Exotic `\phase`, `\angl`, and `\angln`
enclosures remain unsupported.

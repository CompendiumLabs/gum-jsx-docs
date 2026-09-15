# Smash

*Category*: math

Keep an operand's ink and advance while suppressing its logical height or
depth. The baseline stays aligned with the original operand's baseline.

| Property | Default | Meaning |
| --- | --- | --- |
| children | Empty | Visible operand. |
| top | `true` | Suppress height above the baseline. |
| bottom | `true` | Suppress depth below the baseline. |

`top={true}` suppresses height above the baseline; `bottom={true}` suppresses
depth below it. Both default to true. Use `bottom={false}` for `\smash[t]{…}`
and `top={false}` for `\smash[b]{…}`. Setting both false keeps the extents.

Smash is an ordinary atom. Its drawing remains in ink/overflow, so a surrounding
row does not regain the suppressed line height. Leave room in an explicit SVG
viewport for that overhang. [Phantom](Phantom.md) hides ink; [Lap](Lap.md) removes
horizontal advance. See [math boxes](../../topics/text/MathBoxes.md).

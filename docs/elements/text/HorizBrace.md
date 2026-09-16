# HorizBrace

*Category*: math

An overbrace or underbrace with an optional label. The body sets the brace
width; a wider label increases the complete box without stretching the brace.

| Property | Default | Meaning |
| --- | --- | --- |
| children | Empty | Braced operand; strings parse as TeX. |
| label | Absent | Element or TeX label, set in the corresponding script style. |
| over | `true` | Set `false` for an underbrace. |
| bracket | `false` | Use a square horizontal bracket. |
| thickness | Braces `em(0.1)`, brackets `em(0.12)` | Decoration thickness. |

The body uses display typography at the surrounding math size, including
display spacing, fractions, and operator limits inside a script.
There is a 0.1-em gap between body and brace and a 0.2-em gap before the label.
The completed expression is an inner atom. Color and opacity inherit.

TeX uses `\overbrace{…}^{label}` or `\underbrace{…}_{label}`. If both scripts
are present, the matching one labels the brace and the opposite one remains
a side script. In JSX, use `label` and wrap in [SupSub](SupSub.md) for any side
scripts. `\overbracket` and `\underbracket` work too.

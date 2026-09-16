# Enclose

*Category*: math

Frame, highlight, cancel, or strike through a math operand.

| Property | Default | Meaning |
| --- | --- | --- |
| children | Empty | TeX or an element. |
| notation | `"box"` | `"box"`, `"colorbox"`, `"cancel"`, `"bcancel"`, `"xcancel"`, or `"sout"`. |
| background | Absent | Background paint for box/colorbox. |
| border-color | Inherited color | Border or cancellation paint. |
| padding | `em(0.3)` | Space inside a box, in addition to its border. |
| thickness | TeX rule, or `em(0.046)` for cancellation | Border/line thickness. |

Boxes enlarge the logical dimensions and preserve the body's baseline with
padding. Cancellation and strikeout retain the original dimensions; their
lines draw over the body and can extend beyond it. A single-character cancel
extends vertically; a compound cancel extends horizontally. The result is an
ordinary atom.

TeX forms include `\boxed`, `\fbox`, `\colorbox`, `\fcolorbox`, `\cancel`,
`\bcancel`, `\xcancel`, and text-mode `\sout`. The text-box forms accept
math between `$…$`. `\phase`, `\angl`, and `\angln` remain unsupported.

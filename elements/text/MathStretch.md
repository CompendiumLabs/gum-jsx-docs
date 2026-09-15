# MathStretch

*Category*: math

A drawn horizontal decoration centered on the math axis. It is a relation atom
when used directly in [MathText](MathText.md).

| Property | Default | Meaning |
| --- | --- | --- |
| label | `"overbrace"` | Shape name; a leading backslash is optional. |
| width / height | Shape minimum / natural height | Ordinary Gum allocation lengths. |
| thickness | `em(0.04)`, braces `em(0.1)`, brackets `em(0.12)` | Thickness in the active math em. |

Names include `widehat`, `widecheck`, `widetilde`, `utilde`, `vec`,
`overbrace`/`underbrace`, `overbracket`/`underbracket`, `overgroup`/`undergroup`,
`overlinesegment`/`underlinesegment`, over/under left/right/bidirectional arrows,
`Overrightarrow`, and `overleftharpoon`/`overrightharpoon`.

The extensible-arrow names are `xrightarrow`, `xleftarrow`, `xleftrightarrow`,
`xRightarrow`, `xLeftarrow`, `xLeftrightarrow`, `xlongequal`,
`xtwoheadrightarrow`, `xtwoheadleftarrow`, `xhookrightarrow`, `xhookleftarrow`,
`xmapsto`, `xrightharpoonup`, `xrightharpoondown`, `xleftharpoonup`,
`xleftharpoondown`, `xrightleftharpoons`, `xleftrightharpoons`,
`xrightleftarrows`, `xtofrom`, `xrightequilibrium`, and `xleftequilibrium`.

Shapes retain their minimum form under a smaller allocation and report
overflow. Color and opacity inherit normally. Wide accents grow modestly in
height with width. Use [Accent](Accent.md), [HorizBrace](HorizBrace.md), or
[XArrow](XArrow.md) to position bodies and labels automatically.

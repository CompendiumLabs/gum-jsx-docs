---
category: math
description: "Reserve an operand's dimensions while hiding all its ink, including colored children, backgrounds, and cancellation marks."
---

# Phantom

Reserve an operand's dimensions while hiding all its ink, including colored
children, backgrounds, and cancellation marks.

| Property | Default | Meaning |
| --- | --- | --- |
| children | Empty | Hidden operand. |
| horizontal | `true` | Retain horizontal advance. |
| vertical | `true` | Retain height, depth, and baseline. |

`horizontal={true}` retains advance and `vertical={true}` retains height,
depth, and baseline. Both default to true. Set `vertical={false}` for an
`\hphantom`-like box or `horizontal={false}` for a `\vphantom`-like box.
Strings parse as TeX; ordinary Gum operands are accepted.

The parsed `\phantom{…}` preserves the surrounding sequence's atom spacing,
including binary cancellation across its edges. A phantom has no ink or child
overflow. Use [Smash](Smash.md) to retain ink while removing vertical extents,
or [Lap](Lap.md) to retain ink with zero advance.

---
category: math
description: "Center an operand's logical height on the math axis."
---

# VCenter

Center an operand's logical height on the math axis. It keeps the operand's
advance, size, and ink and supplies a corresponding baseline. The result is
an ordinary atom. Strings parse as TeX, and ordinary Gum elements work too.

| Property | Default | Meaning |
| --- | --- | --- |
| children | Empty | Operand to center. |
| klass / left / right | `"mord"` | Atom classes of the completed box. |

This is useful for an object whose own baseline should not determine its
position in a formula. TeX uses `\vcenter{\hbox{…}}`, with math inside `$…$`.
Use [RaiseBox](RaiseBox.md) for an explicit vertical shift.

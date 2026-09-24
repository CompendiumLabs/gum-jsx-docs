---
category: math
description: "Select one of four children according to the active math style, like TeX \\mathchoice."
---

# MathChoice

Select one of four children according to the active math style, like TeX
`\mathchoice`. Give children in display, text, script, and scriptscript order.

| Property | Default | Meaning |
| --- | --- | --- |
| children | Required | Exactly four math branches, one for each size style. |

The selected branch inherits the current style and participates in the
surrounding [MathText](MathText.md) sequence's spacing. Use **MathText** around
multiple elements in one branch. Use an empty `<MathText />` to keep an empty
branch's position in JSX.

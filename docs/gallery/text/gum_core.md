---
category: networks
description: "Gum JSX and TeX flow through a compact rendering core into SVG, PNG, and PDF."
---

# Gum Rendering Core

A circuit-board view of the bundled Gum CLI: Gum JSX, including TeX math,
flows into a compact rendering engine and out to SVG, PNG, and PDF.
The size callout describes the Gum 2.0 bundle: approximately 3 MB of code
and 1.6 MB of fonts.

[Stacks](../../guides/text/stack.md) arrange the title, diagram, footer,
and card contents. A [Group](../../elements/text/Group.md) supplies the local
circuit-board canvas. The chip dimensions determine its repeated pins, while
rounded [Arrow](../../elements/text/Arrow.md) routes connect the input and output
cards. The TeX card displays literal source in a monospace font, matching the
JSX input card.

The palette, output labels, chip geometry, and reusable card and trace components
are declared at the top of the example. The root's `fit` prop scales the complete
composition for smaller previews.

[View the source](../code/gum_core.jsx).

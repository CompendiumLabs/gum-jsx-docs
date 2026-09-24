---
category: text
description: "The tight-leading sample puts 28px glyphs in a 12px line box."
---

# Type, ink, and line boxes
Gray rectangles show allocated line boxes and blue rules show measured baselines.
The samples compare font weights, mixed font sizes on one baseline, tight line
height, preserved whitespace, and centered lines.

The tight-leading sample puts 28px glyphs in a 12px line box. Its ink may overflow
that allocation without shrinking the glyphs. The custom parent reads baseline
guides from completed fragments to draw the diagnostic rules.

See [Text](../../elements/text/Text.md) for line-height and whitespace options,
and the [typography card](./typography_card.md) for ordinary text composition.

---
category: text
description: "A text-focused card combines IBM Plex Sans and Mono, mixed weights, inline styles, baseline alignment, and a short preformatted block."
---

# Typography card

A text-focused card combines IBM Plex Sans and Mono, mixed weights, inline
styles, baseline alignment, and a short preformatted block. All faces come
from core's bundled font provider. No browser font stylesheet or rasterizer
font registration is needed.

The outer **Box** establishes the base font size and padding; descendant font
sizes and gaps use ems. **TextCol** passes its content width to the rows and text
blocks. **Span** changes selected runs inside a paragraph. A **TextRow** aligns
three text elements by their baselines and wraps them onto additional rows when
needed.

The code-style **TextBox** sets `text-whitespace="pre"` on its generated **Text**
child. Preserving spaces does not disable wrapping. The box supplies its
background, padding, and rounded corners; the child lays out the glyphs.

Try narrowing the host viewport to change paragraph wrapping. Prose keeps its
font size during reflow; a host-supplied maximum height may subsequently scale
the whole card to fit a bounded preview. SVG text is emitted as paths
with accessible labels, not as selectable native text.

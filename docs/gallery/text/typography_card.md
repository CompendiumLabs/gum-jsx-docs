# Typography card

*Category*: text

A text-focused card combines IBM Plex Sans and Mono, mixed weights, inline
styles, baseline alignment, and a short preformatted block. All faces come
from core's bundled font provider. No browser font stylesheet or rasterizer
font registration is needed.

The **Svg** establishes the base font size; descendant font sizes, gaps, and
padding use ems. The outer **TextBox** sets the text color and fills the available
width. **TextCol** passes its content width to rows and frames without repeated
width declarations. **Span** changes
only selected runs inside a paragraph. A separate **HStack** aligns three text
elements by their baselines even though their sizes and families differ.
Neither operation scales glyphs to fill available space.

The code-style block sets `whitespace="pre"` and `wrap={false}` independently:
preserving spaces does not disable wrapping on its own. Explicit spaces align
its columns because the block uses a monospaced font. Its **Frame** supplies the
background, border, and padding; **Text** is responsible only for glyph layout.

Try narrowing the **Svg** to change paragraph wrapping. The preformatted lines
will not wrap, so a sufficiently narrow card will overflow; that behavior is
intentional and visible in the layout diagnostics. SVG text is emitted as paths
with accessible labels, not as selectable native text.

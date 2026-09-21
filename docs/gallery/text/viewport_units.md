# Viewport units

*Category*: text

An explicit `viewport={{ width: 800, height: 600 }}` supplies a reference canvas
in pixels before the root font is resolved. `font-size={vh(4)}` therefore sets a
24px base font, with headings and captions using ordinary `em()` multiples.
`vw(3)` gives the card 24px padding, and `vh(2)` gives its stack a 12px gap.

The reference canvas is independent of the output size. This **Svg** has only
maximum dimensions, so it hugs its content and scales the complete drawing down
if necessary. Changing the reference height changes the type scale; changing a
maximum changes the available layout space and fitting. Try adjusting `canvas`
at the top of the example.

`vw(n)` and `vh(n)` mean n percent of the reference width and height. Their values
stay the same through nested containers. Numeric fractions keep using their
ordinary local references. Viewport units work anywhere a length is accepted,
including font sizes, padding, gaps, positions, shape geometry, and math spacing.
The explicit dimensions of **Svg** itself still require `px()`.

Without an explicit reference canvas, definite root **Svg** dimensions supply the
references, including exact host allocations, equal minimum/maximum limits, and
an axis established by `aspect`. A maximum alone, an advisory offer, or a measured
content size does not supply a reference. A missing axis reports an error when a
nonzero unit needs it; `vw(0)` and `vh(0)` need no reference.

`viewport` is a document-root prop and is inherited unchanged through the layout,
including nested **Svg** elements. Hosts can also pass `viewport` to
`layout_element` or `render_element`, or through the context argument to
`LayoutPass.layout`. Each axis uses the authored reference first, then an
independently established root dimension, then the host canvas. Hosts can force
reference dimensions through `overrides: { viewport: { width, height } }` on
`layout_element` or `render_element`.

Gum Studio supplies its canvas dimensions this way. On a 640×480 canvas, a
top-level `font-size={vh(4)}` gives a 19.2px font when the source leaves the
reference height unspecified. Output can still hug its content and fit within
maximum bounds.

See [Units](./Units.md) and [Svg](../../elements/text/Svg.md).

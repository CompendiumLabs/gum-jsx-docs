// Both columns query the same Text description; only the offered width changes.
class Paragraphs extends Element {
  static layout(props, query) {
    const width = query.request.width.kind === 'natural' ? 768 : query.request.width.value
    const inner = maximum(0, width - 48)
    const columns = width >= 600
    const reference = make_size(width, 0)
    const [title, subtitle, wide_label, narrow_label, paragraph] = element_children(props.children)
    const widths = columns ? [(inner - 32) * 0.6, (inner - 32) * 0.4] : [inner, inner * 0.7]
    const children = [], frames = []
    let y = 24
    for (const [index, element] of [title, subtitle].entries()) {
      const fragment = query.child(element, make_request({ width: exact(inner) }), reference, index)
      children.push(place_fragment(fragment, make_point(24, y)))
      y += fragment.size.height + 16
    }
    const top = y
    let bottom = y
    for (const [index, label] of [wide_label, narrow_label].entries()) {
      const x = columns && index ? 24 + widths[0] + 32 : 24
      const request = make_request({ width: exact(widths[index]) })
      const heading = query.child(label, request, reference, index + 2)
      const fragment = query.child(paragraph, request, reference, 4)
      children.push(place_fragment(heading, make_point(x, y)))
      const bodyY = y + heading.size.height + 12
      frames.push(draw_rect(make_rect(x, bodyY, fragment.size.width, fragment.size.height),
        { fill: white, stroke: gray, stroke_width: 1 }))
      children.push(place_fragment(fragment, make_point(x, bodyY)))
      bottom = maximum(bottom, bodyY + fragment.size.height)
      y = columns ? top : bottom + 24
    }
    const size = finish_size(make_size(width, bottom + 24), query.request, query.sizing)
    return make_fragment({ size, draw: frames, children })
  }
}

return <Paragraphs color={slate}>
  <Text font-size={em(1.75)} font-weight={bold}>One paragraph, two widths</Text>
  <Text font-size={em(0.875)} color={slate}>Same source and prepared glyphs. Both columns use an 18px font.</Text>
  <Text font-size={em(0.8125)} font-weight={bold} color={blue}>Wider allocation</Text>
  <Text font-size={em(0.8125)} font-weight={bold} color={blue}>Narrower allocation</Text>
  <Text font-size={em(1.125)} line-height={em(1.45)}>
    {'A paragraph now answers a width offer with '}
    <Span font-weight={bold}>real glyph measurements.</Span>
    {' The words reflow, while the font size stays at 18 pixels. '}
    <Span font-style="italic" color={blue}>Styled runs share the same baseline,</Span>
    {' and the prepared text is reused for each allocation.'}
  </Text>
</Paragraphs>

// A custom parent reuses one fragment at two positions and lays out a larger copy.
class Repeated extends Element {
  static layout(props, query) {
    const width = query.request.width.kind === 'natural' ? 432 : query.request.width.value
    const size = finish_size(make_size(width, width / 3), query.request, query.sizing)
    const [tile] = element_children(props.children)
    const unit = size.width / 27
    const small = query.child(tile, make_request({ width: exact(6 * unit), height: exact(4 * unit) }), size)
    const large = query.child(tile, make_request({ width: exact(9 * unit), height: exact(6 * unit) }), size)

    // Two placements share one result; the larger rectangle is a second layout.
    return make_fragment({ size, children: [
      place_fragment(small, make_point(unit, 1.5 * unit)),
      place_fragment(small, make_point(8.5 * unit, 1.5 * unit)),
      place_fragment(large, make_point(16.5 * unit, 1.5 * unit)),
    ] })
  }
}

return <Repeated>
  <Rect fill={blue} stroke={slate} stroke-width={px(3)} />
</Repeated>

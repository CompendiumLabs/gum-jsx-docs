// A custom parent reuses one fragment at two positions and lays out a larger copy.
class Repeated extends Element {
  static layout(props, query) {
    const size = finish_size(make_size(432, 144), query.request, query.sizing)
    const [tile] = element_children(props.children)
    const small = query.child(tile, make_request({ width: exact(96), height: exact(64) }), size)
    const large = query.child(tile, make_request({ width: exact(144), height: exact(96) }), size)

    // Two placements share one result; the larger rectangle is a second layout.
    return make_fragment({ size, children: [
      place_fragment(small, make_point(16, 24)),
      place_fragment(small, make_point(136, 24)),
      place_fragment(large, make_point(264, 24)),
    ] })
  }
}

return <Repeated>
  <Rect fill={blue} stroke={slate} stroke-width={px(3)} />
</Repeated>

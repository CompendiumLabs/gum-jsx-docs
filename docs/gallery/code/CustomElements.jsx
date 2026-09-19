// A custom meter resolves its allocated size and emits two local pixel rectangles.
class Meter extends Element {
  static defaults = { height: px(16), value: 0, fill: blue }

  static normalize({ value = 0, ...props }) {
    if (element_children(props.children).length)
      throw new TypeError("Meter has no children")
    if (!isFinite(value))
      throw new TypeError("Meter value must be finite")
    return { ...props, value: clamp(value) }
  }

  static layout(props, query) {
    const size = shape_size(query.request, query.sizing)
    const { value } = props
    const paint = (fill) => ({ fill, stroke: none, stroke_width: 0 })
    return make_fragment({
      size,
      label: `${round(value * 100)} percent`,
      draw: [
        draw_rect(make_rect(0, 0, size.width, size.height), paint(gray)),
        draw_rect(
          make_rect(0, 0, size.width * value, size.height),
          paint(query.style.fill),
        ),
      ],
    })
  }
}

class CompactMeter extends Meter {
  static defaults = { height: px(10), fill: green }
}

return (
  <Box padding={em(1.5)} background={lightgray}>
    <VStack width="fill" gap={em(0.75)}>
      <Text font-size={em(1.375)} font-weight={bold}>A custom leaf</Text>
      {[0.25, 0.6, 0.9].map((value) => (
        <HStack gap={em(0.75)} align="center">
          <Meter grow={1} shrink={1} value={value} />
          <Text>{round(value * 100)}%</Text>
        </HStack>
      ))}
      <HStack gap={em(0.75)} align="center">
        <CompactMeter grow={1} shrink={1} value={0.7} />
        <Text grow={1}>Inherited layout and normalization</Text>
      </HStack>
    </VStack>
  </Box>
)

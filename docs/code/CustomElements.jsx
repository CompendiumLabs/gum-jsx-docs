// A custom meter resolves its allocated size and emits two local pixel rectangles.
const Meter = define_element(
  "Meter",
  (props, query) => {
    if (element_children(props.children).length)
      throw new TypeError("Meter has no children");
    if (!isFinite(props.value))
      throw new TypeError("Meter value must be finite");
    const size = shape_size(query.request, query.sizing);
    const value = clamp(props.value);
    const paint = (fill) => ({ fill, stroke: none, stroke_width: 0 });
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
    });
  },
  { width: px(240), height: px(16), value: 0, fill: blue },
);

return (
  <Svg>
    <Box padding={px(24)} background={lightgray}>
      <VStack gap={px(12)}>
        <Text font_size={px(22)} font_weight={bold}>A custom leaf</Text>
        {[0.25, 0.6, 0.9].map((value) => (
          <HStack gap={px(12)} align="center">
            <Meter value={value} />
            <Text>{round(value * 100)}%</Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  </Svg>
);

// The two bundled families provide light, regular, and bold faces without host setup.
const Family = ({ name, color }) => (
  <VStack gap={px(10)} font_family={name} color={color}>
    <Text font_size={px(14)}>{name}</Text>
    {[300, 400, 700].map(weight => (
      <Text font_size={px(22)} font_weight={weight}>{weight} — Aa Bb 0123</Text>
    ))}
    <Text font_size={px(22)} font_style="italic">Italic request</Text>
  </VStack>
);
return (
  <Svg>
    <Box padding={px(24)} background="#f7f8fa">
      <HStack gap={px(36)}>
        <Family name="IBM Plex Sans" color="#24594e" />
        <Family name="IBM Plex Mono" color="#3e5f8a" />
      </HStack>
    </Box>
  </Svg>
);

// The two bundled families provide light, regular, and bold faces without host setup.
const Family = ({ name, color }) => (
  <VStack gap={px(10)} font_family={name} color={color}>
    <Text font_size={px(14)}>{name}</Text>
    {[light, regular, bold].map(weight => (
      <Text font_size={px(22)} font_weight={weight}>{weight} — Aa Bb 0123</Text>
    ))}
    <Text font_size={px(22)} font_style="italic">Italic request</Text>
  </VStack>
);
return (
  <Svg>
    <Box padding={px(24)} background={lightgray}>
      <HStack gap={px(36)}>
        <Family name={sans} color={blue} />
        <Family name={mono} color={red} />
      </HStack>
    </Box>
  </Svg>
);

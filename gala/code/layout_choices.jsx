// A known row width supports fixed bases, equal flexible shares, or weighted shares.
const Band = ({ title, children }) => (
  <VStack width={1} gap={px(8)}>
    <Text font_weight={700}>{title}</Text>
    <Frame width={1} height={px(82)} padding={px(12)} border_color="#ccd7df" background="white">
      <HStack width={1} height={1} gap={px(12)}>{children}</HStack>
    </Frame>
  </VStack>
);
return (
  <Svg width={px(680)}>
    <Box width={1} padding={px(28)} background="#f7f8fa" color="#24364b">
      <VStack width={1} gap={px(20)}>
        <Text font_family="IBM Plex Mono" font_size={px(14)} color="#2c7567">ALLOCATION / 05</Text>
        <Text font_size={px(30)} font_weight={700}>Allocation is a choice</Text>
        <Band title="Fixed bases: two 60px children">
          <Rect width={px(60)} height={1} fill="#2c7567" stroke="none" />
          <Rect width={px(60)} height={1} fill="#486d9c" stroke="none" />
        </Band>
        <Band title="Zero bases, equal growth: 1 + 1">
          <Rect basis={0} grow={1} height={1} fill="#2c7567" stroke="none" />
          <Rect basis={0} grow={1} height={1} fill="#486d9c" stroke="none" />
        </Band>
        <Band title="Zero bases, weighted growth: 2 + 1">
          <Rect basis={0} grow={2} height={1} fill="#2c7567" stroke="none" />
          <Rect basis={0} grow={1} height={1} fill="#486d9c" stroke="none" />
        </Band>
        <Text font_size={px(14)} color="#607184">The row owns the width. Its direct children state how to use it.</Text>
      </VStack>
    </Box>
  </Svg>
);

// A known row width supports fixed bases, equal flexible shares, or weighted shares.
const Band = ({ title, children }) => (
  <VStack width={1} gap={em(0.5)}>
    <Text font-weight={bold}>{title}</Text>
    <Frame
      width={1}
      height={px(82)}
      padding={em(0.75)}
      border-color={gray}
      background={white}
    >
      <HStack width={1} height={1} gap={em(0.75)}>
        {children}
      </HStack>
    </Frame>
  </VStack>
)
return (
  <Svg width={px(680)} font-size={px(16)}>
    <Box width={1} padding={em(1.75)} background={lightgray} color={slate}>
      <VStack width={1} gap={em(1.25)}>
        <Text font-family={mono} font-size={em(0.875)} color={blue}>ALLOCATION / 05</Text>
        <Text font-size={em(1.875)} font-weight={bold}>Allocation is a choice</Text>
        <Band title="Fixed bases: two 60px children">
          <Rect width={px(60)} fill={blue} stroke={none} />
          <Rect width={px(60)} fill={red} stroke={none} />
        </Band>
        <Band title="Zero bases, equal growth: 1 + 1">
          <Rect basis={0} grow={1} fill={blue} stroke={none} />
          <Rect basis={0} grow={1} fill={red} stroke={none} />
        </Band>
        <Band title="Zero bases, weighted growth: 2 + 1">
          <Rect basis={0} grow={2} fill={blue} stroke={none} />
          <Rect basis={0} grow={1} fill={red} stroke={none} />
        </Band>
        <Text font-size={em(0.875)} color={slate}>The row owns the width. Its direct children state how to use it.</Text>
      </VStack>
    </Box>
  </Svg>
)

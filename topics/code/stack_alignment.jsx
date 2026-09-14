// Rows align their children's first baselines; children without guides use their
// bottom edge. The last row instead stretches every allocation to the text height.
<Svg width={px(540)} color={slate} font-size={px(16)}>
  <Box width={1} padding={em(1.25)}>
    <VStack width={1} gap={em(1.375)}>
      <VStack width={1} gap={em(0.5)}>
        <Text font-size={em(0.8125)} color={slate}>BASELINES / independent font sizes</Text>
        <HStack gap={em(0.875)} align="baseline">
          <Text font-size={em(1)}>Small</Text>
          <Text font-size={em(2)} font-weight={bold}>Large</Text>
          <Text font-size={em(1.375)} font-style="italic" color={blue}>Aligned</Text>
          <Square width={px(26)} fill={red} stroke={none} />
        </HStack>
      </VStack>
      <VStack width={1} gap={em(0.5)}>
        <Text font-size={em(0.8125)} color={slate}>PACKING / equal space between fixed items</Text>
        <HStack width={1} justify="space_between" align="center">
          <Circle width={px(28)} fill={blue} stroke={none} />
          <Text>Space between</Text>
          <Square width={px(28)} fill={red} stroke={none} />
        </HStack>
      </VStack>
      <VStack width={1} gap={em(0.5)}>
        <Text font-size={em(0.8125)} color={slate}>STRETCH / the reflowed text sets the height</Text>
        <HStack gap={em(0.875)} align="stretch">
          <Box width={px(8)} background={blue} radius={px(4)} />
          <Text grow={1} shrink={1} line-height={em(1.4)}>
            The blue bar stretches to the height of this paragraph after its width is allocated. Resize the SVG and both follow the words onto new lines.
          </Text>
        </HStack>
      </VStack>
    </VStack>
  </Box>
</Svg>

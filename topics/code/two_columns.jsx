// Equal flexible columns give a figure and a wrapping explanation the same allocation.
<Svg width={px(720)}>
  <Box width={1} padding={px(28)} background={lightgray} color={slate}>
    <VStack width={1} gap={px(20)}>
      <Text font-family={mono} font-size={px(14)} color={blue}>LAYOUT / 01</Text>
      <Text font-size={px(30)} font-weight={bold}>A figure beside its explanation</Text>
      <HStack gap={px(24)}>
        <Frame
          basis={0}
          grow={1}
          padding={px(20)}
          radius={px(12)}
          border-color={gray}
          background={white}
        >
          <VStack width={1} gap={px(16)}>
            <Text font-size={px(14)} font-weight={bold}>ONE SHARED WIDTH</Text>
            <HStack width={1} height={px(160)} gap={px(12)} align="end">
              <Rect
                basis={0}
                grow={1}
                height={px(64)}
                fill={blue}
                stroke={none}
              />
              <Rect
                basis={0}
                grow={1}
                height={px(112)}
                fill={red}
                stroke={none}
              />
              <Rect
                basis={0}
                grow={1}
                height={px(160)}
                fill={green}
                stroke={none}
              />
            </HStack>
            <Text font-size={px(14)} color={slate}>Fixed heights, flexible widths.</Text>
          </VStack>
        </Frame>
        <VStack basis={0} grow={1} gap={px(14)}>
          <Text font-size={px(24)} font-weight={bold}>Two columns, one allocation</Text>
          <Text font-size={px(18)} line-height={em(1.4)}>Both columns start with a zero basis and grow equally into the remaining row width.</Text>
          <Text font-size={px(18)} line-height={em(1.4)}>The paragraph reflows. The bars keep their heights. Nothing needs to infer a combined aspect ratio.</Text>
          <Text font-size={px(14)} color={blue}>Change the canvas width and render again.</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
</Svg>

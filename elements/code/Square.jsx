// Square preserves square geometry inside a nonsquare allocation; Rect fills it.
<Svg font-size={px(16)}>
  <Box padding={em(1.25)} background={lightgray}>
    <HStack gap={em(1.25)}>
      <VStack gap={em(0.5)}>
        <Text>Square</Text>
        <Frame padding={em(0.5)} border-color={darkgray}>
          <Square width={px(160)} height={px(80)} fill={blue} stroke={none} />
        </Frame>
      </VStack>
      <VStack gap={em(0.5)}>
        <Text>Rect, aspect = 1</Text>
        <Frame padding={em(0.5)} border-color={darkgray}>
          <Rect
            width={px(160)}
            height={px(80)}
            aspect={1}
            fill={red}
            stroke={none}
          />
        </Frame>
      </VStack>
    </HStack>
  </Box>
</Svg>

// Square preserves square geometry inside a nonsquare allocation; Rect fills it.
<Svg>
  <Box padding={px(20)} background={lightgray}>
    <HStack gap={px(20)}>
      <VStack gap={px(8)}>
        <Text>Square</Text>
        <Frame padding={px(8)} border-color={darkgray}>
          <Square width={px(160)} height={px(80)} fill={blue} stroke={none} />
        </Frame>
      </VStack>
      <VStack gap={px(8)}>
        <Text>Rect, aspect = 1</Text>
        <Frame padding={px(8)} border-color={darkgray}>
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

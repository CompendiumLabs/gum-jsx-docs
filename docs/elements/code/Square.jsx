// Square preserves square geometry inside a nonsquare allocation; Rect fills it.
<Box padding={em(1.25)} background={lightgray}>
  <HStack gap={em(1.25)}>
    <VStack grow={1} gap={em(0.5)}>
      <Text>Square</Text>
      <Frame padding={em(0.5)} border-color={darkgray}>
        <Square aspect={2} fill={blue} stroke={none} />
      </Frame>
    </VStack>
    <VStack grow={1} gap={em(0.5)}>
      <Text>Rect</Text>
      <Frame padding={em(0.5)} border-color={darkgray}>
        <Rect
          aspect={2}
          fill={red}
          stroke={none}
        />
      </Frame>
    </VStack>
  </HStack>
</Box>

// Circle centers its geometry in an allocation; center and radius can be overridden.
<Box padding={em(1.25)} background={lightgray}>
  <HStack gap={em(1)}>
    <Circle width={px(80)} fill={blue} stroke={none} />
    <Frame padding={em(0.5)} border-color={darkgray}>
      <Circle width={px(160)} height={px(80)} fill={red} stroke={none} />
    </Frame>
    <Frame padding={em(0.5)} border-color={darkgray}>
      <Circle
        width={px(160)}
        height={px(80)}
        center={[0.25, 0.5]}
        radius={px(28)}
        fill={green}
        stroke={none}
      />
    </Frame>
  </HStack>
</Box>

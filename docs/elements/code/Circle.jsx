// Circle centers its geometry in an allocation; center and radius can be overridden.
<Box padding={em(1.25)} background={lightgray}>
  <HStack gap={em(1)}>
    <Circle grow={1} fill={blue} stroke={none} />
    <Frame grow={2} padding={em(0.5)} border-color={darkgray}>
      <Circle aspect={2} fill={red} stroke={none} />
    </Frame>
    <Frame grow={2} padding={em(0.5)} border-color={darkgray}>
      <Circle
        aspect={2}
        center={[0.25, 0.5]}
        radius={0.3}
        fill={green}
        stroke={none}
      />
    </Frame>
  </HStack>
</Box>

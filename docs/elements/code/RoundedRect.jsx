// Default rounding, fixed-radius corners, and a pill use the same rectangle primitive.
<Box padding={em(1.25)} background={lightgray}>
  <HStack gap={em(1)}>
    <RoundedRect grow={1} aspect={2} fill={blue} stroke={none} />
    <RoundedRect
      grow={1}
      aspect={2}
      border-radius={px(16)}
      fill={red}
      stroke={none}
    />
    <RoundedRect
      grow={1}
      aspect={2}
      border-radius={px(32)}
      fill={green}
      stroke={none}
    />
  </HStack>
</Box>

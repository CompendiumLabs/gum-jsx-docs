// Default rounding, fixed-radius corners, and a pill use the same rectangle primitive.
<Box padding={em(1.25)} background={lightgray}>
  <HStack gap={em(1)}>
    <RoundedRect width={px(120)} height={px(64)} fill={blue} stroke={none} />
    <RoundedRect
      width={px(120)}
      height={px(64)}
      radius={px(16)}
      fill={red}
      stroke={none}
    />
    <RoundedRect
      width={px(120)}
      height={px(64)}
      radius={px(32)}
      fill={green}
      stroke={none}
    />
  </HStack>
</Box>

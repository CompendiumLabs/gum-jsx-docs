// Default rounding, fixed-radius corners, and a pill use the same rectangle primitive.
<Svg>
  <Box padding={px(20)} background={lightgray}>
    <HStack gap={px(16)}>
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
</Svg>

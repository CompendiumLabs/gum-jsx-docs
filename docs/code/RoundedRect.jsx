// Default rounding, fixed-radius corners, and a pill use the same rectangle primitive.
<Svg>
  <Box padding={px(20)} background="#f7f8fa">
    <HStack gap={px(16)}>
      <RoundedRect width={px(120)} height={px(64)} fill="#2c7567" stroke="none" />
      <RoundedRect width={px(120)} height={px(64)} radius={px(16)} fill="#486d9c" stroke="none" />
      <RoundedRect width={px(120)} height={px(64)} radius={px(32)} fill="#bb6748" stroke="none" />
    </HStack>
  </Box>
</Svg>

// Circle centers its geometry in an allocation; center and radius can be overridden.
<Svg>
  <Box padding={px(20)} background="#f7f8fa">
    <HStack gap={px(16)}>
      <Circle width={px(80)} fill="#2c7567" stroke="none" />
      <Frame padding={px(8)} border_color="#a9b7c4">
        <Circle width={px(160)} height={px(80)} fill="#486d9c" stroke="none" />
      </Frame>
      <Frame padding={px(8)} border_color="#a9b7c4">
        <Circle width={px(160)} height={px(80)} center={{ x: 0.25, y: 0.5 }}
          radius={px(28)} fill="#bb6748" stroke="none" />
      </Frame>
    </HStack>
  </Box>
</Svg>

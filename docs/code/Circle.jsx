// Circle centers its geometry in an allocation; center and radius can be overridden.
<Svg>
  <Box padding={px(20)} background={lightgray}>
    <HStack gap={px(16)}>
      <Circle width={px(80)} fill={blue} stroke={none} />
      <Frame padding={px(8)} border_color={darkgray}>
        <Circle width={px(160)} height={px(80)} fill={red} stroke={none} />
      </Frame>
      <Frame padding={px(8)} border_color={darkgray}>
        <Circle width={px(160)} height={px(80)} center={{ x: 0.25, y: 0.5 }}
          radius={px(28)} fill={green} stroke={none} />
      </Frame>
    </HStack>
  </Box>
</Svg>

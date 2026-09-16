// A small embedded PNG resized proportionally and centered in a square frame.
const data = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAAGklEQVR4XmP4zwBEIMjwHwggbBBqYAACkBAAKooSbzGPaPkAAAAASUVORK5CYII='

return (
  <Svg background={white}>
    <Box padding={px(16)}>
      <HStack gap={px(24)}>
        <PngImage data={data} width={px(160)} />
        <Box border_color={gray} border_width={px(1)} background={lightgray}>
          <PngImage data={data} width={px(160)} height={px(160)} opacity={0.7} />
        </Box>
      </HStack>
    </Box>
  </Svg>
)

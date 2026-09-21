// A small embedded PNG resized proportionally and centered in a square frame.
const data = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAAGklEQVR4XmP4zwBEIMjwHwggbBBqYAACkBAAKooSbzGPaPkAAAAASUVORK5CYII='

return (
  <Box background={white} padding={em(1)}>
    <HStack gap={em(1.5)}>
      <PngImage data={data} grow={1} />
      <Box grow={1} border-color={gray} border-width={px(1)} background={lightgray}>
        <PngImage data={data} width="fill" aspect={1} opacity={0.7} />
      </Box>
    </HStack>
  </Box>
)

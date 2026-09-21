// A reference canvas sets the type scale while maximum bounds let the figure hug its content.
const canvas = { width: 800, height: 600 }
return <Svg viewport={canvas} font-size={vh(4)}>
  <Box padding={vw(3)} background={white} color={slate}>
    <VStack gap={vh(2)} align="fill">
      <Text font-family={mono} font-size={em(0.6)} color={blue}>FIELD NOTES / 01</Text>
      <Text font-size={em(1.75)} font-weight={bold} line-height={em(1.1)}>Viewport type</Text>
      <Text max-width={vw(64)} line-height={em(1.4)}>
        Set the base font from the canvas height. Headings, captions, and body text share that scale through em units.
      </Text>
      <HStack gap={em(0.5)} align="baseline">
        <Text font-size={em(2)} font-weight={bold} color={blue}>{canvas.height * 0.04}</Text>
        <Text font-size={em(0.75)}>px body text</Text>
      </HStack>
      <HStack wrap gap={vw(2)} line-gap={vh(1)}>
        <Rect width={vw(25)} height={vh(1)} fill={blue} stroke={none} />
        <Rect width={vw(15)} height={vh(1)} fill={green} stroke={none} />
      </HStack>
      <Text font-family={mono} font-size={em(0.6)} color={darkgray}>
        {`${canvas.width} × ${canvas.height} reference canvas`}
      </Text>
    </VStack>
  </Box>
</Svg>

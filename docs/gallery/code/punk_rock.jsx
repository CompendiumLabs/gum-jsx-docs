// A rotated strip of three colored text frames with rounded outer corners.
<Box fit font-size={px(38)} padding={em(0.8)}>
  <Rotate angle={-25}>
    <Frame padding={em(0.3)} radius={em(0.5)} background={gray} border-color={darkgray}>
      <HStack gap={em(0.3)}>
        <TextFrame padding={em(0.3)} radius={{ l: em(0.3) }} background={red} color={white} border-color={darkgray}>Punk</TextFrame>
        <TextFrame padding={em(0.3)} background={blue} color={white} border-color={darkgray}>Rock</TextFrame>
        <TextFrame padding={em(0.3)} radius={{ r: em(0.3) }} background={green} color={white} border-color={darkgray}>→</TextFrame>
      </HStack>
    </Frame>
  </Rotate>
</Box>

// A rotated strip of three colored text frames with rounded outer corners.
<Group fit width={px(720)} height={px(410)} font-size={px(38)}>
  <Rotate x={0.5} y={0.5} anchor="center" angle={-25}>
    <Frame width={px(450)} padding={em(0.3)} radius={em(0.5)} background={gray} border-color={darkgray}>
      <HStack gap={em(0.3)}>
        <TextFrame padding={em(0.3)} radius={{ l: em(0.3) }} background={red} color={white} border-color={darkgray}>Punk</TextFrame>
        <TextFrame padding={em(0.3)} background={blue} color={white} border-color={darkgray}>Rock</TextFrame>
        <TextFrame padding={em(0.3)} radius={{ r: em(0.3) }} background={green} color={white} border-color={darkgray}>→</TextFrame>
      </HStack>
    </Frame>
  </Rotate>
</Group>

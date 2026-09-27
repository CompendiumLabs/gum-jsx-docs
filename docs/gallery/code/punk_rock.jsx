// A rotated strip of three colored text frames with rounded outer corners.
<Box fit font-size={px(38)} padding={em(0.8)}>
  <Rotate angle={-25}>
    <Frame width={em(12)}  padding={em(0.3)} border-radius={em(0.5)} background={lightgray} border-color={black}>
      <HStack gap={em(0.3)}>
        <TextBox padding={em(0.3)} border-radius={{ l: em(0.3) }} background={red} color={white}>Punk</TextBox>
        <TextBox padding={em(0.3)} background={blue} color={white}>Rock</TextBox>
        <TextBox padding={em(0.3)} border-radius={{ r: em(0.3) }} background={green} color={white}>→</TextBox>
      </HStack>
    </Frame>
  </Rotate>
</Box>

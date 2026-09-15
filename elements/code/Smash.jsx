// Smash keeps the superscript's ink while giving the radical a shorter operand.
<Svg font-size={px(38)}>
  <Box padding={em(0.9)}>
    <MathText>
      <Sqrt>
        <Smash>
          <SupSub sup="2">x</SupSub>
        </Smash>
      </Sqrt>
      \qquad
      <Sqrt>
        <SupSub sup="2">x</SupSub>
      </Sqrt>
    </MathText>
  </Box>
</Svg>

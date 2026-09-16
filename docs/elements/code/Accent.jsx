// Character accents keep their script attachment; wide accents follow the body.
<Svg font-size={px(38)}>
  <Box padding={em(0.7)}>
    <MathText>
      <SupSub sup="2" sub="i">
        <Accent accent="hat">x</Accent>
      </SupSub>
      +
      <Accent accent="vec">v</Accent>
      =
      <Accent accent="widehat">
        <MathText>a+b+c</MathText>
      </Accent>
    </MathText>
  </Box>
</Svg>

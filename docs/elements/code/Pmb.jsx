// Overprinting works on complete operands; boldsymbol selects real bold glyphs.
<Box font-size={px(40)} padding={em(0.7)}>
  <MathText>
    <Pmb>
      <MathText>x+\alpha</MathText>
    </Pmb>
    \qquad
    <MathText>
      {String.raw`\boldsymbol{x+\alpha}`}
    </MathText>
  </MathText>
</Box>

// Rules and enclosures track compound operands without disturbing adjacent baselines.
<Svg width={px(820)} font-size={px(36)}>
  <Box padding={em(0.8)}>
    <MathCol gap={em(0.8)} justify="start">
      <MathText>
        <Overline>
          <MathText>z+w</MathText>
        </Overline>
        =
        <Overline>z</Overline>
        +
        <Overline>w</Overline>
      </MathText>
      <MathText>
        <Underline color={blue}>
          <Frac>
            <MathText>a+b</MathText>
            <MathText>c</MathText>
          </Frac>
        </Underline>
        +x
      </MathText>
      <MathText>
        <Enclose notation="cancel" color={red}>x</Enclose>
        +
        <Enclose notation="xcancel">
          <MathText>a+b</MathText>
        </Enclose>
      </MathText>
    </MathCol>
  </Box>
</Svg>

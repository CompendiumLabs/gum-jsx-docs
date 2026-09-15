// SupSub: Scripts preserve italic correction and descend through math styles.
<Svg font-size={px(36)}>
  <Box padding={em(0.8)}>
    <MathCol gap={em(0.6)} justify="start">
      <MathText>
        <SupSub sup="iπ">e</SupSub>
        +1=0
      </MathText>
      <MathText>
        <SupSub sup="j" sub="i">f</SupSub>
        +
        <SupSub sup="y^{z^w}">x</SupSub>
      </MathText>
      <MathText style="display">
        <SupSub sup="∞" sub="n=0">
          <MathOp>∑</MathOp>
        </SupSub>
        <Frac>
          <SupSub sup="n">x</SupSub>
          <MathText>n!</MathText>
        </Frac>
      </MathText>
    </MathCol>
  </Box>
</Svg>

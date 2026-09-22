// Labels determine arrow width; head-curve adjusts barbs on arrows and harpoons.
<Box font-size={px(38)} padding={em(0.7)}>
  <MathCol gap={em(0.7)} justify="start">
    <MathText>
      A
      <XArrow below="f^{-1}">{String.raw`\text{a linear map}`}</XArrow>
      B
      <XArrow label="xleftrightarrow" below="h">g</XArrow>
      C
    </MathText>
    <MathText>
      A
      <XArrow head-curve={0}>
        <TextMode>straight</TextMode>
      </XArrow>
      B
      <XArrow head-curve={1}>
        <TextMode>curved</TextMode>
      </XArrow>
      C
      <XArrow label="xrightleftharpoons" below="q">p</XArrow>
      D
    </MathText>
  </MathCol>
</Box>

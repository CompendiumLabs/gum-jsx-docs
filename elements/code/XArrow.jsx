// Labels determine arrow width; head-curve adjusts barbs on arrows and harpoons.
<Svg font-size={px(38)}>
  <Box padding={em(0.7)}>
    <MathCol gap={em(0.7)} justify="start">
      <MathText>
        A
        <XArrow above={String.raw`\text{a linear map}`} below="f^{-1}" />
        B
        <XArrow label="xleftrightarrow" above="g" below="h" />
        C
      </MathText>
      <MathText>
        A
        <XArrow head-curve={0} above={<TextMode>straight</TextMode>} />
        B
        <XArrow head-curve={1} above={<TextMode>curved</TextMode>} />
        C
        <XArrow label="xrightleftharpoons" above="p" below="q" />
        D
      </MathText>
    </MathCol>
  </Box>
</Svg>

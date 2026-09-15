// Extensible arrows follow their labels and remain aligned to the math axis.
<Svg width={px(900)} font-size={px(34)}>
  <Box padding={em(0.8)}>
    <MathCol gap={em(0.9)} justify="start">
      <MathText>
        A
        <XArrow above={String.raw`f_n`} below={String.raw`n\to\infty`} />
        B
      </MathText>
      <MathText>
        X
        <XArrow label="xleftrightarrow" above="g" below="h" />
        Y
        <XArrow label="xrightleftharpoons" above="p" below="q" />
        Z
      </MathText>
      <MathText color={blue}>
        P
        <XArrow label="xhookrightarrow" above={<TextMode>embedding</TextMode>} />
        Q
      </MathText>
    </MathCol>
  </Box>
</Svg>

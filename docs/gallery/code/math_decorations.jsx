// Accents, wide shapes, brace labels, and arrows share the surrounding math context.
<Box font-size={px(32)} padding={em(0.8)}>
  <VStack gap={em(0.8)} align="start">
    <Text font-size={em(0.65)} font-weight={bold}>Accents and scripts</Text>
    <Latex>{String.raw`
      \hat{x}_i^2 + \bar{f}_j + \vec{v}
      \qquad
      \widehat{a+b+c} + \widetilde{ABC}
    `}</Latex>
    <Text font-size={em(0.65)} font-weight={bold}>Braces and labels</Text>
    <Latex>{String.raw`
      \overbrace{a_1+a_2+\cdots+a_n}^{n\text{ terms}}
      = \underbrace{S_n}_{\text{total}}
    `}</Latex>
    <Text font-size={em(0.65)} font-weight={bold}>An arrow follows both labels</Text>
    <MathText>
      A
      <XArrow below="f^{-1}">
        <TextMode>an invertible map</TextMode>
      </XArrow>
      B
      <XArrow label="xrightleftharpoons" below="h">g</XArrow>
      C
    </MathText>
    <Box padding={em(0.7)} background={interp(black, blue, 0.18)} color={white}>
      <MathText>
        <Accent accent="widehat">
          <Plot
            width={em(4)}
            aspect={2.4}
            axis={false}
            grid={false}
            margin={0}
            xlim={[0, pi]}
            ylim={[0, 1.1]}
          >
            <SymLine fy={sin} xlim={[0, pi]} stroke={white} stroke-width={em(0.065)} />
          </Plot>
        </Accent>
        =
        <Accent accent="widecheck">
          <MathText>a+b+c</MathText>
        </Accent>
        +
        <Accent accent="utilde" under={true}>
          <MathText>ABC</MathText>
        </Accent>
      </MathText>
    </Box>
  </VStack>
</Box>

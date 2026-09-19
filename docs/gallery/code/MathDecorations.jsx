// Accents, wide shapes, brace labels, and arrows share the surrounding math context.
<Box font-size={px(32)} padding={em(0.8)}>
  <VStack gap={em(0.8)} align="start">
    <Text font-size={em(0.65)} font-weight={700}>Accents and scripts</Text>
    <Latex>
      {String.raw`
        \hat{x}_i^2 + \bar{f}_j + \vec{v}
        \qquad
        \widehat{a+b+c} + \widetilde{ABC}
      `}
    </Latex>
    <Text font-size={em(0.65)} font-weight={700}>Braces and labels</Text>
    <Latex>
      {String.raw`
        \overbrace{a_1+a_2+\cdots+a_n}^{n\text{ terms}}
        = \underbrace{S_n}_{\text{total}}
      `}
    </Latex>
    <Text font-size={em(0.65)} font-weight={700}>An arrow follows both labels</Text>
    <MathText>
      A
      <XArrow
        above={<TextMode>an invertible map</TextMode>}
        below="f^{-1}"
      />
      B
      <XArrow label="xrightleftharpoons" above="g" below="h" />
      C
    </MathText>
    <Box padding={em(0.7)} background={interp(black, blue, 0.18)} color={white}>
      <MathText>
        <Accent accent="widehat">
          <Plot
            width={px(130)}
            height={px(55)}
            axis={false}
            grid={false}
            margin={0}
            xlim={[0, pi]}
            ylim={[0, 1.1]}
          >
            <SymLine fy={sin} xlim={[0, pi]} stroke={white} stroke-width={px(2)} />
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

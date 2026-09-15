// Ordinary Gum figures participate in math baselines, fractions, and arrays.
const swatch = <Circle width={px(34)} height={px(34)} fill={blue} stroke={none} />
const curve = (
  <Plot width={px(150)} height={px(70)} axis={false} grid={false} margin={px(0)} xlim={[0, pi]} ylim={[0, 1.1]}>
    <SymLine fy={sin} xlim={[0, pi]} stroke={red} stroke-width={px(2.5)} />
  </Plot>
)
return (
  <Svg width={px(820)} font-size={px(30)}>
    <Box padding={em(0.9)}>
      <MathText style="display">
        <Frac>
          {swatch}
          <TextMode>area</TextMode>
        </Frac>
        +
        <Frac>
          {curve}
          <TextMode>signal</TextMode>
        </Frac>
        =
        <Bracket delim="square">
          <MathArray ncol={2} colsep={em(0.5)}>
            {swatch}
            {curve}
            <TextMode>shape</TextMode>
            <TextMode>curve</TextMode>
          </MathArray>
        </Bracket>
      </MathText>
    </Box>
  </Svg>
)

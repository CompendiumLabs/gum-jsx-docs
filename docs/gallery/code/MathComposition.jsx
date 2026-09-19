// Shapes, small plots, and wrapping text are ordinary operands; plots can carry math labels too.
const curve = (
  <Plot
    width={px(150)}
    height={px(72)}
    axis={false}
    grid={false}
    margin={0}
    xlim={[0, pi]}
    ylim={[0, 1.1]}
    plot-background={lightgray}
  >
    <SymLine fy={sin} xlim={[0, pi]} stroke={blue} stroke-width={px(2.5)} />
  </Plot>
)
return (
  <Box width={px(760)} font-size={px(30)} padding={em(0.8)}>
    <VStack gap={em(0.9)} align="start">
      <Text font-size={em(0.75)} font-weight={700}>Gum elements inside math</Text>
      <MathText style="display">
        <Frac>
          <Circle width={px(34)} height={px(34)} fill={blue} stroke={none} />
          <TextMode>area</TextMode>
        </Frac>
        +
        <Frac>
          {curve}
          <Text width={px(150)} font-size={em(0.6)} text-align="center">
            A wrapping text operand keeps its explicit width.
          </Text>
        </Frac>
      </MathText>
      <MathRow>
        <Text width={px(170)} font-size={em(0.6)}>
          A text operand aligns by its first baseline.
        </Text>
        <MathSpacer advance="quad" />
        <MathSymbol>≈</MathSymbol>
        <MathSpacer advance="quad" />
        <Sqrt>
          <TextMode>area</TextMode>
        </Sqrt>
      </MathRow>
      <Text font-size={em(0.6)} color={slate}>Use Fit when a figure should deliberately shrink into a script.</Text>
      <SupSub
        sup={
          <Fit width={px(50)} height={px(24)}>
            {curve}
          </Fit>
        }
      >
        P
      </SupSub>
      <TextFigure
        caption={
          <Text font-size={em(0.6)}>
            {"The caption includes "}
            <Tex>
              <SupSub sup="2">x</SupSub>
            </Tex>
            {" using the same inline layout as a paragraph."}
          </Text>
        }
      >
        <Plot
          width={px(650)}
          height={px(270)}
          font-size={em(0.5)}
          title={
            <Text>
              {"A plot of "}
              <Tex>y=x^2</Tex>
            </Text>
          }
          xlabel={
            <Text>
              {"Position "}
              <Tex>x</Tex>
            </Text>
          }
          ylabel={
            <Text>
              {"Power "}
              <Tex>x^2</Tex>
            </Text>
          }
          xlim={[-2, 2]}
          ylim={[0, 4]}
        >
          <SymLine fy={(x) => x * x} xlim={[-2, 2]} stroke={blue} stroke-width={px(2.5)} />
        </Plot>
      </TextFigure>
    </VStack>
  </Box>
)

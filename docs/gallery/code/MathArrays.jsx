// Matrices, cases, small inline arrays, and matrices containing ordinary Gum elements.
<Box font-size={px(30)} padding={em(0.8)}>
  <VStack gap={em(0.8)} align="start">
    <Text font-size={em(0.7)} font-weight={bold}>Matrices and unequal cells</Text>
    <Latex>{String.raw`
      A = \begin{pmatrix}
        a & bb \\
        ccc & d
      \end{pmatrix}
      \qquad
      B = \begin{bmatrix}
        \frac{1}{x} & 0 \\
        0 & \frac{a+b}{c}
      \end{bmatrix}
    `}</Latex>
    <Text font-size={em(0.7)} font-weight={bold}>Piecewise definitions</Text>
    <Latex>{String.raw`
      f(x) = \begin{cases}
        x^2 & \text{if } x > 0 \\
        0 & \text{otherwise}
      \end{cases}
    `}</Latex>
    <Text font-size={em(0.65)}>
      Small matrices fit inside prose: <Tex>{String.raw`
        R = \left(
          \begin{smallmatrix}
            0 & -1 \\
            1 & 0
          \end{smallmatrix}
        \right)
    `}</Tex> rotates a vector by a quarter turn.
    </Text>
    <Text font-size={em(0.7)} font-weight={bold}>Gum elements are cells too</Text>
    <MathText style="display">
      G=
      <Bracket delim="square">
        <MathArray ncol={2} colsep={em(0.5)}>
          <Circle width={em(1)} fill={blue} stroke={none} />
          <Plot
            width={em(4.2)}
            aspect={2.3}
            axis={false}
            grid={false}
            margin={0}
            xlim={[0, pi]}
            ylim={[0, 1.1]}
          >
            <SymLine fy={sin} xlim={[0, pi]} stroke={blue} stroke-width={em(0.07)} />
          </Plot>
          <TextMode>shape</TextMode>
          <TextMode>curve</TextMode>
        </MathArray>
      </Bracket>
    </MathText>
  </VStack>
</Box>

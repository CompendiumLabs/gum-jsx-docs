// Math alphabets and text faces select distinct fonts without changing the row baseline.
<Svg width={px(840)} font-size={px(34)}>
  <Box padding={em(0.8)}>
    <MathCol gap={em(0.7)} justify="start">
      <Latex>{String.raw`\mathrm{ABCxyz}\quad\mathbf{ABCxyz}\quad\mathit{ABCxyz}`}</Latex>
      <Latex>{String.raw`\mathbb{ABC}\quad\mathcal{ABC}\quad\mathfrak{ABCxyz}\quad\mathscr{ABC}`}</Latex>
      <Latex>{String.raw`\mathsf{ABCxyz}\quad\mathsfit{ABCxyz}\quad\mathtt{ABCxyz}`}</Latex>
      <Latex>{String.raw`\boldsymbol{\alpha+\Gamma\leq x}\quad\textbf{bold}\quad\textit{italic}`}</Latex>
    </MathCol>
  </Box>
</Svg>

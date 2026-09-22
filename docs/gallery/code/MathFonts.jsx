// Text styles compose, math alphabets select glyphs, and macros stay local.
<Box font-size={px(31)} padding={em(0.8)}>
  <VStack gap={em(0.8)} align="start">
    <Text font-size={em(0.65)} font-weight={bold}>Math alphabets and bold symbols</Text>
    <Latex>
      {String.raw`
        \mathcal{ABC} + \mathfrak{xyz} + \mathbb{R}
        \qquad
        \boldsymbol{\alpha+\Gamma\leq x}
      `}
    </Latex>
    <Latex>
      {String.raw`
        \mathscr{ABC}
        \qquad \mathrm{ABC}
        \qquad \mathsf{ABC}
        \qquad \mathsfit{ABC}
        \qquad \mathtt{ABC}
      `}
    </Latex>
    <Text font-size={em(0.65)} font-weight={bold}>Composed text faces</Text>
    <Latex>
      {String.raw`
        \textbf{bold \textit{and italic}}
        \quad
        \textsf{sans \textbf{bold} \textit{italic}}
      `}
    </Latex>
    <Latex>
      {String.raw`
        \emph{outer \emph{inner} outer}
        \quad
        \texttt{a--b}
        \quad
        \text{caf\'{e}, \"{o}, \c{c}}
      `}
    </Latex>
    <Text font-size={em(0.65)} font-weight={bold}>A reusable macro</Text>
    <Latex macros={{ "\\pair": String.raw`\langle #1,#1\rangle` }} color={blue}>
      {String.raw`
        \widehat{\pair{x}}
        + \widetilde{\pair{y}}
      `}
    </Latex>
  </VStack>
</Box>

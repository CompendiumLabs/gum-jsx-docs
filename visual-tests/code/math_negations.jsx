// Negated relations place their slash consistently across narrow and wide glyphs.
<Svg font-size={px(36)}>
  <Box padding={em(0.8)}>
    <MathCol gap={em(0.7)} justify="start">
      <Latex>{String.raw`a\neq b\quad a\notin B\quad A\nsubseteq B`}</Latex>
      <Latex>{String.raw`x\nless y\quad x\nleq y\quad x\ngeq y`}</Latex>
      <Latex>{String.raw`P\nrightarrow Q\quad P\nLeftarrow Q\quad P\nLeftrightarrow Q`}</Latex>
      <Latex>{String.raw`u\nparallel v\quad p\nmid q\quad a\not\approx b`}</Latex>
    </MathCol>
  </Box>
</Svg>

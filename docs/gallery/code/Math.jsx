// Math basics: automatic spacing, source grouping, signed glue, and explicit composition.
<Box font-size={px(32)} padding={em(1)}>
  <VStack gap={em(0.8)} align="start">
    <Text font-size={em(0.6)} color={slate}>Symbols and named operators</Text>
    <Latex>{String.raw`\sin x+\cos y=\operatorname{rank}(A)`}</Latex>
    <Text font-size={em(0.6)} color={slate}>A color boundary preserves operator spacing</Text>
    <MathText>
      a
      <MathText color={red}>+b</MathText>
      =c
    </MathText>
    <Text font-size={em(0.6)} color={slate}>Negative glue beside ordinary adjacency</Text>
    <MathText>{String.raw`a\!b\qquad ab`}</MathText>
    <Text font-size={em(0.6)} color={slate}>An explicit grouped atom</Text>
    <MathText>
      a
      <MathBox padding={[em(0.1), em(0.2)]}>
        <MathSymbol text="+" />
      </MathBox>
      b
    </MathText>
    <MathRule fit width={em(12)} color={blue} />
  </VStack>
</Box>

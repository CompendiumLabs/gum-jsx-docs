// Shared relation columns, paired equations, gathered lines, and multiline limits.
<Box font-size={px(30)} padding={em(0.8)}>
  <VStack gap={em(0.8)} align="start">
    <Text font-size={em(0.7)} font-weight={700}>Align on the relation</Text>
    <Latex>
      {String.raw`
        \begin{aligned}
          (a+b)^2 &= a^2 + 2ab + b^2 \\
                  &= a(a+b) + b(a+b)
        \end{aligned}
      `}
    </Latex>
    <Text font-size={em(0.7)} font-weight={700}>Multiple equation pairs</Text>
    <Latex>
      {String.raw`
        \begin{aligned}
          x &= a+b & u &= a-b \\
          y &= c+d & v &= c-d
        \end{aligned}
      `}
    </Latex>
    <Text font-size={em(0.7)} font-weight={700}>Centered lines</Text>
    <Latex>
      {String.raw`
        \begin{gathered}
          a+b=c \\
          \frac{1}{1+x}=y
        \end{gathered}
      `}
    </Latex>
    <Text font-size={em(0.7)} font-weight={700}>Multiline operator limits</Text>
    <Latex>
      {String.raw`
        S = \sum_{\substack{1\leq i\leq n\\1\leq j\leq m}} a_{ij}
      `}
    </Latex>
  </VStack>
</Box>

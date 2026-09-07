// Stretch the borders to a common width while keeping both equations at the same em.
<VStack spacing>
  <Frame stretch padding={0.4} rounded border={2}>
    <Latex>{"\\int_0^{\\infty} \\exp(-x^2) dx = \\sqrt{\\pi}"}</Latex>
  </Frame>
  <Frame stretch padding={0.4} rounded border={2}>
    <Latex>{"\\sin^2(\\theta) + \\cos^2(\\theta) = 1"}</Latex>
  </Frame>
</VStack>

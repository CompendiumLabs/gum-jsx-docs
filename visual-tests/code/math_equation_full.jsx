// A dense display equation combines operators, limits, fractions, roots, and fences.
<Svg width={px(900)} font-size={px(34)}>
  <Box padding={em(0.9)}>
    <Latex>
      {String.raw`
        \mathcal{L}(\theta)
        = \sum_{i=1}^{n}\log\!\left(
          \frac{1}{\sqrt{2\pi\sigma^2}}
          \exp\!\left[-\frac{(x_i-\mu)^2}{2\sigma^2}\right]
        \right)
      `}
    </Latex>
  </Box>
</Svg>

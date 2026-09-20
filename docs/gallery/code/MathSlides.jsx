// A slide combines a mathematical title, a formula, a plot, and inline math in prose.
<Slide fit
  font-size={px(15)}
  title={
    <Text font-size={em(1.4)}>
      The Gaussian integral: <Tex>{String.raw`I=\sqrt\pi`}</Tex>
    </Text>
  }
>
  <HStack gap={em(1)} align="center">
    <VStack grow={1} gap={em(1)}>
      <Latex>
        {String.raw`I = \int_{-\infty}^{\infty} e^{-x^2} \, dx`}
      </Latex>
      <Text>
        Squaring the integral gives <Tex>I^2</Tex>, the area under a rotationally symmetric surface.
      </Text>
      <Latex color={blue}>
        {String.raw`I^2 = \int_0^{2\pi} \int_0^{\infty} e^{-r^2} r \, dr \, d\theta = \pi`}
      </Latex>
    </VStack>
    <Plot
      aspect={1.3}
      grow={1.1}
      font-size={em(0.6)}
      xlim={[-3, 3]}
      ylim={[0, 1.1]}
    >
      <SymFill xlim={[-3, 3]} upper={(x) => exp(-x * x)} fill={blue} opacity={0.15} />
      <SymLine xlim={[-3, 3]} fy={(x) => exp(-x * x)} stroke={blue} />
    </Plot>
  </HStack>
</Slide>

// A slide combines a mathematical title, a formula, a plot, and inline math in prose.
return (
  <Slide
    width={px(960)}
    font-size={px(22)}
    title={
      <Text>
        {"The Gaussian integral: "}
        <Tex>{String.raw`I=\sqrt\pi`}</Tex>
      </Text>
    }
  >
    <HStack gap={em(1.65)} grow={1} align="center">
      <VStack width={px(375)} gap={em(1.1)} align="start">
        <Latex font-size={em(1.25)}>
          {String.raw`I=\int_{-\infty}^{\infty}e^{-x^2}\,dx`}
        </Latex>
        <Text width={px(375)}>
          {"Squaring the integral gives "}
          <Tex>I^2</Tex>
          {", the area under a rotationally symmetric surface."}
        </Text>
        <Latex font-size={em(1.15)} color={blue}>
          {String.raw`I^2=\int_0^{2\pi}\!\int_0^\infty e^{-r^2}r\,dr\,d\theta=\pi`}
        </Latex>
      </VStack>
      <TextFigure
        width={px(435)}
        caption={
          <Text font-size={em(0.8)}>
            {"The area under "}
            <Tex>{String.raw`e^{-x^2}`}</Tex>
            {" is "}
            <Tex>{String.raw`\sqrt\pi`}</Tex>
            {"."}
          </Text>
        }
      >
        <Plot
          width={px(435)}
          height={px(285)}
          font-size={em(0.65)}
          xlabel={<Tex>x</Tex>}
          ylabel={<Tex>{String.raw`e^{-x^2}`}</Tex>}
          xlim={[-3, 3]}
          ylim={[0, 1.1]}
        >
          <SymFill xlim={[-3, 3]} upper={(x) => exp(-x * x)} fill={blue} opacity={0.15} />
          <SymLine xlim={[-3, 3]} fy={(x) => exp(-x * x)} stroke={blue} stroke-width={px(2.5)} />
        </Plot>
      </TextFigure>
    </HStack>
  </Slide>
)

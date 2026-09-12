// Choose the shared width explicitly for aspect-1 and aspect-2 figures totaling 500px high.
<Svg height={px(500)}>
  <VStack width={px(500 / (1 + 1 / 2))}>
    <Rect aspect={1} fill="#317969" stroke="none" />
    <Rect aspect={2} fill="#d77c45" stroke="none" />
  </VStack>
</Svg>

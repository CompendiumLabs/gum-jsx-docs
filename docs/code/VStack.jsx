// Choose the shared width explicitly for aspect-1 and aspect-2 figures totaling 500px high.
<Svg height={px(500)}>
  <VStack width={px(500 / (1 + 1 / 2))}>
    <Rect aspect={1} fill={blue} stroke={none} />
    <Rect aspect={2} fill={red} stroke={none} />
  </VStack>
</Svg>;

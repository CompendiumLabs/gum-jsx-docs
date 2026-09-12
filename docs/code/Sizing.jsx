// An explicit column width determines the heights of two different aspect figures.
<Svg>
  <Box padding={px(16)} background={lightgray}>
    <VStack width={px(240)}>
      <Rect aspect={1} fill={blue} stroke={none} />
      <Rect aspect={2} fill={red} stroke={none} />
    </VStack>
  </Box>
</Svg>;

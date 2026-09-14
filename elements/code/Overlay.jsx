// The first child sizes the overlay.
<Svg width={px(460)} height={px(280)}>
  <Box padding={px(30)}>
    <Overlay>
      <Rect width={px(280)} height={px(130)} fill={blue} stroke={none} />
      <Text x={0.5} y={0.5} anchor={[0.5, 0.5]} font_weight={700}>Measured overlay</Text>
    </Overlay>
  </Box>
</Svg>

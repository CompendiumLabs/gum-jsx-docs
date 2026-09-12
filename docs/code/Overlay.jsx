// The first child sizes the overlay.
<Svg width={px(460)} height={px(280)}>
  <Box padding={px(30)} background="white">
    <Overlay>
      <Rect width={px(280)} height={px(130)} fill="#dbeafe" stroke="none" />
      <Text x={0.5} y={0.5} anchor="center" font_weight={700}>Measured overlay</Text>
    </Overlay>
  </Box>
</Svg>;

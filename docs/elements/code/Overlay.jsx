// The first child sizes the overlay.
<Box padding={em(2)}>
  <Overlay>
    <Rect width="fill" aspect={28 / 13} fill={blue} stroke={none} />
    <Text x={0.5} y={0.5} anchor={[0.5, 0.5]} font-weight={700}>Measured overlay</Text>
  </Overlay>
</Box>

// The wrapper's anchor and its caption's attachment anchor are independent.
<Box width="fill" aspect={1.65} padding={em(1.875)}>
  <Group>
    <Attach
      width={0.7}
      x={0.5} y={0.5} anchor={[0.5, 0.5]}
      side="bottom" at={1} child-anchor={1}
      offset={em(0.625)}
      attachment={<Text>Attached caption</Text>}
    >
      <Rect width="fill" aspect={2.2} fill={blue} stroke={none} />
    </Attach>
  </Group>
</Box>

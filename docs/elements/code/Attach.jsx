// The wrapper's anchor and its caption's attachment anchor are independent.
<Box width={px(460)} height={px(280)} padding={em(1.875)}>
  <Group>
    <Attach
      x={0.5} y={0.5} anchor={[0.5, 0.5]}
      side="bottom" at={1} child-anchor={1}
      offset={em(0.625)}
      attachment={<Text>Attached caption</Text>}
    >
      <Rect width={px(260)} height={px(120)} fill={blue} stroke={none} />
    </Attach>
  </Group>
</Box>

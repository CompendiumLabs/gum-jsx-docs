// The wrapper's anchor and its caption's attachment anchor are independent.
<Svg width={px(460)} height={px(280)} font-size={px(16)}>
  <Box padding={em(1.875)}>
    <Group>
      <Attach
        x={0.5} y={0.5} anchor={[0.5, 0.5]}
        side="bottom" at={1} child-anchor={1}
        offset={px(10)}
        attachment={<Text>Attached caption</Text>}
      >
        <Rect width={px(260)} height={px(120)} fill={blue} stroke={none} />
      </Attach>
    </Group>
  </Box>
</Svg>

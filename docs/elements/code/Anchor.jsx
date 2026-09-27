// A zero-sized anchor positions text.
<Box width="fill" aspect={1.65} padding={em(2)}>
  <Group>
    <Anchor pos={[0.5, 0.5]} align={["center", "start"]}>
      <TextBox font-size={em(1.1)} border-width={px(1)}>
        Hanging on a point
      </TextBox>
    </Anchor>
    <Anchor pos={[0.5, 0.5]}>
      <Dot />
    </Anchor>
  </Group>
</Box>

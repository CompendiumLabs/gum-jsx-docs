// Center a figure and a text box on the same math axis.
<Box font-size={px(36)} padding={em(0.7)}>
  <MathText>
    <VCenter>
      <Text width={em(5)} font-size={em(0.55)}>A two-line label</Text>
    </VCenter>
    =
    <VCenter>
      <Rect width={em(2)} aspect={1.4} fill={blue} stroke={none} />
    </VCenter>
  </MathText>
</Box>

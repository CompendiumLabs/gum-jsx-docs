// Center a figure and a text box on the same math axis.
<Box font-size={px(36)} padding={em(0.7)}>
  <MathText>
    <VCenter>
      <Text width={px(100)} font-size={em(0.55)}>A two-line label</Text>
    </VCenter>
    =
    <VCenter>
      <Rect width={px(70)} height={px(50)} fill={blue} stroke={none} />
    </VCenter>
  </MathText>
</Box>

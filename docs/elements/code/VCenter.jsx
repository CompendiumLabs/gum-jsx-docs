// Center a figure and a text box on the same math axis.
<Svg font-size={px(36)}>
  <Box padding={em(0.7)}>
    <MathText>
      <VCenter>
        <Text width={px(100)} font-size={px(20)}>A two-line label</Text>
      </VCenter>
      =
      <VCenter>
        <Rect width={px(70)} height={px(50)} fill={blue} stroke={none} />
      </VCenter>
    </MathText>
  </Box>
</Svg>

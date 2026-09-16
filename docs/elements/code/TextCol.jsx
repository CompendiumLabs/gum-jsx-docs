// A column fills automatic widths while keeping explicit and content-sized frames.
<Svg width={px(460)} font-size={px(16)}>
  <TextBox padding={em(1.875)}>
    <TextCol>
      <Text font-size={em(1.375)} font-weight={bold}>A shared width</Text>
      <TextFrame>Automatic width fills the column.</TextFrame>
      <TextFrame width={px(220)}>An explicit 220px width.</TextFrame>
      <TextFrame width="fit" align-self="end">Content-sized</TextFrame>
    </TextCol>
  </TextBox>
</Svg>

// A column fills automatic widths while keeping explicit and content-sized frames.
<TextBox width="fill" padding={em(1.25)}>
  <TextCol>
    <Text font-size={em(1.375)} font-weight={bold}>A shared width</Text>
    <TextFrame>Automatic width fills the column.</TextFrame>
    <TextFrame width={px(220)}>An explicit 220px width.</TextFrame>
    <TextFrame align-self="end">Content-sized</TextFrame>
  </TextCol>
</TextBox>

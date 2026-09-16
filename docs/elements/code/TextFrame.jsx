// A bordered document panel fills available width and preserves compact children.
<Svg width={px(460)} font-size={px(16)}>
  <TextBox padding={em(1)}>
    <TextFrame padding={em(1)} border-color={blue}>
      <TextCol>
        <Text>A wrapping paragraph in a frame that follows the available width.</Text>
        <TextBox width="fit" padding={em(0.4)} background={lightgray}>Compact label</TextBox>
      </TextCol>
    </TextFrame>
  </TextBox>
</Svg>

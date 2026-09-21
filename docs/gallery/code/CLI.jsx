// Render the same source as SVG, PNG, kitty graphics, a tree, or JSON.
<TextBox width="fill" padding={em(1.25)} background={lightgray}>
  <TextCol gap={em(0.75)}>
    <Text font-size={em(1.5)} font-weight={bold}>One source, several outputs</Text>
    <Rect aspect={3} border-radius={em(0.5)} fill={blue} stroke={none} />
    <Text>Change -W to reflow this paragraph. Change --ratio to sample more pixels without changing the layout.</Text>
  </TextCol>
</TextBox>

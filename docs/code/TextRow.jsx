// a figure six ems tall beside a column that takes the rest of the row, aligned at the top
<TextRow width={26} gap={1.5}>
  <TextFigure height={6} caption="Figure 1" caption-scale={0.8} justify="center">
    <Frame padding rounded fill={lightgray}>
      <Circle fill={blue} />
    </Frame>
  </TextFigure>
  <TextCol gap={0.5}>
    <Text scale={1.3}>A circle</Text>
    <Text>The figure keeps its height in em and the column takes the remaining width, so the text wraps beside it at the same size.</Text>
  </TextCol>
</TextRow>

// A complete two-slide document with shared page dimensions and typography.
<Document title="A small presentation" width={px(960)} height={px(540)}
  font-size={px(28)} background={white}>
  <Page>
    <Slide width="fill" height="fill" title="One source, many pages">
      <TextCol gap={em(1)}>
        <Text>Each page gets its own layout.</Text>
        <Text>Document supplies shared dimensions, styling, and metadata.</Text>
      </TextCol>
    </Slide>
  </Page>
  <Page background={slate} color={white}>
    <Slide width="fill" height="fill" title="Choose an output">
      <Bullets>
        <Text>Export every page to PDF or PowerPoint.</Text>
        <Text>Select a page for an SVG or PNG image.</Text>
      </Bullets>
    </Slide>
  </Page>
</Document>

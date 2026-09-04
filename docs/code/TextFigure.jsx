// a plot four ems tall in a column of text, with a smaller caption
<TextCol width={20} gap={0.5}>
  <Text>A short paragraph before the figure, at the column's size.</Text>
  <TextFigure height={5} caption="The sine function on one period" caption-scale={0.8} justify="center">
    <Plot xlim={[0, 2*pi]} ylim={[-1.2, 1.2]} grid aspect={2} margin={[0.2, 0.1]}>
      <SymLine fy={sin} stroke={blue} stroke-width={2} />
    </Plot>
  </TextFigure>
  <Text>And a paragraph after it, the same size as before.</Text>
</TextCol>

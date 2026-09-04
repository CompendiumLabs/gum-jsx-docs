// Two Columns: a plot beside a paragraph and a list, sized by the slide's em

const damp = (t) => exp(-0.3 * t) * cos(2 * t)
const env_ = (t) => exp(-0.3 * t)

const Figure = () =>
  <TextFigure caption="A damped oscillation and its envelope" caption-scale={0.8} caption-justify="center">
    <Plot xlim={[0, 8]} ylim={[-1.2, 1.2]} grid aspect={1.3} margin={[0.2, 0.1]}>
      <SymLine fy={env_} stroke={gray} stroke-dasharray={4} />
      <SymLine fy={t => -env_(t)} stroke={gray} stroke-dasharray={4} />
      <SymLine fy={damp} stroke={blue} stroke-width={2} />
    </Plot>
  </TextFigure>

const Notes = () =>
  <TextCol gap={0.7}>
    <Text scale={1.3}>What the plot shows</Text>
    <Text>The oscillation loses energy to friction, so each swing is smaller than the last while the period stays the same.</Text>
    <Bullets>
      <Text>the envelope <Tex>{"e^{-0.3 t}"}</Tex> bounds every peak</Text>
      <Text>zero crossings stay evenly spaced</Text>
      <Text scale={0.85}>the dashed lines are the envelope, the solid line the motion</Text>
    </Bullets>
  </TextCol>

return <Slide title="Damped Oscillation" em={0.05}>
  <TextRow gap={1.5} sizes={[1, 1]} valign="top">
    <Figure />
    <Notes />
  </TextRow>
</Slide>

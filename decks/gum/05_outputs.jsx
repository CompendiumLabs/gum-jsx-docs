<Page
  number={5}
  topic="FROM SOURCE TO OUTPUT"
  title="One source. Many outputs."
  subtitle="Keep the figure editable in code. Choose the format when you render."
>
  <Panel x={64} width={560}>
    <Label>RENDER A FIGURE</Label>
    <Code size={20}>{`gum figure.jsx -o figure.svg

gum figure.jsx -o figure.png

gum figure.jsx -o figure.pdf`}</Code>
    <Text x={px(28)} y={px(268)} width={px(504)} font-size={px(23)} color={muted}>
      SVG for vector graphics. PNG for pixels. PDF for a page or a whole deck.
    </Text>
  </Panel>
  <Panel x={656} width={560} background={mint}>
    <Label>THIS DECK IS A GUM PROGRAM</Label>
    <Code size={20}>{`gum slides/ -o talk.pdf

slides/
  index.json
  prelude.jsx
  01_language.jsx
  02_layout.jsx
  ...`}</Code>
    <Text x={px(28)} y={px(316)} width={px(504)} font-size={px(20)} color={muted}>
      The manifest sets order, title, and shared prelude.
    </Text>
  </Panel>
</Page>

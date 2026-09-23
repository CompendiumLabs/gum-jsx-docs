<Page
  number={5}
  topic="FROM SOURCE TO OUTPUT"
  title="One source. Many outputs."
  subtitle="Keep the figure editable in code. Choose the format when you render."
>
  <HStack grow={1} gap={em(1)} align="fill">
    <Panel
      title="RENDER A FIGURE"
      note="SVG for vector graphics. PNG for pixels. PDF for a page or a whole deck."
    >
      <Code>{`gum figure.jsx -o figure.svg

gum figure.jsx -o figure.png

gum figure.jsx -o figure.pdf`}</Code>
    </Panel>
    <Panel
      title="THIS DECK IS A GUM PROGRAM"
      note="The manifest sets order, title, and shared prelude."
      background={mint}
    >
      <Code>{`gum slides/ -o talk.pdf

slides/
  index.json
  prelude.jsx
  01_language.jsx
  02_layout.jsx
  ...`}</Code>
    </Panel>
  </HStack>
</Page>

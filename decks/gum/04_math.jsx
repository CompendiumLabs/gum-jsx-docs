<Page
  number={4}
  topic="PLOTS + MATHEMATICS"
  title="Math belongs in the picture."
  subtitle="Sample a function, set the axes, and typeset the idea beside it."
>
  <HStack grow={1} gap={em(1)} align="fill">
    <Panel title="A FUNCTION BECOMES A CURVE">
      <Plot
        grow={1}
        font-size={em(0.75)}
        margin={em(0.5)}
        xlim={[0, tau]}
        ylim={[-1.2, 1.2]}
        xticks={[[0, '0'], [pi, 'π'], [tau, '2π']]}
        yticks={[-1, 0, 1]}
        grid
        grid-stroke={line}
        axis-stroke={muted}
      >
        <SymLine
          fy={sin}
          xlim={[0, tau]}
          samples={161}
          stroke={teal}
          stroke-width={em(0.2)}
        />
      </Plot>
    </Panel>
    <Panel
      title="THE SAME LANGUAGE, WITH TEX"
      note="Use Tex for inline math within Text."
      background={peach}
    >
      <Latex font-size={em(1.5)} align-self="start">
        y = \sin(x)
      </Latex>
      <Code>{
`<Plot xlim={[0, tau]}>
  <SymLine fy={sin} />
</Plot>

<Latex>
  y = \\sin(x)
</Latex>`
      }</Code>
    </Panel>
  </HStack>
</Page>

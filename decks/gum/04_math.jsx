<Page
  number={4}
  topic="PLOTS + MATHEMATICS"
  title="Math belongs in the picture."
  subtitle="Sample a function, set the axes, and typeset the idea beside it."
>
  <Panel x={64} width={664}>
    <Label>A FUNCTION BECOMES A CURVE</Label>
    <Plot
      x={px(22)}
      y={px(68)}
      width={px(620)}
      height={px(284)}
      font-size={px(18)}
      margin={px(14)}
      xlabel="x"
      xlim={[0, tau]}
      ylim={[-1.2, 1.2]}
      xticks={[[0, '0'], [pi, 'π'], [tau, '2π']]}
      yticks={[-1, 0, 1]}
      grid
      grid-stroke={line}
      axis-stroke={muted}
    >
      <SymLine fy={sin} xlim={[0, tau]} samples={161} stroke={teal} stroke-width={px(4)} />
    </Plot>
  </Panel>
  <Panel x={752} width={464} background={peach}>
    <Label color={orange}>THE SAME LANGUAGE, WITH TEX</Label>
    <Latex x={px(44)} y={px(72)} width={px(376)} font-size={px(38)} color={ink}>
      {String.raw`y = \sin x`}
    </Latex>
    <Code x={24} y={144} size={18}>{`<Plot xlim={[0, tau]}>
  <SymLine
    fy={sin}
    samples={161}
  />
</Plot>
<Latex>y = \\sin x</Latex>`}</Code>
    <Text x={px(24)} y={px(338)} font-size={px(18)} color={muted}>
      Use Tex for inline math within Text.
    </Text>
  </Panel>
</Page>

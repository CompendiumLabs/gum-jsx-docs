// The same chart inherits light and dark palettes from its enclosing Svg.
const Panel = ({ theme, background }) => (
  <Svg theme={theme} background={background} width={px(320)} height={px(280)}>
    <Slide width={1} height={1} title={`${theme} theme`} padding={px(16)}>
      <BarPlot
        values={[2, 5, 3, 7]}
        title="Measurements"
        xlabel="Sample"
        border-width={px(1)}
        legend={[{ label: 'Count', kind: 'bar' }]}
        legend-background={background}
      />
    </Slide>
  </Svg>
)

return <Svg>
  <HStack gap={px(16)}>
    <Panel theme="light" background={white} />
    <Panel theme="dark" background={slate} />
  </HStack>
</Svg>

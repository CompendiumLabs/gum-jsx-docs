// The same chart inherits light and dark palettes from the theme set on its Slide.
const Panel = ({ theme, background, ...props }) => (
  <Slide
    theme={theme}
    background={background}
    title={`${theme} theme`}
    padding={em(1)}
    {...props}
  >
    <BarPlot
      values={[2, 5, 3, 7]}
      title="Measurements"
      xlabel="Sample"
      border-width={px(1)}
      legend={[{ label: 'Count', kind: 'bar' }]}
      legend-background={background}
    />
  </Slide>
)

return <HStack gap={em(1)} align="stretch" height={px(300)}>
  <Panel grow={1} theme="light" background={white} />
  <Panel grow={1} theme="dark" background={slate} />
</HStack>

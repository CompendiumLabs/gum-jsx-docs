// Standalone exports include overhanging ink; font size and explicit fitting have separate roles.
const formula = String.raw`\mathllap{f}\!\int_0^\infty e^{-x^2}\,dx=f\frac{\sqrt\pi}{2}`
const exportOptions = { font_size: em(1.7), padding: em(0.2) }
return (
  <Box font-size={px(18)} padding={em(1.3)}>
    <VStack gap={em(1.1)} align="start">
      <Text font-weight={bold}>A formula becomes its own viewport</Text>
      <Text>Natural size at 1.7 times the base font, with room for the leading italic ink.</Text>
      {mathToElement(formula, exportOptions)}
      <Text>A 2.7em font lays out the typography at a larger size.</Text>
      {mathToElement(formula, { ...exportOptions, font_size: em(2.7), color: blue })}
      <Text>Contain scales the completed 1.7em formula into the available width.</Text>
      {mathToElement(formula, { ...exportOptions, fit: 'contain' })}
      <Text>Smash suppresses logical height; the export still includes its visible ink.</Text>
      {mathToElement(String.raw`\smash{\widehat{ABC}}`, {
        font_size: em(2.2), strut: false, padding: em(0.2), color: purple,
      })}
    </VStack>
  </Box>
)

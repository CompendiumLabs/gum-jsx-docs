// Standalone exports include overhanging ink; font size and explicit fitting have separate roles.
const formula = String.raw`\mathllap{f}\!\int_0^\infty e^{-x^2}\,dx=f\frac{\sqrt\pi}{2}`
const exported = mathToElement(formula, { font_size: px(30), padding: em(0.2) })
return (
  <Svg width={px(740)} font-size={px(18)}>
    <Box padding={px(24)}>
      <VStack gap={px(20)} align="start">
        <Text font-weight={700}>A formula becomes its own viewport</Text>
        <Text>Natural size at 30 pixels per em, with room for the leading italic ink.</Text>
        {exported}
        <Text>48 pixels per em lays out the typography at a larger size.</Text>
        {mathToElement(formula, { font_size: px(48), padding: em(0.2), color: blue })}
        <Text>Fit scales the completed 30-pixel formula into a 540-pixel width.</Text>
        <Fit width={px(540)}>
          {exported}
        </Fit>
        <Text>Smash suppresses logical height; the export still includes its visible ink.</Text>
        {mathToElement(String.raw`\smash{\widehat{ABC}}`, {
          font_size: px(40), strut: false, padding: em(0.2), color: purple,
        })}
      </VStack>
    </Box>
  </Svg>
)

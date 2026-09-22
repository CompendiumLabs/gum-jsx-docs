// Each track offers the same space; only the blue box's width changes.
const WidthExample = ({ label, width }) => (
  <TextCol gap={em(0.35)}>
    <Text font-family={mono} font-size={em(0.8)}>{label}</Text>
    <Box width="fill" padding={em(0.5)} background={lightgray} align="start">
      <TextBox
        width={width}
        padding={em(0.6)}
        background={blue}
        color={white}
        border-radius={em(0.2)}
      >
        Hello, Gum
      </TextBox>
    </Box>
  </TextCol>
)

return (
  <TextBox
    height={px(450)}
    aspect={1.4}
    font-size={px(16)}
    padding={em(1.5)}
    background={white}
    color={slate}
  >
    <TextCol gap={em(0.9)}>
      <Text font-size={em(1.5)} font-weight={bold}>Four ways to set a width</Text>
      <WidthExample label="Content: width omitted" />
      <WidthExample label="Fixed: width={px(180)}" width={px(180)} />
      <WidthExample label="Fraction: width={0.5}" width={0.5} />
      <WidthExample label={'Fill: width="fill"'} width="fill" />
    </TextCol>
  </TextBox>
)

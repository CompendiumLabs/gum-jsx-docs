// Unsized growth divides space equally; auto bases preserve different content widths first.
const Pair = ({ title, basis }) => (
  <TextCol gap={em(0.375)}>
    <Text font-size={em(0.8125)}>{title}</Text>
    <HStack gap={em(0.75)}>
      <TextBox grow={1} basis={basis} align="center" background={blue} color={white}>
        Short
      </TextBox>
      <TextBox grow={1} basis={basis} align="center" background={red} color={white}>
        A longer label
      </TextBox>
    </HStack>
  </TextCol>
)
return <TextBox width={px(560)} color={slate} padding={em(1.25)}>
  <TextCol gap={em(1.125)}>
    <Text font-size={em(1.5)} font-weight={bold}>Choose the starting size</Text>
    <Pair title="grow={1}: equal shares from zero" />
    <Pair title={'basis="auto": content widths plus equal growth'} basis="auto" />
    <Text font-size={em(0.875)}>Both rows use the same labels, gap, and growth weights.</Text>
  </TextCol>
</TextBox>

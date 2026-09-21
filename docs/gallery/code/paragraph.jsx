// Both columns query the same Text description; only the offered width changes.
const Compare = ({ children }) =>
  <HStack gap={em(1)}>
    <VStack width={em(25)}>
      <Text font-size={em(0.8)} font-weight={bold} color={blue}>Wider allocation</Text>
      {children}
    </VStack>
    <VStack width={em(15)}>
      <Text font-size={em(0.8)} font-weight={bold} color={blue}>Narrower allocation</Text>
      {children}
    </VStack>
  </HStack>

return <Box padding={em(1)} font-size={px(18)}>
  <VStack gap={em(1)}>
    <Text font-size={em(1.65)} font-weight={bold}>One paragraph, two widths</Text>
    <Text font-size={em(0.8)} color={slate}>Same source and prepared glyphs. Both columns use an 18px font.</Text>
    <Compare>
      <Text line-height={em(1.4)}>
        A paragraph now answers a width offer with <Span font-weight={bold}>real glyph measurements.</Span> The words reflow, while the font size stays at 18 pixels. <Span font-style="italic" color={blue}>Styled runs share the same baseline,</Span> and the prepared text is reused for each allocation.
      </Text>
    </Compare>
  </VStack>
</Box>

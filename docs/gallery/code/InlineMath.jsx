// The same inline formula reflows in paragraphs, styled spans, text boxes, and bullets.
const rate = (
  <Tex>
    <Frac>
      <TextMode>distance</TextMode>
      <TextMode>time</TextMode>
    </Frac>
  </Tex>
)
const paragraph = (
  <Span>
    {"The average speed is "}
    {rate}
    {". Each formula stays together as the paragraph wraps, and a tall fraction expands the line around its baseline."}
  </Span>
)
return (
  <Box font-size={px(22)} padding={em(1)}>
    <TextCol width="fill" gap={em(0.9)}>
      <Text font-size={em(1.35)} font-weight={700}>Math belongs in the paragraph</Text>
      <Text>
        {"When "}
        <Span color={blue}>
          <Tex>
            <SupSub sup="2">x</SupSub>
            +
            <SupSub sup="2">y</SupSub>
            =1
          </Tex>
        </Span>
        {", the point lies on the unit circle. Prose and formulas share a baseline."}
      </Text>
      <VStack gap={em(1)} align="fill">
        <TextFrame>{paragraph}</TextFrame>
        <TextFrame width={0.75}>{paragraph}</TextFrame>
      </VStack>
      <Bullets
        items={[
          ["The rate ", rate, " also works in a list item."],
          ["Styles can emphasize ", <Span color={blue}>{rate}</Span>, " without changing the surrounding prose."],
        ]}
      />
    </TextCol>
  </Box>
)

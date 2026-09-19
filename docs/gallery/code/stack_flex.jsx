// Main-axis allocation and cross-axis alignment are separate. Each bar is a Box
// with ordinary child flex metadata; the stack only allocates its border box.
function Bar({ label, color, ...props }) {
  return <Box height={px(40)} align="center" background={color} radius={em(0.3)} {...props}>
    <Text color={white} font-size={em(0.875)} font-weight={bold}>{label}</Text>
  </Box>
}

return <TextBox width="fill" color={slate} padding={em(1.25)}>
  <TextCol gap={em(1.125)}>
    <Text font-size={em(1.5)} font-weight={bold}>Where the space goes</Text>
    <TextCol gap={em(0.375)}>
      <Text font-size={em(0.8125)}>Zero bases, growth weights 1 : 2 : 1</Text>
      <HStack gap={em(0.5)}>
        <Bar grow={1} color={blue} label="1" />
        <Bar grow={2} color={red} label="2" />
        <Bar grow={1} color={green} label="1" />
      </HStack>
    </TextCol>
    <TextCol gap={em(0.375)}>
      <Text font-size={em(0.8125)}>The middle bar stops at 120px; its neighbors share the rest</Text>
      <HStack gap={em(0.5)}>
        <Bar grow={1} color={blue} label="grow" />
        <Bar grow={2} max-width={px(120)} color={red} label="capped" />
        <Bar grow={1} color={green} label="grow" />
      </HStack>
    </TextCol>
    <TextCol gap={em(0.375)}>
      <Text font-size={em(0.8125)}>300px bases shrink equally to fit, including the 8px gap</Text>
      <HStack gap={em(0.5)}>
        <Bar basis={px(300)} shrink={1} color={blue} label="shrink" />
        <Bar basis={px(300)} shrink={1} color={red} label="shrink" />
      </HStack>
    </TextCol>
    <HStack gap={em(0.5)} align="center">
      <Text shrink={1} font-size={em(0.8125)}>A Spacer takes the remainder</Text>
      <Spacer />
      <Bar width={px(88)} color={blue} label="At the end" />
    </HStack>
  </TextCol>
</TextBox>

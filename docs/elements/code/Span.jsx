// Inline styles share paragraph wrapping and do not introduce word breaks.
<TextBox padding={em(1.5)} background={lightgray}>
  <TextCol gap={em(1)}>
    <Text font-size={em(1.5)}>A <Span font-weight={bold} color={blue}>small</Span> style change</Text>
    <Text font-size={em(1.1)} line-height={em(1.4)}>Use <Span font-style="italic">emphasis</Span>, a <Span font-family={mono} color={red}>code name</Span>, or a different <Span color={green}>color</Span> without splitting the paragraph.</Text>
    <Text font-size={em(1.1)}>un<Span font-weight={bold} color={blue}>break</Span>able</Text>
  </TextCol>
</TextBox>

// a column with a heading at scale 1.5, a paragraph, a formula at the text size, and a list
<TextCol width={24} gap={0.6}>
  <Text scale={1.5}>Growth of a Sum</Text>
  <Text>The partial sums of the harmonic series grow without bound, but only just: they track the natural logarithm.</Text>
  <Latex>{"\\sum_{k=1}^{n} \\frac{1}{k} = \\ln n + \\gamma + o(1)"}</Latex>
  <Bullets>
    <Text>the constant <Tex>\gamma</Tex> is about 0.577</Text>
    <Text>a million terms reach only about 14.4</Text>
  </Bullets>
</TextCol>

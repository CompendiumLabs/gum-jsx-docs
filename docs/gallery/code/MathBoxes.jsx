// Invisible dimensions and visible overhang are separate layout choices.
<Box width={px(730)} font-size={px(32)} padding={em(1)}>
  <VStack gap={em(0.9)} align="start">
    <Text font-size={em(0.65)} font-weight={700}>Reserve height without drawing</Text>
    <Latex>
      {String.raw`
        \sqrt{\frac{1}{x}} + \sqrt{\vphantom{\frac{1}{x}}y}
        \qquad
        a + \phantom{x+y} + b
      `}
    </Latex>
    <Text font-size={em(0.65)} font-weight={700}>Retain ink without its full dimensions</Text>
    <Latex>
      {String.raw`
        \sqrt{\smash{x^2}}
        \qquad
        \sum_{\mathclap{1\leq i\leq n}} x_i
        \qquad
        \smash[t]{\frac{x}{y}} + \smash[b]{\frac{x}{y}}
      `}
    </Latex>
    <Text font-size={em(0.65)} font-weight={700}>Frames, highlights, and cancellation</Text>
    <Latex>
      {String.raw`
        \boxed{x^2+1}
        \quad
        \fcolorbox{blue}{yellow}{$y$}
        \quad
        \cancel{x} + \bcancel{a+b} + \xcancel{\frac{1}{y}}
      `}
    </Latex>
    <Text font-size={em(0.65)} font-weight={700}>Rules, shifts, and verbatim text</Text>
    <Latex>
      {String.raw`
        x\rule[2pt]{1em}{0.6pt}y
        \quad
        x\raisebox{0.5ex}{up}\raisebox{-2pt}{down}y
        \quad
        \verb*|a b|
      `}
    </Latex>
  </VStack>
</Box>

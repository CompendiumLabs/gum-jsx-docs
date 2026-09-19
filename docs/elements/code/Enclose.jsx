// Enclosures mix frames, backgrounds, and overprinted cancellation marks.
<Box font-size={px(36)} padding={em(0.8)}>
  <MathText>
    <Enclose background={interp(white, yellow, 0.3)} border-color={blue}>
      <MathText>x^2+1</MathText>
    </Enclose>
    =
    <Enclose notation="cancel" color={red}>y</Enclose>
    +
    <Enclose notation="xcancel">
      <Frac>
        <MathText>a</MathText>
        <MathText>b</MathText>
      </Frac>
    </Enclose>
  </MathText>
</Box>

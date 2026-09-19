// The body sets the brace width, and the label uses script style.
<Box font-size={px(36)} padding={em(0.7)}>
  <MathText style="display">
    <HorizBrace label={String.raw`n\text{ terms}`}>
      <MathText>a_1+a_2+\cdots+a_n</MathText>
    </HorizBrace>
    =
    <HorizBrace over={false} label={String.raw`\text{total}`}>
      <MathText>S_n</MathText>
    </HorizBrace>
  </MathText>
</Box>

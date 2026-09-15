// Overbraces and underbraces span the body while their labels use script style.
<Svg width={px(900)} font-size={px(36)}>
  <Box padding={em(0.9)}>
    <MathCol gap={em(1)} justify="start">
      <MathText style="display">
        <HorizBrace label={String.raw`n\text{ terms}`}>
          <MathText>a_1+a_2+\cdots+a_n</MathText>
        </HorizBrace>
        =S_n
      </MathText>
      <MathText style="display">
        T=
        <HorizBrace over={false} label={String.raw`\text{remainder}`}>
          <Frac>
            <MathText>1</MathText>
            <MathText>n+1</MathText>
          </Frac>
        </HorizBrace>
      </MathText>
    </MathCol>
  </Box>
</Svg>

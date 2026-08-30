// a color-coded definition of the 2x2 matrix inverse
const a = <MathSymbol color={blue}>a</MathSymbol>
const b = <MathSymbol color={red}>b</MathSymbol>
const c = <MathSymbol color={green}>c</MathSymbol>
const d = <MathSymbol color={purple}>d</MathSymbol>
return <MathText>
  <SupSub sup="-1">
    <Bracket delim="square">
      <MathArray ncol={2}>
        {a}
        {b}
        {c}
        {d}
      </MathArray>
    </Bracket>
  </SupSub>
  <MathSymbol>=</MathSymbol>
  <Frac>
    {"1"}
    <MathText>{a}{d}{"-"}{b}{c}</MathText>
  </Frac>
  <Bracket delim="square">
    <MathArray ncol={2}>
      {d}
      <MathText>{"-"}{b}</MathText>
      <MathText>{"-"}{c}</MathText>
      {a}
    </MathArray>
  </Bracket>
</MathText>

// the same sum, integral and named operator set in display style, with stacked limits and large glyphs, and below it in text style, with side scripts and small ones
<VStack spacing={0.2}>
  <MathText>
    <SupSub sup="n" sub="i=1"><MathOp>\sum</MathOp></SupSub>
    {"x_i ="}
    <SupSub sup="1" sub="0"><MathOp>\int</MathOp></SupSub>
    {"f(x) \\, dx +"}
    <SupSub sub="\theta"><MathOp>argmax</MathOp></SupSub>
    {"g(\\theta)"}
  </MathText>
  <MathText>
    <SupSub sup="n" sub="i=1"><MathOp style="text">\sum</MathOp></SupSub>
    {"x_i ="}
    <SupSub sup="1" sub="0"><MathOp style="text">\int</MathOp></SupSub>
    {"f(x) \\, dx +"}
    <SupSub sub="\theta"><MathOp style="text">argmax</MathOp></SupSub>
    {"g(\\theta)"}
  </MathText>
</VStack>

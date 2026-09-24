---
category: math
description: "Parsed TeX and explicit JSX use the same math elements."
---

# Ordinary mathematical expressions

Parsed TeX and explicit JSX use the same math elements. Use a string for a compact
formula, or compose elements when operands, styles, or colors come from code.

The example includes Euler's identity, the quadratic formula, a Gaussian
integral, a sum with limits, and nested fractions with a middle delimiter.

```jsx
<MathText style="display">
  x=
  <Frac>
    <MathText>
      -b±
      <Sqrt>
        <MathText>
          <SupSub sup="2">b</SupSub>
          -4ac
        </MathText>
      </Sqrt>
    </MathText>
    <MathText>2a</MathText>
  </Frac>
</MathText>
```

[SupSub](../../elements/text/SupSub.md) attaches scripts and limits;
[Frac](../../elements/text/Frac.md) selects numerator and denominator styles;
[Sqrt](../../elements/text/Sqrt.md) cramps its radicand and sizes the surd.
[MathOp](../../elements/text/MathOp.md) sets operator size and limit policy;
[Bracket](../../elements/text/Bracket.md) measures a complete delimiter group.

Direct string operands are TeX source, just like string children of `MathText`.
Keep nested element operands indented on separate lines so the mathematical
structure stays readable. Whitespace between elements is ignored by math.

All geometry is in outline paths, so the CLI, editor, and docs previews use the
same layout without installed fonts. [Math authoring](../../guides/text/math.md) describes font
setup and comparison with KaTeX and LaTeX. Continue with [inline formulas](inline_math.md),
[matrices and arrays](math_arrays.md), or [aligned equations](aligned_math.md).

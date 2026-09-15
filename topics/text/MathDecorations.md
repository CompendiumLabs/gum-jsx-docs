# Math decorations

*Category*: math

Accents, horizontal rules, braces, and extensible arrows work in TeX and JSX.
Their bodies and labels can contain ordinary Gum elements as well as math.

## Accents and rules

Use `\hat{x}`, `\bar{x}`, `\vec{v}`, `\dot{x}`, or `\ddot{x}` for fixed
accents. `\acute`, `\grave`, `\breve`, `\check`, `\tilde`, and `\mathring`
are also supported. Character skew comes from the selected font. In
`\hat{x}_i^2`, scripts attach to the underlying character; an accented
compound body uses the whole decorated box.

`\widehat`, `\widecheck`, and `\widetilde` fit the measured operand width.
Their height grows modestly as the expression widens. `\overline` and
`\underline` span the complete advance. The corresponding elements are
[Accent](../../elements/text/Accent.md), [Overline](../../elements/text/Overline.md),
and [Underline](../../elements/text/Underline.md).

Arrow decorations include `\overrightarrow`, `\overleftarrow`,
`\overleftrightarrow`, their under forms, `\Overrightarrow`, and
`\overleftharpoon`/`\overrightharpoon`. Groups and line segments have
over/under forms; `\utilde` puts a tilde below the body. In JSX, choose the
shape through `Accent.accent` and use `under={true}` for an under decoration.

## Braces and labeled arrows

```jsx
<MathText>
  <HorizBrace label={String.raw`n\text{ terms}`}>
    <MathText>a_1+\cdots+a_n</MathText>
  </HorizBrace>
  =
  <MathText>S_n</MathText>
</MathText>
```

[HorizBrace](../../elements/text/HorizBrace.md) measures the body before the
label. A long label can enlarge the complete box while the brace continues to
span the body. TeX's matching superscript/subscript becomes the label; an
opposite script remains at the side. Horizontal brackets work the same way.

[XArrow](../../elements/text/XArrow.md) centers its arrow on the math axis and
sizes it to the larger padded label. TeX uses `\xrightarrow[below]{above}`;
left/bidirectional, double, hook, mapsto, two-headed, harpoon, paired, and
equilibrium variants are available. [MathStretch](../../elements/text/MathStretch.md)
lists the shape names and also exposes the shapes directly.

`\overset{above}{body}`, `\underset{below}{body}`, and `\stackrel` force
stacking even in inline or script style. For direct composition, use
[SupSub](../../elements/text/SupSub.md) with `limits="always"` and the
appropriate atom class.

All generated paths inherit color and opacity, including on dark backgrounds.
These are Gum's own shapes, so their curves can differ from KaTeX and LaTeX.
No font glyph is stretched horizontally to simulate a wide hat or tilde.

Run `bun run compare --suite 6 -S 48 -o /tmp/typography.png` for the common
Gum/KaTeX/LaTeX gallery; add `--inline` for text style. The extended gallery is
`--suite 6-extra --no-latex`, covering the additional KaTeX command names.

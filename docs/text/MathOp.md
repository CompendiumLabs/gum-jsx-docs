# MathOp

*Category*: math

*Inherits*: [MathSymbol](/docs/MathSymbol) > **MathSpan** > **Span** > [Element](/docs/Element)

A large operator or a named function as an Op atom: `\sum`, `\prod`, `\int`, `\bigcup` and the other big operators, or `\lim`, `\sin`, `\log`, `\max` and any other upright name. This is what [Latex](/docs/Latex) produces for those commands and for `\operatorname{...}`. Symbol operators are glyphs from the KaTeX size fonts centered on the math axis, at the large size in display style and the small one otherwise, so a `\sum` grows in a displayed equation and shrinks inline. Named operators are set as upright text on the baseline; any name works (`argmax`, `softmax`, `tr`), which is `\operatorname`. The operator can be given by command name (`\sum`), by its Unicode glyph (`∑`, `∫`), or as a bare name (`lim`).

In a [MathText](/docs/MathText) row it is classed as an operator, so a thin space separates it from an ordinary atom on either side (`\sin x`). Wrapped in a [SupSub](/docs/SupSub), the scripts of an operator that takes limits (`\sum`, `\prod`, `\bigcup`, `\lim`, `\max`, ...) stack above and below it in display style, while `\int` and the function names take side scripts; `limits` overrides the operator's own convention. Limits only ever apply in display style, as in TeX; in text style scripts always go to the side (though [SupSub](/docs/SupSub)'s own `limits` can force them regardless).

Note that `style` defaults to `display` here, so a bare `<MathOp>` comes out at the large size; pass `style="text"` to match the symbols around it in an inline row.

Parameters:
- `children` — the operator: a command name (`\sum`, `\int`, `\lim`), a Unicode big operator (`∑`, `∏`, `∫`), or a plain name to set upright (`argmax`)
- `style` = `display` — the TeX math style (`display`, `text`, `script`, or `scriptscript`), which picks the glyph size and whether limits apply
- `limits` — whether scripts stack as limits in display style; defaults to the operator's own convention
- `klass` = `mop` — the atom class used for spacing in a row
- `font-family` — the face for a named operator, one of the face globals (`mathsf`, `mathbf`, ...) as in [MathSymbol](/docs/MathSymbol)
- `color` — the colour of the operator

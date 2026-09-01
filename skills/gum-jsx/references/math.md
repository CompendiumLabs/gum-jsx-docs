# Math Elements

## Accent

*Inherits*: **MathGroup** > **Group** > **Element**

Sets an accent glyph over a base, as **Latex** does for `\hat{x}`, `\vec{v}`, `\bar{y}`, `\tilde{n}`, `\dot{q}` and the other accent commands. Scripts go on the accent rather than the base: `sup` and `sub` attach to the base character itself, so the accent does not lift them and `\hat{x}^2` sets its `2` where `x^2` does.

The accent is named by its LaTeX command in `label`. The wide accents (`\widehat`, `\widetilde`, `\widecheck`) use the same glyph as their narrow forms here; the stretchy arrow accents (`\overrightarrow` and friends) are drawn by **MathStretch** instead. Text-mode accents such as `\'`, `\"` and `\c` live in the text symbol table and need `mode="text"`.

Parameters:
- `children` — the base, a LaTeX string or a single math element
- `label` — the accent command, such as `\hat`, `\bar`, `\tilde`, `\vec`, `\dot`, `\ddot`, `\check`, `\breve`, `\acute`, or `\grave`
- `sup` / `sub` — scripts on the base, elements or LaTeX strings
- `style` = `text` — the math style of the base (`display`, `text`, `script`, or `scriptscript`)
- `mode` = `math` — the symbol table to look the accent up in, `math` or `text`
- `color` — the colour of the accent glyph

**Example**

Prompt: the common accents set over single letters, and a hat on a capital with a superscript

Generated code:
```jsx
<MathText>
  <Accent label="\hat">x</Accent>
  <MathSymbol>+</MathSymbol>
  <Accent label="\bar">y</Accent>
  <MathSymbol>+</MathSymbol>
  <Accent label="\tilde">n</Accent>
  <MathSymbol>+</MathSymbol>
  <Accent label="\dot">q</Accent>
  <MathSymbol>+</MathSymbol>
  <Accent label="\vec" color={blue}>v</Accent>
  <MathSymbol>+</MathSymbol>
  <Accent label="\hat" sup="2">A</Accent>
</MathText>
```

## Bracket

*Inherits*: **HStack** > **Group** > **Element**

Wraps a single child in a matched pair of delimiters. The delimiter can be chosen from a preset name or given as a pair to mix left and right shapes.

Parameters:
- `children` — a single element to enclose
- `delim` = `'round'` — one of `'round'`, `'square'`, `'curly'`, `'angle'`, or a `[left, right]` pair of those values

Subunit names:
- `delim` — forwarded to the generated delimiter symbols, for example `delim-level`

**Example**

Prompt: the ratio of alpha to beta enclosed in parentheses

Generated code:
```jsx
<Bracket>
  <Frac>
    <MathSymbol>\alpha</MathSymbol>
    <MathSymbol>\beta</MathSymbol>
  </Frac>
</Bracket>
```

## Frac

*Inherits*: **Box** > **Group** > **Element**

Builds a numerator-over-denominator fraction. Pass the numerator and denominator as the two children. By default a horizontal bar is drawn between them, but it can be omitted for binomial-style layouts.

Parameters:
- `children` — `[numerator, denominator]`
- `has-bar` = `true` — whether to draw the fraction bar
- `padding` = `0.1` — padding applied around numerator and denominator
- `rule-size` = `0.005` — thickness of the fraction bar

**Example**

Prompt: a fraction with x + 1 over y - 1

Generated code:
```jsx
<Frac>
  <MathText>
    <MathSymbol>x</MathSymbol>
    <MathSymbol>{'+'}</MathSymbol>
    <MathSymbol>1</MathSymbol>
  </MathText>
  <MathText>
    <MathSymbol>y</MathSymbol>
    <MathSymbol>{'-'}</MathSymbol>
    <MathSymbol>1</MathSymbol>
  </MathText>
</Frac>
```

## HorizBrace

*Inherits*: **MathGroup** > **Group** > **Element**

Draws a horizontal curly brace over or under its body, with an optional label riding beyond the brace, as **Latex** does for `\overbrace{...}^{label}` and `\underbrace{...}_{label}`. The brace is drawn (see **MathStretch**) to the width of the body, down to a floor so a brace over a single letter does not collapse into a squiggle, and the body keeps its own baseline. The braced atom is an inner atom, so it spaces like a delimited group.

The body is set in display style, as TeX does, so operators inside it take limits and fractions stay full size; a script `style` is kept as is. The label is set at script size, like the script it is written as in TeX, and a string label is parsed in that script style.

Parameters:
- `children` — the body, a LaTeX string or a single math element
- `label` — an optional label beyond the brace, a LaTeX string or a math element (such as a **TextMode**)
- `over` = `true` — whether the brace goes over (`true`) or under (`false`) the body
- `style` = `text` — the TeX math style in force
- `height` = `0.548` — the height of the brace in em
- `thickness` = `0.1` — the thickness of the brace strokes in em
- `color` — the colour of the brace

**Example**

Prompt: an overbrace with a label counting its terms, and an underbrace naming a tail

Generated code:
```jsx
<MathText>
  <HorizBrace label="\text{head}">a + b + c</HorizBrace>
  <MathSymbol>+</MathSymbol>
  <HorizBrace over={false} label="\text{tail}">x+y</HorizBrace>
</MathText>
```

## Latex

*Inherits*: **MathText** > **HStack** > **Group** > **Element**

Parses a LaTeX string with KaTeX and converts it into gum math elements such as **Frac**, radical layouts, and **Bracket**. If parsing fails, the raw source is displayed in red so the error is visible in the output. **Tex** is the same element with `inline` defaulting to `true`, for math set in text style.

Parameters:
- `children` — the LaTeX source string
- `inline` = `false` — shorthand for selecting `style="text"` when no explicit style is provided
- `style` — explicit TeX math style; defaults to `display`, or `text` when `inline` is true
- `strut` = `true` — reserve a minimum top-level math line box
- any **MathText** layout parameters are also accepted

**Example**

Prompt: There are two latex equations framed by rounded borders arranged vertically. The top one shows a Gaussian integral and the bottom one shows a trigonometric identity.

Generated code:
```jsx
<VStack spacing>
  <Frame padding rounded border={2}>
    <Latex>{"\\int_0^{\\infty} \\exp(-x^2) dx = \\sqrt{\\pi}"}</Latex>
  </Frame>
  <Frame padding rounded border={2}>
    <Latex>{"\\sin^2(\\theta) + \\cos^2(\\theta) = 1"}</Latex>
  </Frame>
</VStack>
```

## MathArray

*Inherits*: **Group** > **Element**

Lays out math cells in rows and columns, following LaTeX's `array` metrics: every row gets a strut so short rows still take a full line, columns are as wide as their widest cell and separated by `\arraycolsep`, and the whole array is centered on the math axis. This is what **Latex** builds for every tabular environment, from `matrix` and `pmatrix` through `cases`, `aligned` and `array`, with `\hline`/`\hdashline` and the `|`/`:` column separators.

From JSX the cells can be given as a flat list plus `ncol`, which is reshaped into rows the way **Grid** does (nested arrays in JSX children are flattened), or as a list of rows. Each cell is a LaTeX string (parsed in `style`) or a math element. The array has no delimiters of its own; wrap it in a **Bracket** for a `pmatrix` or `bmatrix`, which stretches its delimiters to the array's height.

Parameters:
- `children` — the cells, either a flat list chunked by `ncol` or a list of rows
- `style` = `text` — the TeX style string cells are parsed in
- `ncol` — the number of columns to chunk a flat list of cells into; defaults to the number of aligned columns in `cols`, else `1`
- `cols` — the column descriptors, in order, as objects: `{ type: 'align', align: 'l' | 'c' | 'r' }` for a column (with optional `pregap`/`postgap` in em) and `{ type: 'separator', separator: '|' | ':' }` for a solid or dashed rule between columns. Columns beyond the descriptors are centered
- `stretch` = `1` — the row spacing multiplier, LaTeX's `\arraystretch`
- `jot` = `false` — add `\jot` of extra leading between rows, as the AMS `aligned`/`gathered` environments do
- `colsep` = `0.5` — the space on either side of each column in em, LaTeX's `\arraycolsep`
- `outer` = `false` — whether to pad the outer edges by `colsep` as well
- `hlines` — a list with one entry per row boundary (before the first row through after the last), each a list of rules to draw there, `true` for dashed and `false` for solid
- `rowgaps` — extra depth to add after each row in em, like `\\[len]`
- `thickness` = `0.04` — the thickness of the rules in em
- `fill` — the colour of the rules (`color` is accepted as an alias)

**Example**

Prompt: a color-coded definition of the 2x2 matrix inverse

Generated code:
```jsx
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
```

## MathBox

*Inherits*: **Group** > **Element**

Wraps one item in a math box of its own, with padding, a fixed width, a chosen anchor, and an atom class for spacing. It is the bridge from ordinary gum elements into math. Any **Element** dropped into a **MathText** is already an atom (a box as wide as its aspect and one em tall, centred on the baseline, classed as ordinary, so it butts up against its neighbors), and a **MathBox** is how to say what it should be instead: `klass="mbin"` makes a custom glyph space like `+`, `klass="mrel"` like `=`, which is how the gallery's Scenic Route arrow takes its place in a row. A math child works too, a LaTeX string or a math element, when it needs padding or a fixed width: `\boxed` and `\fbox` are a **MathBox** with a frame drawn around it, and a box with `advance` and `justify` lines terms up in a column.

The box itself draws nothing. It keeps the child's own spacing classes unless `klass` overrides them, and places the child by its ink, so a child that overhangs its layout box (as `\rlap` does) still overhangs.

Parameters:
- `children` — the one item to box: a LaTeX string, a math element, or any ordinary `Element`
- `padding` = `0` — padding around the child in em, given as for **Box**: a scalar, `[horizontal, vertical]`, or `[left, top, right, bottom]`
- `advance` — the width of the inner box in em; defaults to the child's own. In a wider box the child is placed by `justify`
- `justify` = `center` — where the child sits in a wider box: `left`, `center`, or `right`
- `vanchor` — where the math axis crosses the box, measured down from its top in em; defaults to keeping the child where it was, so a smaller value hangs the box lower
- `klass` — the atom class the box takes in a row, one of `mord`, `mop`, `mbin`, `mrel`, `mopen`, `mclose`, `mpunct`, `minner`, or `none`; defaults to the child's own classes, `mord` for an ordinary element
- `style` = `text` — the TeX style a string child is parsed in

**Example**

Prompt: a blue circle as a custom operator between a and b: dropped in plainly it touches its neighbors, wrapped in a MathBox classed as a binary operator it spaces like a plus, and an arrow boxed as a relation two ems wide spaces like an equals sign

Generated code:
```jsx
const op = <Box padding>
  <Circle fill={blue} />
</Box>
return <VStack spacing={0.15}>
  <MathText>
    {"a"}
    {op}
    {"b = c"}
  </MathText>
  <MathText>
    {"a"}
    <MathBox klass="mbin">{op}</MathBox>
    {"b = c"}
  </MathText>
  <MathText>
    {"a"}
    <MathBox klass="mrel" advance={2}>
      <Arrow points={[[0, 0.5], [1, 0.5]]} stroke-width={10} arrow-size={0.5} arrow-curve={0.75} />
    </MathBox>
    {"b"}
  </MathText>
</VStack>
```

## MathOp

*Inherits*: **MathSymbol** > **MathSpan** > **Span** > **Element**

A large operator or a named function as an Op atom: `\sum`, `\prod`, `\int`, `\bigcup` and the other big operators, or `\lim`, `\sin`, `\log`, `\max` and any other upright name. This is what **Latex** produces for those commands and for `\operatorname{...}`. Symbol operators are glyphs from the KaTeX size fonts centered on the math axis, at the large size in display style and the small one otherwise, so a `\sum` grows in a displayed equation and shrinks inline. Named operators are set as upright text on the baseline; any name works (`argmax`, `softmax`, `tr`), which is `\operatorname`. The operator can be given by command name (`\sum`), by its Unicode glyph (`∑`, `∫`), or as a bare name (`lim`).

In a **MathText** row it is classed as an operator, so a thin space separates it from an ordinary atom on either side (`\sin x`). Wrapped in a **SupSub**, the scripts of an operator that takes limits (`\sum`, `\prod`, `\bigcup`, `\lim`, `\max`, ...) stack above and below it in display style, while `\int` and the function names take side scripts; `limits` overrides the operator's own convention. Limits only ever apply in display style, as in TeX; in text style scripts always go to the side (though **SupSub**'s own `limits` can force them regardless).

Note that `style` defaults to `display` here, so a bare `<MathOp>` comes out at the large size; pass `style="text"` to match the symbols around it in an inline row.

Parameters:
- `children` — the operator: a command name (`\sum`, `\int`, `\lim`), a Unicode big operator (`∑`, `∏`, `∫`), or a plain name to set upright (`argmax`)
- `style` = `display` — the TeX math style (`display`, `text`, `script`, or `scriptscript`), which picks the glyph size and whether limits apply
- `limits` — whether scripts stack as limits in display style; defaults to the operator's own convention
- `klass` = `mop` — the atom class used for spacing in a row
- `font-family` — the face for a named operator, one of the face globals (`mathsf`, `mathbf`, ...) as in **MathSymbol**
- `color` — the colour of the operator

**Example**

Prompt: the same sum, integral and named operator set in display style, with stacked limits and large glyphs, and below it in text style, with side scripts and small ones

Generated code:
```jsx
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
```

## MathStretch

*Inherits*: **MathShape** > **Group** > **Element**

Draws one of the stretchy math decorations: the braces, the stretchy arrow accents (`\overrightarrow`, `\underleftarrow`, `\overleftharpoon`, …), the line segments and groups (`\overlinesegment`, `\overgroup`, `\utilde`), and the extensible arrows (`\xrightarrow`, `\xmapsto`, `\xrightleftharpoons`, `\xlongequal`, …). No font carries stretchable versions of these, so gum draws them from its own shape table, keyed by the KaTeX command name, using KaTeX's heights and minimum widths. The arrows are gum's own **Arrow** and **ArrowHead** with barbs matching Computer Modern; the braces are filled outlines.

This is the bare decoration. **Latex** places it over or under a body, stretched to the body's width, and **HorizBrace** does the same for a brace with a label. On its own it is a math item of the given width and its natural height that can be dropped into a **MathText**, which is handy for a long arrow between two expressions. It is classed as a relation, so a row spaces it the way `\xrightarrow` and friends are spaced in LaTeX; pass `klass` to space it as something else.

Parameters:
- `label` = `overbrace` — the decoration to draw, named by its LaTeX command with or without the backslash: one of `overbrace`, `underbrace`, `overrightarrow`, `overleftarrow`, `underrightarrow`, `underleftarrow`, `overleftrightarrow`, `underleftrightarrow`, `Overrightarrow`, `overleftharpoon`, `overrightharpoon`, `overlinesegment`, `underlinesegment`, `overgroup`, `undergroup`, `utilde`, `xrightarrow`, `xleftarrow`, `xleftrightarrow`, `xRightarrow`, `xLeftarrow`, `xLeftrightarrow`, `xlongequal`, `xtwoheadrightarrow`, `xtwoheadleftarrow`, `xrightharpoonup`, `xrightharpoondown`, `xleftharpoonup`, `xleftharpoondown`, `xhookrightarrow`, `xhookleftarrow`, `xmapsto`, `xrightleftharpoons`, `xleftrightharpoons`, `xrightleftarrows`, `xtofrom`, `xrightequilibrium`, `xleftequilibrium`
- `advance` — the width in em; the decoration's minimum width is used if this is smaller or absent
- `height` — the height in em; defaults to the decoration's natural height
- `thickness` — the stroke thickness in em; defaults to a TeX rule (`0.04`) for the arrows and lines, and the brace's own band for the braces
- `fill` — the colour of the shape (`color` is accepted as an alias)
- `klass` = `mrel` — the atom class used for spacing in a row

**Example**

Prompt: standalone decorations as math items: a long hooked arrow between two expressions

Generated code:
```jsx
<MathText>
  <MathSymbol>P</MathSymbol>
  <MathStretch label="xhookrightarrow" advance={2} />
  <MathSymbol>Q</MathSymbol>
</MathText>
```

## MathSymbol

*Inherits*: **MathSpan** > **Span** > **Element**

A single glyph as a math atom: the leaf that every other math element is built from, and what **Latex** produces for each letter, digit, and symbol command in a string. The child names the symbol, either as a LaTeX command (`\alpha`, `\times`, `\leq`, `\infty`) or as a literal character (`x`, `2`, `+`, `(`), and is looked up in KaTeX's symbol table for the given `mode`. The table supplies two things: the face the glyph is set in (the italic math face for letters, the upright main face for digits and most symbols, the AMS face for the AMS symbols) and the atom class (ordinary, operator, binary, relation, opener, closer, punctuation), which is what a **MathText** row uses to space its neighbors, so `+` gets medium spaces around it and `=` thick ones. The math box is the glyph's actual ink, with its italic correction (used to place a superscript) and accent skew (used by **Accent**).

Each element holds one symbol: a longer string is not parsed but drawn verbatim as one ordinary atom in the math italic face, so give strings to **MathText** instead. A literal character that is not in the table is set as an ordinary symbol in the default face; a command name that is not (anything starting with a backslash) is a strict-mode error. `mode="text"` looks the symbol up in the text table instead, which is how letters come out upright and how the text-only symbols (`\textdollar`, `\textsterling`, the text accents) are reached.

Parameters:
- `children` — the symbol: a LaTeX command name (`\alpha`, `\leq`, `\to`) or a single literal character (`x`, `2`, `+`)
- `mode` = `math` — the symbol table to look the symbol up in, `math` or `text`
- `klass` — the atom class used for spacing, overriding the table's: one of `mord`, `mop`, `mbin`, `mrel`, `mopen`, `mclose`, `mpunct`, `minner`, or `none`; `left` and `right` set the two sides separately
- `center` = `false` — center the ink on the math axis rather than sitting it on the baseline, as large operators and delimiters are
- `font-family` — the face to set the glyph in, the way `\mathbf` and friends do. The faces are global variables named by their commands: `mathbf`, `mathrm`, `mathit`, `mathbb`, `mathcal`, `mathscr`, `mathfrak`, `mathsf`, `mathtt`, and `boldsymbol` (a KaTeX face name string such as `'KaTeX_Main-Bold'` works too). Honoured only where that face has the glyph (`mathbb` has no digits, `mathcal` no lowercase), otherwise the symbol's own face is kept, as in KaTeX
- `color` — the colour of the glyph

**Example**

Prompt: a row of individual symbols: x in a calligraphic set that is a subset of blackboard-bold R, then a bold vector going to a red infinity

Generated code:
```jsx
<MathText>
  <MathSymbol>x</MathSymbol>
  <MathSymbol>\in</MathSymbol>
  <MathSymbol font-family={mathcal}>S</MathSymbol>
  <MathSymbol>\subset</MathSymbol>
  <MathSymbol font-family={mathbb}>R</MathSymbol>
  <MathSymbol>,</MathSymbol>
  <MathSymbol font-family={mathbf}>v</MathSymbol>
  <MathSymbol>\to</MathSymbol>
  <MathSymbol color={red}>\infty</MathSymbol>
</MathText>
```

## MathText

*Inherits*: **HStack** > **Group** > **Element**

Arranges math items in a horizontal row with automatic inter-atom spacing. Strings and numbers are parsed as LaTeX (as in **Latex**), nested **MathText** is flattened, and ordinary gum **Element** values can be mixed inline as well.

Spacing between neighbors is derived from their atom classes like `mord`, `mbin`, and `mrel`. An ordinary `Element` counts as an ordinary atom (`mord`) with no spacing of its own; wrap it in a **MathBox** to give it padding or another class.

Parameters:
- `children` — math items, nested arrays of math items, or ordinary `Element`s
- `style` = `text` — TeX style used when parsing string and scalar children
- `strut` = `false` — reserve a minimum top-level math line box
- all usual stack layout parameters are also accepted

**Example**

Prompt: a MathText row expressing "alpha = blue x red" where blue and red are represented by squares

Generated code:
```jsx
<Frame padding rounded>
  <MathText>
    <MathSymbol>\alpha</MathSymbol>
    <MathSymbol>=</MathSymbol>
    <Square rounded fill={blue} />
    <MathSymbol>\times</MathSymbol>
    <Square rounded fill={red} />
  </MathText>
</Frame>
```

## Overline

*Inherits*: **MathGroup** > **Group** > **Element**

Draws a rule over its body, spanning the body's full width and clearing its full height, as **Latex** does for `\overline`. The companion **Underline** draws the rule beneath the body instead, below its full depth, for `\underline`. Both take the same parameters. The body of an `Overline` is set in the cramped version of `style`, as TeX does for anything with something above it, so its superscripts sit lower; an `Underline` leaves the style alone.

Either can be nested in the other or in itself, and they compose with the other math elements: an overline over a **Frac** or **Sqrt** spans the whole construction.

Parameters:
- `children` — the body, a LaTeX string or a single math element
- `thickness` = `0.04` — the thickness of the rule in em
- `style` = `text` — the TeX math style to set the body in
- `color` — the colour of the rule (the body's text takes it too)

**Example**

Prompt: an overline and an underline, each spanning a body with height or depth, and a red overline drawn over a fraction

Generated code:
```jsx
<MathText>
  <Overline>x^2 + y</Overline>
  <MathSymbol>+</MathSymbol>
  <Underline>g_y + z</Underline>
</MathText>
```

## Sqrt

*Inherits*: **MathGroup** > **Group** > **Element**

Draws a radical: a surd glyph beside the body with a rule extending over it. The radical is chosen from the KaTeX size fonts as the smallest one that covers the body, so a tall radicand (a fraction, say) gets a taller surd rather than a stretched one. An optional `index` is set at script size in the crook of the surd, as in a cube root. This is what **Latex** produces for `\sqrt` and `\sqrt[n]`.

The body is a single child: a LaTeX string, which is parsed as in **Latex**, or any math element. It is set in the cramped version of `style`, so its superscripts sit lower, as TeX does.

Parameters:
- `children` — the radicand, a LaTeX string or a single math element
- `index` — an optional index, a LaTeX string or a math element, placed above and to the left of the surd at script-script size
- `rule-size` = `0.04` — the thickness of the rule over the body in em (`line-width` is accepted as an alias)
- `padding` = `0` — padding around the body, in em
- `style` = `text` — the TeX math style to set the body in
- `color` — the colour of the surd and rule (the body's text takes it too)

**Example**

Prompt: square roots of a short and a tall body, and a cube root with an index

Generated code:
```jsx
<MathText>
  <Sqrt>{"x^2 + y^2"}</Sqrt>
  <MathSymbol>+</MathSymbol>
  <Sqrt>{"\\frac{a}{b}"}</Sqrt>
  <MathSymbol>+</MathSymbol>
  <Sqrt index="3">z</Sqrt>
</MathText>
```

## SupSub

*Inherits*: **MathText** > **Group** > **Element**

Attaches a superscript and/or subscript to a base expression. The base comes from `children`, and `sup` / `sub` can be either elements or strings, which are parsed as LaTeX (so `sub="i=0"` or `sup="n+1"` work directly). Scripts are rendered one style level down and shifted following the TeX rules. When the base is a `MathOp` that takes limits in display style (such as `\sum`, `\prod`, or `\lim`), the scripts are stacked above and below the operator instead of placed to its right; this can be forced either way with `limits`.

Parameters:
- `children` — a single base element
- `sup` / `sub` — the superscript and subscript content
- `style` = `text` — the math style of the base (`display`, `text`, `script`, or `scriptscript`)
- `limits` — stack scripts above and below the base (defaults to the base operator's `limits` flag)

**Example**

Prompt: x squared with an i subscript

Generated code:
```jsx
<Frame padding rounded border={10} fill={gray} margin>
  <MathText>
    <SupSub sup="2" sub="i">
      <MathSymbol>x</MathSymbol>
    </SupSub>
  </MathText>
</Frame>
```

## TextMode

*Inherits*: **MathText** > **HStack** > **Group** > **Element**

Sets plain text inside math, the way `\text{...}` does. String children are shown literally (they are not parsed as LaTeX), upright in the text face composed from `family`, `bold`, and `italic`, with spaces kept. Ordinary gum **Element** values can be mixed inline as in **MathText**, which is also how to put math between words.

Parameters:
- `children` — text strings, or ordinary `Element`s
- `family` = `main` — the text family: `main` (roman), `sans`, or `mono`
- `bold` = `false` — set the text in the bold face
- `italic` = `false` — set the text in the italic face
- `style` = `text` — TeX style, which governs the inter-atom spacing
- `strut` = `false` — reserve a minimum top-level math line box
- any **MathText** layout parameters are also accepted

**Example**

Prompt: a math row with upright text between the symbols, one word in bold, above a sans-serif note with a variable in it

Generated code:
```jsx
<Frame padding rounded>
  <VStack spacing={0.1}>
    <MathText>
      {"x = 1"}
      <TextMode> if </TextMode>
      {"y > 0"}
      <TextMode>, and </TextMode>
      <TextMode bold>otherwise </TextMode>
      {"x = 0"}
    </MathText>
    <MathText>
      <TextMode family="sans">(where </TextMode>
      {"y"}
      <TextMode family="sans"> is the input and </TextMode>
      {"x"}
      <TextMode family="sans"> the output)</TextMode>
    </MathText>
  </VStack>
</Frame>
```

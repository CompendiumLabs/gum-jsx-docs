# Matrices and arrays

*Category*: math

Math tables measure their cells at natural size, align columns, and share a
baseline across each row. Fractions and other tall cells expand the row.
Matrix and cases delimiters fit the completed table.

```jsx
<Latex>
  {String.raw`
    A = \begin{pmatrix}
      a & bb \\
      ccc & d
    \end{pmatrix}
  `}
</Latex>
```

Use `&` between cells and `\\` between rows. Keep multiline examples indented,
and use `String.raw` so JavaScript preserves TeX backslashes.

| Environment | Cell style and behavior |
| --- | --- |
| `array`, `darray` | Text or display cells; required alignment string, such as `{lcr}` or `{|r:c|}`. Outer column gaps included. |
| `matrix`, `pmatrix`, `bmatrix`, `Bmatrix`, `vmatrix`, `Vmatrix` | Centered text cells; no delimiters, parentheses, brackets, braces, single bars, or double bars. |
| Each matrix name followed by `*` | Optional `[l]`, `[c]`, or `[r]` alignment; defaults to centered. |
| `cases`, `dcases` | Left brace, left-aligned columns, one-em column gap, and 1.2 array stretch. `dcases` uses display cells. |
| `rcases`, `drcases` | The corresponding cases layout with the brace on the right. |
| `smallmatrix` | Script cells, tighter column spacing, and half-height row struts. |
| `subarray` | One script-style column, with required `{l}` or `{c}` alignment. |
| `\substack{…}` | Centered script-style rows, often used in operator limits. |

An empty cell between separators stays empty. `\\[0.4em]` increases a row's
minimum depth; a tall cell may already provide that much depth. `\\[-0.2em]`
moves the next row upward. A local `\def\arraystretch{1.5}` enlarges the minimum
row struts without resizing glyphs.

Parsed environment cells reset an outer math alphabet, matching KaTeX. A local
command such as `\mathbf{x}` inside a cell still applies; cell colors inherit.

Arrays support solid `|` and dashed `:` column separators, repeated separators,
and `\hline` / `\hdashline` at row boundaries. Consecutive horizontal rules
are separated. Rules inherit the formula color, and their intersections meet
at the outer corners. Only the pinned KaTeX column syntax is accepted; LaTeX
preambles such as `p{…}` and `@{…}` are not supported.

For direct composition, [MathArray](../../elements/text/MathArray.md) accepts
flat JSX children with `ncol`, or nested child arrays with elements and TeX strings.
For example, `children: [["a", "b"], [null, "d"]]` reserves an empty cell at the
start of the second row. [Bracket](../../elements/text/Bracket.md) supplies
delimiters around a direct array. Shapes, plots, and explicitly sized text
blocks can be cells, just as they can be other math operands.

Arrays measure their cells naturally; a whole standalone formula shrinks to its
offered bounds automatically without changing the table's internal proportions.
Use `fit={false}` for unscaled allocation and intentional overflow. Give a prose
cell an explicit width to wrap it. Small shape and plot cells can use em widths
and aspect ratios, so their dimensions follow the surrounding base font.
See [fitting](./Sizing.md#fitting) for the distinction between inline and standalone math.
Formula ink may extend beyond the logical advance at outer rules and italic
glyphs, so retain padding inside an explicit SVG viewport.
Very tall braces and matrix bars retain the current glyph-scaling fallback;
their shapes can differ from the assembled delimiters in KaTeX and LaTeX.

[Aligned equations](AlignedMath.md) describes the related multiline display
environments. Equation numbering and `CD` diagrams remain deferred; explicit
tags and `CD` produce unsupported diagnostics.

# Math fonts and macros

*Category*: math

Math alphabets select a face per glyph. `\mathrm`, `\mathit`, `\mathbf`,
`\mathnormal`, `\mathbb`, `\mathcal`, `\mathfrak`, `\mathscr`, `\mathsf`,
`\mathsfit`, and `\mathtt` are supported, together with old declarations
such as `\rm`, `\bf`, and `\cal`. `\boldsymbol` and its `\bm` alias choose
bold italic math letters and bold main-font symbols where available.

The package registers eighteen faces. A requested alphabet uses its glyph
when present and falls back to the ordinary symbol face otherwise; for
example, `\mathcal{Ax}` uses calligraphic `A` and an ordinary math `x`.
[MathSpan](../../elements/text/MathSpan.md) requests an exact face and reports a
missing glyph. The named font constants can be passed as `font-family` in JSX.

## Composed text styles

Text commands combine family, weight, and shape with local scope:

| Choice | Commands |
| --- | --- |
| Family | `\textrm`, `\textnormal`, `\textsf`, `\texttt` |
| Weight | `\textbf`, `\textmd` |
| Shape | `\textit`, `\textup` |
| Emphasis | `\emph` toggles italic. |

`\text` inherits these choices. `\textbf{A\textit{B}C}` has bold `A` and `C`
around bold italic `B`. A family change does not reset weight or shape.
The bundled fonts have no sans bold italic or styled typewriter face; those
combinations fall back to the corresponding Main face, retaining weight and
shape. This is a deliberate difference from the pinned KaTeX renderer, which
errors on these missing variants.
Typewriter dashes remain separate characters. Literal runs retain spaces and
kerning, and text can contain `$…$` math.

A text command resets an enclosing math alphabet: `\mathbf{\text{ABC}}`
uses ordinary text. Use `\textbf{ABC}` for bold prose. Text weight and shape
also apply to text-like symbols such as digits in nested math, while math
letters retain their math face.

[TextMode](../../elements/text/TextMode.md) exposes literal strings, spans,
`family`, `bold`, and `italic` in JSX. Its direct text-style controls apply to
literal runs while nested math retains its own font. Missing glyphs still
raise an error when no supported fallback exists.

Text accents such as `\'{e}`, `\"{o}`, `\c{c}`, and `\textcircled{a}` work
inside text commands. `\verb|x^2|` preserves its characters in typewriter;
`\verb*|a b|` displays space markers. Verbatim uses text size even in a script.

## Macros and scope

Pass a string dictionary through `Latex.macros` or `MathText.macros`. Values
can use `#1` through `#9`. The dictionary is snapshotted with the element and
copied for each parse, so definitions cannot leak to later formulas.

```jsx
<Latex macros={{ "\\pair": String.raw`\langle #1,#1\rangle` }}>
  {String.raw`\widehat{\pair{x}}`}
</Latex>
```

In-source `\def`, `\gdef`, `\let`, `\newcommand`, `\renewcommand`, and
`\providecommand` follow the pinned parser's scope rules. Even a global
definition lasts only for that parse. KaTeX's expansion limit catches recursive
macros. Optional default arguments to `\newcommand` are not supported by the
pinned parser and produce a parse error.

Warnings default to errors and can be set to `warn` or `ignore`; this does not
enable unsupported commands or trusted HTML. A display-mode `\\` is normally
a no-op, as in LaTeX. Actual line breaks outside arrays remain unsupported;
use [MathCol](../../elements/text/MathCol.md) or an
[aligned environment](AlignedMath.md). Equations do not break automatically.

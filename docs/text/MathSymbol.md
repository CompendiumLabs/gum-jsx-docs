# MathSymbol

*Category*: math

*Inherits*: **MathSpan** > **Span** > [Element](/docs/Element)

A single glyph as a math atom: the leaf that every other math element is built from, and what [Latex](/docs/Latex) produces for each letter, digit, and symbol command in a string. The child names the symbol, either as a LaTeX command (`\alpha`, `\times`, `\leq`, `\infty`) or as a literal character (`x`, `2`, `+`, `(`), and is looked up in KaTeX's symbol table for the given `mode`. The table supplies two things: the face the glyph is set in (the italic math face for letters, the upright main face for digits and most symbols, the AMS face for the AMS symbols) and the atom class (ordinary, operator, binary, relation, opener, closer, punctuation), which is what a [MathText](/docs/MathText) row uses to space its neighbors, so `+` gets medium spaces around it and `=` thick ones. The math box is the glyph's actual ink, with its italic correction (used to place a superscript) and accent skew (used by [Accent](/docs/Accent)).

Each element holds one symbol: a longer string is not parsed but drawn verbatim as one ordinary atom in the math italic face, so give strings to [MathText](/docs/MathText) instead. A literal character that is not in the table is set as an ordinary symbol in the default face; a command name that is not (anything starting with a backslash) is a strict-mode error. `mode="text"` looks the symbol up in the text table instead, which is how letters come out upright and how the text-only symbols (`\textdollar`, `\textsterling`, the text accents) are reached.

Parameters:
- `children` — the symbol: a LaTeX command name (`\alpha`, `\leq`, `\to`) or a single literal character (`x`, `2`, `+`)
- `mode` = `math` — the symbol table to look the symbol up in, `math` or `text`
- `klass` — the atom class used for spacing, overriding the table's: one of `mord`, `mop`, `mbin`, `mrel`, `mopen`, `mclose`, `mpunct`, `minner`, or `none`; `left` and `right` set the two sides separately
- `center` = `false` — center the ink on the math axis rather than sitting it on the baseline, as large operators and delimiters are
- `font-family` — the face to set the glyph in, the way `\mathbf` and friends do. The faces are global variables named by their commands: `mathbf`, `mathrm`, `mathit`, `mathbb`, `mathcal`, `mathscr`, `mathfrak`, `mathsf`, `mathtt`, and `boldsymbol` (a KaTeX face name string such as `'KaTeX_Main-Bold'` works too). Honoured only where that face has the glyph (`mathbb` has no digits, `mathcal` no lowercase), otherwise the symbol's own face is kept, as in KaTeX
- `color` — the colour of the glyph

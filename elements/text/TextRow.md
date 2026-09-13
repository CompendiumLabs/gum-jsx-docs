# TextRow

*Category*: text

A text-aware stack: strings/numbers become Text elements at construction.
Existing figures retain their identities and flex metadata. TextStack uses
direction="vertical" by default, or "horizontal"; TextRow is horizontal with
baseline alignment, TextCol vertical with stretch alignment.

Other props follow [Stack](../../topics/text/Stack.md). gap defaults to 0.6em. Width allocation
reflows text while preserving glyph measurements and baselines. These wrappers
do not add automatic flex weights, fitting, or a separate text scale. Specify
grow/shrink/basis for flexible content.

[Runnable source](../code/TextRow.jsx).

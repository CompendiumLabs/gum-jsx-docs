# TextCol

*Category*: text

*Inherits*: [VStack](/docs/VStack) > [Stack](/docs/Stack) > [Group](/docs/Group)

A convenience form of `VStack` using `gap=0.5`, `justify="left"`, and
`valign="top"`. It uses the same measurement and placement engine and accepts
all [Stack](/docs/Stack) options. Text, math, and geometry can be mixed directly.

Dimensions and gaps are in em; nested `scale` values multiply. `width` and
`height` reserve exact space, while `max-width` and `max-height` provide budgets.
Use `grow` on a child to allocate remaining space. Formulas keep their size;
`overflow="shrink"` fits the entire composition when necessary.

# Gum: figures are programs

A five-slide introduction to Gum, written in Gum JSX:

1. The language: a JSX element tree becomes a drawing.
2. Layout: stacks, frames, pixel lengths, and font-relative units.
3. JavaScript: data, functions, and reusable components.
4. Mathematics: sampled curves, plots, and TeX.
5. Output: SVG, PNG, PDF, and manifest-based decks.

`index.json` defines the page order and loads `prelude.jsx`, which supplies the
palette and shared components. `Page` puts a `Slide` inside a 1280 × 720 `Svg`
with a base font size of 24. These are the only pixel dimensions in the layout;
the outer viewport can also be overridden by the CLI.

The slide title is measured, and the body uses `TextCol` and `HStack` to allocate
space between the subtitle, flexible panels, and footer. Panels use `Frame` for
padding and backgrounds. Text and code retain their natural heights; plots and
centered examples grow into the remaining space. All internal spacing and type
sizes use `em`, with no absolute positioning or fixed panel dimensions.

From the workspace root, with the CLI on your PATH:

```sh
gum gum-jsx-docs/decks/gum -o /tmp/gum.pdf
gum gum-jsx-docs/decks/gum/04_math.jsx -o /tmp/gum-math.svg
```

The individual-slide command loads the same prelude automatically. With the
CLI's development checkout, use `bun gum-jsx-cli/src/cli.ts` in place of `gum`.

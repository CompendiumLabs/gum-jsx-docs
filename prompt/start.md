# Getting started with Gum

Gum describes plots, diagrams, math, slides, and animations with JavaScript and
JSX. It measures the composition and renders SVG, PNG, PDF, PPTX, or MP4.
It is not React, HTML, or a browser DOM. These docs ship with your installed
version and work offline.

## Write, render, inspect

Save this as `figure.jsx`:

```jsx
<Frame font-size={px(20)} padding={em(1)} border-radius={em(0.4)}>
  <VStack gap={em(0.75)}>
    <Text font-weight={bold}>Hello, Gum</Text>
    <HStack gap={em(1)}>
      <Circle width={em(3)} fill={blue} stroke={none} />
      <Square width={em(3)} fill={red} stroke={none} />
    </HStack>
  </VStack>
</Frame>
```

```sh
gum render figure.jsx -o figure.png
gum render figure.jsx -o figure.svg
gum render figure.jsx -f tree
```

Open the PNG and check spacing, legibility, clipping, and overlapping labels.
Revise the JSX, render, and inspect again. Successful rendering alone does not
establish visual quality. Keep the editable source alongside the output.
`gum figure.jsx` is shorthand for `gum render figure.jsx`; both accept stdin
when the input is omitted. Use `gum render --help` for output and inspection options.

## Source and layout essentials

- A single bare JSX element is returned automatically. With declarations or
  other statements, finish with an explicit `return`. The source runs as a
  function body: do not add static imports. Elements, math, colors, and helpers
  such as `px`, `em`, `range`, and `linspace` are already in scope.
- Use `px(24)` or `"24px"` for pixels, and `em(1.5)` or `"1.5em"` for font-relative
  lengths. Bare numeric lengths are fractions: `width={0.5}` means half the
  reference width, and `width={100}` does not mean 100 pixels. Graph positions
  instead use data coordinates. See `guides/units` and `guides/coordinates`.
- Compose `HStack`, `VStack`, `Grid`, `Box`, and `Frame` so layout measures and
  positions content. Set base typography on the outer element and use `em`
  for internal gaps and padding. Use `grow` on direct stack children to share
  space. Omitted box dimensions hug content; `width="fill"` fills an offer.
  Use explicit coordinates when their geometric meaning requires them.
- JSX attribute dashes become underscores: `font-size` becomes `font_size`.
  Use underscore keys in objects and spread props. Unknown CSS/SVG attributes
  are not automatically forwarded. `Text` uses `color`; shapes use `fill` and
  `stroke`. A `Box` contains one element; wrap siblings in a stack or group.
- Use ordinary functions returning elements for reusable components and array
  `.map()` for repeated content. Forward layout props to the outer element.
  Use `Latex` for display math and `Tex` inside `Text` for inline math.

## Find references and examples

```sh
gum docs search "axis labels"
gum docs get elements/Plot
gum docs get guides/units
gum docs example gallery/pendulum_physics > pendulum.jsx
gum docs list guides
```

Search returns page IDs and short descriptions. `get` returns one reference
with its JSX example. Follow internal links with `gum docs get <page-id>`;
an optional `#anchor` still retrieves the full page. `example` prints only JSX.
For examples with data files, use `gum docs example <page-id> --output example`
to write the JSX and its fixtures into a directory.

- **Guides:** start with `guides/units`, `guides/sizing`, `guides/stack`, and
  `guides/style` for layout and styling, or `guides/rendering` for host APIs.
- **Elements:** `elements/Plot` for plots, `elements/Network` for diagrams,
  `elements/GeoMap` for maps, and `elements/Text` for text.
- **Gallery:** complete compositions and focused examples. Search for your
  subject or use `gum docs list gallery` to browse.

Use `gum docs list` for the full index. Read relevant references before choosing
properties; compose supported primitives when a dedicated feature is absent.

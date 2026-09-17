# Gum JSX

Gum describes figures with JavaScript and JSX, then measures and renders them as
SVG. It is not React, HTML, or a browser DOM.

## Setup

Before using Gum, install `@gum-jsx/cli` globally if needed:

```sh
bun install -g @gum-jsx/cli
```

This provides the `gum`, `gum-tex`, and `gum-mark` commands. The examples assume
they are available on your PATH.

Use the bundled references for supported components and properties. Preserve the
user's chosen data, visual intent, and output format. Ordinary functions returning
elements are the simplest way to make reusable components.

## Source format

A single bare JSX element is returned automatically. With declarations or other
statements, finish with an explicit `return`. Use an explicit `Svg` root for a
complete figure; its width and height can be omitted when the content determines
them. The evaluator supplies elements, `px`, `em`, palette constants, and numeric
helpers. Math elements are supplied by the CLI and Studio as well.

Gum source runs as a function body, not an imported module. Do not put static
imports in an evaluated `.jsx` file. JSX attribute dashes become underscores:
`font-size` reaches a component as `font_size`. Use underscore keys in JavaScript
objects and spread props; camelCase is not normalized. Unknown SVG/CSS attributes
are not automatically forwarded.

For example, a rounded frame around a circle needs no fixed outer viewport:

```jsx
<Svg font-size={px(20)}>
  <Frame padding={em(0.75)} radius={em(0.4)}>
    <Circle width={em(5)} fill={blue} stroke={none} />
  </Frame>
</Svg>
```

For repeated elements, use ordinary components and array helpers. Put layout
props on the component's outer element so its parent can allocate it:

```jsx
const Card = ({ label, color, ...props }) => (
  <TextFrame padding={em(0.75)} border-color={color} {...props}>
    <Text color={color}>{label}</Text>
  </TextFrame>
)
return (
  <Svg width={px(440)} font-size={px(20)}>
    <TextBox padding={em(0.75)}>
      <HStack gap={em(0.75)}>
        <Card label="Input" color={blue} grow={1} />
        <Card label="Output" color={red} grow={1} />
      </HStack>
    </TextBox>
  </Svg>
)
```

Keep nested JSX and compound math operands on separate, indented lines. `range`,
`linspace`, `zip`, and `map` are useful for repeated geometry. `linspace` includes
the endpoint by default; pass `false` as its fourth argument for periodic samples.
Use `setSeed` when a generative figure should be repeatable.

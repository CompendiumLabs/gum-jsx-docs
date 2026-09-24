# Gum JSX

Gum describes figures with JavaScript and JSX, then measures and renders them as
SVG. It is not React, HTML, or a browser DOM.

Use the references for supported components and properties. Preserve the
user's chosen data, visual intent, and output format. Ordinary functions returning
elements are the simplest way to make reusable components.

## Source format

A single bare JSX element is returned automatically. With declarations or other
statements, finish with an explicit `return`. Return one element for a figure;
rendering hosts wrap a bare root in `Svg`. Put design dimensions and base
font props on that root. Use an explicit `Svg` when you need viewport control;
its width and height accept pixels only (`px(640)` or `"640px"`), or can be omitted
to hug content. The evaluator supplies elements, `px`, `em`, palette constants,
and numeric helpers. Math bindings are supplied by the rendering host as well.

Gum source runs as a function body, not an imported module. Do not put static
imports in an evaluated `.jsx` file. JSX attribute dashes become underscores:
`font-size` reaches a component as `font_size`. Use underscore keys in JavaScript
objects and spread props; camelCase is not normalized. Unknown SVG/CSS attributes
are not automatically forwarded.

For example, a rounded frame around a circle needs no fixed outer viewport:

```jsx
<Frame font-size={px(20)} padding={em(0.75)} border-radius={em(0.4)}>
  <Circle width={em(5)} fill={blue} stroke={none} />
</Frame>
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
  <TextBox width={px(440)} font-size={px(20)} padding={em(0.75)}>
    <HStack gap={em(0.75)}>
      <Card label="Input" color={blue} grow={1} />
      <Card label="Output" color={red} grow={1} />
    </HStack>
  </TextBox>
)
```

Keep nested JSX and compound math operands on separate, indented lines. `range`,
`linspace`, `zip`, and array `.map()` are useful for repeated geometry. `linspace`
includes the endpoint by default; pass `false` as its fourth argument for periodic samples.
Use `setSeed` when a generative figure should be repeatable.

Use `Latex` for display math and `Tex` inside `Text` for inline formulas. In a
JavaScript string expression, use `String.raw` for TeX backslashes, for example
``<Tex>{String.raw`\frac{a}{b}`}</Tex>``, without surrounding `$` delimiters.

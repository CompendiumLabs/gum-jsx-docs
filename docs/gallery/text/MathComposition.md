# Gum and math composition

*Category*: math

Math operands are ordinary Gum children. A [Frac](../../elements/text/Frac.md)
can contain a shape or a plot; scripts, roots, and math rows accept the same
elements. Their normal layout queries determine their size and drawing.

```jsx
<MathText style="display">
  <Frac>
    <Circle width={px(32)} height={px(32)} fill={blue} stroke={none} />
    <TextMode>area</TextMode>
  </Frac>
</MathText>
```

Give a figure concrete dimensions with `px()` or `em()`. Give a wrapping
[Text](../../elements/text/Text.md) operand an explicit width. A formula's
available width is a budget, not a reference for percentage dimensions or an
instruction to infer a plot's aspect ratio. Ordinary Gum font sizes and
dimensions retain their normal meaning inside a script. `TextMode` literals
and math glyphs follow TeX's script-size table.

Elements with a `math_axis` guide use it. Otherwise, an ordinary text baseline
implies an axis a quarter of its local font size above that baseline. An element
without either guide centers on the math axis. Multiline text uses its first
baseline and keeps its wrapping width.

[Box](../../elements/text/Box.md) padding and [fitting](./Sizing.md#fitting)
transform the child's baseline and math axis along with its drawing. The `fit` prop
explicitly scales a plot for a compact script; embedding alone does not.
[TextRow](../../elements/text/TextRow.md) aligns prose and formulas by baseline.
A rotated label keeps the child's complete geometry; tilted baselines have no
single vertical coordinate, so the wrapper does not advertise a baseline.

The example includes a shape and plot in fractions, a multiline text operand,
explicit fitting, and a larger plot with formulas in its title, caption, and
rotated vertical label. All export as self-contained outlines in SVG and PNG.
See [math inside prose](InlineMath.md) for paragraphs and lists.

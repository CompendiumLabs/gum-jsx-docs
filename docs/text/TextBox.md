# TextBox

*Category*: text

*Inherits*: [Box](/docs/Box)

`TextBox` wraps bare text and mixed inline content in a [Text](/docs/Text),
then frames it with [Box](/docs/Box). `TextFrame` adds `border={1}`.
Both default to `padding={0.4}` and `justify="left"`. Boolean padding and
margin also mean `0.4`.

These two forms are equivalent:

```jsx
<TextFrame rounded width={12}>Text wraps inside its frame.</TextFrame>

<Frame rounded width={12} padding={0.4} justify="left">
  <Text>Text wraps inside its frame.</Text>
</Frame>
```

Existing element children are passed through to Box, so a sole `Verbatim`,
formula, or stack keeps its own block layout. Use `Text` explicitly to arrange
element-only children as an inline paragraph.

`width` includes padding and margin; the paragraph wraps inside them.
`scale` scales the frame and its contents together. `font-*` and `text-*`
options style the paragraph, such as `font-family={mono}` or
`text-whitespace="preserve"` for literal text.

Frames hug their content by default. Use `stretch` to fill a column's offered
width without enlarging the text, or `fit` when the whole contents should
scale as a figure. See [Box](/docs/Box) for the shared sizing, alignment,
padding, and decoration options.

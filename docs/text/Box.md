# Box

*Category*: layout

*Inherits*: [Group](/docs/Group) > [Element](/docs/Element)

`Box` adds padding, margin, and decoration. `Frame` is the same element with
`border={1}`. Both accept element children and handle text, math, and geometry
through the common layout protocol. Wrap prose in `Text`, or use the
[TextBox and TextFrame](/docs/TextBox) conveniences for bare text.

```jsx
<VStack width={20} gap={0.5}>
  <Frame stretch padding={0.4} rounded>
    <Latex>{String.raw`\sin^2\theta + \cos^2\theta = 1`}</Latex>
  </Frame>
  <Frame padding={0.4} justify="left">
    <Text>A paragraph wraps inside its frame.</Text>
  </Frame>
  <TextFrame rounded>A compact badge</TextFrame>
</VStack>
```

A frame around measured content hugs it by default, preserving its natural
text or math size. Offered dimensions act as wrapping budgets, so a short label
stays compact and a long paragraph wraps inside the padding.

`stretch` makes the visible frame fill exact dimensions offered by its parent,
aligning the content in the remaining room without scaling it. It does not
force the frame to fill a maximum-only budget. An explicit `width` or `height`
on the frame always reserves that space, even without `stretch`.

`grow` remains a stack weight: it asks the parent for spare main-axis space.
Combine `grow` with `stretch` to fill that space with the frame. `expand`
retains its geometric meaning of covering a rectangle by scaling.

`hug` is still accepted; `hug={false}` is an alias for `stretch`. An explicit
`stretch` value takes precedence if both are supplied.
`justify` and `valign` align the content; a child's
`align` overrides them. `scale` scales the measured frame and its contents
uniformly, preserving relative sizes and alignment anchors.

An `aspect` supplies a shape for the frame around measured content. Alone, it
adds room without changing the content's scale. With one dimension it determines
the other; with both, that shape fits inside the reserved rectangle.

Bare strings are not accepted. A single element such as `Text`, `Verbatim`,
a formula, or a stack is laid out as a block.
Use an explicit stack to arrange multiple blocks; other multiple
children keep their coordinate placements, as in `Group`.

Aspect-only geometry stays scale-free and fits its frame. `fit` explicitly
chooses that behavior for a finished drawing containing measured elements too:
the whole composition scales together. Children with their own coordinate
placement also retain geometric framing. This is useful for panels and diagrams.

Padding is inside the border; margin is outside it. For measured frames both
are in layout units (em around text). For scale-free frames and `fit`,
they are proportions, adjusted for aspect by default. A scalar applies to all
sides, a pair to horizontal/vertical sides, and four values to
`[left, top, right, bottom]`. `true` means `0.1`; omitted means zero.
An unconstrained frame encloses ink overhang while preserving layout advance.
A fixed dimension keeps the border fixed when content overflows; `clip` clips
to the border shape.

Parameters:

- `width`, `height` — exact outer dimensions in layout units
- `max-width`, `max-height` — available dimensions
- `stretch` = `false` — fill offered dimensions without scaling the contents
- `hug` = `true` — keep the frame compact; `hug={false}` also enables stretching
- `fit` = `false` — treat the contents as a whole drawing to scale
- `scale` = `1` — scale the measured frame and its contents
- `justify`, `valign` = `'center'` — horizontal and vertical content alignment
- `padding`, `margin` = `0` — insets; `true` means `0.1`
- `adjust` = `true` — equalize proportional insets in geometric frames
- `border` = `0` (`1` for `Frame`) — border width in stroke units
- `rounded` — corner radii in stroke units; `true` means `10`
- `fill` — background color
- `shape` — element to use for the background, border, and clipping shape
- `clip` = `false` — clip to the frame, or supply a clipping element
- `border-*`, `fill-*` — attributes for the border and background
- `font-*`, `text-*` — typography passed to the content

`TextBox` and `TextFrame` turn bare text and mixed inline content into a `Text`
paragraph, then use this same framing engine. Their defaults are padding
`0.4` and left justification.

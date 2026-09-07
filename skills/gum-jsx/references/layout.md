# Layout Elements

## Box

*Inherits*: **Group** > **Element**

`Box` adds padding, margin, and decoration. `Frame` is the same element with
`border={1}`. Both accept element children and handle text, math, and geometry
through the common layout protocol. Wrap prose in `Text`, or use the
**TextBox and TextFrame** conveniences for bare text.

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

**Example**

Prompt: the text "hello!" in a frame with a dashed border and rounded corners

Generated code:
```jsx
<Box padding border rounded border-stroke-dasharray={5}>
  <Text>hello!</Text>
</Box>
```

## Grid

*Inherits*: **Group** > **Element**

This element arranges its children in a grid. The grid is specified by the number of rows and columns, and the gap between the cells. In the case where `widths` and `heights` are not specified, a reasonable effort is made to best accomodate the grid elements based on their aspects (if specified).

Parameters:
- `rows` = `N` — the number of rows in the grid (autodetected)
- `cols` = `M` — the number of columns in the grid (autodetected)
- `widths` = `[1/N,...]` — an array of widths for each column
- `heights` = `[1/M,...]` — an array of heights for each row
- `spacing` = `0` — the gap between the cells in the grid

**Example**

Prompt: draw a grid of square boxes filled in light gray. each box contains an arrow that is pointing in a particular direction. that direction rotates clockwise as we move through the grid.

Generated code:
```jsx
<Frame padding rounded>
  <Grid rows={3} spacing>
    { linspace(0, 360, 10).slice(0, 9).map(th =>
      <Frame padding rounded>
        <Group aspect={1} spin={th}>
          <Arrow points={[[0, 0.5], [1, 0.5]]} arrow-size={0.4} />
        </Group>
      </Frame>
    ) }
  </Grid>
</Frame>
```

## Points

*Inherits*: **Group** > **Element**

Place copies of a common shape at various points. Marker size is controlled with `point-size`, while the **Points** element itself can still be laid out with the normal `size`/`xsize`/`ysize` element parameters. The default shape is a black dot.

When used inside **Graph** or **Plot**, the point coordinates are also reported for automatic limit detection. This means point clouds can now expand plot limits without requiring `coord="auto"` on the **Points** element itself.

Keyword arguments:
- `points` — a list of points, where each point is either an `[x, y]` pair
- `point-shape` = `Dot` — the default shape to use for children
- `point-size` = `0.05` — the default size to use for children
- `...` = `{}` — additional attributes are passed to the default shape (like `stroke` or `fill`)

**Example**

Prompt: A plot of three different increasing curves of varying steepness and multiple points spaced at regular intervals. The x-axis label is "time (seconds)", the y-axis label is "space (meters)", and the title is "Spacetime Vibes". There are axis ticks in both directions with associated faint grid lines.

Generated code:
```jsx
<Plot coord={[-1, -1, 1, 1]} margin={0.2} grid
  xlabel="time (seconds)" ylabel="space (meters)"
  title="Spacetime Vibes"
>
  <Points point-size={0.04} points={[
    [0, 0.5], [0.5, 0], [-0.5, 0], [0, -0.5]
  ]} />
  <Rectangle pos={[0.5, 0.5]} size={0.2} />
  <Circle pos={[-0.5, -0.5]} size={0.2} />
  {[0.5, 0.9, 1.5].map(a =>
    <SymLine fy={x => sin(a*x)} />
  )}
</Plot>
```

## Stack

*Inherits*: **Group** > **Element**

`HStack` and `VStack` arrange geometry, text, and math using the same layout
engine. Dimensions and `gap` are in shared layout units (em when composing
text). Local drawing coordinates and `pos`/`size` remain separate.

```jsx
<HStack gap={0.5} valign="anchor" justify="left">
  <Text>Hello</Text>
  <Circle height={1} fill={blue}/>
  <MathText scale={1.5}>x = y + 1</MathText>
</HStack>
```

Children with natural measurements keep their relative sizes. An unsized
shape follows the shared cross dimension: height in a row, width in a column.
A purely geometric row of aspect-only children stays scale-free; its aspect
is the sum of theirs. Given width 10, aspects 2 and 0.5 yield widths 8 and 2
at height 4. Completely flexible geometry shares the remaining space.

A bounded row packs naturally if it fits. If it is too narrow, reflow-capable
children without explicit widths share the space left by fixed content and
wrap. A column supplies its width to its children. Math keeps its em even when
it overflows; shrinking is a decision for the whole containing stack.

Use `grow` on a child to consume remaining main-axis space, proportionally to
its weight. Without a finite budget, growth has no effect. `sizes` assigns
weighted slots to every child when the stack has a main-axis budget.

`stack-size` on a child overrides natural sizing with a fraction of the
stack's main dimension **after gaps are subtracted**. The whole child fits
its slot while maintaining aspect, including scaling its text or math.
Children without this override keep their usual measured or aspect-based
sizing. Unlike `grow`, this deliberately changes the child's content scale.
Flexible shapes with no aspect fill their allotted rectangle.

`even` is shorthand for equal fractional shares: with two children it is
equivalent to `stack-size={0.5}` on each, including the way their contents fit.
Explicit child fractions reserve their shares first, and the others divide
the remainder equally. Like explicit fractions, `even` takes precedence over
`sizes` and `grow`. To allocate equal slots while preserving text and math's
em size, use `sizes={[1, 1]}` with a main-axis budget instead.

```jsx
<VStack spacing>
  <Text stack-size={0.075}>Simple Pendulum</Text>
  <Frame rounded padding><Rect aspect={5} fill={blue}/></Frame>
  <Text stack-size={0.075}>Exposition Time</Text>
</VStack>
```

With a main-axis budget, fractions reserve their shares first; natural children
and then weighted children use the remainder. Without one, the natural
children determine the total: their combined length divided by the unreserved
fraction, plus gaps. If every child has a share, their shapes determine a size
at which at least one fills the shared cross dimension. Any unassigned
remainder stays empty.

Fractions must be between zero and one and sum to at most one. Zero draws
nothing. A total of one leaves no natural remainder; additional natural
content then requires an explicit main dimension and follows the overflow
policy. `stack-size` takes precedence over `grow`, `sizes`, and `even` for
that child. `stack-expand` is no longer used.

Exact `width` and `height` reserve a rectangle. If `aspect` is also specified,
content fits that aspect inside the rectangle; the unused space remains part
of the allocation. `max-width` and `max-height` supply budgets without forcing
a smaller composition to grow. There is no automatic search for a paragraph
width from a height limit: width is chosen first, then text wraps.

`overflow` defaults to `visible`, preserving layout and ink overhang. `error`
rejects overflow, `clip` clips to the allocation, and `shrink` uniformly fits
the entire composition, preserving relative text sizes. Zero dimensions are
real; missing dimensions are unconstrained. Unsized geometric content uses a
normalized cross dimension of one when no parent or measured sibling supplies
one; an entirely geometric composition does not report that as an intrinsic em.

Parameters:

- `direc` = `'v'` — stacking direction; fixed by `HStack` / `VStack`
- `width`, `height` — exact dimensions in layout units
- `max-width`, `max-height` — available dimensions
- `gap` — gap between children in layout units
- `spacing` = `0` — alternative: fraction of the main dimension reserved for all gaps
- `scale` = `1` — own layout unit relative to the surrounding unit
- `justify` = `'center'` — horizontal placement and inherited text justification
- `valign` = `'center'` — row alignment: `'top'`, `'anchor'`, `'center'`, `'bottom'`
- `even` = `false` — equal fractional shares, fitting the contents
- `sizes` — weights for allocated slots
- child `stack-size` — fractional slot, fitting the whole child into it
- `overflow` = `'visible'` — `'visible'`, `'clip'`, `'shrink'`, or `'error'`
- `font-*`, `text-*` — inherited typography for reflow-capable children

`TextRow` and `TextCol` are convenience subclasses with text-oriented defaults;
math rows/columns share the same packing code after resolving their atoms.

**Example**

Prompt: a wide blue rectangle on top, with red and green squares side by side on the bottom. each one has rounded corners.

Generated code:
```jsx
<VStack spacing>
  <Rectangle rounded aspect={2} fill={blue} />
  <HStack spacing>
    <Square rounded fill={red} />
    <Square rounded fill={green} />
  </HStack>
</VStack>
```

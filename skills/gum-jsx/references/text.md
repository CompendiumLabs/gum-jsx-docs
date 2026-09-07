# Text Elements

## Bullets

*Inherits*: **VStack** > **Group** > **Element**

A bulleted list. Each child becomes an item: strings and **Text** elements are wrapped to the list width minus the indent, with a marker placed in the indent level with the first line. A **Latex** equation, or anything else carrying em metrics, is placed at the text's size with a marker beside it; other elements span the item width as they are. A nested `Bullets` child becomes a sub-list, indented without a marker of its own.

All widths are in em, so text in a `Bullets` comes out the same size as a `Text` with the same `width`. This makes it fit naturally inside a **Slide**, which sets `width` on all of its children.

Parameters:
- `children` — the list items: strings, `Text` elements, other elements, or nested `Bullets`
- `width` = `25` — the total width of the list in ems
- `scale` = `1` — the size of the list's text relative to the surrounding text's em; an item's own `scale` sizes that item, and its marker moves to stay level with its first line
- `marker` = `'•'` — the marker string or element placed beside each item
- `indent` = `1.5` — the width of the marker column in ems
- `gap` = `0.5` — the vertical space between items in ems
- `spacing` — the total stack spacing fraction; overrides `gap` when given
- `justify` = `'left'` — the horizontal justification of item text
- `font-family`/`font-weight`/`font-style` — font settings for the item text
- `text-*` — additional arguments forwarded to each item's `Text`

**Example**

Prompt: A bulleted list of three points about layout, with a nested sub-list under the second point, all wrapped to 22 ems and framed with padding.

Generated code:
```jsx
<Frame padding rounded>
  <Bullets width={22}>
    <Text>Positions and sizes are proportional to the parent</Text>
    <Text>Layout containers arrange their children</Text>
    <Bullets>
      <Text>Stacks place elements along one axis</Text>
      <Text>Grids place elements along two</Text>
    </Bullets>
    <Text>Text is measured with real font metrics</Text>
  </Bullets>
</Frame>
```

## Slide

*Inherits*: **Group** > **Element**

Create a presentation slide with a title and some content. A slide is a fixed-aspect canvas (16:9 by default) holding a **TitleFrame** that fills the canvas inside the margin. The content is a **TextCol** of the children: strings, **Text**, **Bullets**, a **TextRow** of columns, and any other `Element`s stack vertically with `gap` em between them.

Text size is set by `em`, the em as a fraction of the slide height, so `em={0.05}` fits twenty lines top to bottom and the content width in em follows from the frame. Without `em`, `width` is the content width in em and the size follows from that. Either way the column spans the content width, and a child's `scale` sizes it relative to the slide's em, so `<Text scale={2}>` is a heading twice the body size.

With a fixed `aspect`, the column is also given the area's height, so a figure with no size of its own (a plot, a framed element, or a **TextFigure** without a `width` or `height`), alone or beside text in a **TextRow**, is sized to the height left after the text rather than spanning the width, and several such figures split it evenly (see **TextCol**). Content taller than the frame's area is handled by `overflow`: shrunk to fit (the default), clipped, or an error. The `overflow` property on the resulting element is the ratio of the content height to the area's, so a value above `1` means it did not fit. Both `margin` and `padding` are given as fractions of the slide height, so they are the same distance in every direction.

Parameters:
- `children` = `[]` — a list of strings or `Element`s to stack vertically
- `title` — the slide title, a string or `Element`
- `aspect` = `16/9` — the aspect ratio of the slide canvas; `'auto'` fits the canvas to the content
- `em` — the text size, as a fraction of the slide height
- `width` = `25` — the width of the content in ems, which sets the text size when `em` is not given
- `gap` = `0.5` — the space between content elements in em
- `overflow` = `'shrink'` — what to do with content taller than the frame: `shrink`, `clip`, or `error`
- `margin` = `0.1` — the space between the canvas edge and the frame
- `padding` = `0.1` — the space between the frame and the content
- `justify` = `'left'` — the horizontal justification of the text
- `valign` = `'center'` — the vertical alignment of the content when it does not fill the frame
- `align` = `'center'` — the horizontal alignment of the content when it is shrunk to fit
- `background` — the fill color of the whole canvas
- `border` = `1` — the frame border width
- `border-stroke` = `'#bbb'` — the frame border color
- `rounded` = `10` — the frame corner radius, in stroke units
- `title-size` = `0.1` — the size of the title box relative to the frame height
- `fill` — the fill color of the frame

Subunits:
- `title` — the title element
- `text` — the text elements

**Example**

Prompt: A slide titled "The Art of the Sine Wave" with a short paragraph, a plot of a sine wave, and two bullet points about it.

Generated code:
```jsx
<Slide title="The Art of the Sine Wave">
  <Text>Here's a plot of a sine wave. It has to be the right size to fit in with the text correctly.</Text>
  <Plot xlim={[0, 2*pi]} ylim={[-1.5, 1.5]} grid fill={lightgray} margin={[0.25, 0.05]} aspect={3}>
    <SymLine fy={sin} stroke={blue} stroke-width={2} />
  </Plot>
  <Bullets>
    <Text>It ranges from low to high</Text>
    <Text>The extra vertical space shows the full curve</Text>
  </Bullets>
</Slide>
```

## Text

*Inherits*: **VStack** > **Element**

Displays text and other elements. Note that you will typically not set the font size of the text here, as this will fill the entire space with the provided text. To set the text color, use `color` instead of `fill` or `stroke`.

By default, whitespace (including newlines) is collapsed, and `width` sets the wrapping width in em.

Set `whitespace="preserve"` (or `"pre"`) for preformatted plain text: spaces, indentation,
explicit newlines, and blank lines are preserved, with no automatic wrapping. All lines use
the same text size. The block is as wide as its widest line; `width` can make it wider but
does not squeeze long lines. Use `scale` to change its size within a text container.
Tabs advance to the next `tab-size` column (default 4). CRLF and CR newlines become LF.

Pass source as a string expression or template literal; JSX formatting-only whitespace is
ignored. String children concatenate exactly in this mode; nested elements are not supported.
No trimming or dedenting is performed, so a trailing newline adds a final blank line.

```jsx
<Text whitespace="preserve">{`First line
    Indented line

Last line`}</Text>
```

**Verbatim** is the convenience form with preserved whitespace and a monospace font.

Text size follows from width: `width` is measured in the text's own em, so a narrower width in the same space makes larger text. `scale` says the same thing the other way round, as a multiple of the surrounding text's em: `scale={2}` inside a **TextCol** is a heading twice the body size, and the text's box comes out `width * scale` wide in the surrounding em. Every text element carries its box in em (width, height, and the position of the first line's math axis), which is how a **MathText** places a text block by its first line and how the text containers size themselves.

The math elements use the same `scale` option, including `MathText`, `Latex`,
and `Tex`. Nested scales multiply. A scaled `Text` inside another `Text`
stays a single inline block, aligned by its first line's math axis; give it
its own `width` if it needs wrapping. Like inline math, it may extend beyond
the surrounding fixed line height.

There are two wrapper elements related to text:

- **Box** / **Frame** add a border and background around an explicit `Text` child; **TextBox** / **TextFrame** accept bare text directly
- **TextCol**, **TextRow**, and **TextGrid** lay out text blocks in em, and a **TextFigure** sizes a figure among them

There are two default fonts that are always provided: `sans = 'IBM Plex Sans'` and `mono ='IBM Plex Mono'`. There are three availabe font weights: `light = 300`, `regular = 400`, and `bold = 700`. The default weight is `light`. You can use these global variables anywhere.

Parameters:
- `children` — the text to display
- `width` = `null` — the width (in ems) to wrap the text at (if `null`, the text will not be wrapped)
- `scale` = `1` — the size of the text relative to the surrounding text's em
- `whitespace` = `'normal'` — collapse whitespace, or `'pre'` / `'preserve'` to preserve it without wrapping
- `tab-size` = `4` — tab stops in columns for preserved text
- `spacing` = `0.2` — the spacing between lines of text
- `justify` = `'left'` — the horizontal justification of the text
- `color` = `black` — sets the text color using both stroke and fill (this is the usual way)
- `font-family` = `sans` — the font family (for display and size calculations)
- `font-weight` = `300` — the font weight (for display and size calculations)

**Example**

Prompt: The text "Hello World! You can mix text and other elements together." with a blue square between "and" and "other". Put it in a rounded frame with padding.

Generated code:
```jsx
<Frame rounded width={12} justify="center" padding={0.4}>
  <Text>Hello World! You can mix text and <Square rounded fill={blue} /> other elements together.</Text>
</Frame>
```

## TextBox

*Inherits*: **Box**

`TextBox` wraps bare text and mixed inline content in a **Text**,
then frames it with **Box**. `TextFrame` adds `border={1}`.
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
scale as a figure. See **Box** for the shared sizing, alignment,
padding, and decoration options.

**Example**

Prompt: draw the word "hello" in a rounded rectangular frame

Generated code:
```jsx
<TextBox border rounded margin>hello</TextBox>
```

## TextCol

*Inherits*: **VStack** > **Stack** > **Group**

A convenience form of `VStack` using `gap=0.5`, `justify="left"`, and
`valign="top"`. It uses the same measurement and placement engine and accepts
all **Stack** options. Text, math, and geometry can be mixed directly.

Dimensions and gaps are in em; nested `scale` values multiply. `width` and
`height` reserve exact space, while `max-width` and `max-height` provide budgets.
Use `grow` on a child to allocate remaining space. Formulas keep their size;
`overflow="shrink"` fits the entire composition when necessary.

**Example**

Prompt: a column with a heading at scale 1.5, a paragraph, a formula at the text size, and a list

Generated code:
```jsx
<TextCol width={24} gap={0.6}>
  <Text scale={1.5}>Growth of a Sum</Text>
  <Text>The partial sums of the harmonic series grow without bound, but only just: they track the natural logarithm.</Text>
  <Latex>{"\\sum_{k=1}^{n} \\frac{1}{k} = \\ln n + \\gamma + o(1)"}</Latex>
  <Bullets>
    <Text>the constant <Tex>\gamma</Tex> is about 0.577</Text>
    <Text>a million terms reach only about 14.4</Text>
  </Bullets>
</TextCol>
```

## TextFigure

*Inherits*: **Group** > **Element**

An element given a size in em, with an optional caption below it, so a plot or a diagram can sit among text at a known size. A `height` (or a `width`) sets the figure's size, with the other dimension following from the element's aspect. In a **TextCol** the figure takes the column's width with the element fit inside it by its aspect and placed by `justify`; in a **TextRow** a figure with a `height` keeps its size.

The caption is a string, set as a **Text** as wide as the figure, or an element carrying em metrics, a **Tex** label say. Arguments prefixed `caption-` go to a text caption, so `caption-scale={0.8}` makes it smaller than the surrounding text.

Parameters:
- `children` — the one element to size
- `height` — the height of the figure in em
- `width` — the width of the figure in em
- `scale` = `1` — the size of the figure relative to the surrounding text's em
- `caption` — a string or element placed below the figure
- `gap` = `0.3` — the space between the figure and its caption in em
- `justify` = `'center'` — where the element and caption sit in a wider figure
- `caption-*` — arguments forwarded to a text caption

**Example**

Prompt: a plot four ems tall in a column of text, with a smaller caption

Generated code:
```jsx
<TextCol width={20} gap={0.5}>
  <Text>A short paragraph before the figure, at the column's size.</Text>
  <TextFigure height={5} caption="The sine function on one period" caption-scale={0.8} justify="center">
    <Plot xlim={[0, 2*pi]} ylim={[-1.2, 1.2]} grid aspect={2} margin={[0.2, 0.1]}>
      <SymLine fy={sin} stroke={blue} stroke-width={2} />
    </Plot>
  </TextFigure>
  <Text>And a paragraph after it, the same size as before.</Text>
</TextCol>
```

## TextGrid

*Inherits*: **Group** > **Element**

A grid of text blocks in `cols` equal columns, filled row by row. Every cell is laid out for the column width, a row is as tall as its tallest cell, and the gaps between columns and rows are in em. A cell narrower than its column (a **TextFigure** with a `height`, say) is placed by `justify`, or by its own `align` if it has one.

Parameters:
- `children` — the cells, in row order
- `cols` = `2` — the number of columns
- `width` — the width of the grid in em
- `scale` = `1` — the size of the grid relative to the surrounding text's em
- `gap` = `1` — the space between cells in em, or `[horizontal, vertical]`
- `valign` = `'top'` — how the cells of a row align vertically: `top`, `anchor`, `center`, or `bottom`
- `justify` = `'left'` — where a cell narrower than its column sits, and the text alignment handed to the cells; a cell's own `align` overrides it for that cell alone
- `font-family`/`font-weight`/`font-style` — font settings for the text cells
- `text-*` — additional arguments forwarded to the text cells

**Example**

Prompt: three framed cards in a row, each a figure with a caption, at the same em

Generated code:
```jsx
const shapes = [ [ 'Circle', <Circle fill={blue} /> ], [ 'Square', <Square fill={red} /> ], [ 'Triangle', <Triangle fill={green} /> ] ]
return <TextGrid cols={3} width={24} gap={1} justify="center">
  { shapes.map(([ name, shape ]) =>
    <Frame stretch rounded padding={0.5}>
      <TextFigure height={3} caption={name}>{shape}</TextFigure>
    </Frame>
  ) }
</TextGrid>
```

## TextRow

*Inherits*: **HStack** > **Stack** > **Group**

A convenience form of `HStack` using `gap=1`, `justify="left"`, and
`valign="top"`. It uses the same measurement and placement engine and accepts
all **Stack** options. Text, math, and geometry can be mixed directly.

Dimensions and gaps are in em; nested `scale` values multiply. `width` and
`height` reserve exact space, while `max-width` and `max-height` provide budgets.
Use `grow` on a child to allocate remaining space. Formulas keep their size;
`overflow="shrink"` fits the entire composition when necessary.

**Example**

Prompt: a figure six ems tall beside a column that takes the rest of the row, aligned at the top

Generated code:
```jsx
<TextRow width={26} gap={1.5}>
  <TextFigure height={6} caption="Figure 1" caption-scale={0.8} justify="center">
    <Frame padding rounded fill={lightgray}>
      <Circle fill={blue} />
    </Frame>
  </TextFigure>
  <TextCol gap={0.5}>
    <Text scale={1.3}>A circle</Text>
    <Text>The figure keeps its height in em and the column takes the remaining width, so the text wraps beside it at the same size.</Text>
  </TextCol>
</TextRow>
```

## TitleFrame

*Inherits*: **Frame** > **Element**

A special type of **Frame** that places a title element in a box centered on the line at the top of the frame. The title element can be either a proper Element or a string, in which case it will be wrapped in a **Text** element.

Parameters:
- `title` — the text or element to use as the title
- `title-size` = `0.1` — the height of the title box as a fraction of the frame's
- `title-padding` = `[0.6, 0.3]` — the padding inside the title box, in em of the title
- `title-rounded` = `10` — the corner radius of the title box, in stroke units
- `adjust` = `true` — whether to adjust the padding and margin to account for the title element
- `border` = `1` — the outer frame border width to use

Subunits:
- `title` — the title element

**Example**

Prompt: Various food emojis are arranged in a spaced out grid and framed with the title "Fruits & Veggies". Each emoji is framed by a rounded square

Generated code:
```jsx
const emoji = [ '🍇', '🥦', '🍔', '🍉', '🍍', '🌽', '🍩', '🥝', '🍟' ]
return <TitleFrame title="Fruits & Veggies" margin padding rounded>
  <Grid rows={3} spacing={0.05}>
    {emoji.map(e =>
      <Frame aspect rounded padding><Text>{e}</Text></Frame>
    )}
  </Grid>
</TitleFrame>
```

## Verbatim

*Inherits*: **Text**

Preformatted plain text for code, terminal output, and aligned text. This is `Text` with
`whitespace="preserve"`, `font-family={mono}`, and `justify="left"` as defaults.
All can be overridden. Lines stay left-aligned even when a surrounding frame or
stack centers the block; set `justify` on `Verbatim` to change their alignment.

Pass a string expression or template literal. Spaces and blank lines are preserved,
tabs advance to the next `tab-size` column (default 4), and lines never wrap automatically.
All lines share one text size; the widest line determines the natural width.
`width` adds room if wider than the source, while `scale` changes the size in a text container.

Use `Box` or `Frame` for padding and decoration. `TextCol`, `TextRow`, and `Slide`
place verbatim blocks using the same em metrics as ordinary text.

Source is not trimmed or dedented. Nested elements and syntax highlighting are not supported.
See **Text** for the shared font, spacing, alignment, and size options.

**Example**

Prompt: A code block with preserved indentation and a blank line, padded in em.

Generated code:
```jsx
<Box fill="#182d3b" rounded={12} padding={0.75}>
  <Verbatim color="#e8f0f3">{`const square = x => x * x

<Plot grid>
  <SymLine fy={square} />
</Plot>`}</Verbatim>
</Box>
```

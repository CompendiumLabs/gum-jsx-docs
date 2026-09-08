# Text Elements

## Bullets

*Inherits*: **Stack** > **Group** > **Element**

A bulleted list: a column of rows, each a marker in the indent beside its item, level with the item's first line. Strings and **Text** elements are wrapped to the list width minus the indent. A **Latex** equation, or anything else carrying em metrics, keeps its size beside its marker; any other element takes the item width. A nested `Bullets` child becomes a sub-list, indented without a marker of its own.

All widths are in em, so text in a `Bullets` comes out the same size as a `Text` with the same `width`, and a list without a `width` of its own wraps to the width a column offers it. This makes it fit naturally inside a **Slide** or a **TextCol**.

Parameters:
- `children` — the list items: strings, `Text` elements, other elements, or nested `Bullets`
- `width` = `25` — the total width of the list in em, when nothing offers it one
- `scale` = `1` — the size of the list's text relative to the surrounding text's em; an item's own `scale` sizes that item, and its marker stays level with its first line
- `marker` = `'•'` — the marker string or element placed beside each item
- `indent` = `0.75` — the width of the marker column in em
- `gap` = `0.5` — the vertical space between items in em
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

*Inherits*: **Group** > **Element**

Displays text and other elements. There is no font size: a text on its own fills the figure, and inside a stack it is set at the stack's em, wrapping to the width it is offered. To set the text color, use `color` instead of `fill` or `stroke`.

By default, whitespace (including newlines) is collapsed, and `width` is the width the text wraps at, in em, and the width of its box. With `fit`, the text is instead set once (on one line, or wrapped at its `width`) and scaled to whatever slot it gets, the way a title in a figure scales with the figure; a `height` on a fitted text makes it that tall.

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

- **TextBox** / **TextFrame** can handle text with a border and background
- **TextCol**, **TextRow**, and **TextGrid** lay out text blocks in em, and a **TextFigure** sizes a figure among them

There are two default fonts that are always provided: `sans = 'IBM Plex Sans'` and `mono ='IBM Plex Mono'`. There are three availabe font weights: `light = 300`, `regular = 400`, and `bold = 700`. The default weight is `light`. You can use these global variables anywhere.

Parameters:
- `children` — the text to display
- `width` = `null` — the width in em to wrap the text at, and of its box; without one, a text in a stack wraps to the width it is offered, and on its own it is one line
- `height` — a height of its own in em; the text sits in the box by its `align`
- `fit` = `false` — scale the text to its slot like a figure, rather than setting it at the surrounding em
- `scale` = `1` — the size of the text relative to the surrounding text's em
- `whitespace` = `'normal'` — collapse whitespace, or `'pre'` / `'preserve'` to preserve it without wrapping
- `tab-size` = `4` — tab stops in columns for preserved text
- `spacing` = `0` — extra line spacing, as a fraction of the block
- `justify` = `'left'` — the horizontal justification of the text
- `color` = `black` — sets the text color using both stroke and fill (this is the usual way)
- `font-family` = `sans` — the font family (for display and size calculations)
- `font-weight` = `300` — the font weight (for display and size calculations)

**Example**

Prompt: The text "Hello World! You can mix text and other elements together." with a blue square between "and" and "other". Put it in a rounded frame with padding.

Generated code:
```jsx
<TextFrame rounded width={12} justify="center">
  Hello World! You can mix text and <Square rounded fill={blue} /> other elements together.
</TextFrame>
```

## TextBox

*Inherits*: **Group** > **Element**

A box drawn around text, or around one element: a formula, a **TextCol**, a **TextFigure**. The box hugs its content plus `padding` and `margin`, which are in em, so a badge in a column does not span it; given a `width` or `height` of its own it spans that instead, and a row or grid that hands it a slot as its width does the same. Its border and corner radii use stroke units, so text frames can share the same rounding even with different text sizes or numbers of lines. **TextFrame** is the same with `border = 1`.

Text wraps inside the padding at the width the box has or is offered. An `aspect` widens (or heightens) the box around the content, which is placed in it by `justify`.

Parameters:
- `children` — the text, or one element
- `padding` = `0.4` — the space between the content and the frame, in em, as a scalar, `[horizontal, vertical]`, or `[left, top, right, bottom]`; `true` for the default
- `margin` = `0` — the space outside the frame, in em; `true` for `0.4`
- `border` — the frame's stroke width; `true` for `1`
- `fill` — the background color
- `rounded` — the corner radius in stroke units, per corner as for **RoundedRect**; `true` for `10`
- `aspect` — an aspect for the box to grow to; `true` for square
- `width`/`height` — the box's outer size in em, which it spans
- `scale` — the text size, as for **Text**
- `justify` = `'left'` — the text alignment, and where content narrower than the box sits
- `border-*`/`fill-*` — arguments for the frame and the background
- `font-family`/`font-weight`/`font-style` and `text-*` — as for **Text**

**Example**

Prompt: draw the word "hello" in a rounded rectangular frame

Generated code:
```jsx
<TextBox border rounded margin>hello</TextBox>
```

## TextCol

*Inherits*: **TextStack** > **Stack** > **Group** > **Element**

A vertical **Stack** with text's defaults: a column of text blocks, `gap` em apart (half a line) and flush left. Each child is laid out for the column's width and they stack top to bottom; the column is as tall as they come to. A **Text** or **Bullets** child wraps to the column's width unless it has a `width` of its own, in which case it keeps it and sits by `justify`, or by its own `align` (`align="right"` on a figure puts it at the right of a left-justified column; a **TextFigure** sits in the middle by default). A child's `scale` sets its size relative to the column's em, which is how headings and captions are made. A formula (**Latex**) sits at the text's size, a figure spans the column at its aspect, and a bare element (a plot) fills the height the column has to give.

Every element carries its box in em, so a column can be a child of another column, a **TextRow**, a **TextGrid**, or a **TextBox**, and a **Slide** is a column in a frame. A column with no `width` is as wide as its widest child laid at its own size.

Given a `height`, it is a budget: the content is laid out first, and what is left after it and the gaps goes to the children that can use it: a bare element fills it, and figures (an element with an aspect, a **TextFigure** without a size, a row holding one) split it evenly, each fit inside its share. A column over its budget takes the height out of those figures, never out of its text. This is how a **Slide** fits a figure to its frame.

Parameters:
- `children` — the blocks to stack: text, lists, formulas, figures, other columns and rows, or any element
- `width` — the width of the column in em; sets the size of the text in it
- `height` — the height in em to fill, budgeted to the children without a size of their own
- `scale` = `1` — the size of the column relative to the surrounding text's em
- `gap` = `0.5` — the space between children in em
- `justify` = `'left'` — where a child narrower than the column sits, and the text alignment handed to the children; a child's own `align` overrides it for that child alone
- `font-family`/`font-weight`/`font-style` — font settings for the text children
- `text-*` — additional arguments forwarded to the text children
- child `width`/`height`/`share`/`fit` — as for **Stack**

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

*Inherits*: **Stack** > **Group** > **Element**

An element with an optional caption below it, as a column, so a plot or a diagram can sit among text with a caption at the text's size. A `height` (or a `width`) sets the element's size in em, with the other dimension following from its aspect, and the figure keeps that size wherever it goes, sitting in the middle of a **TextCol** unless its `align` says otherwise. Without a size, the element spans a column's width at its aspect, or takes the height a budget leaves it, the caption keeping its size; in a **TextRow** with a `height` it is made that tall.

The caption is a string, set as a **Text** as wide as the figure, or an element carrying em metrics, a **Tex** label say. Arguments prefixed `caption-` go to a text caption, so `caption-scale={0.8}` makes it smaller than the surrounding text.

Parameters:
- `children` — the one element to size
- `height` — the height of the element in em
- `width` — the width of the element in em
- `scale` = `1` — the size of the figure relative to the surrounding text's em
- `caption` — a string or element placed below the element
- `gap` = `0.3` — the space between the element and its caption in em
- `justify` = `'center'` — where the element and the caption sit in the figure's width, and the caption's text alignment
- `align` = `'center'` — where the figure sits in a column's slot
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

A grid of text blocks in `cols` equal columns, filled row by row. Every cell is given the column width as its own, so a text block or a **TextBox** spans its cell; a row is as tall as its tallest cell, and the gaps between columns and rows are in em. Content narrower than its cell (a **TextFigure** with a `height`, say) is placed in it by `justify`, or by its own `align` if it has one. Without a `width`, the grid is laid out for the width it is offered, or its cells are as wide as the widest laid at its own size.

Parameters:
- `children` — the cells, in row order
- `cols` = `2` — the number of columns
- `width` — the width of the grid in em
- `scale` = `1` — the size of the grid relative to the surrounding text's em
- `gap` = `1` — the space between cells in em, or `[horizontal, vertical]`
- `valign` = `'top'` — how the cells of a row align vertically: `top`, `anchor`, `center`, or `bottom`
- `justify` = `'left'` — where content narrower than its cell sits, and the text alignment handed to the cells; a cell's own `align` overrides it for that cell alone
- `font-family`/`font-weight`/`font-style` — font settings for the text cells
- `text-*` — additional arguments forwarded to the text cells

**Example**

Prompt: three framed cards in a row, each a figure with a caption, at the same em

Generated code:
```jsx
const shapes = [ [ 'Circle', <Circle fill={blue} /> ], [ 'Square', <Square fill={red} /> ], [ 'Triangle', <Triangle fill={green} /> ] ]
return <TextGrid cols={3} width={24} gap={1} justify="center">
  { shapes.map(([ name, shape ]) =>
    <TextFrame rounded padding={0.5}>
      <TextFigure height={3} caption={name}>{shape}</TextFigure>
    </TextFrame>
  ) }
</TextGrid>
```

## TextRow

*Inherits*: **TextStack** > **Stack** > **Group** > **Element**

A horizontal **Stack** with text's defaults: a row of text blocks side by side, `gap` em apart (one em). Given a `width`, children with a size of their own keep it (a **Text** or **TextCol** with a `width`, a **TextFigure** with a `height`, a formula) and the rest split what is left evenly, each clamped to what it can use: a one-line text takes only its line, a paragraph its full share, and a child with a `share` its fraction of the width. Without a width, the row is as wide as its children laid out at their own sizes.

Given a `height`, a figure without a size of its own (a plot with an aspect, a framed element, a **TextFigure** without a `width` or `height`) is made that tall at its aspect, and given a width too it gives way from that toward its fair share of the width until the text beside it fits the height. A nested row or column is handed the height to budget among its own children. A **Slide** gives its column the height of its content area, so a figure beside text fills the slide's height and the text takes what is left.

Children align by their tops, or by `valign` their anchors (the first line's axis, so two columns of text share a first line), their middles, or their bottoms; a child with an `align` of its own (`align="bottom"` on one text block, say) is placed by that instead. A row narrower than its width is placed by `justify`, which is also the text alignment handed to the children.

Parameters:
- `children` — the blocks to put side by side
- `width` — the width of the row in em
- `height` — the height in em to size figures without a size of their own to
- `scale` = `1` — the size of the row relative to the surrounding text's em
- `gap` = `1` — the space between children in em
- `valign` = `'top'` — how the children align vertically: `top`, `anchor`, `center`, or `bottom`; a child's own `align` overrides it for that child alone
- `justify` = `'left'` — where a row narrower than its width sits, and the text alignment handed to the children
- `font-family`/`font-weight`/`font-style` — font settings for the text children
- `text-*` — additional arguments forwarded to the text children
- child `width`/`height`/`share`/`fit` — as for **Stack**

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

## TextStack

*Inherits*: **Stack** > **Group** > **Element**

A **Stack** with text's defaults: a column half a line apart with its children flush left, or a row (`direc="h"`) one em apart with its children aligned by their tops. **TextCol** and **TextRow** are its two directions. Everything else, including how figures, formulas and lists are placed, a child's `width`, `height`, `share` and `fit`, and a column's height budget, is as for **Stack**.

Parameters:
- `direc` = `'v'` — the direction of stacking: `v` or `h`
- `gap` = `0.5` for a column, `1` for a row — the space between children in em
- `justify` = `'left'` — where a child narrower than a column sits, and the text alignment handed to the children
- `valign` = `'top'` — how a row's children align across it
- other parameters as for **Stack**

**Example**

Prompt: A text stack twenty em wide: a heading at twice the size, a paragraph, then a row holding a two-em circle, a formula, and the text they sit beside on one anchor line.

Generated code:
```jsx
<TextStack width={20} gap={0.6}>
  <Text scale={2}>Stacks in em</Text>
  <Text>Every child is laid out in the stack's em, so the text, the formula and the figure below share one size.</Text>
  <TextStack direc="h" gap={0.75} valign="anchor">
    <TextFigure height={2}><Circle fill={blue} /></TextFigure>
    <Latex>{"\\int_0^\\infty e^{-x^2} dx"}</Latex>
    <Text>on the text's anchor</Text>
  </TextStack>
</TextStack>
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
`whitespace="preserve"` and `font-family={mono}` as defaults. Both can be overridden.

Pass a string expression or template literal. Spaces and blank lines are preserved,
tabs advance to the next `tab-size` column (default 4), and lines never wrap automatically.
All lines share one text size; the widest line determines the natural width.
`width` adds room if wider than the source, while `scale` changes the size in a text container.

Use `TextBox` or `TextFrame` for padding and decoration. `TextCol`, `TextRow`, and `Slide`
place verbatim blocks using the same em metrics as ordinary text.

Source is not trimmed or dedented. Nested elements and syntax highlighting are not supported.
See **Text** for the shared font, spacing, alignment, and size options.

**Example**

Prompt: A code block with preserved indentation and a blank line, padded in em.

Generated code:
```jsx
<TextBox fill="#182d3b" rounded={12} padding={0.75}>
  <Verbatim color="#e8f0f3">{`const square = x => x * x

<Plot grid>
  <SymLine fy={square} />
</Plot>`}</Verbatim>
</TextBox>
```

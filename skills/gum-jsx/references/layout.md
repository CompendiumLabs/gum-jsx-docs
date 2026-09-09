# Layout Elements

## Box

*Inherits*: **Group** > **Element**

A box around its content: `padding` inside the border and `margin` outside it, both in em, plus an optional border and background. Mirroring CSS, padding is space inside the border and margin is space outside it. **Box** has no border by default; **Frame** is the same with `border = 1`, and **TextBox** and **TextFrame** are the same classes again with a default padding for a box around text.

The content is the children with no rect of their own, elements all: text goes in a **Text**, or use a **TextBox**, which sets strings as text itself. The box's `font-*` and `text-*` settings and a `justify` reach text content. The box hugs its content plus the padding. Given a size by its parent (the root, a stack, or another box), the content is laid out for the area inside the padding: a column keeps its text size and hugs its height, a figure spans the width, a paragraph wraps to it. So wrapping something in a box does not change what is inside it. A `width` or `height` of its own is the box's outer size, which it spans. In a stack the box hugs its content unless its `align`, or the stack's `justify` (a column) or `valign` (a row), is `stretch`, in which case it takes the column's width or the row's height as its box. A box that spans its width fills the area with content that says `stretch` the same way (the content's `align`, or the box's `justify`): a column or a text block inside then spans it and sits its own content by its `justify`; everything else sits in the area by `justify` and `valign` (centered by default).

An `aspect` makes the box a figure of that shape: sized by what it is offered, with the content fit into the area as any figure's content is (text that does not fit at its size scales down), or grown around its content when nothing is offered. `flex` fills the offer instead. Children at a rect of their own (by `pos`, `rect` and the like) are placed relative to the area inside the padding, as in a **Group**, and a child with metrics placed by `pos` alone sits there at its own size, which is how a **TitleFrame** puts its title on the border.

Padding and margin take a scalar, `[horizontal, vertical]`, or `[left, top, right, bottom]`; `true` is the default. The border and the corner radii are in stroke units, so boxes of different sizes share one look.

Parameters:
- `padding` = `0` — the space between the content and the border, in em; `true` for `0.5`
- `margin` = `0` — the space outside the border, in em; `true` for `0.5`
- `border` — the border width in stroke units; `true` for `1` (the **Frame** default)
- `rounded` — corner radius in stroke units, per corner as for **RoundedRect**; `true` for `10`
- `fill` — the background color
- `shape` — the element drawn as the border and background, a rectangle by default
- `clip` — clip the content to the border shape (`true`), or to an element
- `aspect` — the shape of the framed box; `true` for square
- `flex` — fill the size given rather than taking the content's shape
- `justify` — the text alignment, and where content narrower than the area sits
- `valign` — where content shorter than a box of a `height` of its own sits (default: `center`)
- `width`/`height` — the box's outer size in em, which it spans
- `scale` — the box's em over its parent's, as for **Text**
- `font-family`/`font-weight`/`font-style` and `text-*` — settings for text content, as for **Text**

Subunit names:
- `border` — attributes for the border, such as `stroke` or `stroke-dasharray`
- `fill` — attributes for the background

**Example**

Prompt: the text "hello!" in a frame with a dashed border and rounded corners

Generated code:
```jsx
<Box padding={0.25} border rounded={40} border-stroke-dasharray={5}>
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
<Frame padding={1} rounded={30}>
  <Grid rows={3} spacing={0.07}>
    { linspace(0, 360, 10).slice(0, 9).map(th =>
      <Frame padding rounded={20}>
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

Stack elements vertically or horizontally. **VStack** and **HStack** are the two directions, and **TextCol** and **TextRow** are the same stack with text's defaults. One stack serves figures, text and math: every child is laid out for its slot in the stack's em (the size of the text in it) by what it is, and the stack reports its own box in em, so stacks nest.

A figure (an element with an aspect) spans a column's width, or takes a row's height when the row has one; text wraps to its slot; a formula keeps its size; an element with neither an aspect nor content (a plot, a bare rectangle) fills what is left. A child with a `width` or `height` of its own, in em, keeps it, and one with a `share` gets that fraction of the stack's length. A child with `fit` is scaled to its slot like a figure, which is how a title is made to scale with the figure under it.

A column hands its width to every child and is as tall as they come to. A child sits across the column by `justify`, or by an `align` of its own, and hugs its content. When either says `stretch`, a child that can stretch (a box of text, a nested stack, not a figure or a formula) takes the column's width as its box: its `width` when it has one, else the widest child laid at its own size, the content sitting inside by the child's own `justify`; `justify="stretch"` on the column asks it of every child, and a child's `align` overrides either way. Given a `height` too, it is a budget: the content (text, formulas) is laid out first, and what is left goes to the children that can use it: figures span the width at their aspect and bare elements fill what they leave. A column over its budget shrinks its figures and bare elements by one factor, the figures narrowing together to the width that fits (as a figure of that shape would be fit), none below what its content needs; it never shrinks its text. Without a width, the column is as wide as its widest child laid at its own size, and a stack with no `width` of its own hugs its children across the axis: the width offered to it is what they may take, not what the stack is. `hug={false}` makes it span the width offered instead, as it does on its own when it fills a slot of a stack with a width.

A row gives children with a size of their own their width, sizes figures by its height when it has one, and splits the rest evenly among the others, each clamped to what it can use, so a one-line text takes only its line and a paragraph its share. Given both a width and a height, a figure gives way from the height toward its fair share of the width until the text beside it fits. Without a width, every child is at its natural size for the height. Children align across the row by `valign`, or by an `align` of their own. With `valign="stretch"`, or an `align` of its own saying so, a child that can stretch in height (a box, not a text block or a formula) takes the row's height as its box, so frames side by side come out the same height with their content sitting inside by their own `valign`.

`spacing` is space between children as a fraction of the stack's length, the unit of a stack of figures, which stays scale-free; `gap` is space in em. A `Spacer` with neither fills what is left, like a bare element.

Child parameters:
- `width`/`height` — a size of the child's own, in its em
- `share` — the child's fraction of the stack's length along the axis (half means half)
- `fit` — scale the child (text, a formula, a list) to its slot like a figure
- `align` — where the child sits in its slot, in place of the stack's `justify` or `valign`; `stretch` makes a child that can take the column's width or the row's height as its box
- `scale` — the child's em over the stack's

Parameters:
- `direc` = `'v'` — the direction of stacking: `v` or `h`
- `width`/`height` — the stack's size in em: what a column offers its children or a row divides; a column's `height` is a budget
- `hug` — whether a stack with no `width` hugs its children across the axis (the default, unless it fills a slot of a stack with a width); `hug={false}` spans the width offered
- `gap` = `0` — the space between children in em
- `spacing` = `0` — the space between children as a fraction of the stack's length; `true` for `0.1`
- `even` = `false` — give every child an equal share
- `justify` = `'center'` — where a child narrower than a column sits, or where a row narrower than its width sits along it; also the text alignment handed to the text children; `stretch` stretches every child of a column that can
- `valign` = `'center'` — how a row's children align across it: `top`, `anchor` (their first lines' math axes), `center`, `bottom`, or `stretch` (every child that can takes the row's height)
- `anchor` = `'first'` — where the stack's own anchor line is: its first child's, or `center` for its middle
- `scale` = `1` — the size of the stack relative to the surrounding em
- `font-family`/`font-weight`/`font-style` and `text-*` — settings handed to the text children

**Example**

Prompt: a wide blue rectangle on top, with red and green squares side by side on the bottom. each one has rounded corners.

Generated code:
```jsx
<VStack gap>
  <Rectangle rounded aspect={2} fill={blue} />
  <HStack gap>
    <Square rounded fill={red} />
    <Square rounded fill={green} />
  </HStack>
</VStack>
```

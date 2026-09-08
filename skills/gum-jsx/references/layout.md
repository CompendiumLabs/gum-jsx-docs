# Layout Elements

## Box

*Inherits*: **Group** > **Element**

This is a simple container class allowing you to add padding, margins, and a border to a single **Element**. It's pretty versatile and is often used to set up the outermost positioning of a figure. Mirroring the standard CSS definitions, padding is space inside the border and margin is space outside the border. This has no border by default, but there is a specialized subclass of this called **Frame** that defaults to `border = 1`.

**Box** can be pretty handly in various situations. It is differentiated from **Group** in that it will adopt the `aspect` of the first child element. This is useful if you want to do something like shift an element up or down by a certain amount while maintaining its aspect ratio. Simply wrap it in a **Box** and set child's `pos` to the desired offset.

There are multiple ways to specify padding and margins. If given as a scalar, it is constant across all sides. If two values are given, they correspond to the horizontal and vertical sides. If four values are given, they correspond to `[left, top, right, bottom]`.

The `adjust` flag controls whether padding/margins are adjusted for the aspect ratio. If `true`, horizontal and vertical components are scaled so that their ratio is equal to the `child` element's aspect ratio. This yields padding/margins of constant apparent size regardless of aspect ratio. If `false`, the inputs are used as-is.

Parameters:
- `padding` = `0` / `0.1` — the padding to be added (inside border)
- `margin` = `0` / `0.1` — the margin to be added (outside border)
- `border` = `0` / `1` — the border width in stroke units
- `rounded` = `0` / `10` — corner radius in stroke units, per corner as for **RoundedRect**; `true` uses `10`
- `fill` = `null` — the background color to use (default is no fill)
- `adjust` = `true` — whether to adjust values for aspect ratio
- `shape` = `Rect` — the shape class to use for the border
- `clip` = `false` — whether to clip the contents to the border shape

Subunit names:
- `border` — keywords to pass to border, such as `stroke` or `stroke-dasharray`

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

Stack elements vertically or horizontally. **VStack** and **HStack** are the two directions, and **TextCol** and **TextRow** are the same stack with text's defaults. One stack serves figures, text and math: every child is laid out for its slot in the stack's em (the size of the text in it) by what it is, and the stack reports its own box in em, so stacks nest.

A figure (an element with an aspect) spans a column's width, or takes a row's height when the row has one; text wraps to its slot; a formula keeps its size; an element with neither an aspect nor content (a plot, a bare rectangle) fills what is left. A child with a `width` or `height` of its own, in em, keeps it, and one with a `share` gets that fraction of the stack's length. A child with `fit` is scaled to its slot like a figure, which is how a title is made to scale with the figure under it.

A column hands its width to every child and is as tall as they come to. Given a `height` too, it is a budget: the content (text, formulas) is laid out first, and what is left goes to the children that can use it, a bare element filling it and figures splitting it evenly, each fit inside its share. A column over its budget takes the height out of its figures, never its text. Without a width, the column is as wide as its widest child laid at its own size, and a stack with no `width` of its own hugs its children across the axis: the width offered to it is what they may take, not what the stack is.

A row gives children with a size of their own their width, sizes figures by its height when it has one, and splits the rest evenly among the others, each clamped to what it can use, so a one-line text takes only its line and a paragraph its share. Given both a width and a height, a figure gives way from the height toward its fair share of the width until the text beside it fits. Without a width, every child is at its natural size for the height. Children align across the row by `valign`, or by an `align` of their own.

`spacing` is space between children as a fraction of the stack's length, the unit of a stack of figures, which stays scale-free; `gap` is space in em. A `Spacer` with neither fills what is left, like a bare element.

Child parameters:
- `width`/`height` — a size of the child's own, in its em
- `share` — the child's fraction of the stack's length along the axis (half means half)
- `fit` — scale the child (text, a formula, a list) to its slot like a figure
- `align` — where the child sits in its slot, in place of the stack's `justify` or `valign`
- `scale` — the child's em over the stack's

Parameters:
- `direc` = `'v'` — the direction of stacking: `v` or `h`
- `width`/`height` — the stack's size in em: what a column offers its children or a row divides; a column's `height` is a budget
- `gap` = `0` — the space between children in em
- `spacing` = `0` — the space between children as a fraction of the stack's length; `true` for `0.1`
- `even` = `false` — give every child an equal share
- `justify` = `'center'` — where a child narrower than a column sits, or where a row narrower than its width sits along it; also the text alignment handed to the text children
- `valign` = `'center'` — how a row's children align across it: `top`, `anchor` (their first lines' math axes), `center`, or `bottom`
- `anchor` = `'first'` — where the stack's own anchor line is: its first child's, or `center` for its middle
- `scale` = `1` — the size of the stack relative to the surrounding em
- `font-family`/`font-weight`/`font-style` and `text-*` — settings handed to the text children

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

# References

Below is a list of topics to reference for documentation and usage examples for the various components. Every `gum.jsx` component is documented here. Your code must either use these components or create its own custom components. Before using a component, be sure to read the relevant reference to fully understand its parameters and capabilities.

## Layout

**File**: [layout](references/layout.md)

These are the raw layout components that assist you in arranging elements in a figure. They typically take a list of child elements and arrange them in a specified way. `Box` is a simple container element that can be used to add padding, border, and rounded corners to a group of elements.

`Stack` lets you arrange elements in a vertical or horizontal stack (like `flexbox` in CSS) in a way that respects the aspect ratio of the child elements. Typically you would use the specialized subclasses `VStack` and `HStack` for vertical and horizontal stacks, respectively. `Grid` does something similar but for a 2D grid of rows and columns (like `grid` in CSS).

`Points` is different in that it takes a list of locations and arranges a given element at each of those locations (with the default element being `Dot`, a solid filled `Circle`).

**Components**:
- *Box*: a box with a padding, border, and rounded corners
- *Stack*/*VStack*/*HStack*: arrange elements vertically or horizontally
- *Grid*: arrange elements in a grid of specified size
- *Points*: arrange one element at each of a list of locations

## Geometry

**File**: [geometry](references/geometry.md)

These are the basic geometric shapes that can be used to create more complex figures. Both `Rect` and `Ellipse` are aspectless by default but can be given an aspect ratio to control their shape (i.e., a circle is an `Ellipse` with an aspect of `1`). `Arc` is the portion of an `Ellipse` between two angles.

`Line` is actually more general than just a single straight line. It can be used to draw piecewise linear paths by passing a list of points. For the case of simple unit lines, use `UnitLine` and its specialized variants `VLine` and `HLine` instead. For closed paths, either pass `closed` to `Line` or use `Polygon` instead.

For multi-segment Bézier splines, `Spline` is the way to go. It takes a list of control points and draws a smooth cubic spline through them. You can control the tension of the spline with the `curve` parameter (default is `0.5`). This also accepts a `closed` parameter to draw a closed spline.

**Components**:
- *Rect*: a rectangle
- *Ellipse*: an ellipse
- *Arc*: an elliptical arc between two angles
- *Line*/*Polygon*/*Fill*: a piecewise linear path (possibly closed)
- *Spline*: a multi-segment Bézier spline (possibly closed)
- *UnitLine*/*VLine*/*HLine*: a single unit line
- *RoundedLine*: a piecewise linear path with rounded corners at each turn
- *Arrow*: an arrow between two points, with a straight, curved (`curve`), or rounded city-block (`rounded`) shaft
- *ArrowHead*: customizable arrowhead (no shaft)

## Text

**File**: [text](references/text.md)

These are components that can be used to create text elements. `Text` is a fairly sophisticated component that handles text wrapping, line spacing, and other text-related features. You can specify the width (in "ems", that is, in proportion to the line height) with the `width` parameter, or the size relative to the surrounding text with `scale`, and the alignment with the `justify` parameter. Feel free to intersperse non-text elements with text elements to create more complex layouts.

`TextCol` stacks text blocks vertically: each child is laid out for the column's `width`, a child's `scale` sizes it relative to the column (a heading at `scale={1.5}`, say), a formula is placed at the text's size, and any other element spans the width; `gap` is the space between them in em. `TextRow` puts blocks side by side (children with a size of their own keep it, the rest share the width, or `sizes` splits it), `TextGrid` fills equal columns row by row, and `TextFigure` gives an element a size in em with a caption below it. `Bullets` is a bulleted list whose items are wrapped to the same em width, so it sizes consistently with surrounding text. `TextBox` draws a box around text (or a formula, or a column) with padding in em, and `TextFrame` is the same with a border on by default, which is handy for labels and badges. The `TitleFrame` is a `Frame` subclass that automatically adds a boxed title to the top of the frame. Finally, `Slide` is a fixed 16:9 canvas holding a `TitleFrame` filled with a `TextCol` of its children; text size is set by `em` (a fraction of the slide height) or `width`, a figure with no size of its own (alone or beside text in a `TextRow`) is sized to the height left after the text, and content that is still too tall is shrunk to fit, clipped, or an error by `overflow`.

**Components**:
- *Text*: a text element with wrapping
- *TextCol*: a column of text blocks, sized by the column's width and their `scale`
- *TextRow*: text blocks side by side, sharing the width
- *TextGrid*: text blocks in equal columns
- *TextFigure*: an element sized in em with a caption
- *TextBox*/*TextFrame*: text (or a formula, or a column) in a padded box, with or without a border
- *Bullets*: a bulleted list of text items, with optional nested lists
- *TitleFrame*: a frame with a title
- *Slide*: a slide with a title and content, its text sized by `em`

## Math

**File**: [math](references/math.md)

These are components for creating mathematical expressions. By far the most common usage is to pass a LaTeX style math expression to the `Latex` component (`Tex` is the same with inline style by default). However, you can get very fine grained control over the layout of mathematical expressions with `MathText` as your outer wrapper and the `SupSub`, `Frac`, `Sqrt`, `Bracket`, and `MathArray` components. Bodies given as strings to these are parsed as LaTeX, so you can mix the two approaches freely.

**Components**:
- *Latex*: a single LaTeX equation from a string
- *MathText*: display a list of math components
- *MathSymbol*: a single glyph as a math atom, by LaTeX command or literal character, with its face and spacing class
- *MathOp*: a large operator (`\sum`, `\int`, ...) or an upright named function (`\lim`, `argmax`), sized by style and taking limits
- *TextMode*: literal upright text inside math, as `\text{...}` (with `family`/`bold`/`italic` faces)
- *SupSub*: a superscript and/or subscript
- *Frac*: a fraction (numerator/denominator)
- *Sqrt*: a radical with an optional index
- *Accent*: an accent glyph (hat, bar, tilde, vec, dot, ...) over a base
- *Overline*/*Underline*: a rule over or under a body
- *HorizBrace*: an over/under brace with an optional label
- *MathStretch*: a drawn stretchy decoration (extensible arrows, braces, segments) of a given width
- *MathArray*: cells laid out as a matrix or table, with optional rules
- *MathBox*: any element or math item as a math atom of its own, with padding, a fixed width, and a spacing class
- *Bracket*: auto-sized brackets (round, square, curly, angle, or custom)

## Symbolic

**File**: [symbolic](references/symbolic.md)

These components allow you to plot functions symbolically. That is, they accept functions as arguments and plot them accordingly. Functions can be specified as [x => y], [y => x], or [t => (x,y)]. You can control the range over which the domain is sampled with the `tlim`/`xlim`/`ylim` parameters. You can also control the number of samples to take with the `N` parameter.

These clearly extend their non-`Sym` counterparts by adding the ability to plot functions symbolically. There are two additional elements. `SymFill` plots a filled area between two functions; passing a constant to either `fy1` or `fy2` is equivalent to passing a constant function. `SymField` draws a vector field: it samples a regular grid over `xlim`/`ylim` and places a copy of a shape (an `Arrow` by default) at each point, spun to the angle in degrees returned by `func(x, y)`.

**Components**:
- *SymPoints*: plot points functionally
- *SymLine*/*SymPoly*: plot a curve functionally (possibly closed)
- *SymSpline*: plot a Bézier spline functionally (possibly closed)
- *SymFill*: plot a filled area between two functions
- *SymField*: plot a vector field as a grid of rotated shapes

## Plotting

**File**: [plotting](references/plotting.md)

There are components for creating various types of plots. The core element is `Graph`, which is a container element that accepts a list of children to plot over a specified coordinate system (`xlim`/`ylim`/`coord`). `Plot` is a `Graph` subclass that adds axes (with `Axis`/`HAxis`/`VAxis`), labels, and other plot-specific features. `BarPlot` is a help element that wraps a `Bars` element inside of a `Plot`.

The `Plot` element in particular is highly customizable, and you can pass arguments to sub-components using `axis`/`label`/`title` prefixes. For instance, to specify the stroke width of the x-axis, you can use `xaxis-stroke-width`. This logic applies to other types of compound components as well.

**Components**:
- *Graph*: a graph containing multiple elements with a specified coordinate system
- *Plot*: a plot containing a graph, axes, and labels
- *Axis*/*HAxis*/*VAxis*: a single axis for a plot
- *Scale*/*HScale*/*VScale*: a row of tick marks
- *Labels*/*HLabels*/*VLabels*: tick labels placed along an axis
- *Mesh*/*HMesh*/*VMesh*/*Mesh2D*: grid lines over an area
- *Legend*: a boxed legend of badges and labels
- *Bars*/*BarPlot*: a bar plot (bare or wrapped in a `Plot`)

## Networks

**File**: [networks](references/networks.md)

These are components for creating network diagrams. The core element is `Network`, which is a container element that accepts a list of `Node`s and `Edge`s, as well as potentially other elements like labels. A `Node` can specify an `id` to be used to reference it from an `Edge` as either the source (`start`) or destination (`end`). Default values for `Node` and `Edge` arguments can be specified with `node-` and `edge-` prefixed arguments passed to the `Network` element. Give the `Network` an `em` (coordinate units per em) to set one text size for the whole diagram: nodes then size their boxes from their labels (with `padding` and `width` in em, and `rounded` in stroke units), and `Text` labels placed by `pos` are sized to it too, so no `ysize` tuning is needed.

`Edge` is an `Arrow` between two nodes given as `start` and `end`. The side of each node the edge leaves from is inferred from their relative positions but can be set with `start-side`/`end-side`. You can toggle arrowheads on either end with `arrow`/`arrow-start`/`arrow-end`, and shape the path with `curve` (spline curvature) or `rounded` (a city-block route with rounded corners).

**Components**:
- *Node*: a node in a network
- *Edge*: an edge in a network
- *Network*: a network containing nodes and edges

## Utilities

**File**: [utilities](references/utilities.md)

These are the helper functions that are available in the library. They are not components themselves, but they are useful for creating and manipulating data. Many of them mimic the behavior of their counterparts in Python and `numpy` and are useful for generating `Element` objects from arrays. There are also some commonly used mathematical constants, tools for interpolating colors, and a seeded random stream (`random`, `uniform`, `normal`, `integer`) that makes generative figures repeatable; call `setSeed` to choose the seed.

**Components**:
- *Math*: mathematical functions
- *Arrays*: array operations
- *Colors*: color operations
- *Random*: seeded random number generation
- *Tables*: loading data tables from CSV files
- *Images*: loading images from PNG files

# Gallery

There is a gallery of more complex examples available. Each is a single markdown file with a complete `gum.jsx` code example and accompanying text description. These are available in the `references/gala` directory. Here is a brief description of each along with a list of the main elements used:

- [Atomic Orbitals](references/gala/atomic_orbitals.md): a slide with polar graphs of the s, p, and d atomic orbitals in centered rows of figures (**Graph**, **SymSpline**, **TextRow**, **TextFigure**)
- [Axis Arrows](references/gala/axis_arrows.md): a log plot with directed coordinate axes (**Plot**, **SymLine**, **Axis**)
- [Cell Diagram](references/gala/cell_diagram.md): a labeled textbook diagram of an animal cell built from lumpy splines (**Spline**, **Group**, **Text**, **Line**)
- [Complex Plot](references/gala/complex_plot.md): a plot of a complex function showing the solutions to a parameterized quadratic equation (**Plot**, **SymSpline**, **Mesh2D**)
- [Flux Capacitance](references/gala/flux_capacitance.md): a relatively simple line and shaded area plot (**Plot**, **SymLine**, **SymFill**)
- [Macro Economy](references/gala/macro_economy.md): a diagram of a macro economy (**Network**, **Edge**, **Node**, **Text**)
- [Metal Grid](references/gala/metal_grid.md): a stylized grid of metal squares (**Grid**, **Spline**, **Frame**)
- [Neon Rose](references/gala/neon_rose.md): a glowing neon-sign rose made of layered translucent strokes (**Spline**, **Graph**, **Box**)
- [Particle in a Box](references/gala/particle_box.md): a textbook-style diagram of the eigenfunctions of a particle in a 1D box (**Plot**, **SymSpline**, **Latex**)
- [Pendulum Physics](references/gala/pendulum_physics.md): a physics diagram of a pendulum (**Arc**, **Arrow**, **Line**, **Latex**)
- [Plot Manual](references/gala/plot_manual.md): a plot assembled by hand from a coordinate group, axes, and meshes instead of `Plot` (**Group**, **Axis**, **Mesh**, **SymLine**)
- [Polygon Slide](references/gala/polygon_slide.md): a slide showing a grid of framed, captioned regular polygons from a reusable component (**SymPoly**, **TextGrid**, **TextFigure**)
- [Punk Rock](references/gala/punk_rock.md): a logo-style text block (**TextFrame**, **TextRow**)
- [Scenic Route](references/gala/scenic_route.md): a custom extensible math arrow with a figure-eight knot (**MathText**, **Arrow**, **Latex**)
- [Set Theory](references/gala/set_theory.md): a mathematical diagram of nested sets (**Text**, **Frame**, **Group**)
- [Shape Algebra](references/gala/shape_algebra.md): equations with shapes and swatches as math atoms (**MathText**, **Frac**, **Sqrt**, **Bracket**, **MathArray**)
- [Slick Bars](references/gala/slick_bars.md): a bar chart with a custom plot style (**Plot**, **Bars**, **Span**)
- [Space Rose](references/gala/space_rose.md): a backlit sign box with a printed rose floating in a seeded starfield (**Polygon**, **Spline**, **Group**, **Random**)
- [Spline Star](references/gala/spline_star.md): a parameterized star shape (**Spline**, **Frame**)
- [Stokes Theorem](references/gala/stokes_theorem.md): a slide depicting Stokes' theorem, a figure beside a text column (**Spline**, **Arrow**, **Latex**, **TextRow**)
- [The Nexus](references/gala/the_nexus.md): a plot of damped cosine functions (**Plot**, **SymSpline**)
- [Transformer](references/gala/transformer.md): a block diagram of a transformer architecture (**VStack**, **Frame**, **Arrow**)
- [Two Columns](references/gala/two_column.md): a two-column slide, a plot with a caption beside a heading, a paragraph, and a list (**Slide**, **TextRow**, **TextFigure**, **TextCol**)
- [Unit Distance](references/gala/unit_distance.md): a unit-distance graph of a complex integer lattice (**Graph**, **Segments**, **Points**)

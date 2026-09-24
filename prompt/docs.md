## Design philosophy

Gum code should express the structure of a figure and let the layout system do
the measuring and positioning. Strive for the simplest, most elegant composition
that preserves the visual intent and is easy to reuse. Hard-coded dimensions and
positions are a last resort, not the starting point.

- Use layout classes whenever feasible. Compose `HStack`, `VStack`, `TextCol`,
  `Box`, and `Frame` for rows, columns, spacing, and decoration. Use higher-level
  elements such as `Slide`, `TextFigure`, and `Plot` for the structures they
  already understand. Read their documented examples before inventing a layout.
- Express relationships instead of coordinates. Let content determine natural
  sizes; use `grow`, `gap`, alignment, and fill sizing to distribute available
  space. For a note at the bottom of a panel, put flexible content above it in a
  column rather than assigning the note a y coordinate. Let titles and captions
  be measured instead of subtracting guessed heights from a canvas.
- Establish the outer design size and base typography where needed, then use
  `em` for internal spacing and type scales. Use fractions and aspect ratios for
  meaningful proportional relationships. Replacing pixel coordinates with `em`
  coordinates alone does not make a layout compositional.
- Reuse design decisions. Extract repeated structures into small components,
  share palette and typography choices, and generate repeated content from data.
  Forward layout props to a component's outer element so it remains useful in
  different containers. Prefer a few clear abstractions over copied markup or
  wrappers that add no useful behavior.
- Reserve explicit coordinates and fixed sizes for genuine geometric or output
  requirements, such as data positions, a physical page size, or a diagram whose
  placement carries meaning. When layout classes cannot express the requirement,
  keep the manual geometry local and derive related values from shared parameters.

Judge the source as well as the rendered result. A polished picture with brittle
code is an unfinished example. Check that changes to text, content count, or
viewport size are handled by the layout rather than requiring a new set of
hand-tuned offsets.

## Layout and styling essentials

- Lengths accept `px(24)` / `"24px"` and `em(1.5)` / `"1.5em"`.
  `"50%"` and `0.5` use the property's established fraction
  reference. `width={100}` is not 100 pixels. Quoted JSX attributes work directly,
  including `font-size="24px"` and `padding="1em"`. Zero, including `"0"`, needs no
  reference. Nonzero unitless strings and boolean padding are not supported.
- Font weights accept numbers or names: `font-weight="bold"`, `{bold}`, and
  `{700}` are equivalent. `"light"` is 300; `"regular"` and `"normal"` are 400.
- For a standalone figure, set a design height and base `font-size` on its outer
  element; `aspect` can supply the width. Viewers scale the completed SVG for
  display, including text and strokes. Use ems for descendant typography,
  padding, gaps, and details. Content-sized figures may omit outer dimensions.
- Boxes, frames, stacks, `TextBox`, `TextFrame`, and `TextCol` are content-sized
  by default. Use `width="fill"` or `height="fill"` only to occupy an offer;
  `width={1}` requires an established parent width. Fill is not a length unit.
  Omit dimensions for content sizing; there is no content-sizing keyword.
- `align="fill"` allocates automatic child dimensions while respecting explicit
  sizes and limits; `align="stretch"` imposes the allocation even on sized children.
  Use `align-self` on a direct child to override its parent's alignment. A child's
  own `width="fill"` still fills the offer.
- Whole standalone formulas shrink automatically when needed; inline formulas
  and nested atoms keep their normal scale. `fit={false}` disables this behavior.
  Put `fit` directly on a fixed composition to measure naturally and
  shrink the complete drawing when needed. It hugs the scaled result; ordinary
  text still reflows unless fitting is requested. `fit="contain"` also enlarges;
  `fit="cover"` fills and crops. No fitting wrapper is needed. Authored dimensions
  describe the natural drawing; host offers and maxima bound the fitted result.
- A `Box` contains one element. Wrap siblings in `HStack`, `VStack`, or `Group`.
  Use `padding`, `border-width`, `border-color`, `border-radius`, and `background` for
  its decoration. `fill` and `stroke` instead inherit to child shapes. `Text`
  uses `color`, not `fill`. Use `justify` for text inside its allocated box.
  Padding tuples are `[horizontal, vertical]` or `[top, bottom, left, right]`;
  use named sides when that is clearer.
- Stack `gap` separates items, `align` controls the cross axis, and `justify`
  controls the main axis. Set `grow`, `shrink`, and optional `basis` on direct
  children for flex allocation. Main-axis fractions use the stack length after
  gaps: two half-width children tile an established row. Unsized children with
  equal `grow` weights share the remaining budget from zero bases; use
  `basis="auto"` for content-based growth. Flex props do not pass through wrappers.
  `HStack wrap` makes multiple rows; give growing cards a `basis` or `min-width`
  to control row breaks.
- Every element accepts `aspect` as preferred allocated width divided by height.
  One established dimension derives the other; naturally sized content grows
  its allocation to the ratio. Two exact dimensions and conflicting limits take
  precedence. Aspect does not scale fonts or drawings; use `fit` for that.
  Stacks do not infer a composite aspect from their children.
- `Grid columns={3}` shares equal column widths across rows, dividing an offered
  width or using the widest natural cell. A track array such as
  `columns={[em(6), "auto", em(12)]}` uses explicit and content-sized widths.
  `column-gap` and `row-gap` override `gap`; rows hug their tallest wrapped cell.
  Alignment defaults to horizontal fill and vertical start; `align="fill"`
  also fills automatic cell heights. `TextGrid` converts strings/numbers and
  defaults to em-based gaps. Use `<Box />` for an intentional blank cell.
  Numeric tracks are fractions, not weights. Cell percentage heights cannot
  size content-based rows; use absolute lengths or fill/stretch instead.
- `Group` is a finite positioning canvas, not a content-hugging box. Establish
  both axes with dimensions, finite offers, or one dimension plus aspect. Its
  children use `x`, `y`, and `anchor`, with top-left origin and y pointing down.
  In `Graph`, `Plot`, and `Network`, bare numeric positions are data coordinates,
  with y pointing up by default. Unit strings and `px`/`em` positions are local
  lengths; widths and font sizes also use layout units. Give positioned shapes
  explicit sizes: each receives an offer for the whole canvas.
- Scoped props such as `title-font-size`, `xaxis-label-color`, and `head-open`
  configure parts created by their owner. Use only the scopes in that owner's
  reference. Function-valued sampling props such as `SymLine fy` are consumed
  during construction; callbacks are not arbitrary mutable layout state.

Use shared palette constants such as `blue`, `red`, `green`, `gray`, and `none`,
or semantic theme paints such as `"theme:accent"`. Themes do not paint backgrounds;
set `background` when needed. Text retains its font size during ordinary layout,
so wrapping, usable width, and space for labels matter. Keep padding for ink
overhang; the outer SVG clips at its viewport.

Consult each component's reference for its layout controls: for example, `Box`
uses padding for spacing around its content, while `Plot` also has a `margin`.
Use `HStack` and `VStack` for rows and columns, `Grid` for shared columns across
rows, and `Group` for positioned geometry.

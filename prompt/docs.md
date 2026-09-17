## Layout and styling essentials

- Lengths use `px(24)` for pixels, `em(1.5)` for local font sizes, or bare numbers
  for fractions of an established reference. `width={100}` is not 100 pixels.
  CSS unit strings and boolean padding are not supported. Zero needs no reference.
- Set a base `font-size` on `Svg`, then prefer ems for descendant typography,
  padding, gaps, and scalable details. `Plot` and `Slide` have their own font
  defaults; set `font-size={em(1)}` when they should follow that base.
- `Box`, `Frame`, and ordinary stacks normally hug content. `TextBox`,
  `TextFrame`, and `TextCol` fill the offered width. `width="fit"` opts out of
  that fill policy. `width="fill"` uses an offer; `width={1}` requires an
  established parent width. Neither policy is a general length unit.
- A `Box` contains one element. Wrap siblings in `HStack`, `VStack`, or `Group`.
  Use `padding`, `border-width`, `border-color`, `radius`, and `background` for
  its decoration. `fill` and `stroke` instead inherit to child shapes. `Text`
  uses `color`, not `fill`. Use `text-align` for text inside its allocated box.
- Stack `gap` separates items, `align` controls the cross axis, and `justify`
  controls the main axis. Set `grow`, `shrink`, and optional `basis` on direct
  children for flex allocation. Two half-width children plus a gap overflow;
  use equal `grow` weights to share remaining space. Flex props do not pass
  through wrappers, and stacks do not infer a composite aspect from children.
- Every element accepts `aspect` as preferred allocated width divided by height.
  One established dimension derives the other; naturally sized content grows
  its allocation to the ratio. Two exact dimensions and conflicting limits take
  precedence. Aspect does not scale fonts or drawings. Use `Fit` for uniform
  scaling. `TitleFrame frame-aspect={1}` makes the bordered body square;
  ordinary `aspect` includes its raised title. The boxed title defaults to
  centered placement and inherited, normally non-bold text.
- `Group` is a finite positioning canvas, not a content-hugging box. Establish
  both axes with dimensions, finite offers, or one dimension plus aspect. Its
  children use `x`, `y`, and `anchor`, with top-left origin and y pointing down.
  In `Graph`, `Plot`, and `Network`, positions are instead data coordinates,
  with y pointing up by default. Widths and font sizes still use layout units.
- Scoped props such as `title-font-size`, `xaxis-label-color`, and `head-open`
  configure parts created by their owner. Use only the scopes in that owner's
  reference. Function-valued sampling props such as `SymLine fy` are consumed
  during construction; callbacks are not arbitrary mutable layout state.

Use shared palette constants such as `blue`, `red`, `green`, `gray`, and `none`,
or semantic theme paints when appropriate. Text retains its font size during
layout, so wrapping, usable width, and space for labels matter. Keep padding for
ink overhang; the outer SVG clips at its viewport.

Consult each component's reference for its layout controls: for example, `Box`
uses padding for spacing around its content, while `Plot` also has a `margin`.
Use `HStack` and `VStack` for rows and columns; compose rows or position cells
in a `Group` for a grid.

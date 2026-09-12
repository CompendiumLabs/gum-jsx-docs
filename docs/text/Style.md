# Style

*Category*: core

Typography and paint inherit through containers. Dimensions, positioning, flex
weights, padding, backgrounds, and borders do not inherit.

| Property | Default | Meaning |
|---|---|---|
| font_size | px(16) | Text size; relative forms use the inherited font |
| font_family | "IBM Plex Sans" | Registered font family |
| font_weight | 400 | Numeric weight from 1 to 1000 |
| font_style | "normal" | "normal" or "italic" |
| line_height | em(1.2) | Line box height, not glyph scaling |
| color | "black" | Text color and default Box border color |
| fill | "none" | Shape fill |
| stroke | "black" | Shape stroke |
| stroke_width | px(1) | Shape stroke thickness |
| stroke_linecap | "butt" | "butt", "round", or "square" |
| stroke_linejoin | "miter" | "miter", "round", or "bevel" |
| stroke_miterlimit | 4 | Dimensionless miter limit |

Use paint strings such as `"#317969"`, `"tomato"`, or `"none"`. Text uses
color, not fill. For a Box's own fill use background; setting fill on a Box instead
changes the inherited shape paint.

Built-in constants are available in evaluated JSX and as named imports from
`gum-next-core`. Use `font_family={sans}` or `{mono}` for IBM Plex Sans or Mono,
and `font_weight={light}`, `{regular}`, or `{bold}` for weights 300, 400, or 700.

Examples use `blue` as the default accent, followed by `red`, `green`, `yellow`,
and `purple` for additional distinct items. Backgrounds and ordinary text use
neutral colors where needed for readability.

Paint constants preserve the original Gum palette, so `fill={blue}` differs
from the CSS color `fill="blue"`:

| Constant | Value | Constant | Value |
|---|---|---|---|
| none | "none" | white | #ffffff |
| black | #000000 | blue | #1e88e5 |
| red | #ff0d57 | green | #4caf50 |
| yellow | #ffb300 | purple | #9c27b0 |
| gray | #f0f0f0 | lightgray | #f6f6f6 |
| darkgray | #888888 | slate | #1e252e |

Numeric constants are also available: `e`, `pi`, `phi` (the golden ratio),
`r2d` (180 / pi), and `d2r` (pi / 180). Host-provided `scope` bindings can
override any built-in constant for an evaluation.

Pixel strokes remain the same thickness when shapes are laid out at new sizes.
An em stroke follows the local font size. A fractional stroke follows the shape's
shorter side. An explicit [Fit](Fit.md) scales the completed stroke with everything
else in its child.

Supported styles are an explicit vocabulary, not a pass-through SVG attribute
bag. Opacity, dash arrays, gradients, CSS classes, style objects, and prefixed
subunit props are not implemented. Unknown props may be ignored rather than
reported, so use this reference rather than assuming browser SVG behavior.

[Runnable source](../code/Style.jsx).

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

Pixel strokes remain the same thickness when shapes are laid out at new sizes.
An em stroke follows the local font size. A fractional stroke follows the shape's
shorter side. An explicit [Fit](Fit.md) scales the completed stroke with everything
else in its child.

Supported styles are an explicit vocabulary, not a pass-through SVG attribute
bag. Opacity, dash arrays, gradients, CSS classes, style objects, and prefixed
subunit props are not implemented. Unknown props may be ignored rather than
reported, so use this reference rather than assuming browser SVG behavior.

[Runnable source](../code/Style.jsx).

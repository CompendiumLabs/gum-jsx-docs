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
| stroke_dasharray | [] | Nonnegative layout lengths; an empty/all-zero array is solid |
| opacity | 1 | Per-drawing paint opacity from 0 to 1 |

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

Numeric constants are also available: `e`, `pi`, `tau` (2 pi), `phi` (the golden ratio),
`r2d` (180 / pi), and `d2r` (pi / 180). Host-provided `scope` bindings can
override any built-in constant for an evaluation.

[Math helpers](./MathHelpers.md) supplies bare numeric functions. Use
[interp and palette](./Colors.md) to generate colors from numeric data.

Pixel strokes remain the same thickness when shapes are laid out at new sizes.
An em stroke follows the local font size. A fractional stroke follows the shape's
shorter side. An explicit [Fit](../../elements/text/Fit.md) scales the completed stroke with everything
else in its child.

Dash lengths resolve like stroke widths: pixels stay fixed, em follows font size,
and fractions use the shorter side. Opacity inherits and applies to individual
drawings, including text and box decoration. It is not a composited group opacity;
overlapping drawings can accumulate alpha.

## Scoped component props

Use prefixes to configure generated subcomponents:

```jsx
<Plot title="Measurements" axis-stroke={slate}
  xaxis-tick-size={px(8)} xaxis-label-color={blue}
  title-font-size={em(1.4)} title-wrap={false} />
```

JSX accepts dashes or underscores; JavaScript props use underscores.
`xaxis_label_color` goes to the x axis, then to its generated labels. Routing is
local to the owner and happens once during construction, before layout.

| Owner | Scopes |
|---|---|
| Arrow | `head_` styles |
| Axis / Scale / Label / Labels, including directional variants | `line_`, `tick_` styles; `label_` text options |
| Plot / BarPlot | `axis_`, `xaxis_`, `yaxis_` axis options; `tick_` styles |
| Plot / BarPlot | `label_`, `title_`, `xlabel_`, `ylabel_` text options |
| Plot / BarPlot | `grid_`, `xgrid_`, `ygrid_` mesh options; `legend_` legend options |
| Legend | `label_` text options |
| TitleBox / TitleFrame / Slide | `title_` text options |
| TextFigure | `caption_` text options |

Text options include font/paint, dimensions, wrap, whitespace, and text_align;
content is supplied by the owner. For example, `title_wrap={false}` keeps a title
on one line, and `legend_label_font_size={px(10)}` controls generated legend text.

Nested `*_style` objects remain supported. At the same scope, flat props override
matching fields in the nested object. Shared settings supply defaults for more
specific scopes, merging part option records per field. Plot's common tick/label
settings precede common axis settings, then xaxis/yaxis option objects, then flat
xaxis_/yaxis_ props. Shared grid and label settings precede x/y-specific settings.
Unit records and arrays remain individual values, not recursively merged objects.

Owner geometry props keep their meanings: Arrow's head_size/head_width, Axis's
tick_size/label_offset and ordinary line_height, and Plot's label_gap. An explicit
disabled axis stays disabled. Caller-supplied title, caption, label, and legend
Elements retain their own props; scopes configure parts created by the owner.

For custom components, [prefix_split and prefix_join](./CustomElements.md#scoped-props)
are available in JSX and as named exports. Supported styles remain an explicit
vocabulary; gradients, arbitrary CSS classes, and general SVG attribute injection
are deferred. Unknown props may be ignored, so use the component reference.

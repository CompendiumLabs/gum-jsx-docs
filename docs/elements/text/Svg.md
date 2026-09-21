# Svg

*Category*: layout

The document viewport. **Svg** accepts zero or one content element, along with the
common [sizing](../../gallery/text/Sizing.md) and inherited [style](../../gallery/text/Style.md) props. Put multiple
elements inside a stack or **Group**.

An explicit width or height establishes that viewport axis. Unspecified axes
hug the child's measured size. There is no implicit 500px or 1000px canvas:
a completely natural **Square** produces a small natural viewport.

Some elements reserve an outset outside their own box, such as a
[Plot](./Plot.md) with `bounds="frame"`. A hugging axis grows to include it; an
established axis keeps its size and clips it like any other overflow.

**Svg** gives its content advisory offers on its established axes, rather than
forcing every child to occupy the whole viewport. Consequently, a tall **Svg**
does not make a **VStack**'s children grow. Use explicit [stack sizing](../../gallery/text/Stack.md).

The viewport establishes percentage references for its direct content. Its
fragment has a rectangular clip, and serialized SVG hides viewport overflow.
Overflow is still retained in the fragment for inspection.

| Property | Default | Meaning |
|---|---|---|
| `children` | — | One content element, optionally absent |
| `theme` | Inherited, initially `"light"` | Palette inherited by all content |
| `background` | `none` | Explicit viewport paint; independent of the theme |
| `viewport` | — | Reference canvas `{ width, height }` in pixels for `vw` and `vh` lengths; does not allocate output space |
| `width` / `height` | Natural | Preferred viewport dimensions in pixels: `px(800)` or `"800px"` |
| `aspect` | — | Preferred viewport width/height ratio |
| `min-width` / `min-height` | — | Minimum viewport dimensions |
| `max-width` / `max-height` | — | Maximum viewport dimensions; uniformly shrink overflowing content on hugging axes |
| Typography and paint | Inherited | Style inherited by content |

On an unspecified axis, a maximum first provides a layout offer. Text reflows at
the offered width; if the resulting figure exceeds either maximum, **Svg** scales
the complete figure down uniformly. Width and height shrink together, including
fonts, strokes, and reserved outsets. Smaller figures keep their natural sizes.
This is the bounded-preview policy used by Gum Studio; it does not change the
allocation-only meaning of max props on ordinary elements.

An explicit width or height, including an exact parent request, keeps that axis's
allocation and clipping behavior. Advisory `available(...)` requests without max
props do not scale anything. A width-only document therefore reflows and grows
naturally in height.

At the document root, `viewport` establishes references before the root font is
resolved, allowing `font-size={vh(4)}` even with only maximum output dimensions.
Omitted reference axes use definite root dimensions, then the host's `viewport`
when provided. The reference canvas stays unchanged through nested **Svg**
elements. See [Viewport units](../../gallery/text/viewport_units.md).

An explicit `aspect` uses the common sizing rules. `width={px(320)} aspect={2}`
creates a 320×160 viewport before laying out its content. With neither dimension
established, the viewport grows its measured size to the ratio without scaling
the drawing. Two fixed dimensions and min/max limits take precedence.

Set `theme="dark"` for foregrounds suited to a dark surface. Descendants use the
palette for text, strokes, grids, plot borders, and legend badges and borders.
Explicit paint props override the defaults. See [Themes](../../gallery/text/Themes.md).

Title remains a [render_svg option](../../gallery/text/Rendering.md). Its background
option paints behind the entire fragment. Themes do not paint backgrounds;
**Svg**'s `background` prop can supply an explicit viewport background in source.
The CLI wraps a bare non-**Svg** root automatically; `evaluate` does not.

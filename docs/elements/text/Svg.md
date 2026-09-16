# Svg

*Category*: layout

The document viewport. **Svg** accepts zero or one content element, along with the
common [sizing](../../gallery/text/Sizing.md) and inherited [style](../../gallery/text/Style.md) props. Put multiple
elements inside a stack or **Group**.

An explicit width or height establishes that viewport axis. Unspecified axes
hug the child's measured size. There is no implicit 500px or 1000px canvas:
a completely natural **Square** produces a small natural viewport.

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
| `width` / `height` | Natural | Preferred viewport dimensions; explicit values require `px()` |
| `aspect` | — | Preferred viewport width/height ratio |
| `min-width` / `max-width`, `min-height` / `max-height` | — | Own size limits |
| Typography and paint | Inherited | Style inherited by content |

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

# Svg

*Category*: layout

The document viewport. Svg accepts zero or one content element, along with the
common [sizing](Sizing.md) and inherited [style](Style.md) props. Put multiple
elements inside a stack or Group.

An explicit width or height establishes that viewport axis. Unspecified axes
hug the child's measured size. There is no implicit 500px or 1000px canvas:
a completely natural Square produces a small natural viewport.

Svg gives its content advisory offers on its established axes, rather than
forcing every child to occupy the whole viewport. Consequently, a tall Svg
does not make a VStack's children grow. Use explicit [stack sizing](Stack.md).

The viewport establishes percentage references for its direct content. Its
fragment has a rectangular clip, and serialized SVG hides viewport overflow.
Overflow is still retained in the fragment for inspection.

| Property | Meaning |
|---|---|
| children | One content element, optionally absent |
| width / height | Preferred viewport dimensions |
| min_width / max_width, min_height / max_height | Own size limits |
| Typography and paint | Inherited by content |

An aspect on Svg does not derive the other viewport dimension. Put an aspect
on a shape or Group inside it instead.

Background and title are [render_svg options](Rendering.md) and CLI options,
not Svg props. A full-size Box can supply a background in the source.
The CLI wraps a bare non-Svg root automatically; `evaluate` does not.

[Runnable source](../code/Svg.jsx).

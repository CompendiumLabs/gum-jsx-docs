# JSX

*Category*: core

A Gum source file is JavaScript with JSX expressions. A single bare element is
returned automatically. If you add declarations or other statements, finish with
an explicit `return`. Return one element, usually [Svg](../../elements/text/Svg.md).

## Components and data

Define ordinary functions that return elements, pass props, use object spreads,
and generate children with `range`, `linspace`, and `map`. Components execute during
evaluation, before layout. Prefer these small functions for reusable combinations
of built-in elements; [Custom elements](./CustomElements.md) covers new layout behavior.

Arrays and JSX fragments flatten inside containers. Null, undefined, and boolean
children are ignored. **Element** containers also ignore blank strings, so spaces
between tags do not become layout children. A root fragment is an array, not an
element, so put it inside a container. Single-content containers such as **Box** still
require at most one element after flattening.

**Element** props are snapshotted. Records, arrays, lengths, and existing elements are
supported source data; function-valued props on built-in elements and mutable
resource objects are not. A component function may consume a callback itself
before constructing the final elements.

[Point inputs](./PointValues.md) accept `[x, y]` pairs:
`<Polyline points={[[0, 0], [0.5, 1], [1, 0]]} />`. This also works in
host code. Helpers such as `zip(xs, ys)` can supply point lists directly.

## Names and spelling

The evaluator supplies the documented elements, the `Element` base class, `px`,
`em`, path constructors, and selected custom-layout helpers. Classes can extend
`Element` directly in JSX; see [Custom elements](./CustomElements.md).
[Style constants](./Style.md) such as `blue`,
`red`, `green`, `yellow`, `purple`, `mono`, and `bold` are also built in.
[Math helpers](./MathHelpers.md) such as `sin`, `cos`, `exp`, `sqrt`, and `clamp`,
[array helpers](./Arrays.md) such as `range`, `linspace`, `zip`, and `enumerate`,
and [seeded random functions](./Random.md) are also built in. Standard JavaScript
names such as `Math` and `Array` remain available. Local declarations and
host-provided scope bindings can override the supplied names.

JSX attributes accept dashes or underscores: every `-` in an attribute name
becomes `_` before the element or function component receives its props.
For example, these spellings are equivalent:

```jsx
<Text font-size={px(20)} font-weight={bold}>Revenue</Text>
<Text font_size={px(20)} font_weight={bold}>Revenue</Text>
```

This also works for custom props such as `label-text` and boolean attributes
such as `show-label`; component functions receive `label_text` and `show_label`.
If both spellings appear, the last attribute wins. Attribute values are unchanged.
Use underscore keys in JavaScript objects, including objects spread with `{...props}`;
those keys are ordinary JavaScript and bypass attribute-name conversion.
camelCase is not normalized. Unknown SVG attributes are not automatically
forwarded to the output.

The source runs as a function body, not an imported module. Put package imports
in a host TypeScript script and provide extra bindings through
`evaluate(source, { scope })`, rather than writing static imports in a .jsx file.

## JSX whitespace

Literal JSX text removes outer blank lines and common indentation automatically.
These two labels have the same content and size:

```jsx
<Text>
  Revenue
</Text>

<Text>Revenue</Text>
```

Internal text line breaks remain, including breaks next to inline spans. A blank
JSX child with at least one newline is treated as formatting between tags and
dropped. Spaces written on the same line are preserved, including the
space between `<Span>Hello</Span> <Span>world</Span>`. Adjacent spans without a
space remain adjacent. Only ordinary spaces and tabs count as indentation;
nonbreaking spaces remain content.

```jsx
<Text>
  Hello <Span font_weight={bold}>world</Span>
  A second line
</Text>
```

Indentation is shared across each element's children; nested elements normalize
their own content. **Text** beginning beside an opening tag keeps its initial spaces;
continuation lines lose their common indentation. [Text](../../elements/text/Text.md) then applies
its normal or pre layout rules to the resulting content.

JavaScript strings in expressions and attribute values bypass this JSX cleanup.
For exact leading/trailing spaces and blank lines, use an explicit string and
`whitespace="pre"`. The whitespace prop controls text layout; it does not disable
JSX normalization. `wrap={false}` also keeps long lines from wrapping.

```jsx
<Text whitespace="pre" wrap={false}>{'  Revenue  \n'}</Text>
```

## Trusted source

Evaluation runs JavaScript in the host environment. It is **not a security
sandbox**. Do not evaluate untrusted documents on a server without isolation.

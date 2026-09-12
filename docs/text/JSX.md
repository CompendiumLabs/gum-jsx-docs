# JSX

*Category*: core

A Gum source file is JavaScript with JSX expressions. A single bare element is
returned automatically. If you add declarations or other statements, finish with
an explicit `return`. Return one element, usually [Svg](Svg.md).

## Components and data

Define ordinary functions that return elements, pass props, use object spreads,
and generate children with `Array.from` or `map`. Components execute during
evaluation, before layout. Prefer these small functions for reusable combinations
of built-in elements; [Custom elements](CustomElements.md) covers new layout behavior.

Arrays and JSX fragments flatten inside containers. Null, undefined, and boolean
children are ignored. A root fragment is an array, not an element, so put it inside
a container. Single-content containers such as Box still require at most one
element after flattening.

Element props are snapshotted. Records, arrays, lengths, and existing elements are
supported source data; function-valued props on built-in elements and mutable
resource objects are not. A component function may consume a callback itself
before constructing the final elements.

## Names and spelling

The evaluator supplies the documented elements, `px`, `em`, path constructors,
and selected custom-layout helpers. Standard JavaScript names such as `Math`
and `Array` are available. There are no built-in `blue`, `range`, `linspace`,
or `Plot` bindings in next.

Use snake_case props. Hyphenated JSX attributes such as `font-size` are normalized
to `font_size`; camelCase is not normalized. Unknown SVG attributes are not
automatically forwarded to the output.

The source runs as a function body, not an imported module. Put package imports
in a host TypeScript script and provide extra bindings through
`evaluate(source, { scope })`, rather than writing static imports in a .jsx file.

## Whitespace and trust

Use `text="..."` or a single line for ordinary prose. Actual newlines in text
content are significant; [Text](Text.md) documents normalization.

Evaluation runs JavaScript in the host environment. It is **not a security
sandbox**. Do not evaluate untrusted documents on a server without isolation.

[Runnable source](../code/JSX.jsx).

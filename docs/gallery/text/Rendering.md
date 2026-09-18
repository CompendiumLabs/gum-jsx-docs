# Rendering and embedding

*Category*: api

The core pipeline has three boundaries: source elements describe intent,
LayoutPass produces immutable pixel fragments, and render_svg serializes those
fragments. Rendering does not query elements, resolve units, or load fonts.

## From JSX to SVG

```ts
import { evaluate, LayoutPass, render_svg, inspect_fragment, white } from 'gum-jsx-core'

const source = '<Svg><Square width={px(80)} fill={green} stroke={none} /></Svg>'
const element = evaluate(source, { name: 'example.jsx' })
const pass = new LayoutPass()
const fragment = pass.layout(element)
const svg = render_svg(fragment, {
  title: 'An eighty-pixel square',
  background: white,
  id_prefix: 'example',
})
console.log(inspect_fragment(fragment))
console.log(pass.stats) // queries, layouts, hits
```

evaluate executes JavaScript. Use it only for trusted source, or provide a
separate isolation boundary in your application. Its optional scope adds or
overrides evaluator bindings. It returns an **Element**, not an SVG string, and
sources ending in a return statement may hand back a plain value instead.
render_element below wraps bare elements in **Svg**; the core evaluator does not.

JSX is optional. **Element** exports are constructors, so ordinary TypeScript can
build the same source graph directly:

```ts
import { Svg, Square, px, green, none } from 'gum-jsx-core'

const element = new Svg({
  children: new Square({ width: px(80), fill: green, stroke: none }),
})
```

## Viewports and plain values

Hosts such as the [CLI](./CLI.md), the editor, and the MCP viewer share one
entry point that takes an evaluated result, wraps a bare element in **Svg**,
applies host viewport props, lays it out under a request, and serializes it:

```ts
import { evaluate, render_element, make_request, exact } from 'gum-jsx-core'

const result = render_element(evaluate(source), {
  request: make_request({ width: exact(400) }),
  defaults: { theme: 'light' },
  overrides: { background: 'white' },
  id_prefix: 'example',
})
if (result.kind === 'svg') console.log(result.svg, result.size)
else console.log('plain value:', result.value)
```

The result is tagged. An element yields `svg` markup, the realized `size`, the
`fragment`, and the `pass` that produced it; anything else comes back as a
`value` for the host to print. Without options a fresh LayoutPass with the core
fonts is created. Pass `fonts` to seed it with another provider, such as the
math fonts, or `pass` to reuse one across renders and keep its cache; fonts
given alongside a pass are installed on it.
`defaults` sit beneath the source's own **Svg** props, so a source theme beats a
host default, while `overrides` sit above them for hosts whose theme must win.
`wrap` props apply only to the viewport generated around a bare element, for
example `max_width` and `max_height` bounds for a preview canvas that an
explicit **Svg** should not inherit. Undefined entries in any of the three are
ignored, so optional settings can be forwarded directly. An existing **Svg**
keeps its layout descriptor and extra props, so custom viewport subclasses
survive. `request` is an ordinary LayoutRequest; the
[Svg](../../elements/text/Svg.md) `aspect` and size props resolve against it as
in any layout. Use layout_element for the same wrapping and layout without
serialization, for example to inspect or rasterize the fragment, and
make_viewport for the wrapping step alone.

## Requests and results

pass.layout accepts an optional LayoutRequest. natural means no size offer,
available supplies an advisory budget, and exact fixes an allocation. Omitted,
undefined, and null axes are natural, so optional dimensions forward directly.
Values in these low-level requests are already pixels, unlike source lengths:

```ts
import { make_request, exact, available } from 'gum-jsx-core'

const fragment = pass.layout(element, make_request({
  width: exact(400), height: available(300),
}))
```

An available budget does not itself establish a percentage reference. See
[Units](./Units.md) and [Sizing](./Sizing.md) for how containers establish definite
boxes and resolve source sizes.

Fragments contain size, drawings, child placements, named guides such as text
baselines, ink bounds, and overflow. Size is the allocated rectangle; ink is
painted bounds after clipping; overflow records excess content before clipping.
inspect_fragment shows this geometry without going through SVG.

## Debugging layout

Add `debug` to a layout element to show its allocated rectangle in **solid red** and
its content rectangle, when available, in **dashed blue**:

```jsx
<Box debug padding={px(16)} width={px(240)}>
  <HStack gap={px(12)}>
    <Text>First</Text>
    <Text>Second</Text>
  </HStack>
</Box>
```

Only the marked element gets outlined; children can opt in separately with their
own `debug` flags. Omit the flag or use `debug={false}` to turn it off. The same
option works in TypeScript, for example `new Box({ debug: true, padding: px(16) })`.

The allocated rectangle is the element's final layout size. Containers such as
**Box** expose a separate content rectangle inside their insets; elements without
one show only the allocated rectangle. The overlays follow rotations and fitting,
appear above the artwork, and bypass content clipping within the SVG viewport.
They leave layout, ink bounds, and overflow unchanged. SVG, PNG, and terminal
graphics all include the overlays.

Inline **Span** styling is folded into its owning **Text**; mark the **Text** to
inspect its allocation.

The middle stage in the runnable example below uses `debug` to show both boxes.

## Reuse and output

Keep element identities and a LayoutPass to reuse cached results for identical
requests, inherited styles, reference boxes, and resource versions. Creating a
new equivalent element or a new pass does not preserve that cache. **Text** also
caches prepared glyphs within a pass so a new width can reuse shaping. This is
query caching, not a promise that every layout or edit is sublinear.

render_svg accepts title, background, and id_prefix. Use distinct prefixes when
embedding multiple generated SVGs in one HTML document, so clip definitions do
not collide. Prefixes start with a letter or underscore and then contain
letters, digits, underscores, dots, or hyphens. **Text** is emitted as paths.

For PNG and terminal graphics, use gum-jsx-png and gum-jsx-cli through the
[CLI](./CLI.md). Those host concerns are separate from core layout. The runnable
source below is a small diagram to feed through this pipeline, not a host script.

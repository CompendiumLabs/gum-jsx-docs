# Rendering and embedding

*Category*: api

The core pipeline has three boundaries: source elements describe intent,
LayoutPass produces immutable pixel fragments, and render_svg serializes those
fragments. Rendering does not query elements, resolve units, or load fonts.

## From JSX to SVG

```ts
import { evaluate, LayoutPass, render_svg, inspect_fragment, white } from 'gum-next-core';

const source = '<Svg><Square width={px(80)} fill={green} stroke={none} /></Svg>';
const element = evaluate(source, { name: 'example.jsx' });
const pass = new LayoutPass();
const fragment = pass.layout(element);
const svg = render_svg(fragment, {
  title: 'An eighty-pixel square',
  background: white,
  id_prefix: 'example',
});
console.log(inspect_fragment(fragment));
console.log(pass.stats); // queries, layouts, hits
```

evaluate executes JavaScript. Use it only for trusted source, or provide a
separate isolation boundary in your application. Its optional scope adds or
overrides evaluator bindings. It returns an Element, not an SVG string. The
[CLI](./CLI.md) also wraps bare elements in Svg; the core evaluator does not.

JSX is optional. Element exports are constructors, so ordinary TypeScript can
build the same source graph directly:

```ts
import { Svg, Square, px, green, none } from 'gum-next-core';

const element = new Svg({
  children: new Square({ width: px(80), fill: green, stroke: none }),
});
```

## Requests and results

pass.layout accepts an optional LayoutRequest. natural means no size offer,
available supplies an advisory budget, and exact fixes an allocation. Values in
these low-level requests are already pixels, unlike source lengths:

```ts
import { make_request, exact, available } from 'gum-next-core';

const fragment = pass.layout(element, make_request({
  width: exact(400), height: available(300),
}));
```

An available budget does not itself establish a percentage reference. See
[Units](./Units.md) and [Sizing](./Sizing.md) for how containers establish definite
boxes and resolve source sizes.

Fragments contain size, drawings, child placements, named guides such as text
baselines, ink bounds, and overflow. Size is the allocated rectangle; ink is
painted bounds after clipping; overflow records excess content before clipping.
inspect_fragment shows this geometry without going through SVG.

## Reuse and output

Keep element identities and a LayoutPass to reuse cached results for identical
requests, inherited styles, reference boxes, and resource versions. Creating a
new equivalent element or a new pass does not preserve that cache. Text also
caches prepared glyphs within a pass so a new width can reuse shaping. This is
query caching, not a promise that every layout or edit is sublinear.

render_svg accepts title, background, and id_prefix. Use distinct prefixes when
embedding multiple generated SVGs in one HTML document, so clip definitions do
not collide. Prefixes start with a letter or underscore and then contain
letters, digits, underscores, dots, or hyphens. Text is emitted as paths.

For PNG and terminal graphics, use gum-next-png and gum-next-cli through the
[CLI](./CLI.md). Those host concerns are separate from core layout. The runnable
source below is a small diagram to feed through this pipeline, not a host script.

[Runnable source](../code/Rendering.jsx) · [Fonts](./Fonts.md) · [Custom elements](./CustomElements.md)

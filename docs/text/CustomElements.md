# Custom elements

*Category*: api

Prefer a [functional JSX component](JSX.md) when existing elements can express
the layout. Use define_element when you need a new primitive or layout policy.
It creates an Element constructor from a name, layout callback, and optional
default source props.

```ts
import {
  define_element, shape_size, make_fragment, make_rect, draw_rect,
} from 'gum-next-core';

const Tile = define_element('Tile', (props, query) => {
  const size = shape_size(query.request, query.sizing);
  return make_fragment({
    size,
    draw: [draw_rect(make_rect(0, 0, size.width, size.height), {
      fill: query.style.fill, stroke: 'none', stroke_width: 0,
    })],
  });
}, { fill: '#2c7567' });
```

The callback runs during layout, not construction. Source props are immutable
snapshots: plain records, arrays, primitive values, and Element references.
Do not put functions, font objects, host handles, or mutable caches in props.
Behavior belongs to the element type and resources belong to LayoutPass.

## The query contract

| Query member | Role |
| --- | --- |
| request | Prepared natural, available, or exact requests for both axes |
| sizing | Resolved source sizes, bounds, and aspect preference |
| style | Resolved inherited style, including pixel font size |
| reference | Definite parent dimensions for percentage resolution |
| path | Diagnostic location in the element graph |
| child(element, request, reference?, index?) | Measure a child with inherited style |
| resource(name) | Obtain a host resource from this pass |
| prepare(name, compute) | Cache preparation independent of requests and references |

Return a fragment in local pixel coordinates. For a shape-like leaf,
shape_size resolves its size. For a content-sized element, measure children and
pass the desired size through finish_size before constructing the result. An
inconsistent returned size is an error; a renderer cannot repair it later.
Drawing helpers also take final pixel values, including stroke widths.

A container must establish its own percentage references where dimensions are
definite, query children through query.child, and place the returned fragments
with place_fragment. The child's default reference argument is empty, not the
container's inherited reference. Parent placement does not mutate the child or
remeasure it. Validate your own props and child policy explicitly.

Prepared values must depend only on source, style, and versioned resources—not
the current width, height, or percentage reference. Use ordinary layout work for
allocation-dependent geometry. Set a new resource version on a reused pass when
external data changes; see [Fonts](Fonts.md) for an example.

The runnable Meter defines a small custom leaf using only evaluator bindings.
Its drawings use the size actually allocated to it, and its value is explicit
source data. It does not add an implicit growth policy to stacks.

[Runnable source](../code/CustomElements.jsx) · [Rendering](Rendering.md) · [Sizing](Sizing.md)

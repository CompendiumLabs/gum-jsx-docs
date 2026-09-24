# Coordinates

*Category*: api

Data coordinates are distinct from layout lengths. Numeric graph points are data;
width, height, stroke widths, and other lengths use the ordinary [units](./units.md).
Unit strings in point coordinates are local lengths: `"50%"` uses half the
corresponding drawing dimension, and `"10px"` is a pixel offset. They do not pass
through data-axis mapping. Bare numeric points keep their data meaning.

`infer_coordinates(children, options)` returns an immutable
{xlim,ylim,flip_x,flip_y} record. `map_point(point, coordinates, size)` maps to
pixels; unmap_point reverses it (zero-sized frames cannot be inverted).
point_bounds, merge_bounds, and `data_bounds(element)` support inference.

Point arguments accept `{x,y}` or `[x,y]`; point lists can mix the two.
Mapping results always have named `{x,y}` coordinates. See [Point values](./point_values.md)
for the shared input convention and examples using zip and length tuples.

A custom element reports bounds with a static method:

```ts
class Mark extends Element {
  static data_bounds(_props: ElementProps): DataBounds {
    return { xlim: [0, 10], ylim: [-1, 1] }
  }
  static layout(props: ElementProps, query: LayoutQuery) {
    // Map data with query.coordinates and the selected pixel size here.
    return make_fragment({ size: shape_size(query.request, query.sizing) })
  }
}
```

These helpers and types are exports from `gum-jsx-core`. The factory form
`define_element` also accepts `data_bounds` in its fourth options argument.
See [Custom elements](./custom_elements.md) for both forms and inherited hooks.

Ordinary containers contribute descendant bounds. A data_bounds callback is a
boundary: returning null excludes the subtree. **Graph** and **Plot** use this to
isolate their internal data.

LayoutQuery and LayoutContext expose coordinates. query.child accepts a fifth
context argument: {coordinates} establishes a context, {coordinates:null} clears
it, and omission inherits it. Coordinates participate in layout-cache identity.
query.prepare must stay independent of coordinates, requests, and references.
The engine transports context; inference and mapping remain element policies.

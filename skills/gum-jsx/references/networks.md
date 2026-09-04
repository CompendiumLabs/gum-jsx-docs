# Networks Elements

## Edge

*Inherits*: **Arrow** > **Group** > **Element**

This creates a cubic spline path from one element (typically a **Node**) to another with optional arrowheads at either or both ends. It is named **Edge** because of its usage in network diagrams with **Network**. The emanation directions are automatically inferred from the relative node positions but can be overriden as well.

Use **Arrow** for creating edges between arbitrary points and for details on options for the path and arrowheads.

Parameters:
- `start`/`end` — the beginning and ending element for the path
- `start-side`/`end-side` — the attachment side of the arrowheads (cardinal strings)
- `start-loc`/`end-loc` — the attachment location of the arrowheads (a number between 0 and 1)
- `points` — the intermediate points to draw the spline between
- `arrow` / `arrow-start` / `arrow-end` — toggles whether the respective arrowheads are included. Defaults to `true` for `arrow-end` and `false` for `arrow-start`, meaning a directed graph edge
- `arrow-size` = `0.04` — the arrowhead size to use for both arrows
- `curve` = `2` — curvature factor forwarded to the **Spline**
- `rounded` = `null` — corner radius for a city-block path using **RoundedLine**

**Example**

Prompt: Two boxes with text in them that have black borders and gray interiors. The box in the upper left says "hello" and the box in the lower right says "world!". There is a city-block path connecting the two boxes. The arrowhead from "Hello" is filled in red and the arrowhead to "World!" is filled in blue.

Generated code:
```jsx
<Network aspect node-fill={gray} edge-arrow edge-rounded={0.025}>
  <Node id="hello" pos={[0.3, 0.25]}>Hello</Node>
  <Node id="world" pos={[0.7, 0.75]}>World!</Node>
  <Edge start="hello" end="world" points={[[0.3, 0.5], [0.7, 0.5]]}/>
</Network>
```

## Network

*Inherits*: **Group** > **Element**

Network diagrams can be created using the **Node** and **Edge** classes. This automatically processes Node and Edge children to create a network diagram. It will also display non-network elements as they would be displayed in a **Graph**.

An `em`, in coordinate units, sets the text size of the whole diagram: it goes to the nodes, which size their boxes from their labels (see **Node**), and, as on any **Group**, to any other child with metrics (a **Text** label, a formula) placed by `pos` without a size of its own, which is made its em height times `em` tall. Without one, node text is fit into boxes of `node-ysize` and labels need a `ysize` each.

You can specify the internal coordinate system using the `coord` argument, which is a 4-element array specifying the position of the bottom left corner and the width and height of the coordinate system. For example, `coord: [0, 0, 1, 1]` specifies the unit square. If `coord` is not specified, it will be inferred from the processed node bounds together with any intermediate edge points.

Parameters:
- `em` — coordinate units per em, the text size for the nodes and labels
- `coord` — the internal coordinate system to use

Subunits:
- `node` — arguments applied to all nodes
- `edge` — arguments applied to all edges

**Example**

Prompt: A network with a node on the left saying "Hello world" and two nodes on the right, one saying "This is a test of wrapping capabilities" and the other containing a blue ellipse. There are arrows going from the left node to each of the right nodes. The nodes have gray backgrounds and rounded corners. The edges have white arrowheads.

Generated code:
```jsx
<Network aspect={1.5} node-ysize={0.3} node-rounded node-fill={gray} edge-fill={white}>
  <Node id="hello" pos={[0.25, 0.5]} width={3}>Hello world</Node>
  <Node id="test" pos={[0.75, 0.25]} width={6}>This is a test of wrapping capabilities</Node>
  <Node id="ball" pos={[0.75, 0.75]}><Ellipse aspect={1.5} fill={blue}/></Node>
  <Edge start="hello" end="test" />
  <Edge start="hello" end="ball" start-side="s" />
</Network>
```

## Node

*Inherits*: **Group** > **Element**

A framed label at a position, the building block of a **Network**. If the `children` argument is a string, it is wrapped in a **Text** element. You must provide an `id` argument to reference the node in an **Edge** element.

Given an `em` (coordinate units per em, usually set once on the Network), the box is sized from its label: a **TextFrame** hugging the text, or an element with metrics such as a formula or a **TextCol**, with `padding` and `rounded` in em. The node is then its em height times `em` tall, so every node in the network shares one text size and a label wrapped at `width` makes a taller node rather than smaller text. A `ysize` still overrides the height for a single node, and a child without metrics (a shape, a stack) is framed by `ysize` as below.

Without an `em`, the node is a **Frame** of the given `ysize` with the label fit into it, so the text size follows from the box and the number of lines, and `padding` and `rounded` are fractions of the box.

Parameters:
- `id` — a string to be used as the node identifier
- `children` — the element or text to be enclosed in the node box
- `em` — coordinate units per em; sizes the box from the label
- `ysize` = `0.2` — the height of the node box (width will adjust to aspect); with an `em` it follows from the label unless given
- `padding` = `0.1` — the padding of the node box, as a fraction of it; with an `em` it is in em and defaults to `0.4`
- `border` = `1` — the border width of the node box
- `rounded` = `0.05` — the radius of the corners of the node box, as a fraction of it; with an `em` it is in em and defaults to `0.3`
- `fill` — the fill color of the node box
- `width` = `null` — the width (in ems) to wrap the text at (if `null`, the text will not be wrapped)
- `justify` = `'center'` — the horizontal justification of the text

**Example**

Prompt: A simple connected network where each rounded node contains an emoji icon stacked above a text label. The example shows idea → design → launch.

Generated code:
```jsx
<Network aspect={2} node-fill={gray} node-rounded node-padding node-ysize={0.35}>
  <Node id="idea" pos={[0.2, 0.5]}>
    <VStack spacing={0.15}>
      <Text>💡</Text>
      <Text stack-size={0.25}>Idea</Text>
    </VStack>
  </Node>
  <Node id="design" pos={[0.5, 0.5]}>
    <VStack spacing={0.15}>
      <Text>🎨</Text>
      <Text stack-size={0.25}>Design</Text>
    </VStack>
  </Node>
  <Node id="launch" pos={[0.8, 0.5]}>
    <VStack spacing={0.15}>
      <Text>🚀</Text>
      <Text stack-size={0.25}>Launch</Text>
    </VStack>
  </Node>
  <Edge start="idea" end="design" />
  <Edge start="design" end="launch" />
</Network>
```

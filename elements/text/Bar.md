# Bar

*Category*: plotting

| Property | Default | Meaning |
|---|---|---|
| value | `1` | Bar endpoint |
| position | `0` | Bar center |
| base | `0` | Bar baseline |
| bar_width | `0.8` | Width in data units |
| direction | `"vertical"` | Vertical or horizontal bar |
| radius | `0` | Corner radius in layout units |
| space | Automatic | Use ambient data coordinates or local geometry |

One bar with value (default 1), position (0), base (0), and bar_width
(0.8 data units). Direction defaults to vertical, or horizontal for HBar.
Other geometry and paint follow [Bars](./Bars.md), including radius. Compose
multiple bars as children or use Bars for arrays.

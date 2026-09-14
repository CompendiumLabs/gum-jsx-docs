# UnitLine

*Category*: geometry

| Property | Default | Meaning |
|---|---|---|
| `from` | `[0, 0.5]` | Segment start in the local rectangle |
| `to` | `[1, 0.5]` | Segment end in the local rectangle |

**UnitLine** is a local **Line** convenience. **HLine** and **UnitLine** span `x=0` to `x=1` at `y=0.5`;
**VLine** spans `y=0` to `y=1` at `x=0.5`. `from/to` props can override these defaults. Use
**CoordLine** for data geometry.

# SymFill

*Category*: plotting

| Property | Default | Meaning |
|---|---|---|
| upper | `1` | Upper function or constant |
| lower | `0` | Lower function or constant |
| xlim / ylim | `[0, 1]` | Sampling range for vertical / horizontal fills |
| xvals / yvals | Generated | Explicit sample coordinates |
| samples | `101` | Number of generated samples |
| direction | `"vertical"` | Fill vertically or horizontally |
| space | Automatic | Use ambient data coordinates or local geometry |

Sample a band between upper and lower functions or numbers (defaults 1 and 0).
Vertical fills use xvals/xlim (default [0,1]); horizontal fills use yvals/ylim.
samples defaults to 101. Other options follow [Fill](./Fill.md), including
direction, fill, stroke, and space.

A missing/nonfinite value in either boundary splits the whole band. Both
boundaries contribute to limits. Callbacks execute once at construction.

[Runnable source](../code/SymFill.jsx).

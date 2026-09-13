# Fit

*Category*: layout

Uniformly scale a completed child fragment into a target rectangle. This is
different from ordinary layout: Fit scales glyphs, strokes, padding, and guides
together. It does not reflow text to the target width.

Fit accepts zero or one content element. It occupies finite offered axes;
an unoffered axis follows the scaled child. Own width and height can set the
target explicitly. The child is measured naturally, with the target's established
axes available as percentage references.

| Property | Default | Meaning |
|---|---|---|
| mode | "contain" | Fit inside the target |
| mode="cover" | — | Cover the target, possibly extending outside it |
| mode="scale_down" | — | Contain, but never enlarge |
| align | "center" | Position scaled content in the target |
| clip | false | Clip to the target rectangle |

Alignment accepts "start", "center", "end", numbers from 0 to 1, or independent
choices in `{x,y}` / `[x,y]` form.
Stretch is not a Fit alignment: scaling is always uniform.
Use `mode="cover" clip` when cropping is intended.

Fit works from the child's allocated rectangle, not its ink bounds. Empty
dimensions are handled without an infinite scale, but can produce invisible
results. Giving the child an explicit natural width is useful when fitting a
wrapped paragraph or a compound diagram.

Do not use Fit when the goal is to keep text and pixel strokes at their authored
sizes. Use [Box](./Box.md), [Stack](../../topics/text/Stack.md), and explicit allocations instead.

[Runnable source](../code/Fit.jsx).

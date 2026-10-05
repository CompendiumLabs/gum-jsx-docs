---
category: text
description: "Rounded text halos keep labels readable over lines without moving the labels."
---

# Text halos

Both panels use the same lines, labels, positions, and font sizes. The right
panel inherits `halo-color={white}` from its graph. The default `halo-width` of
`em(0.08)` follows each label's font size; use `px(...)` for a fixed outward extent.

Halos paint beneath all foreground runs in a [Text](../../elements/text/Text.md#halos)
element, including styled spans. They enlarge ink bounds without changing
wrapping, baselines, or label placement. On a dark background, choose a dark halo
and light text. The halo color is explicit; it does not sample the background.

Use `halo-color={none}` or `halo-width={0}` to turn off an inherited halo. Generated
labels accept scoped props such as `label-halo-color`. Ordinary live text retains
its selectable foreground. Math labels and color emoji remain unchanged.

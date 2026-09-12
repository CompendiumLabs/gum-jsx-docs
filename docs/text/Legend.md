# Legend

*Category*: plotting

A measured box of badge/label rows. entries contains
{label,color?,kind?,badge?} records. label is a string or Element; kind is line
(default), point, or bar. A custom badge Element replaces its swatch.

Box props control decoration and sizing. Defaults: white background, 1px light
border, 0.6em padding. gap is row spacing (0.4em); badge_width defaults to 1.8em;
label_style styles generated text. Legend hugs its rows. Plot's legend prop
places it inside top right; layout containers can place it elsewhere.

[Runnable source](../code/Legend.jsx).

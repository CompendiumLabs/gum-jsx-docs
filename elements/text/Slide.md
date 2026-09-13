# Slide

*Category*: text

A 16:9 canvas with a measured title and flexible content area. title is a string
or Element; title_style overrides default 1.6em bold text. Defaults: 20px base
font, 1.5em padding, 0.8em gap, white background. clip optionally hides paint
outside the slide (false by default).

Scoped title_ props accept generated text options, including title_color,
title_font_size, and title_wrap. They override matching fields in title_style.
Supplied title Elements retain their own props.

Explicit dimensions or parent offers determine the viewport; natural width is
480px with a 16:9 height. Content uses TextCol and ordinary stack rules. Give
large figures a height or explicit flex allocation. Resizing does not multiply
the type scale; use Fit for a scaled copy of a finished slide.

[Runnable source](../code/Slide.jsx).

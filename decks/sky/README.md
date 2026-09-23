# The sky's color story

An eight-slide Gum JSX deck to read with a five-year-old, with two rainbow slides at the end.

Open **sky-colors.pdf**. The numbered JSX files, `prelude.jsx`, and `index.json` are the editable sources. There is no HTML output.

## Read and play together

1. **The sky's color story:** Ask which picture looks like the sky outside now. Sunset can look red or orange; nighttime is usually dark.
2. **Sunlight holds many colors:** Point along the colored rays. A glass prism can separate the colors in sunlight.
3. **Air is made of tiny pieces:** Wave a hand through the air. Explain that the drawing makes invisible molecules look big enough to see.
4. **Air spreads blue light around:** Follow a blue arrow to the eyes. “Spreads” is our child-friendly word for scattering.
5. **Sunset:** Trace the longer light path. When the Sun is low, its light travels through more atmosphere; more blue is scattered away from that path. Sunrise can have these colors too.
6. **Night:** Pretend a lamp is the Sun. Turn slowly: facing the lamp is like day, facing away is like night. The Sun keeps shining even when our side faces away.
7. **Raindrops:** Follow the path into the drop, to the back, and out again. Water bends different colors by different amounts. Many drops together make the rainbow we see.
8. **Rainbow:** Trace the arc. Look for one with the Sun low and behind you and sunlit rain ahead. Look at the sky, never straight at the Sun.

Allow about 5–8 minutes. Pause or skip ahead whenever she wants.

## Notes for grown-ups

The drawings simplify scale, the atmosphere, and light paths. Sunlight is shown with a yellow Sun symbol; its combined visible light appears white. Molecules do not have the visible size or color shown. A ray's color identifies which light we are following, rather than a colored trail visible from the side. The drop diagram uses refraction and one internal reflection, with the separation between colors exaggerated for readability. Real rainbow colors blend continuously.

Blue scatters more strongly than red. The full explanation of why we see blue rather than violet also involves the Sun's spectrum and human color vision; that detail is beyond this short introduction. Clouds and weather can change the colors we see.

## Sources

- Slides 1–5: [NASA Space Place — Why Is the Sky Blue?](https://spaceplace.nasa.gov/blue-sky/en/)
- Slide 6: [NASA StarChild — Why is there day and night?](https://starchild.gsfc.nasa.gov/docs/StarChild/questions/question31.html)
- Slides 7–8: [National Weather Service — How Do Rainbows Form?](https://www.weather.gov/fgz/Rainbow)

All diagrams were authored in Gum JSX for this deck.

## Rebuild the PDF

With the `gum` CLI installed, run from the parent directory:

```sh
gum sky/ -o sky/sky-colors.pdf
```

Preview one slide if desired:

```sh
gum sky/07_raindrops.jsx -o /tmp/sky-raindrop.png
```

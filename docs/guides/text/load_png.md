---
category: external
description: "Read a local PNG into an embedded data URL with loadPNG(path), then display it with PngImage."
---

# loadPNG

`loadPNG(path)` synchronously reads a PNG file and returns a base64 data URL for
[PngImage](../../elements/text/PngImage.md). It checks the PNG header and retains
the original bytes; pixel decoding happens in the renderer when needed.

The example loads `landscape.png` once, then displays it at its original
proportions and centered inside a square. Setting one image dimension preserves
its aspect ratio. Setting both dimensions fits the image inside that box without
stretching its pixels.

## Sample input

The fixture is a 240 × 150 PNG, drawn with Gum. Both the image and its
`landscape.jsx` source live in the
[sample data directory](https://github.com/CompendiumLabs/gum-jsx-docs/tree/master/docs/guides/data).
To regenerate it from that directory:

```sh
gum landscape.jsx -o landscape.png
```

SVG output embeds the PNG data, so the rendered SVG can be shared without the
original image file. Loading and scaling do not change the PNG's pixel resolution.

## Paths and hosts

The CLI resolves relative paths from the JSX file's directory, or from the
working directory for stdin. Absolute paths also work. Missing files and invalid
PNG headers throw an error containing the resolved filename.

The docs preview supplies a shim for the bundled sample PNG, so this example
also renders in the browser. For CLI use, place the PNG beside your JSX script.
The docs shim does not provide filesystem or remote URL access.
`PngImage` itself continues to accept embedded image data.

See [loadJSON](./load_json.md) for structured data and [loadCSV](./load_csv.md)
for tables.

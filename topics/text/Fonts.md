# Fonts

*Category*: text

Core measures text and converts glyph outlines into paths during layout. SVG
serialization needs no font access, and PNG rasterization needs no font
registration: the SVG already contains the geometry. The layout host still
needs font data to produce those paths.

## Bundled faces

IBM Plex Sans and IBM Plex Mono are bundled at weights 300, 400, and 700. The
default is IBM Plex Sans, 400, normal, 16px. Family names must match registered
names. The provider chooses the nearest available weight, preferring the lower
weight on a tie. If no italic face is available, an italic request uses an
oblique transform of the normal outline.

There is no system-font discovery or automatic fallback-family chain. An
unknown family or missing glyph is an error, rather than a silently substituted
font. In particular, do not assume arbitrary emoji or scripts are covered by
the bundled faces.

## Host setup

A default LayoutPass supplies Fonts. In Bun and supported Node hosts, bundled
files load lazily on first use. Browser hosts should preload the needed family
before layout and arrange for the bundled font assets to be served:

```ts
import { Fonts, LayoutPass, sans, regular } from 'gum-next-core';

const fonts = new Fonts();
await fonts.load(sans); // Omit the family to load all bundled faces.
const pass = new LayoutPass({ fonts: { value: fonts, version: fonts.version } });
```

For your own font, register the bytes of an individual face, not a font
collection. This Bun example uses an application-provided file:

```ts
const bytes = await Bun.file('./assets/MyFont-Regular.ttf').arrayBuffer();
fonts.register('My Font', bytes, { weight: regular, style: 'normal' });
pass.set_resource('fonts', fonts, fonts.version);
```

register accepts ArrayBuffer or Uint8Array and owns a copy. Registration bumps
fonts.version; notifying a reused pass invalidates cached geometry. A fresh
pass can simply receive the latest value/version. A custom FontProvider may be
injected through the same resource slot if the host supplies its own shaping
and outline implementation.

Fonts is a host API, not a default [JSX evaluator](./JSX.md) binding. The runnable
example uses only the bundled families and needs no setup beyond the CLI.

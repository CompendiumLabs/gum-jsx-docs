// @gum-jsx/docs: the gum.jsx documentation and gallery examples
//
// The content lives in docs/ and gala/ as plain files; this module exports the
// loaders that read them (meta.ts) and the directories holding them (dirs.ts),
// for consumers that walk the files themselves. The raw files are also reachable
// through the ./docs/* and ./gala/* subpath exports.

export * from './meta'
export * from './dirs'

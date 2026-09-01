# public/audio/ — the drop-in slot

The four soundscapes in the reader — **rain, noise, fire, drone** — are *synthesised in your
browser* by `src/overrides/Ambience.astro`. Nothing is downloaded, nothing is licensed, and none of
them loops, because none of them is a loop.

This folder is the escape hatch for when you want a specific piece of audio anyway.

## Adding one — two steps

1. Drop the file here. `rain.ogg` becomes `/audio/rain.ogg`.
2. Add a line to `AMBIENCE_FILES` in [`src/overrides/Ambience.astro`](../../src/overrides/Ambience.astro):

   ```ts
   const AMBIENCE_FILES: { id: string; label: string; src: string }[] = [
     { id: 'my-track', label: 'My track', src: '/audio/my-track.ogg' },
   ];
   ```

It then appears in the picker beside the generated four, remembers its volume, and survives a
chapter turn on the same `AudioContext` as everything else.

**The list is explicit on purpose.** Astro cannot enumerate `public/` at build time without a
filesystem read, and a picker that silently gains an entry because a file appeared is a worse
failure than one line of config.

## Three things that will bite

- **Licensing is yours.** This is why the default four are synthesised: nothing distributed here is
  owned by anyone. A file you put in this folder ships to the public site.
- **It will loop, and you will hear it.** A thirty-second loop becomes audible as a loop within
  about ten minutes, and then it is worse than silence. Use something long, or use the generated
  ones.
- **`public/` is site chrome only** — favicon, `_headers`, `_redirects` and this. Content images go
  **beside their `.mdx`**, never here: a file in `public/` is served raw, skipping Astro's image
  pipeline, which costs roughly 88% of the bytes, the hashed filename, the dimensions, and the
  year-long cache header.

Formats: `.ogg` or `.m4a`. Keep it under a few MB — it is served on every visit that plays it.

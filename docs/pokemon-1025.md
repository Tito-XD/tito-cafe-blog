# Pokémon 1025 collage gallery

- Route: `https://tito.cafe/1025` (Astro static page, wide gallery shell, compact dex-style header, and shared theme).
- Entry: `1025 拼贴` in the Pokémon region navigation.
- Cloudflare R2 bucket: `tito-cafe-1025`, APAC, Standard storage.
- Public asset origin: `https://1025-assets.tito.cafe/v1`.
- 1,025 species, national IDs 0001–1025; metadata: `src/data/pokemon-collages.json`.

Asset keys are `thumbs/0001.webp` (390×480), `crops/0001.png` (780×960), and `frames/0001.png` (1920×1080). PNGs preserve the selected source pixels. Preview WebP files are separate resized derivatives. The original source is the official [Pokémon All Stars 1025 MV](https://www.youtube.com/watch?v=PqOBtBOsB_I), downloaded as a video-only 1080p stream; no AI enlargement or reconstruction was applied.

`downloads/pokemon-1025-wallpapers.zip` and `downloads/pokemon-1025-original-frames.zip` provide complete offline archives. `manifest.json`, `index.csv`, and `readme.md` retain extraction times and source details. Large media files live in R2, outside Git and the Netlify build.

The bucket permits cross-origin GET/HEAD from `https://tito.cafe`, `http://localhost:4321`, and `http://127.0.0.1:4321`. Individual PNG downloads use a browser Blob to preserve filenames; original images remain directly viewable. ZIP responses use attachment disposition. Assets use a one-year immutable cache: publish changed assets under a new version prefix and update `assetBase` in the page.

The gallery uses native lazy-loaded images and client-side name/number filtering. The page and remote media are excluded from the dex offline precache. Normal checks and deployment use the repository's existing `bun run check` and `bun run build` commands, followed by its Git-connected Netlify deployment.

The page has no main-site Header/Footer or PWA install prompt. Copyright and redistribution restrictions are displayed above the gallery. The main-site Gallery navigation entry is temporarily hidden in the shared Nav component (desktop and mobile); its route is unchanged.

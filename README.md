# Tito's Cafe

[![Netlify Status](https://api.netlify.com/api/v1/badges/aeecbae6-3875-47c0-a923-9ef102e4928b/deploy-status)](https://app.netlify.com/projects/titocafe/deploys)

Tito's Cafe is a personal blog, friends page, and gallery built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com/), and [Bun](https://bun.sh/).

This project started from [astro-blog-zozo](https://github.com/ladit/astro-blog-zozo), which itself was inspired by [hugo-theme-zozo](https://github.com/varkai/hugo-theme-zozo). The current codebase has been extensively rewritten for Tito's Cafe with a custom visual system, revised layouts, a gallery content model, and site-specific interaction design.

Please read the [Code of Conduct](./CODE_OF_CONDUCT.md) before contributing or participating in project discussions.
Additional attribution and copyright notes are collected in [NOTICE](./NOTICE).

## Thanks

Special thanks to the original authors and contributors whose work made this project possible.

- [ladit/astro-blog-zozo](https://github.com/ladit/astro-blog-zozo)
- [varkai/hugo-theme-zozo](https://github.com/varkai/hugo-theme-zozo)
- [Charca/astro-blog-template](https://github.com/Charca/astro-blog-template)
- [satnaing/astro-paper](https://github.com/satnaing/astro-paper)
- [ricora/alg.tus-ricora.com](https://github.com/ricora/alg.tus-ricora.com)
- [one-aalam/astro-ink](https://github.com/one-aalam/astro-ink)

## Current Stack

- Astro 6
- Tailwind CSS
- Bun
- Pagefind search
- Giscus comments
- Netlify deployment

## What Is Customized

This repository is no longer a stock theme mirror. Current custom work includes:

- a warm gray-blue light and dark theme with a unified set of surface, border, and accent tokens
- a rewritten scaffold layout, footer, and navigation interaction system
- a homepage and about page with matching hero-style layouts
- a `/friends` page with adaptive cards and expand-on-focus details
- a `/gallery` route with category walls, viewer pages, notes support, and illustration focus demos
- gallery content moved into `src/content/gallery/` so markdown, metadata, and notes live in a predictable structure
- customized post routing, RSS, and content handling for the current site structure

## Project Structure

Important folders:

- `src/content/posts/`: blog posts
- `src/content/gallery/`: gallery entries grouped by category
- `src/assets/attachments/`: post and gallery image assets
- `src/pages/`: route files
- `src/components/`: reusable UI parts
- `src/layouts/`: site layouts and page shells

## Development

Install dependencies:

```bash
bun install
```

Run local development:

```bash
bun run dev
```

Run checks:

```bash
bun run check
```

Build the site:

```bash
bun run build
```

Optional commands:

```bash
bun run lint
bun run format
```

## Deployment

This site is deployed on Netlify.

Recommended settings:

- Node.js `22.12.0` or newer within the `22.x` line
- Base directory: `/`
- Build command: `bun run build`
- Publish directory: `dist`

## License and Content

### Code

The code in this repository continues to inherit and preserve the original [MIT](./LICENSE) license terms from its upstream project. Original copyright and license notices should be retained.
See [NOTICE](./NOTICE) for additional attribution and project-specific copyright context.

### Site Content

Unless otherwise noted, the content published for Tito's Cafe personal blog is not covered by the template's MIT license.

Articles, photography, illustrations, commissioned works, and other original site materials are copyrighted by **tito.cafe / Tito_XD**. Please do not reuse or redistribute those materials without permission.

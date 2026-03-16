# Tito's Cafe

Tito's Cafe is a personal blog and gallery built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com/), and [Bun](https://bun.sh/).

This project started from [astro-blog-zozo](https://github.com/ladit/astro-blog-zozo), which itself was inspired by [hugo-theme-zozo](https://github.com/varkai/hugo-theme-zozo). The current codebase has been substantially customized for Tito's Cafe, including layout rewrites, a revised theme system, custom gallery pages, a friends page, and ongoing content model changes.

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

## Project Notes

This repository is no longer a stock theme mirror. It includes custom work for Tito's Cafe such as:

- a redesigned warm gray-blue light and dark theme
- a rewritten scaffold layout and footer structure
- a `/friends` page with adaptive friend cards
- a `/gallery` route with category walls and image viewer flows
- customized post routing, RSS, and content handling for the current site structure

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

### Site Content

Unless otherwise noted, the content published for Tito's Cafe is not covered by the template's MIT license.

Articles, photography, illustrations, commissioned works, and other original site materials are copyrighted by **tito.cafe / Tito_XD**. Please do not reuse or redistribute those materials without permission.
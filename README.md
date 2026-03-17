# Revamped Astro Zozo

Revamped Astro Zozo is a sample-first Astro theme branch built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com/), and [Bun](https://bun.sh/).

It starts from [astro-blog-zozo](https://github.com/ladit/astro-blog-zozo), which itself was inspired by [hugo-theme-zozo](https://github.com/varkai/hugo-theme-zozo), then pushes the theme toward a warmer editorial surface with more room for galleries, curated links, and landing-page style intros.

Repository: [Tito-XD/tito-cafe-blog](https://github.com/Tito-XD/tito-cafe-blog/tree/codex/revamped-astro-zozo)

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

## What Changed From Astro Zozo

This template branch keeps the lightweight writing flow of Astro Zozo, then adds:

- a warmer light and dark palette with a more unified surface system
- a rewritten scaffold layout, footer, and navigation state treatment
- matching hero-style `Home` and `About` layouts
- a `/friends` page for curated link cards
- a `/gallery` route with category walls, viewer pages, notes, and optional focus hotspots
- markdown-backed gallery entries under `src/content/gallery/`
- a more compact mobile menu and tightened page heading system

## Sample Content

This branch intentionally replaces personal material with reusable sample content:

- sample blog posts
- sample gallery entries, notes, and placeholder artwork
- sample friends data
- sample branding, hero art, and intro copy

Use this branch as a base, then swap the placeholder content for your own writing, media, and visual identity.

## Open Source Readiness

This branch is structured to be easier to publish and review as an open-source theme:

- upstream MIT license notices are preserved
- a top-level [Code of Conduct](./CODE_OF_CONDUCT.md) is included
- footer attribution includes the required Netlify service link
- personal posts, gallery notes, avatars, and branding have been replaced with sample content

If you plan to apply for Netlify Open Source support, keep this branch non-commercial and continue using sample or redistributable assets only.

## Quick Start

To turn this into your own site, replace these first:

- `src/config.ts` for site title, description, socials, and toggles
- `src/content/posts/` for blog posts
- `src/content/gallery/` for gallery entries and notes
- `src/data/friends.ts` for curated links
- `public/sample/` and `src/assets/sample/` for placeholder art and avatars

## Project Structure

Important folders:

- `src/content/posts/`: blog posts
- `src/content/gallery/`: gallery entries grouped by category
- `src/assets/sample/gallery/`: placeholder gallery media used by the sample branch
- `src/assets/sample/portraits/`: placeholder focus portraits for interactive illustration pages
- `public/sample/`: hero art and sample avatars
- `src/data/friends.ts`: friends page data
- `src/config.ts`: site title, description, social links, and toggles
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

This theme is ready to deploy on Netlify.

Recommended settings:

- Node.js `22.12.0` or newer within the `22.x` line
- Base directory: `/`
- Build command: `bun run build`
- Publish directory: `dist`

## License and Content

### Code

The code in this repository continues to inherit and preserve the original [MIT](./LICENSE) license terms from its upstream project. Original copyright and license notices should be retained.
See [NOTICE](./NOTICE) for additional attribution and project-specific copyright context.

### Sample Content

This branch includes sample copy and placeholder SVG assets so the theme can be previewed immediately. Replace them with your own branding and materials before publishing a real site.

# AGENTS.md - Agent Guidelines for Tito's Cafe

## Development Commands

```bash
# Run development server
bun run dev

# Type checking and build
bun run build                # Runs astro check && astro build
bun run check                # Runs astro type checking only

# Code quality
bun run lint                 # Biome linter (read-only)
bun run format               # Biome formatter (write)

# Preview production build
bun run preview
```

**Note:** No test framework is currently configured. Add vitest/jest for unit tests.

## Project Structure

- `src/content/posts/` - Blog markdown entries
- `src/content/gallery/` - Gallery entries with metadata
- `src/components/` - Reusable Astro/TSX components
- `src/layouts/` - Page layout shells (BaseLayout, ScaffoldLayout, MarkdownLayout)
- `src/pages/` - Route definitions
- `src/utils/` - Helper functions (collection, gallery, post)
- `src/config.ts` - Site-wide configuration (socials, branding, constants)
- `src/content.config.ts` - Content collection schemas with Zod

## Code Style Guidelines

### Imports
- Use `~/` alias for `src/` directory: `import Component from '~/components/Component.astro'`
- Use `node:` prefix for Node.js built-ins: `import fs from 'node:fs'`
- Group imports: external libs, internal modules, relative files
- Biome auto-organizes imports (enabled in config)

### Formatting
- **Quote style:** Single quotes only (enforced by Biome)
- **Indentation:** Tabs (follow Biome defaults)
- **Trailing commas:** Omitted for consistency
- Run `bun run format` before committing

### TypeScript
- Strict mode enabled (`astro/tsconfigs/strict`)
- Content collections use Zod schemas in `src/content.config.ts`
- Use `CollectionEntry<'posts'>` and `CollectionEntry<'gallery'>` types
- Define utility types in utils (e.g., `PostEntry` in `collection.ts`)

### Naming Conventions
- **Components:** PascalCase - `PostCard.astro`, `Header.astro`
- **Functions:** camelCase - `getPostRouteSlug()`, `findPostByRouteSlug()`
- **Constants:** PascalCase or SCREAMING_SNAKE_CASE - `Site`, `PageSize`, `SiteTitle`
- **CSS classes:** kebab-case with semantic prefixes - `post-card-title`, `post-card-meta`

### Astro Components
- Define Props interface in frontmatter: `type Props = CollectionEntry<'posts'>`
- Access props via `Astro.props`
- Use `<slot />` for children
- Scope styles with `<style>` blocks
- Cleanup event listeners in `<script>` blocks for SPA navigation:
  ```ts
  document.addEventListener('astro:page-load', setupFunction);
  ```

### Error Handling
- Prefer simple returns over try/catch for data fetching
- Use optional chaining: `post.data.lastmod ?? post.data.date`
- Return `undefined` or empty arrays for missing data
- Log errors only when debugging (avoid console in production)

### Styling
- **CSS Variables:** Use semantic tokens from design system
  - `--color-surface`, `--color-text`, `--color-accent`, `--color-border`
  - `--radius-card`, `--radius-chip`, `--radius-media`
  - `--motion-gentle`, `--motion-lift`
- **Tailwind:** Use for layout utilities, custom CSS for component-specific styles
- **Dark Mode:** Supports system preference and manual toggle via `.light` / `.dark` classes
- Use `color-mix()` for surface variations: `color-mix(in srgb, var(--color-surface) 92%, var(--color-accent-soft) 8%)`

### Content Collections
- Posts schema: `title`, `slug`, `description`, `image`, `date`, `lastmod`, `tags`, `readingTime`, `hide`
- Gallery schema: `title`, `slug`, `category`, `eyebrow`, `summary`, `alt`, `image`, `sortOrder`, `notes`, `focusCharacters`
- Use `getCollection('posts')` for querying
- Route helpers in `src/utils/collection.ts`: `getPostRouteSlug()`, `findPostByRouteSlug()`

## Key Patterns

### Component Props Pattern
```astro
---
type Props = {
  title: string;
  currentNav?: string;
};
const { title, currentNav } = Astro.props;
---
```

### Conditional Rendering
```astro
{showDate && <time>{date.toLocaleDateString()}</time>}
```

### Image Optimization
```astro
import { Picture } from 'astro:assets';
<Picture src={post.data.image} formats={['avif', 'webp']} alt="description" />
```

### Icon Usage
```astro
import { Icon } from 'astro-icon/components';
<Icon name="ri:time-line" class="fill-current" title="date" aria-label="date" />
```

### Cleanup Script Pattern
```ts
function setup() {
  const windowWithCleanup = window as Window & { __cleanup?: () => void };
  windowWithCleanup.__cleanup?.();
  // ... add listeners
  windowWithCleanup.__cleanup = () => { /* remove listeners */ };
}
document.addEventListener('astro:page-load', setup);
setup();
```

## Deployment

- **Platform:** Netlify
- **Build command:** `bun run build`
- **Publish directory:** `dist`
- **Node version:** 22.12.0+
- **Base directory:** `/`

## Before Submitting Work

1. Run `bun run check` - ensure no type errors
2. Run `bun run format` - enforce formatting
3. Run `bun run lint` - check for lint issues
4. Verify site builds: `bun run build`
5. Test locally: `bun run preview` after build

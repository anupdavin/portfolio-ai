# Copilot Instructions for Portfolio Full-Stack

## Project Overview

**Portfolio Full-Stack** is a developer portfolio application showcasing a Senior Full-Stack Java Engineer. It consists of:
- **Frontend**: React 19 + TypeScript + Vite (docs/ for static export)
- **Backend**: Node.js HTTP server for serving built assets
- **AI Chat**: Client-side ML using Xenova transformers.js (GPT-2 generation, embeddings)
- **Styling**: Tailwind CSS v4 + custom "terminal/hacker" aesthetic (green-on-black theme)

## Architecture & Key Decisions

### Monorepo Structure
- **Root**: Holds root package.json, vite.config.ts, tsconfig shared config
- **portfolio-app/**: Duplicate app folder (legacy; prefer root src/)
- **src/**: Active source directory
  - Components split into `/portfolio` (domain) and `/ui` (generic reusables)
  - `/lib/embeddings.ts`, `/lib/generator.ts`: Client-side ML utilities
  - `/chat/`: Type definitions + static JSON data
- **docs/**: Vite build output (deployed via server.js)

### Design Patterns

**Terminal/Hacker Theme**
- CSS class `.glow-text`, `.glow-border`, `.matrix-bg`, `.terminal-cursor` provide the aesthetic
- Green (#22c55e) on black, monospace fonts, animated matrix background
- Defined inline in [Layout.tsx](src/pages/Layout.tsx#L40-L48) via `<style>` tag; consider extracting to shared CSS

**Component Composition**
- **Page Components**: [Layout.tsx](src/pages/Layout.tsx) wraps routes with nav + theme
- **Portfolio Sections**: [TerminalHero.tsx](src/components/portfolio/TerminalHero.tsx), ExperienceTimeline, ProjectsShowcase, TechStack, ContactTerminal
- **UI Primitives**: [Button.tsx](src/components/ui/button.tsx) (variant: 'default'|'outline'), Card, Badge, Input, Textarea
- All components use Tailwind + framer-motion for animations

**Chat Widget Pattern** ([ChatWidget.tsx](src/components/ChatWidget.tsx))
- FAQ fallback for common queries (normalized text matching)
- Embedding-based retrieval: Load docs from `/chat/index.json`, compute embeddings on-the-fly, rank by cosine similarity
- Safety filter blocks email/phone/credit/password extraction attempts
- Lazy-load ML models (`loadGenerator()`, `loadEmbedder()`) to minimize bundle impact
- Simulates 1s typing delay for better UX

## Development Workflow

### Build & Serve
```bash
# Development: Local rebuild + HMR at localhost:5173
npm run dev

# Production: TypeScript check + Vite build to docs/
npm run build

# Serve built assets (uses Node.js HTTP server from server.js)
npm run serve:dist
```

### Key Commands
- **Lint**: `npm run lint` (ESLint v9 with TypeScript support)
- **Preview**: `npm run preview` (Serve docs/ locally)

### GitHub Pages Deployment
- Build output goes to **docs/** (see [vite.config.ts](vite.config.ts#L5-L7))
- Base URL auto-set for GitHub repos via `process.env.GITHUB_REPOSITORY` (for Actions)
- [server.js](server.js) runs in Node; routes all non-file requests to index.html (SPA support)

## Critical Patterns & Conventions

### TypeScript & React Best Practices
- **React 19 + Vite**: Use `import type` for type-only imports
- **Component Exports**: Default export preferred (matches convention in existing components)
- **State Hooks**: `useState`, `useEffect`, `useRef` for UI logic
- **Motion**: Use [framer-motion](https://www.framer-motion.dev/) for animations (`.animate`, `.initial`, `.transition`)

### Styling
- **Tailwind v4 PostCSS**: Classes applied directly; no CSS modules
- **Theme Colors**: Green (#22c55e), Black, Gray (#1f2937), Blue (#3b82f6), Purple (#a855f7)
- **Utility Classes**: `glow-text`, `glow-border`, `matrix-bg`, `terminal-cursor` (defined in Layout.tsx)
- **Responsive**: Use `md:`, `lg:` breakpoints; avoid hardcoding pixels in margin/padding

### UI Component Library
- **Button**: Variant 'default' (green bg) | 'outline' (green border)
- **Card**: Basic wrapper with dark background + subtle border
- **Badge**: Tag-style component for skills/tech
- **Input/Textarea**: Form fields with Tailwind styling
- **Progress**: Progress bar visualization

### Client-Side ML (Embeddings & Generation)
- **Models**: Xenova's `all-MiniLM-L6-v2` (embeddings), `gpt2` (text generation)
- **Lazy Loading**: Always use `loadEmbedder()`, `loadGenerator()` (avoid blocking main thread)
- **Caching**: In-memory embedding cache in `rankBySimilarity()` to avoid recomputation
- **Similarity Metric**: Cosine similarity with L2 normalization
- **Constraints**: GPT-2 small limits context + generation quality; FAQ fallback recommended

### Data Flow
1. **Chat Query** → normalize + check FAQ
2. **If no FAQ match** → compute embedding + rank docs by similarity
3. **Generate Context** → concatenate top-K docs as system prompt
4. **Safety Filter** → block attempts to extract contact/credit data
5. **Return Answer** → GPT-2 completion or fallback message

### Path Aliases
- `@/` → `/src` ([vite.config.ts](vite.config.ts#L12-L14))

## Common Development Tasks

### Adding a Portfolio Section
1. Create new component in [src/components/portfolio/](src/components/portfolio/)
2. Import/export from [src/pages/Portfolio.tsx](src/pages/Portfolio.tsx)
3. Add Tailwind classes + framer-motion for animations
4. Ensure dark theme + green accent colors

### Updating Chat Knowledge
1. Edit `/public/chat/index.json` (array of `{ id, title, url?, text, embedding? }`)
2. FAQ fallback in [ChatWidget.tsx](src/components/ChatWidget.tsx#L12-L22) for exact matches
3. Embeddings computed on first query (no build step required)

### Adding a New Utility Function
- Place in [src/lib/](src/lib/) alongside embeddings.ts, generator.ts
- Use async/await; prefer lazy-loading if model-dependent
- Export TypeScript types

## Testing & Validation
- No dedicated test setup; use `npm run lint` to validate TypeScript
- Manual testing in browser (dev server at localhost:5173)
- Check console for transformer.js model download warnings

## Common Pitfalls
1. **Bundle Size**: ML models are large; lazy-load them and monitor in dev tools
2. **Unsafe Embedding Recomputation**: Cache embeddings in `rankBySimilarity()` to avoid redundant computation
3. **Hardcoded Colors**: Use Tailwind utility classes (green-400, black, etc.) instead of inline styles for theme consistency
4. **Route Setup**: Layout.tsx expects `<Outlet />` from react-router-dom for page rendering
5. **GitHub Pages Base URL**: The vite.config.ts uses `GITHUB_REPOSITORY` env; ensure Actions sets this correctly

## References
- [Vite Docs](https://vite.dev/) – Building & HMR
- [Framer Motion](https://www.framer-motion.dev/) – Animations
- [Transformers.js](https://xenova.github.io/transformers.js/) – Client-side ML
- [Tailwind CSS v4](https://tailwindcss.com/) – Styling
- [React 19 Docs](https://react.dev/) – Core framework

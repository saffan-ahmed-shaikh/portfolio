<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Portfolio — Safwan Ahmed

Single-page Next.js 16 portfolio app. React 19, TypeScript 5, Tailwind CSS 4, shadcn/ui (New York), Framer Motion, Groq SDK.

## Commands

| Command | What |
|---------|------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint (flat config, `eslint.config.mjs`) |

No test/typecheck/format commands exist. `tsc` catches type errors during `next build`.

## Key structure

- `app/page.tsx` — single page, `"use client"`, all sections lazy-loaded via `next/dynamic` with `ssr: false`
- `app/layout.tsx` — root layout (Geist fonts, ThemeProvider, Vercel Analytics)
- `app/api/chat/route.ts` — AI assistant endpoint (Groq, llama-3.3-70b-versatile)
- `components/` — section components; `components/ui/` — shadcn/ui primitives
- `styles/globals.css` — Tailwind v4 imports (`@tailwindcss/postcss` + `tw-animate-css`), CSS variables (`@theme inline`), custom animations, utility classes
- `lib/utils.ts` — `cn()` helper
- `@/*` maps to project root

## Conventions

- All components in `app/` and `components/` use `"use client"` — no server components
- Components added via `npx shadcn@latest add <name>` (New York style, CSS variables)
- Dark mode via `.dark` class (managed by `next-themes`)
- Icons: `lucide-react` for UI, `react-icons/fa6` + `react-icons/si` for brand logos
- Animations: Framer Motion (`framer-motion`) + CSS keyframe utilities in `globals.css`
- Gradient/hover effects use CSS custom properties `--glow-accent` and `--glow-accent-2`

## Environment

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_GROQ_API_KEY` | Yes | Groq API for AI assistant |
| `NEXT_PUBLIC_GROQ_DATASET` | Optional | Set to `"production"` to enable Vercel Analytics |

## Dev notes

- `.env*` files are gitignored — use `.env.local` for local secrets
- Resume PDF at `public/Safwan_Ahmed.pdf`
- No test framework installed

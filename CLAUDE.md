# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page landing site for a travel agency ("Meridiano Sur"). Astro 5 static build (SSG, no adapter, no backend) + Tailwind v4 (via `@tailwindcss/vite`, no `tailwind.config`) + React used only for server-rendered components. All code, comments, identifiers and copy are in Spanish (es-AR); keep it that way.

## Commands

```bash
npm run dev      # http://localhost:4330 — strictPort: fails if the port is busy instead of hopping
npm run build    # static output in dist/
npm run preview
npm run check    # astro check: type + template diagnostics (the only "test"/lint step; there is no test suite)
```

Stuck on Astro 5.18 because the dev machine runs Node 20.17 (Astro 7 needs Node ≥ 22.12).

## Architecture

- **`src/data/site.ts` is the single source of content.** Agency info, WhatsApp messages, nav sections, hero destinations, packages (`paquetes`, typed by `Paquete`), `datosHero` (service-commitment stats shown in `Vitrina.astro`) and `diferenciales`. Content changes should go here, not in components. Fields marked `// <-- REEMPLAZAR` are placeholders.
- **The agency is brand new**: `paquetes` is intentionally empty, and the site must not claim years of operation, a license/legajo, a physical office or destinations "visited by the team". Don't reintroduce those.
- **Package grid** (`Paquetes.astro`) has 6 slots: packages with `destacado: true` fill them first, the rest render as empty "Próximamente" skeleton cards, and a custom-trip WhatsApp CTA shows while any slot is empty. When real packages are added, also update the section intro in `src/pages/index.astro` ("Los primeros viajes, en preparación").
- **All WhatsApp CTAs** go through `linkWhatsapp(mensajes.xxx)` from `site.ts`.
- **`Escenario.tsx`** renders a generated SVG landscape per `Escena` type and overlays `foto` when present; it's the fallback/background while the photo loads. It is used as a plain server-rendered component inside `.astro` files — **no component is hydrated (no `client:*` directives)**.
- **Interactivity is vanilla JS** in `<script>` tags: global behavior is inline in `src/layouts/Base.astro` (hero entrance trigger via `body.hero-listo`, IntersectionObservers that set `data-visto="si"` on `.regla` and `[data-revelar]` elements, scroll hint dismissal); component-specific scripts live in `Hero.astro` (pointer parallax), `Navegacion.astro` (active section, mobile menu) and `Vitrina.astro` (destination rotator). Package itineraries use native `<details>`, no JS.
- To make a new element reveal on scroll, add `data-revelar` (optionally `style="--rev:N"` for stagger); CSS in `src/styles/global.css` keys off `html.js` + `data-visto`.
- **`src/styles/global.css`** holds the `@theme` design tokens (colors, fonts, `--ease-sur`), base layer, shared classes (`.lienzo` container, `.rotulo`, `.regla`, `.cifra`, `.hairline*`, `.display`) and the hero choreography. Every animation has a `prefers-reduced-motion: reduce` override that disables it outright — maintain that for anything new.
- Fonts are self-hosted via `@fontsource-variable` imports in `Base.astro` (no Google Fonts).

### README drift

`README.md` is partly stale: it describes React islands (`PaquetesExplorador.tsx`, `Testimonios.tsx`, `Galeria.tsx`), a region filter with FLIP, modals, and `testimonios`/`experiencias` data. None of these exist in the current code. Trust the code; the design-system, palette and content-editing sections of the README are still accurate.

## Design rules (from README / CSS comments — enforced by convention)

- Palette is derived from the logo (`referencias/elisa_medici_logo_hq.png`); there is no fourth brand color. Use the `@theme` tokens (`noche`, `noche-alt`, `profundo`, `oro-*`, `marfil-*`, `hielo`, `tinta`, `cta*`), not ad-hoc hex values.
- **Solid gold fill (`cta`, `cta-hondo`, `cta-alto`) is reserved for WhatsApp buttons only.** Elsewhere gold appears only as 1px hairlines, small text and small badges.
- No diffuse shadows; hierarchy comes from flat layers, hairlines and type scale.
- Background changes between sections use a 7–11rem gradient band, never a hard edge.
- Section labels are italic serif with a number, not uppercase eyebrows. No middle-dot separators and no `→` arrows on buttons.
- Text/background pairs must pass WCAG AA (the README also claims muted text never goes below `/70`, but the code already uses `/55`–`/65` for small print).

## Assets

`public/fotos/*.webp` (1400×1050) are Wikimedia Commons placeholders, mostly CC BY-SA; attributions in `public/fotos/CREDITOS.md`. When adding/replacing a photo, update that file. Before deploying: replace the `REEMPLAZAR` fields and set `site` in `astro.config.mjs` to the real domain.

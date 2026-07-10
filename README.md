# Kadhaigal — Bookstore · Community Space · Café

A React (Vite) + Tailwind CSS recreation of the Kadhaigal homepage design.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

Copy `.env.example` to `.env` and fill in your own keys before wiring up
Supabase / Google Books / email sending:

```bash
cp .env.example .env
```

## Brand colors

| Name        | Hex       | Usage                                   |
|-------------|-----------|------------------------------------------|
| Brick       | `#B7410E` | Primary accent, CTAs, "Stories" highlight|
| Navy        | `#142950` | Headings, dark sections, body text       |
| Sage        | `#9DC183` | Secondary accent, community pillar       |
| Cream       | `#F5F5DC` | Page background                          |

These are registered in `tailwind.config.js` under `theme.extend.colors.brand`
(`brand-brick`, `brand-navy`, `brand-sage`, `brand-cream`).

## Folder structure

The structure mirrors the Next.js-style layout you provided, adapted to a
Vite + React Router single-page app (Vite has no built-in file-based routing
or serverless API routes, so those are approximated below):

```
src/
├── app/
│   ├── layout.jsx           ← global layout (Navbar + Footer), used by every route
│   ├── public/               ← all customer-facing pages
│   │   ├── page.jsx          ← Home page (fully built)
│   │   ├── about/page.jsx
│   │   ├── cafe/page.jsx
│   │   ├── contact/page.jsx
│   │   ├── events/page.jsx
│   │   └── bookstore/
│   │       ├── page.jsx
│   │       └── id/page.jsx   ← dynamic /bookstore/:id route
│   └── admin/                ← owner management panel
│       ├── page.jsx
│       ├── books/page.jsx
│       ├── events/page.jsx
│       ├── orders/page.jsx
│       └── settings/page.jsx
├── api/                      ← placeholder backend logic (see note below)
│   ├── books/index.js
│   ├── events/index.js
│   └── orders/index.js
├── components/
│   ├── ui/                   ← Button, Card, Input, ComingSoon
│   ├── home/                 ← Navbar, Hero, OurStory, ThreePillars,
│   │                           BookCarousel, EventsNoticeboard, VisitLocation,
│   │                           JoinCommunity, Footer, Logo, illustrations
│   ├── bookstore/             ← book cards, filters (stubs)
│   ├── events/                ← event cards, registration modal (stubs)
│   └── admin/                 ← admin sidebar (stub)
├── lib/
│   ├── supabase.js            ← Supabase client
│   ├── googleBooks.js         ← Google Books API helper
│   └── emails.js               ← email sending helper
├── styles/
│   └── globals.css             ← Tailwind entry + base styles
├── App.jsx                     ← React Router route definitions
└── main.jsx                    ← app entry point
```

### About the `api/` folder

Vite builds a static client-side bundle — it doesn't run a Node server, so it
can't host API routes the way Next.js's `app/api` does. The `api/` folder is
kept here as a placeholder with the same shape so you can either:

1. Point these functions at a real backend (Supabase, a serverless function,
   an Express server, etc.), or
2. Migrate to Next.js later if you want file-based API routes.

## What's fully built

Only the **Home page** (`src/app/public/page.jsx`) and its components are
fully implemented, matching the provided design. Every other page listed in
the folder structure exists as a lightweight placeholder (`ComingSoon`) so
the structure is ready for you to build out.

## Tech

- React 18 + Vite 5
- React Router 6
- Tailwind CSS 3
- lucide-react icons
- @supabase/supabase-js (client stub)

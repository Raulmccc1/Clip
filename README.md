# Clip — URL Shortener and Analytics

A fast, privacy‑minded URL shortener that creates branded links and QR codes with per‑click analytics, built with React (JavaScript), Supabase, Tailwind CSS, shadcn UI, and React Context API.

## Features

- Shorten long URLs with custom slugs, and instant copy to clipboard  
- Authenticated dashboard with totals, per‑link cards, QR code display, copy, delete, and direct open actions  
- Analytics by time, device, city, and country, with routed detail pages and charts  
- Responsive UI, dark mode friendly theme tokens, and accessible components using shadcn and Tailwind

## Tech stack

- React 19 with JavaScript, Vite build tooling, React Router for routing  
- Supabase Auth and Database for user sessions and persistent link data  
- Tailwind CSS utility styling with shadcn UI primitives and tokens  
- React Context API for app‑level state such as links and session‑derived data

## Getting started

### Prerequisites

- Node.js 18+ and npm or pnpm  
- A Supabase project with URL and anon key

### Installation

```bash
# clone
git clone <your-repo-url> clip
cd clip

# install
npm install

# env
cp .env.example .env
```

### Development

```bash
npm run dev
```

Visit http://localhost:5173

### Production build

```bash
npm run build
npm run preview
```

## State management

- React Context API at src/context/urlContext.jsx holds app‑level state for links, selection.

## UI and styling

- Tailwind CSS with shadcn UI tokens for consistent colors, ring, and background semantics  
- Components keep theme tokens like bg‑background, text‑foreground, ring‑border, and primary for dark mode parity  
- Reusable skeletons and small spinners for loading states

## Security and privacy

- Authentication required for dashboard and analytics routes  
- Short link redirects are public but should not expose user data; return only what’s necessary for redirects  
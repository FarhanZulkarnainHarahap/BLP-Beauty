# BLP Beauty — Next.js website and admin

Public storefront, Auth.js authentication, and role-protected CMS built with Next.js 16 App Router.

## Local setup

1. Install packages: `npm install`
2. Copy `.env.example` to `.env.local`.
3. Start either backend and set `NEXT_PUBLIC_API_URL` to its URL.
4. Run `npm run dev`, then open the URL printed by Next.js.

The web project is UI-only: it has no Prisma client, database schema, or API route handlers.
`next.config.ts` rewrites `/api/auth/*` and `/api/admin/*` to the selected backend so Auth.js cookies
remain first-party. Public data is fetched from that same backend.

## Auth.js and OAuth

Auth.js, its Prisma adapter, and OAuth secrets live in both backend projects. Create apps in the
Google and Meta/Facebook developer consoles, then configure these callback paths:

- Google: `$WEB_URL/api/auth/callback/google`
- Facebook: `$WEB_URL/api/auth/callback/facebook`

Use the same paths on your production domain. Google/Facebook email linking is enabled so an OAuth
identity whose email exactly matches a seeded admin can attach to that seeded role. Only use
trusted, verified provider apps.

Auth.js sessions are stored by the selected backend in PostgreSQL. New social users receive `USER`;
`id` and `role` are included in the server session. `proxy.ts` performs a quick cookie check, while
protected layouts ask the backend to validate the database session and role.

## Admin access

The API seed creates:

- `admin@beauty.local` (`SUPER_ADMIN`)
- `content@beauty.local` (`ADMIN`)

For a real OAuth login, use a provider account matching the seeded email or update a real OAuth user's role in PostgreSQL. There is intentionally no fake/password bypass.

## Commands

- `npm run dev`
- `npm run build`
- `npm run lint`

## Vercel

Import the `web` directory as the Vercel project root and set only `NEXT_PUBLIC_API_URL`. Deploy the
selected API separately and configure all database, Auth.js, OAuth, and Cloudinary variables there.

Panduan lengkap untuk tiga project tersedia di
[`VERCEL_DEPLOYMENT.md`](VERCEL_DEPLOYMENT.md).

# MARA Beauty — Next.js website and admin

Public storefront, Auth.js authentication, and role-protected CMS built with Next.js 16 App Router.

## Local setup

1. Install packages: `npm install`
2. Copy `.env.example` to `.env.local` and fill every required value.
3. Generate the Auth.js Prisma client: `npm run db:generate`
4. Start either API and set `NEXT_PUBLIC_API_URL` to it:
   - Express: `http://localhost:4000`
   - Nest/Bun: `http://localhost:5000`
5. Run `npm run dev`, then open `http://localhost:3000`.

The API and web app must use the same PostgreSQL database and identical `INTERNAL_API_SECRET`. Internal JWTs are minted only inside server code/BFF routes and expire after five minutes.

## Auth.js and OAuth

Generate `AUTH_SECRET` with `npx auth secret`. Create apps in the Google, Meta/Facebook, and TikTok developer consoles, then fill their ID/secret variables. Development callbacks:

- Google: `http://localhost:3000/api/auth/callback/google`
- Facebook: `http://localhost:3000/api/auth/callback/facebook`
- TikTok: `http://localhost:3000/api/auth/callback/tiktok`

Use the same paths on your production domain. TikTok must have Login Kit and `user.info.basic` enabled. Google/Facebook email linking is enabled so an OAuth identity whose email exactly matches a seeded admin can attach to that seeded role. Only use trusted, verified provider apps. TikTok does not supply email in the basic scope, so grant its generated user an admin role afterward using the Super Admin screen if needed.

Auth.js sessions use the PostgreSQL Prisma adapter. New social users receive `USER`; `id` and `role` are included in the server session. Next.js 16 renamed middleware to `proxy.ts`; that file rejects unauthenticated and non-admin `/admin/*` requests, while protected layouts repeat authorization server-side.

## Admin access

The API seed creates:

- `admin@beauty.local` (`SUPER_ADMIN`)
- `content@beauty.local` (`ADMIN`)

For a real OAuth login, use a provider account matching the seeded email or update a real OAuth user's role in PostgreSQL. There is intentionally no fake/password bypass.

## Commands

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run db:generate`

## Vercel

Import the `web` directory as the Vercel project root, add all `.env.example` values in Project Settings, set `AUTH_URL` to the production origin, and register the production OAuth callbacks. Deploy the selected API separately and set its HTTPS URL as `NEXT_PUBLIC_API_URL`.

Panduan lengkap untuk tiga project tersedia di
[`VERCEL_DEPLOYMENT.md`](VERCEL_DEPLOYMENT.md).

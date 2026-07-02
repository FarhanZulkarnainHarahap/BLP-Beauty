# Deploy tiga project ke Vercel

Project ini tetap memakai tiga folder yang sudah ada dan masing-masing backend memiliki repository
Git sendiri. Cara paling langsung adalah deploy dengan Vercel CLI dari setiap folder. Setiap
perintah pertama akan membuat/link satu project Vercel yang berbeda.

```bash
cd node.js-express.js
npm run deploy

cd ../bun.js-nest.js
npm run deploy

cd ../web
npm run deploy
```

Gunakan `npm run deploy:prod` setelah preview deployment sudah benar. Untuk auto-deploy, hubungkan
repository masing-masing project ke Vercel.

## 1. Siapkan database

Gunakan PostgreSQL yang mendukung koneksi serverless/pooling, misalnya Neon atau Supabase. Jalankan
migration dan seed hanya sekali dari komputer lokal:

```bash
cd node.js-express.js
cp .env.example .env
npm run db:migrate
npm run db:seed
```

Backend Express dan backend Nest harus memakai `DATABASE_URL` pooled yang sama. Gunakan koneksi
non-pooled sebagai `DIRECT_URL` untuk migration. Web tidak terhubung langsung ke database. Jangan
menjalankan migration dari proses build Vercel.

## 2. Project backend Express

- Jalankan CLI dari: `node.js-express.js`
- Framework Preset: Express
- Install Command: `npm install`
- Environment Variables:
  - `DATABASE_URL`
  - `DIRECT_URL`
  - `JWT_SECRET`
  - `INTERNAL_API_SECRET`
  - `AUTH_SECRET`
  - `AUTH_TRUST_HOST=true`
  - `AUTH_GOOGLE_ID`
  - `AUTH_GOOGLE_SECRET`
  - `AUTH_FACEBOOK_ID`
  - `AUTH_FACEBOOK_SECRET`
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
  - `FRONTEND_URL=https://nama-frontend.vercel.app`

Setelah deploy, tes `https://nama-express.vercel.app/health`.

## 3. Project backend Nest

- Jalankan CLI dari: `bun.js-nest.js`
- Framework Preset: NestJS
- Install Command: `npm install`
- Environment Variables sama persis seperti Express, termasuk database, Auth.js/OAuth, dan
  Cloudinary.

Vercel mendeteksi `src/main.ts` sebagai entrypoint NestJS dan menjalankannya sebagai satu Vercel
Function. Development tetap dapat memakai Bun.

Setelah deploy, tes `https://nama-nest.vercel.app/health`.

## 4. Project frontend

- Jalankan CLI dari: `web`
- Framework Preset: Next.js
- Install Command: `npm install`
- Build Command: `npm run build`
- Environment Variables:
  - `NEXT_PUBLIC_API_URL=https://nama-express.vercel.app`

Frontend memakai satu backend aktif melalui `NEXT_PUBLIC_API_URL`; ganti nilainya ke URL Nest lalu
redeploy jika ingin berpindah backend. Rewrite Next.js meneruskan `/api/auth/*` dan `/api/admin/*` ke
backend tersebut, sehingga tidak ada API handler atau Prisma di project web.

Daftarkan callback OAuth production:

- `https://nama-frontend.vercel.app/api/auth/callback/google`
- `https://nama-frontend.vercel.app/api/auth/callback/facebook`

Jika frontend memiliki beberapa domain yang harus diizinkan oleh backend, pisahkan dengan koma pada
`FRONTEND_URL`, misalnya:

```text
https://beauty.example.com,https://nama-frontend.vercel.app
```

Upload melalui Vercel Function dibatasi maksimal 4 MB agar berada di bawah batas payload platform.

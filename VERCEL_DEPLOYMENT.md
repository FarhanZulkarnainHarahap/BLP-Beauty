# Deploy tiga project ke Vercel

Project ini tetap memakai tiga folder yang sudah ada. Workspace root saat ini bukan repository Git;
hanya folder `web` yang memiliki repository sendiri. Karena itu, cara paling langsung adalah deploy
dengan Vercel CLI dari setiap folder. Setiap perintah pertama akan membuat/link satu project Vercel
yang berbeda.

```bash
cd node.js-express.js
npm run deploy

cd ../bun.js-nest.js
npm run deploy

cd ../web
npm run deploy
```

Gunakan `npm run deploy:prod` setelah preview deployment sudah benar. Jika ingin auto-deploy dari
Git, buat tiga repository terpisah atau rapikan workspace menjadi satu repository induk secara
sengaja. Jangan menghapus `.git` di dalam `web` tanpa memindahkan riwayat commit terlebih dahulu.

## 1. Siapkan database

Gunakan PostgreSQL yang mendukung koneksi serverless/pooling, misalnya Neon atau Supabase. Jalankan
migration dan seed hanya sekali dari komputer lokal:

```bash
cd node.js-express.js
cp .env.example .env
npm run db:migrate
npm run db:seed
```

Backend Express, backend Nest, dan frontend Auth.js harus memakai `DATABASE_URL` database yang sama.
Jangan menjalankan migration dari proses build Vercel.

## 2. Project backend Express

- Jalankan CLI dari: `node.js-express.js`
- Framework Preset: Other
- Install Command: `npm install`
- Environment Variables:
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `INTERNAL_API_SECRET`
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
  - `FRONTEND_URL=https://nama-frontend.vercel.app`

Setelah deploy, tes `https://nama-express.vercel.app/health`.

## 3. Project backend Nest

- Jalankan CLI dari: `bun.js-nest.js`
- Framework Preset: Other
- Install Command: `npm install`
- Environment Variables sama seperti Express.

Deployment Vercel memakai runtime Node.js yang stabil melalui Nest Express adapter. Development lokal
tetap memakai Bun. Bun Runtime Vercel masih Public Beta dan Nest belum termasuk framework yang
didukung resmi, jadi konfigurasi production ini sengaja memilih jalur yang lebih aman.

Setelah deploy, tes `https://nama-nest.vercel.app/products`.

## 4. Project frontend

- Jalankan CLI dari: `web`
- Framework Preset: Next.js
- Install Command: `npm install`
- Build Command: `npm run build`
- Environment Variables:
  - `DATABASE_URL`
  - `AUTH_SECRET`
  - `AUTH_URL=https://nama-frontend.vercel.app`
  - `AUTH_TRUST_HOST=true`
  - seluruh credential Google, Facebook, dan TikTok
  - `NEXT_PUBLIC_API_URL=https://nama-express.vercel.app`
  - `INTERNAL_API_SECRET`

`INTERNAL_API_SECRET` wajib identik pada ketiga project. Frontend memakai satu backend aktif melalui
`NEXT_PUBLIC_API_URL`; ganti nilainya ke URL Nest lalu redeploy jika ingin berpindah backend.

Daftarkan callback OAuth production:

- `https://nama-frontend.vercel.app/api/auth/callback/google`
- `https://nama-frontend.vercel.app/api/auth/callback/facebook`
- `https://nama-frontend.vercel.app/api/auth/callback/tiktok`

Jika frontend memiliki beberapa domain yang harus diizinkan oleh backend, pisahkan dengan koma pada
`FRONTEND_URL`, misalnya:

```text
https://beauty.example.com,https://nama-frontend.vercel.app
```

Upload melalui Vercel Function dibatasi maksimal 4 MB agar berada di bawah batas payload platform.

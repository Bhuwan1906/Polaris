# 🧊 POLARIS — Polar Research & Information System

> **One digital gateway to India's polar knowledge.**

A unified digital platform that brings India's polar research knowledge — expeditions, publications, datasets, reports, media, and institutional activities — into one interconnected, searchable, and accessible ecosystem.

**Built for Smart India Hackathon 2026 | PS ID: SIH26063**

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ (we used v24.19.0)
- No database server needed — uses SQLite

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/polaris.git
cd polaris

# 2. Install dependencies
cd server && npm install
cd ../client && npm install

# 3. Set up database (from server/ directory)
cd server
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts

# 4. Start both servers (from root/)
cd ..
npm run dev
```

**Frontend:** http://localhost:5173
**Backend API:** http://localhost:3001

### Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@polaris.gov.in | admin123 |
| Researcher | researcher@polaris.gov.in | user123 |
| Educator | educator@polaris.gov.in | user123 |
| Public | user@polaris.gov.in | user123 |

---

## 🌐 Deploy Online (Free!)

### Option A: Railway + Vercel (Recommended)

#### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "POLARIS - Polar Research Portal"
git remote add origin https://github.com/YOUR_USERNAME/polaris.git
git push -u origin main
```

#### Step 2: Deploy Backend (Railway)
1. Go to **[railway.app](https://railway.app)** → Sign up with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"** → Select `polaris`
3. Settings:
   - **Root Directory:** `server`
   - **Start Command:** `node node_modules/tsx/dist/cli.mjs src/prod.ts`
4. Add a **PostgreSQL database:**
   - Click **"New"** → **"Database"** → **"PostgreSQL"**
   - Railway auto-gives you a `DATABASE_URL`
5. Add **Environment Variables** (Settings → Variables):
   ```
   DATABASE_URL=<Railway gives you this automatically>
   JWT_SECRET=<any-random-string-here>
   JWT_REFRESH_SECRET=<another-random-string>
   CORS_ORIGIN=https://your-frontend.vercel.app
   ```
6. After first deploy, open the **Deployment Logs** → Click the terminal icon → Run:
   ```bash
   npx prisma generate
   npx prisma db push
   npx tsx prisma/seed.ts
   ```
7. Copy your Railway backend URL (e.g., `https://polaris-production.up.railway.app`)

#### Step 3: Deploy Frontend (Vercel)
1. Go to **[vercel.com](https://vercel.com)** → Sign up with GitHub
2. Click **"Add New Project"** → Select `polaris`
3. Settings:
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add **Environment Variable:**
   ```
   VITE_API_URL=https://your-backend.up.railway.app
   ```
5. Click **Deploy**

**Done!** Your app is live at `https://your-project.vercel.app` 🎉

### Option B: Render.com (All-in-One)

1. Go to **[render.com](https://render.com)** → Sign up with GitHub
2. Create a **PostgreSQL Database** (free tier)
3. Create a **Web Service** for the backend:
   - Root: `server`
   - Build: `npm install && npx prisma generate && npx prisma db push`
   - Start: `npx tsx src/prod.ts`
   - Env: `DATABASE_URL` from your Render PostgreSQL
4. Create a **Static Site** for the frontend:
   - Root: `client`
   - Build: `npm install && npm run build`
   - Publish: `dist`
   - Env: `VITE_API_URL` = your backend URL

---

## 📁 Project Structure

```
polaris/
├── client/          → React + Vite + Tailwind frontend
│   ├── src/pages/   → 20+ pages (Home, Expeditions, Search, Map, etc.)
│   └── src/lib/     → API client, utilities
├── server/          → Express + Prisma backend
│   ├── prisma/      → Database schema + seed data
│   ├── src/routes/  → 12 route modules (40+ API endpoints)
│   └── src/controllers/ → Business logic
├── shared/          → TypeScript types, Zod schemas, constants
├── railway.json     → Railway deployment config
└── vercel.json      → Vercel deployment config
```

---

## 📊 What's Inside

- **11 expeditions** (1st ISEA 1981 through 45th ISEA 2025)
- **12 locations** (Maitri, Bharati, Himadri + research sites)
- **10 reports, 8 publications, 8 datasets, 12 media items**
- **6 educational resources, 14 tags, 4 user accounts**
- **Outreach Studio** with template-based content generation
- **Interactive map** with Leaflet + OpenStreetMap

---

## 🎯 Key Features

| Feature | Description |
|---------|-------------|
| **Expedition Explorer** | Browse expeditions with connected reports, publications, datasets |
| **Unified Search** | Search across all entities with filters |
| **Interactive Map** | Explore stations and locations on a Leaflet map |
| **Media Gallery** | Photos and videos with lightbox viewer |
| **Education Hub** | Simplified polar science content for students |
| **Outreach Studio** | Generate social media posts and articles from DB data |
| **Admin Dashboard** | Manage all content with role-based access |

---

## 📝 Notes

- All seed data marked `[DEMO]` — based on real NCPOR/Wikipedia facts
- Designed for SIH 2026 hackathon presentation
- SQLite in development, PostgreSQL in production
- No AI/ML required — template-based content generation

---

## License

Built for Smart India Hackathon 2026. Not yet licensed for production use.

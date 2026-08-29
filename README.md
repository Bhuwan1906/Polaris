# 🧊 POLARIS — Polar Research & Information System

> **One digital gateway to India's polar knowledge.**

**🌐 Live:** [polaris-pb-9c7a.vercel.app](https://polaris-pb-9c7a.vercel.app)
**⚙️ Backend API:** [polaris-production-a067.up.railway.app](https://polaris-production-a067.up.railway.app)

**Built for Smart India Hackathon 2026 | PS ID: SIH26063 | Organization: Ministry of Earth Sciences (MoES) | Department: NCPOR**

---

## 🎯 The Problem

India has been conducting polar research since 1981 — over 44 Antarctic expeditions, a permanent Arctic research station (Himadri), hundreds of scientific publications, thousands of photographs, and countless datasets. But this knowledge is **scattered** across different websites, PDFs, databases, and institutional archives.

A student wanting to learn about India's 44th Antarctic Expedition would need to:
- Check one website for the expedition report
- Search another for photographs
- Browse a third for publications
- Look elsewhere for datasets

**There is no single place where everything is connected.**

---

## 💡 The Solution — POLARIS

**POLARIS** (Polar Research & Information System) is a unified digital platform that brings all of India's polar research into **one interconnected knowledge ecosystem**.

### The Core Innovation: Connected Knowledge

Instead of treating documents as isolated files, POLARIS creates **relationships** between everything:

```
Expedition
  ├── Reports
  ├── Publications
  ├── Datasets
  ├── Photos & Videos
  ├── Locations (Map)
  └── Research Areas
```

When a user opens the 44th Antarctic Expedition, they immediately see:
- The expedition overview with dates and route
- 1 connected report
- 5 related publications
- 3 datasets
- 12 photographs
- The map location of Bharati and Maitri stations

**Everything is linked. Nothing is isolated.**

---

## 🔄 How It Works

### Architecture (3 Layers)

```
┌─────────────────────────────────────────┐
│            YOUR BROWSER                  │
│       React + Tailwind CSS + Vite        │
│   Homepage, Search, Map, Gallery, Admin  │
└──────────────────┬──────────────────────┘
                   │ API calls (JSON)
                   ▼
┌─────────────────────────────────────────┐
│          EXPRESS SERVER (Backend)         │
│     40+ API endpoints, JWT Auth          │
│   Search, CRUD, Content Generation       │
└──────────────────┬──────────────────────┘
                   │ Queries
                   ▼
┌─────────────────────────────────────────┐
│        PostgreSQL / SQLite Database       │
│   15+ tables, all interconnected         │
│  Expeditions, Publications, Datasets...  │
└─────────────────────────────────────────┘
```

### User Roles

| Role | What They Can Do |
|------|-----------------|
| **Public / Student** | Browse, search, explore expeditions, watch videos, learn about polar science |
| **Researcher** | Find publications, datasets, reports with advanced filters |
| **Educator** | Discover educational resources and verified content |
| **Admin** | Upload resources, manage content, generate outreach material |

### The Demo Flow (What Judges Will See)

1. **Homepage** → See live statistics (11 expeditions, 8 publications, 8 datasets...)
2. **Search** → Type "Antarctic" → Results across ALL resource types
3. **Expedition Detail** → Open 44th ISEA → See 6 connected tabs
4. **Interactive Map** → Click Maitri Station → See related expeditions
5. **Gallery** → Browse photos and watch YouTube polar research videos
6. **Education** → Simplified polar science for students
7. **Outreach Studio** → Select expedition → Generate verified social media post
8. **Credits** → Team info with photos

---

## 🚀 Key Features

| Feature | Description |
|---------|-------------|
| **Expedition Explorer** | Browse all Indian polar expeditions with connected resources |
| **Connected Knowledge** | Every resource links back to its expedition, location, and research area |
| **Unified Search** | Search across expeditions, publications, datasets, media with filters |
| **Interactive Map** | Leaflet map with real coordinates of Maitri, Bharati, Himadri stations |
| **Media Gallery** | Photos + YouTube video embeds with lightbox viewer |
| **Outreach Studio** | Template-based content generation (social posts, articles, newsletters) |
| **Education Hub** | Simplified polar science content for students and the public |
| **Admin Dashboard** | Full content management with Draft → Review → Published workflow |
| **Role-Based Auth** | JWT authentication with Public, Researcher, Educator, Admin roles |
| **Mobile Responsive** | Works on phones, tablets, and desktops |

---

## 📊 Demo Data

All data is based on **real NCPOR facts** (clearly marked as [DEMO]):

- **11 expeditions** (1st ISEA 1981 through 45th ISEA 2025)
- **12 locations** (Maitri, Bharati, Himadri + research sites)
- **10 reports, 8 publications, 8 datasets, 12 media items**
- **6 educational resources, 14 tags, 4 user accounts**
- **Real YouTube videos** of Indian polar research

---

## 🛠 Tech Stack

| Component | Technology |
|-----------|-----------|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Express.js, Node.js |
| Database | SQLite (dev) / PostgreSQL (production) |
| ORM | Prisma |
| Auth | JWT (access + refresh tokens) |
| Maps | Leaflet + OpenStreetMap |
| Hosting | Vercel (frontend) + Railway (backend) |

---

## 📁 Project Structure

```
polaris/
├── client/              → React + Vite + Tailwind frontend
│   ├── src/pages/       → 20+ pages (Home, Expeditions, Search, Map, etc.)
│   ├── src/components/  → Reusable UI components (Logo, Navbar, Footer)
│   ├── src/hooks/       → React Query hooks for API calls
│   └── src/lib/         → API client, utilities
├── server/              → Express + Prisma backend
│   ├── prisma/          → Database schema + seed data (80+ entries)
│   ├── src/routes/      → 12 route modules (40+ API endpoints)
│   ├── src/controllers/ → Business logic
│   └── src/middleware/  → Auth, validation, error handling
├── shared/              → TypeScript types, Zod schemas, constants
├── railway.json         → Backend deployment config
├── vercel.json          → Frontend deployment config
└── .freebuff/           → Project docs and run scripts
```

---

## 🏃 Quick Start (Local Development)

### Prerequisites
- Node.js 18+

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/Bhuwan1906/Polaris.git
cd Polaris

# 2. Install dependencies
cd server && npm install
cd ../client && npm install

# 3. Set up database
cd server
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts

# 4. Start the app
cd server && node launch.js
# In another terminal:
cd client && node launch.cjs
```

**Frontend:** http://localhost:5173
**Backend API:** http://localhost:3001

### Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@polaris.gov.in | admin123 |
| Researcher | researcher@polaris.gov.in | user123 |
| Public | user@polaris.gov.in | user123 |

---

## 👥 Team

Built by **Team POLARIS** for Smart India Hackathon 2026.

- **Bhuwanesh P** — Team Leader / Full-Stack Developer

---

## 📝 License

Built for Smart India Hackathon 2026.

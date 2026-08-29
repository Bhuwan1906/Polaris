# POLARIS — Knowledge File
### Polar Research & Information System

---

## Project Identity

- **Name:** POLARIS (Polar Research & Information System)
- **Tagline:** "One digital gateway to India's polar knowledge"
- **Purpose:** Smart India Hackathon 2026 | PS ID: SIH26063 | Ministry of Earth Sciences (MoES) / NCPOR
- **Category:** Software | Theme: Smart Education

---

## Architecture Overview

**Monorepo with 3 packages, no workspace hoisting:**

```
polaris/
├── client/    → React 18 + Vite + TypeScript + Tailwind CSS
├── server/    → Express + TypeScript + Prisma ORM + SQLite
└── shared/    → TypeScript types, Zod validation schemas, constants
```

- **Frontend:** React 18, Vite 5, Tailwind CSS 3, React Router 6, TanStack Query 5, React-Leaflet 4, Recharts 2, Framer Motion 10, Lucide icons
- **Backend:** Express 4, Prisma 5, JWT auth (access + refresh), Multer file uploads, Helmet security, rate limiting
- **Database:** SQLite (switchable to PostgreSQL by changing `provider` in `schema.prisma` and `DATABASE_URL`)
- **ORM:** Prisma with 15+ models and full relational graph
- **Auth:** JWT with access/refresh token pattern, 4 roles (PUBLIC, RESEARCHER, EDUCATOR, ADMIN)

---

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| SQLite over PostgreSQL | Hackathon portability — no external DB server needed. One schema change to go back to PostgreSQL. |
| Template-based Outreach Studio | No AI dependency. Deterministic output. Fast demo. Can add LLM later. |
| Monorepo without workspace hoisting | Avoids path resolution issues with special characters in workspace paths. Direct `npm install` per package. |
| Inline shared types | `server/src/shared/` and `client/src/shared/` are copies of `shared/src/` to avoid cross-package imports. |
| React Query for server state | Handles caching, loading states, refetching. Simpler than global state management. |
| No component library | Tailwind + custom CSS components (`card`, `btn-primary`, `badge-*`) for full design control. |

---

## Database Schema (SQLite)

**15+ models with these key relationships:**

```
User ──1:N── OutreachContent
Expedition ──1:N── Report, Publication, Dataset, Media, Activity, EducationalResource
Expedition ──M:N── Location (via LocationExpedition)
Tag ──M:N── Report, Publication, Dataset, Media, Activity, EducationalResource (via join tables)
Location ──1:N── Media
```

**Core entities:**
- `User` — id, email, password (bcrypt), name, role, avatar, timestamps
- `Expedition` — id, name, expeditionNumber, region, startDate, endDate, description, highlights, status, coverImage
- `Location` — id, name, region, latitude, longitude, type (STATION/RESEARCH_SITE/WAYPOINT/CITY), description
- `Report` — id, title, type, content, fileUrl, year, expeditionId, status
- `Publication` — id, title, authors, journal, year, doi, abstract, expeditionId
- `Dataset` — id, title, format, source, year, description, expeditionId, region
- `Media` — id, title, type (PHOTO/VIDEO/DOCUMENT/INFOGRAPHIC), fileUrl, thumbnailUrl, caption, expeditionId, locationId, category
- `Tag` — id, name, color
- `OutreachContent` — id, title, type, content, resourceId, resourceType, status, createdBy, approvedBy
- `EducationalResource` — id, title, content, difficulty, category, expeditionId

---

## API Endpoints (40+)

**Base URL:** `/api/v1`

| Module | Endpoints | Auth |
|--------|-----------|------|
| Auth | POST register, POST login, POST refresh, GET me | Public/Bearer |
| Expeditions | GET /, GET /featured, GET /:id, GET /:id/resources, POST, PUT, DELETE | Public/Admin |
| Publications | GET /, GET /latest, GET /:id, POST, PUT, DELETE | Public/Admin |
| Datasets | GET /, GET /:id, POST, PUT, DELETE | Public/Admin |
| Reports | GET /, GET /:id, POST, PUT, DELETE | Public/Admin |
| Media | GET /, GET /:id, POST, PUT, DELETE | Public/Admin |
| Search | GET /, GET /suggestions | Public |
| Locations | GET /, GET /:id, POST, PUT, DELETE | Public/Admin |
| Tags | GET /, POST, DELETE | Public/Admin |
| Outreach | GET /, GET /:id, POST /generate, PUT /:id, PUT /:id/status, DELETE | Admin |
| Stats | GET /overview, GET /expeditions-by-year, GET /regions, GET /resources-by-type | Public |
| Users | GET /, PUT /:id/role, DELETE /:id | Admin |

---

## Frontend Pages (20+)

| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Hero, stats, featured expeditions, publications, CTA |
| Expedition List | `/expeditions` | Filterable list with region/status filters, pagination |
| Expedition Detail | `/expeditions/:id` | 6-tab detail (Overview, Reports, Publications, Datasets, Photos, Videos) |
| Search | `/search` | Unified cross-entity search with type/region/sort filters |
| Map | `/map` | Leaflet map with station markers and popup details |
| Gallery | `/gallery` | Grid view with type filters and lightbox modal |
| Publications | `/publications` | List + detail pages |
| Datasets | `/datasets` | List + detail pages |
| Education | `/education` | Accordion sections with polar science content |
| Outreach Studio | `/outreach` | 4-step wizard for content generation |
| Admin Dashboard | `/admin` | Stats, quick actions, CRUD management |
| Login | `/login` | Auth form with demo account info |
| Register | `/register` | Registration form |

---

## Demo Data (Based on Real NCPOR Facts)

All data marked `[DEMO]` in database, based on publicly available information:

**Locations (11):**
- Dakshin Gangotri (70.75°S, 11.73°E) — decommissioned 1990
- Maitri (70.77°S, 11.73°E) — operational since 1989
- Bharati (69.41°S, 76.19°E) — operational since 2012
- Himadri (78.92°N, 11.93°E) — operational since 2008
- Mumbai, Cape Town, NCPOR Goa, Prydz Bay, Schirmacher Oasis, Kongsfjorden, Ny-Ålesund

**Expeditions (11):**
- 1st ISEA (1981-82) through 45th ISEA (2025-26)
- 1st IAE (2007), 2nd IAE (2008 — Himadri inauguration), 14th IAE (2023), 16th IAE (2026 planned)

**Resources:** 10 reports, 8 publications, 8 datasets, 12 media items, 6 activities, 6 educational resources, 14 tags

---

## Color Palette (Polar-Inspired)

| Token | Hex | Usage |
|-------|-----|-------|
| polar-900 | `#0A1628` | Background, dark surfaces |
| polar-500 | `#29B6F6` | Primary accent, CTAs |
| aurora-500 | `#00E5A0` | Highlight gradient, aurora gradient |
| ice-400 | `#36ADF6` | Arctic region badge |
| surface-800 | `#1E293B` | Card backgrounds, borders |
| surface-400 | `#94A3B8` | Secondary text |

---

## Design System Classes

```css
card         → rounded-xl border border-surface-800 bg-surface-900/50 backdrop-blur-sm
card-hover   → card + transition + hover:border-polar-400/30 + hover:shadow-lg
btn-primary  → bg-polar-500 text-white + hover:bg-polar-400
btn-secondary → border border-surface-600 bg-surface-800
btn-aurora   → bg-aurora-gradient text-polar-900
badge-arctic → bg-ice-500/10 text-ice-400 ring-1
input        → bg-surface-800/50 border-surface-700 + focus:border-polar-500
```

---

## Authentication Flow

1. Register → bcrypt hash → store user → generate JWT pair → store in localStorage
2. Login → verify bcrypt → generate JWT pair → store in localStorage
3. Request → Bearer token in header → middleware verifies → attaches `req.user`
4. Token refresh → send refresh token → verify → issue new pair
5. 401 response → interceptor tries refresh → fails → redirect to login

---

## Outreach Studio (Template-Based Content Generation)

**Templates:** Social Media Post, Website Article, Fact Card, Newsletter

**Workflow:**
1. Admin selects resource (expedition/publication/dataset)
2. Chooses template type
3. System generates structured draft from verified DB data
4. Admin edits content
5. Submit for review → Approved → Published

**Status flow:** DRAFT → REVIEW → APPROVED → PUBLISHED (with rollback)

---

## Environment Variables

```env
DATABASE_URL="file:./dev.db"          # SQLite (or postgresql://... for PG)
JWT_SECRET="..."                       # Access token signing
JWT_REFRESH_SECRET="..."              # Refresh token signing
JWT_EXPIRES_IN="15m"                  # Access token lifetime
JWT_REFRESH_EXPIRES_IN="7d"           # Refresh token lifetime
PORT=3001                             # Server port
CORS_ORIGIN="http://localhost:5173"   # Frontend origin
UPLOAD_DIR="uploads"                  # File upload directory
```

---

## Known Constraints

1. No fabricated official NCPOR data — all seed data marked `[DEMO]`
2. No AI/ML mandatory — template-based outreach content only
3. Architecture explainable by first-year students
4. Modular, well-documented code
5. Working MVP before advanced features

---

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@polaris.gov.in | admin123 |
| Researcher | researcher@polaris.gov.in | user123 |
| Educator | educator@polaris.gov.in | user123 |
| Public | user@polaris.gov.in | user123 |

---

## Deployment Target

- Frontend: Vercel / Netlify
- Backend: Railway / Render
- Database: Supabase PostgreSQL / Railway PostgreSQL
- File Storage: Cloudflare R2 / AWS S3
- Both deployable independently via `npm run build`

# SIH 2026 Presentation - POLARIS
## Official Template Format (6 Slides)

---

## SLIDE 1: TITLE PAGE

### SMART INDIA HACKATHON 2026

**Problem Statement ID:** SIH26063

**Problem Statement Title:**
Integrated Polar Science Outreach, Knowledge Repository and Media Dissemination Portal

**Theme:** Smart Education

**PS Category:** Software

**Team Name:** Team POLARIS

**Team Members:**
- Bhuwanesh P (Team Leader)
- E Hanush
- S.v.Akshaya
- Hatni negiha
- K.Jayashree
- Dharshini. V

**[Your College Name]**

---

## SLIDE 2: IDEA TITLE / PROPOSED SOLUTION

### POLARIS - Polar Research & Information System

**One digital gateway to India polar knowledge.**

**The Problem:**
India polar research knowledge is scattered across different websites, PDFs, and databases. Students, researchers, and the public cannot easily find or understand this information.

**Our Solution:**
We built POLARIS - a unified web platform that connects all polar research resources (expeditions, publications, datasets, photos, videos) into one searchable, interconnected knowledge ecosystem.

**How It Addresses the Problem:**

| Problem | Our Solution |
|---------|-------------|
| Information scattered | Unified search across ALL resource types |
| Resources not connected | Connected Knowledge model |
| No outreach pipeline | Outreach Studio generates verified content |
| Technical docs overwhelm students | Education Hub with simplified content |
| Historical expeditions hidden | Interactive map + timeline exploration |

**Innovation & Uniqueness:**
- **Connected Knowledge Graph** - Not a document archive, but an ecosystem where everything is linked
- **Outreach Studio** - Only platform that auto-generates verified content from database
- **6-role audience design** - Same platform serves students, researchers, educators, admins, and public

---

## SLIDE 3: TECHNICAL APPROACH

### Technologies Used

**Frontend:** React 18 + Vite, Tailwind CSS, React Query

**Backend:** Express.js + Node.js, Prisma ORM, JWT Auth

**Database:** SQLite (dev) / PostgreSQL (prod)

**Maps:** Leaflet + OpenStreetMap

**Hosting:** Vercel (frontend) + Railway (backend)

### Architecture Flow

User (Browser) -> React Frontend -> REST API -> Express Backend -> PostgreSQL Database

### Key Numbers:
- **15+ database tables** with relationships
- **40+ API endpoints** for CRUD, search, content generation
- **20+ frontend pages** (Home, Expeditions, Search, Map, Gallery, Education, Admin)
- **80+ data entries** from real NCPOR facts
- **/usr/bin/bash cost** - all free-tier hosting

---

## SLIDE 4: FEASIBILITY AND VIABILITY

### Feasibility Analysis

**Technical:**
- Full working prototype deployed and live
- Standard technologies (React, Express, PostgreSQL)
- Scalable architecture ready for real data

**Operational:**
- Admin dashboard for NCPOR staff
- Content workflow (Draft -> Review -> Published)
- Outreach Studio saves hours of content creation

### Challenges & Strategies

| Challenge | Strategy |
|-----------|----------|
| Getting real NCPOR data | Schema designed for easy CSV/Excel import |
| Server costs | Free tier handles moderate traffic |
| AI for search | Template MVP works now; AI optional upgrade |
| User adoption | Education Hub + Outreach Studio provide immediate value |

---

## SLIDE 5: IMPACT AND BENEFITS

### Who Benefits?

| Audience | Impact |
|----------|--------|
| Students | First-time access to simplified polar science |
| Researchers | Find publications, datasets, reports in seconds |
| Educators | Verified content for classroom teaching |
| NCPOR Staff | Auto-generate social media content |
| Public | Discover India polar achievements |

### Impact

**Social:** Democratizes polar knowledge, builds national pride

**Educational:** Interactive maps, photos, simplified content for students

**Operational:** NCPOR saves 10+ hours/week, replaces 5+ scattered systems

---

## SLIDE 6: RESEARCH AND REFERENCES

### References

1. NCPOR - https://ncpor.res.in
2. Ministry of Earth Sciences - https://moes.gov.in
3. Smart India Hackathon 2026 - https://sih.gov.in
4. Antarctic Treaty - https://www.ats.aq
5. Indian Antarctic Programme - Wikipedia
6. Himadri Station - Wikipedia

### Live Demo

**Website:** https://polaris-pb-9c7a.vercel.app
**GitHub:** https://github.com/Bhuwan1906/Polaris

---

## PRESENTATION SCRIPT (2 minutes)

**Slide 1 (10 sec):**
"Good morning judges. We are Team POLARIS from [College]. We are solving PS SIH26063."

**Slide 2 (30 sec):**
"India has 44+ polar expeditions but knowledge is scattered. We built POLARIS - a unified platform with Connected Knowledge. Every resource links to its expedition. Outreach Studio generates verified social media content."

**Slide 3 (20 sec):**
"React, Express, PostgreSQL. 15+ tables, 40+ endpoints. Deployed on Vercel and Railway - zero cost."

**Slide 4 (20 sec):**
"Working prototype with 80+ real data entries. Scalable for real NCPOR data."

**Slide 5 (20 sec):**
"Benefits students, researchers, educators, and NCPOR staff. Saves hours of content creation."

**Slide 6 (10 sec):**
"Live demo at polaris-pb-9c7a.vercel.app. Thank you."
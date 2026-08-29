# POLARIS Run Document

## Reproduce Artifacts

### Prerequisites
- Node.js v24.19.0 installed via winget (`OpenJS.NodeJS.LTS`)
- No PostgreSQL needed — uses SQLite

### Install Dependencies
```bash
cd server && npm install
cd ../client && npm install
```

### Set Up Database
```bash
cd server
node node_modules/prisma/build/index.js generate
node node_modules/prisma/build/index.js db push --accept-data-loss
node node_modules/tsx/dist/cli.mjs prisma/seed.ts
```

The SQLite database is created at `server/dev.db`.

## Run the Server

### Backend (port 3001)
```bash
cd server && node launch.js
```
Uses `server/launch.js` which spawns the server as a detached process using:
- Entry: `server/src/index.ts` via tsx
- Database: SQLite at `server/dev.db`
- Port: 3001

### Frontend (port 5173)
```bash
cd client && node launch.cjs
```
Uses `client/launch.cjs` which spawns Vite dev server as a detached process.
Vite proxies `/api/*` to `http://localhost:3001`.

## Notes
- The workspace path `D:\Bhuwan;-;` contains a semicolon that breaks `npx` and PowerShell argument parsing. That's why direct node commands and `.cjs`/`.js` launchers are used instead.
- Database: SQLite (switched from PostgreSQL to avoid installation issues on this machine)
- Seed data: 11 expeditions, 11 locations, 10 reports, 8 publications, 8 datasets, 12 media items, 6 activities, 6 educational resources, 14 tags, 4 users

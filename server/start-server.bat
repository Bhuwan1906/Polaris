@echo off
set PATH=C:\Program Files\nodejs;%PATH%
set PORT=3001
set DATABASE_URL=file:./dev.db
set JWT_SECRET=polaris-sih2026-secret
set JWT_REFRESH_SECRET=polaris-sih2026-refresh-secret
set JWT_EXPIRES_IN=15m
set JWT_REFRESH_EXPIRES_IN=7d
set CORS_ORIGIN=http://localhost:5173
set UPLOAD_DIR=uploads
cd /d "%~dp0"
"C:\Program Files\nodejs\node.exe" node_modules\tsx\dist\cli.mjs src\index.ts

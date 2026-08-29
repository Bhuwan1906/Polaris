$ErrorActionPreference = 'SilentlyContinue'
$env:PORT = '3001'
$env:DATABASE_URL = 'file:./dev.db'
$env:JWT_SECRET = 'polaris-sih2026-secret'
$env:JWT_REFRESH_SECRET = 'polaris-sih2026-refresh-secret'
$env:JWT_EXPIRES_IN = '15m'
$env:JWT_REFRESH_EXPIRES_IN = '7d'
$env:CORS_ORIGIN = 'http://localhost:5173'
$env:UPLOAD_DIR = 'uploads'
$nodeExe = 'C:\Program Files\nodejs\node.exe'
$serverDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $serverDir
& $nodeExe "$serverDir\node_modules\tsx\dist\cli.mjs" "$serverDir\src\index.ts"

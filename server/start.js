const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Set environment variables
process.env.PORT = '3001';
process.env.DATABASE_URL = 'file:./dev.db';
process.env.JWT_SECRET = 'polaris-sih2026-secret';
process.env.JWT_REFRESH_SECRET = 'polaris-sih2026-refresh-secret';
process.env.JWT_EXPIRES_IN = '15m';
process.env.JWT_REFRESH_EXPIRES_IN = '7d';
process.env.CORS_ORIGIN = 'http://localhost:5173';
process.env.UPLOAD_DIR = 'uploads';

// Use tsx to run the server
const tsxPath = path.join(__dirname, 'node_modules', 'tsx', 'dist', 'cli.mjs');
const indexPath = path.join(__dirname, 'src', 'index.ts');

console.log('Starting POLARIS server...');
console.log('TSX:', tsxPath);
console.log('Index:', indexPath);

const { spawn } = require('child_process');
const server = spawn('node', [tsxPath, indexPath], {
  cwd: __dirname,
  stdio: 'inherit',
  env: process.env
});

server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});

server.on('exit', (code) => {
  console.log('Server exited with code:', code);
});

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const serverDir = __dirname;
const env = {
  ...process.env,
  PORT: '3001',
  DATABASE_URL: 'file:./dev.db',
  JWT_SECRET: 'polaris-sih2026-secret',
  JWT_REFRESH_SECRET: 'polaris-sih2026-refresh-secret',
  JWT_EXPIRES_IN: '15m',
  JWT_REFRESH_EXPIRES_IN: '7d',
  CORS_ORIGIN: 'http://localhost:5173',
  UPLOAD_DIR: 'uploads',
};

const nodeExe = 'C:\\Program Files\\nodejs\\node.exe';
const tsxPath = path.join(serverDir, 'node_modules', 'tsx', 'dist', 'cli.mjs');
const indexPath = path.join(serverDir, 'src', 'index.ts');

const logFile = path.join(serverDir, '..', '.freebuff', 'preview-87842a9a-134a-4a56-9542-febf5fa812a0.log');
const errFile = logFile + '.err';

const outStream = fs.createWriteStream(logFile);
const errStream = fs.createWriteStream(errFile);

console.log('Starting POLARIS server on port 3001...');
console.log('Log:', logFile);

const child = spawn(nodeExe, [tsxPath, indexPath], {
  cwd: serverDir,
  env,
  stdio: ['ignore', 'pipe', 'pipe'],
  detached: true,
});

child.stdout.pipe(outStream);
child.stderr.pipe(errStream);

child.unref();

console.log('Server PID:', child.pid);

// Wait a bit then check health
setTimeout(() => {
  const http = require('http');
  const req = http.get('http://localhost:3001/health', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      console.log('Health check:', data);
      process.exit(0);
    });
  });
  req.on('error', (err) => {
    console.error('Health check failed:', err.message);
    process.exit(1);
  });
  req.setTimeout(5000, () => {
    console.error('Health check timeout');
    process.exit(1);
  });
}, 5000);

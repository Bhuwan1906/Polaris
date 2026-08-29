const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const clientDir = __dirname;
const env = {
  ...process.env,
  PATH: 'C:\\Program Files\\nodejs;' + process.env.PATH,
};

const nodeExe = 'C:\\Program Files\\nodejs\\node.exe';
const vitePath = path.join(clientDir, 'node_modules', 'vite', 'bin', 'vite.js');

const logFile = path.join(clientDir, '..', '.freebuff', 'preview-client.log');
const errFile = logFile + '.err';

const outStream = fs.createWriteStream(logFile);
const errStream = fs.createWriteStream(errFile);

console.log('Starting POLARIS client on port 5173...');

const child = spawn(nodeExe, [vitePath, '--host', '0.0.0.0', '--port', '5173'], {
  cwd: clientDir,
  env,
  stdio: ['ignore', 'pipe', 'pipe'],
  detached: true,
});

child.stdout.pipe(outStream);
child.stderr.pipe(errStream);
child.unref();

console.log('Client PID:', child.pid);

// Check health after delay
setTimeout(() => {
  const http = require('http');
  const req = http.get('http://localhost:5173/', (res) => {
    console.log('Client responding, status:', res.statusCode);
    process.exit(0);
  });
  req.on('error', (err) => {
    console.error('Client check failed:', err.message);
    process.exit(1);
  });
  req.setTimeout(8000, () => {
    console.error('Client check timeout');
    process.exit(1);
  });
}, 8000);

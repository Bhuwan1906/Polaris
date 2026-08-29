import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = parseInt(process.env.PORT || '3001');

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════╗
║          🧊 POLARIS Server 🧊           ║
║   Polar Research & Information System    ║
╠══════════════════════════════════════════╣
║  🌐 Running on: http://localhost:${PORT}  ║
║  📋 API Base:   /api/v1                 ║
║  💚 Health:     /health                 ║
╚══════════════════════════════════════════╝
  `);
});

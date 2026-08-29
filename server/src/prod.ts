import app from './app';

// Production: read PORT from environment (Railway, Render, etc.)
const PORT = parseInt(process.env.PORT || '3001');

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🧊 POLARIS API running on port ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
});

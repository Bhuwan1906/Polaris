const fs = require('fs');
const out = 'client/src/pages/GalleryPage.tsx';
const content = fs.readFileSync('client/gallery.b64', 'utf8');
fs.writeFileSync(out, Buffer.from(content, 'base64').toString('utf8'));
console.log('Gallery written:', fs.statSync(out).size, 'bytes');

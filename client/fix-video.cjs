const fs = require('fs');
const f = 'client/src/pages/GalleryPage.tsx';
let content = fs.readFileSync(f, 'utf8');

// The old video block pattern
const marker = 'Video preview';
const lastIdx = content.lastIndexOf(marker);
if (lastIdx === -1) { console.log('marker not found'); process.exit(1); }

// Find the start of this JSX expression
const videoStart = content.lastIndexOf("selectedItem.type === 'VIDEO' &&", lastIdx);
if (videoStart === -1) { console.log('video start not found'); process.exit(1); }

// Find the line start (indentation)
const lineStart = content.lastIndexOf('\n', videoStart) + 1;

// Find the end - we need to match the balanced JSX
let depth = 0;
let i = videoStart;
let foundFirst = false;
while (i < content.length) {
  if (content[i] === '<' && content[i+1] !== '/') { depth++; foundFirst = true; }
  if (content[i] === '>' && foundFirst) { depth--; }
  if (depth === 0 && foundFirst) break;
  i++;
}
// Now skip past closing brace/paren if any
while (i < content.length && (content[i] === '}' || content[i] === ')' || content[i] === ' ' || content[i] === '\n')) i++;
const lineEnd = content.indexOf('\n', i) + 1;

const oldBlock = content.substring(lineStart, lineEnd);

// New replacement block with YouTube embed
const indent = '              ';
const newBlock = indent + "{selectedItem.type === 'VIDEO' && (() => {\n" +
  indent + "  const ytId = getYouTubeId(selectedItem.title);\n" +
  indent + "  if (ytId) {\n" +
  indent + "    return (\n" +
  indent + "      <iframe\n" +
  indent + "        src={'https://www.youtube.com/embed/' + ytId + '?autoplay=1&rel=0'}\n" +
  indent + "        className='w-full h-full'\n" +
  indent + "        allow='autoplay; encrypted-media'\n" +
  indent + "        allowFullScreen\n" +
  indent + "        title={selectedItem.title}\n" +
  indent + "      />\n" +
  indent + "    );\n" +
  indent + "  }\n" +
  indent + "  return (\n" +
  indent + "    <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-surface-900'>\n" +
  indent + "      <div className='text-center'>\n" +
  indent + "        <div className='flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-polar-500/20 border-2 border-polar-500/50 mb-4'>\n" +
  indent + "          <Play className='h-10 w-10 text-polar-400 ml-1' fill='currentColor' />\n" +
  indent + "        </div>\n" +
  indent + "        <p className='text-surface-400 text-sm'>Video preview</p>\n" +
  indent + "      </div>\n" +
  indent + "    </div>\n" +
  indent + "  );\n" +
  indent + "})()}\n";

content = content.replace(oldBlock, newBlock);
fs.writeFileSync(f, content, 'utf8');
console.log('Video section replaced with YouTube embed!');
console.log('Old block length:', oldBlock.length);
console.log('New block length:', newBlock.length);

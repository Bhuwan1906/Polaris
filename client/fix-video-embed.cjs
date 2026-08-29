const fs = require('fs');
const f = 'client/src/pages/GalleryPage.tsx';
let content = fs.readFileSync(f, 'utf8');

// Replace the IIFE-based video section with a simpler approach
// using a helper variable computed before the return
const oldPattern = "{selectedItem.type === 'VIDEO' && (() => {";
const newPattern = "{selectedItem.type === 'VIDEO' && (() => {";

if (content.includes(oldPattern)) {
  // Find and remove the entire IIFE block
  const iifeStart = content.indexOf(oldPattern);
  
  // Find the matching })()} at the end
  const iifeEnd = content.indexOf("})()}", iifeStart) + 5;
  
  const oldIIFE = content.substring(iifeStart, iifeEnd);
  console.log('Old IIFE length:', oldIIFE.length);
  
  // Simple replacement: just render an iframe or fallback
  const newVideo = "{selectedItem.type === 'VIDEO' && getYouTubeId(selectedItem.title) ? (\n" +
    "              <iframe\n" +
    "                src={'https://www.youtube.com/embed/' + getYouTubeId(selectedItem.title) + '?rel=0'}\n" +
    "                className='w-full h-full border-0'\n" +
    "                allow='autoplay; encrypted-media; fullscreen'\n" +
    "                allowFullScreen\n" +
    "                title={selectedItem.title}\n" +
    "              />\n" +
    "            ) : selectedItem.type === 'VIDEO' ? (\n" +
    "              <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-surface-900'>\n" +
    "                <div className='text-center'>\n" +
    "                  <div className='flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-polar-500/20 border-2 border-polar-500/50 mb-4'>\n" +
    "                    <Play className='h-10 w-10 text-polar-400 ml-1' fill='currentColor' />\n" +
    "                  </div>\n" +
    "                  <p className='text-surface-400 text-sm'>Video preview</p>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            ) : null}";
  
  content = content.substring(0, iifeStart) + newVideo + content.substring(iifeEnd);
  fs.writeFileSync(f, content, 'utf8');
  console.log('Replaced IIFE with simple conditional');
} else {
  console.log('IIFE pattern not found');
}

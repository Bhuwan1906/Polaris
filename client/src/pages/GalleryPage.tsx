import { useState } from 'react';
import { Camera, Film, FileText, X, Play, Image as ImageIcon, Grid, ChevronLeft, ChevronRight, Maximize2, Eye } from 'lucide-react';
import { useMedia } from '@/hooks/useApi';

const TYPE_OPTIONS = [
  { value: '', label: 'All Media' },
  { value: 'PHOTO', label: 'Photographs' },
  { value: 'VIDEO', label: 'Videos' },
  { value: 'DOCUMENT', label: 'Documents' },
  { value: 'INFOGRAPIC', label: 'Infographics' },
];

const CATEGORY_STYLES: Record<string, { gradient: string; emoji: string; color: string }> = {
  Station:    { gradient: 'from-blue-600 via-blue-800 to-slate-900', emoji: '🏔️', color: '#3B82F6' },
  Landscape:  { gradient: 'from-cyan-500 via-blue-600 to-indigo-800', emoji: '🌊', color: '#06B6D4' },
  Research:   { gradient: 'from-emerald-500 via-teal-600 to-cyan-800', emoji: '🔬', color: '#10B981' },
  Expedition: { gradient: 'from-orange-500 via-red-500 to-rose-700', emoji: '🧭', color: '#F97316' },
  Wildlife:   { gradient: 'from-green-400 via-emerald-500 to-teal-700', emoji: '🐧', color: '#4ADE80' },
  Phenomena:  { gradient: 'from-purple-500 via-violet-600 to-indigo-800', emoji: '🌌', color: '#A855F7' },
};
const DEFAULT_STYLE = { gradient: 'from-surface-600 via-surface-700 to-surface-800', emoji: '📷', color: '#64748B' };

const POLAR_PHOTOS = [
  'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1517783999520-f068d7431d60?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&h=600&fit=crop',
];

const VIDEO_THUMBS = [
  'https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=600&h=400&fit=crop',
];

// Real YouTube videos about Indian polar research
const YOUTUBE_VIDEOS: Record<string, string> = {
  'IndARC': 'WsZO0ZCTSyI',
  'Fjord': '3h9Ltuxsxug',
  'Maitri Station': '-KjMHRfUWC4',
  'Ice Core': 'G7NiGOz4G4k',
};

function getYouTubeId(title: string): string | null {
  for (const [key, id] of Object.entries(YOUTUBE_VIDEOS)) {
    if (title.includes(key)) return id;
  }
  return null;
}


function getPhotoUrl(id: string) {
  const hash = id.split('').reduce((a: number, c: string) => a + c.charCodeAt(0), 0);
  return POLAR_PHOTOS[hash % POLAR_PHOTOS.length];
}
function getVideoThumb(id: string, title?: string) {
  const hash = id.split('').reduce((a: number, c: string) => a + c.charCodeAt(0), 0);
  if (title) { const ytId = getYouTubeId(title); if (ytId) return 'https://img.youtube.com/vi/' + ytId + '/mqdefault.jpg'; }
  return VIDEO_THUMBS[hash % VIDEO_THUMBS.length];
}

export function GalleryPage() {
  const [typeFilter, setTypeFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'large'>('grid');
  const [page, setPage] = useState(1);
  const limit = 12;
  const filters: Record<string, string> = {};
  if (typeFilter) filters.type = typeFilter;
  if (categoryFilter) filters.category = categoryFilter;
  if (searchTerm) filters.search = searchTerm;
  const { data, isLoading } = useMedia({ page, limit, ...filters });
  const items = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const total = data?.total || 0;
  const categories = ['Station', 'Landscape', 'Research', 'Expedition', 'Wildlife', 'Phenomena'];
  const openLightbox = (item: any) => setSelectedItem(item);
  const closeLightbox = () => setSelectedItem(null);
  const navigateItem = (direction: number) => {
    if (!selectedItem) return;
    const idx = items.findIndex((i: any) => i.id === selectedItem.id);
    const next = idx + direction;
    if (next >= 0 && next < items.length) setSelectedItem(items[next]);
  };

  return (
    <div className='min-h-screen bg-surface-950'>
      <section className='relative py-20 overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-b from-polar-900/20 via-surface-950 to-surface-950' />  
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-polar-500/5 rounded-full blur-3xl' />
        <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-ice-500/5 rounded-full blur-3xl' />
        <div className='relative container mx-auto px-4'>
          <div className='max-w-3xl mx-auto text-center'>
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-polar-500/10 border border-polar-500/20 mb-6'>
              <Camera className='h-4 w-4 text-polar-400' />
              <span className='text-sm text-polar-400'>Media Gallery</span>
            </div>
            <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>Polar <span className='text-gradient'>Visual Archive</span></h1>
            <p className='text-lg text-surface-400 mb-8'>Explore photographs, videos, and visual documentation from India's polar expeditions</p>
            <div className='relative max-w-xl mx-auto'>
              <input type='text' placeholder='Search media...' value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }} className='w-full px-5 py-3.5 rounded-xl bg-surface-900/80 border border-surface-700 text-white placeholder:text-surface-500 focus:outline-none focus:border-polar-500/50' />
              <Eye className='absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-500' />
            </div>
          </div>
        </div>
      </section>
      <div className='container mx-auto px-4 pb-20'>
        <div className='flex flex-wrap items-center justify-between gap-4 mb-8 p-4 rounded-xl bg-surface-900/50 border border-surface-800'>
          <div className='flex flex-wrap items-center gap-3'>
            <div className='flex flex-wrap gap-1.5'>
              {TYPE_OPTIONS.map((opt) => (
                <button key={opt.value} onClick={() => { setTypeFilter(opt.value); setPage(1); }} className={"px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${typeFilter === opt.value ? 'bg-polar-500 text-white shadow-lg shadow-polar-500/25' : 'bg-surface-800 text-surface-400 hover:bg-surface-700 hover:text-white'}"}>{opt.label}</button>
              ))}
            </div>
            <select value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }} className='px-3 py-1.5 rounded-lg bg-surface-800 text-surface-300 border border-surface-700 text-sm'>
              <option value=''>All Categories</option>
              {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
            </select>
          </div>
          <div className='flex items-center gap-3'>
            <span className='text-sm text-surface-500'>{total} items</span>
            <div className='flex items-center gap-1 p-1 rounded-lg bg-surface-800 border border-surface-700'>
              <button onClick={() => setViewMode('grid')} className={"p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-polar-500 text-white' : 'text-surface-500 hover:text-white'}"}><Grid className='h-4 w-4' /></button>
              <button onClick={() => setViewMode('large')} className={"p-1.5 rounded-md transition-all ${viewMode === 'large' ? 'bg-polar-500 text-white' : 'text-surface-500 hover:text-white'}"}><ImageIcon className='h-4 w-4' /></button>
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {Array.from({ length: 8 }).map((_, i) => (<div key={i} className='aspect-square rounded-xl bg-surface-900 border border-surface-800 animate-pulse' />))}
          </div>
        ) : items.length === 0 ? (
          <div className='text-center py-20'>
            <Camera className='h-16 w-16 text-surface-700 mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-white mb-2'>No media found</h3>
            <p className='text-surface-400'>Try adjusting your filters</p>
          </div>
        ) : (
          <div className={'grid gap-4 ' + (viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-2')}>
            {items.map((item: any) => {
              const style = CATEGORY_STYLES[item.category || ''] || DEFAULT_STYLE;
              const isPhoto = item.type === 'PHOTO';
              const isVideo = item.type === 'VIDEO';
              const isDoc = item.type === 'DOCUMENT';
              const isInfographic = item.type === 'INFOGRAPIC';
              return (
                <button key={item.id} onClick={() => openLightbox(item)} className={'group card-hover overflow-hidden text-left ' + (viewMode === 'large' ? 'flex flex-row' : '')}>  
                  <div className={'relative overflow-hidden ' + (viewMode === 'large' ? 'w-64 h-48 flex-shrink-0' : 'aspect-square')}>    
                    <div className={'absolute inset-0 bg-gradient-to-br ' + style.gradient + ' flex items-center justify-center'}><span className='text-6xl opacity-40 group-hover:opacity-60 transition-opacity'>{style.emoji}</span></div>
                    {isPhoto && <img src={getPhotoUrl(item.id)} alt={item.title} className='absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500' loading='lazy' onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
                    {isVideo && (<><img src={getVideoThumb(item.id, item.title)} alt={item.title} className='absolute inset-0 w-full h-full object-cover opacity-80' loading='lazy' onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} /><div className='absolute inset-0 flex items-center justify-center'><div className='flex h-16 w-16 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border-2 border-white/30 group-hover:bg-black/70 group-hover:scale-110 transition-all duration-300 shadow-2xl'><Play className='h-7 w-7 text-white ml-1' fill='white' /></div></div><div className='absolute bottom-2 right-2 px-2 py-1 rounded bg-black/60 backdrop-blur-sm text-xs text-white font-medium'>2:34</div></>)}
                    {(isDoc || isInfographic) && <div className='absolute inset-0 flex items-center justify-center'><div className='flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-all duration-300'>{isDoc ? <FileText className='h-7 w-7 text-white' /> : <ImageIcon className='h-7 w-7 text-white' />}</div></div>}
                    <div className='absolute top-2 right-2'><span className='inline-flex items-center gap-1 rounded-lg bg-black/60 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-white shadow-lg'>{isPhoto && <Camera className='h-3 w-3' />}{isVideo && <Film className='h-3 w-3' />}{isDoc && <FileText className='h-3 w-3' />}{isInfographic && <ImageIcon className='h-3 w-3' />}{item.type}</span></div>
                    {item.expedition && <div className='absolute top-2 left-2'><span className='rounded-lg bg-black/60 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-white/90 shadow-lg'>{item.expedition.name?.split(' ').slice(0, 3).join(' ')}</span></div>}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3'><div className='flex items-center gap-2 text-white text-xs'><Maximize2 className='h-3.5 w-3.5' /><span>View full size</span></div></div>
                  </div>
                  <div className={'p-3 bg-surface-900 border-t border-surface-800 ' + (viewMode === 'large' ? 'flex-1 flex flex-col justify-center' : '')}>
                    <h3 className='text-sm font-medium text-white line-clamp-1'>{item.title}</h3>
                    {item.caption && <p className='mt-1 text-xs text-surface-400 line-clamp-2'>{item.caption}</p>}
                    <div className='flex items-center gap-2 mt-2'>
                      {item.category && <span className='px-2 py-0.5 rounded text-xs font-medium' style={{ backgroundColor: style.color + '20', color: style.color }}>{item.category}</span>}
                      {item.year && <span className='text-xs text-surface-500'>{item.year}</span>}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
        {totalPages > 1 && (
          <div className='mt-8 flex items-center justify-center gap-3'>
            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className='btn-ghost disabled:opacity-50 flex items-center gap-1'><ChevronLeft className='h-4 w-4' /> Previous</button>
            <div className='flex items-center gap-1'>
              {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                const p = i + 1;
                return (<button key={p} onClick={() => setPage(p)} className={'w-8 h-8 rounded-lg text-sm font-medium transition-all ' + (p === page ? 'bg-polar-500 text-white' : 'bg-surface-800 text-surface-400 hover:bg-surface-700')}>{p}</button>);
              })}
            </div>
            <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className='btn-ghost disabled:opacity-50 flex items-center gap-1'>Next <ChevronRight className='h-4 w-4' /></button>
          </div>
        )}
      </div>

      {selectedItem && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4' onClick={closeLightbox}>
          <div className='relative max-w-4xl w-full rounded-2xl bg-surface-900 border border-surface-700 overflow-hidden shadow-2xl' onClick={(e) => e.stopPropagation()}>
            <button onClick={closeLightbox} className='absolute right-3 top-3 z-20 rounded-full bg-surface-800/80 backdrop-blur-sm p-2 text-surface-400 hover:text-white transition-colors'><X className='h-5 w-5' /></button>
            <button onClick={(e) => { e.stopPropagation(); navigateItem(-1); }} className='absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-surface-800/80 backdrop-blur-sm p-2 text-surface-400 hover:text-white transition-colors'><ChevronLeft className='h-5 w-5' /></button>
            <button onClick={(e) => { e.stopPropagation(); navigateItem(1); }} className='absolute right-12 top-1/2 -translate-y-1/2 z-20 rounded-full bg-surface-800/80 backdrop-blur-sm p-2 text-surface-400 hover:text-white transition-colors'><ChevronRight className='h-5 w-5' /></button>
            <div className='relative aspect-video bg-gradient-to-br from-surface-800 to-surface-900'>
              {selectedItem.type === 'PHOTO' && <img src={getPhotoUrl(selectedItem.id)} alt={selectedItem.title} className='w-full h-full object-contain' onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
              {selectedItem.type === 'VIDEO' && getYouTubeId(selectedItem.title) ? (
              <iframe
                src={'https://www.youtube.com/embed/' + getYouTubeId(selectedItem.title) + '?rel=0'}
                className='w-full h-full border-0'
                allow='autoplay; encrypted-media; fullscreen'
                allowFullScreen
                title={selectedItem.title}
              />
            ) : selectedItem.type === 'VIDEO' ? (
              <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-surface-900'>
                <div className='text-center'>
                  <div className='flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-polar-500/20 border-2 border-polar-500/50 mb-4'>
                    <Play className='h-10 w-10 text-polar-400 ml-1' fill='currentColor' />
                  </div>
                  <p className='text-surface-400 text-sm'>Video preview</p>
                </div>
              </div>
            ) : null}
              {(selectedItem.type === 'DOCUMENT' || selectedItem.type === 'INFOGRAPIC') && <div className='w-full h-full flex items-center justify-center'><div className='flex flex-col items-center gap-3'><div className='flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 border border-white/10'>{selectedItem.type === 'DOCUMENT' ? <FileText className='h-10 w-10 text-surface-400' /> : <ImageIcon className='h-10 w-10 text-surface-400' />}</div><p className='text-surface-400 text-sm'>{selectedItem.type}</p></div></div>}
            </div>
            <div className='p-5'>
              <div className='flex items-center gap-2 mb-3'>
                <span className='badge bg-polar-500/10 text-polar-400 border border-polar-500/20'>{selectedItem.type}</span>
                {selectedItem.category && <span className='badge bg-surface-700/50 text-surface-300 border border-surface-600'>{selectedItem.category}</span>}
                {selectedItem.year && <span className='badge bg-surface-800 text-surface-400 border border-surface-700'>{selectedItem.year}</span>}
              </div>
              <h2 className='text-xl font-semibold text-white mb-2'>{selectedItem.title}</h2>
              {selectedItem.caption && <p className='text-sm text-surface-400 mb-2'>{selectedItem.caption}</p>}
              {selectedItem.description && <p className='text-sm text-surface-500 mb-3'>{selectedItem.description}</p>}
              {selectedItem.expedition && <p className='text-xs text-surface-500'>Expedition: <span className='text-surface-300'>{selectedItem.expedition.name}</span></p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default GalleryPage;

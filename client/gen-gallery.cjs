const fs = require('fs');
const outPath = 'D:/Bhuwan;-;/client/src/pages/GalleryPage.tsx';

const content = `
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
  Station:    { gradient: 'from-blue-600 via-blue-800 to-slate-900', emoji: '\u{1F3D4}\uFE0F', color: '#3B82F6' },
  Landscape:  { gradient: 'from-cyan-500 via-blue-600 to-indigo-800', emoji: '\u{1F30A}', color: '#06B6D4' },
  Research:   { gradient: 'from-emerald-500 via-teal-600 to-cyan-800', emoji: '\u{1F52C}', color: '#10B981' },
  Expedition: { gradient: 'from-orange-500 via-red-500 to-rose-700', emoji: '\u{1F9ED}', color: '#F97316' },
  Wildlife:   { gradient: 'from-green-400 via-emerald-500 to-teal-700', emoji: '\u{1F427}', color: '#4ADE80' },
  Phenomena:  { gradient: 'from-purple-500 via-violet-600 to-indigo-800', emoji: '\u{1F30C}', color: '#A855F7' },
};
const DEFAULT_STYLE = { gradient: 'from-surface-600 via-surface-700 to-surface-800', emoji: '\u{1F4F7}', color: '#64748B' };

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

function getPhotoUrl(id: string) {
  const hash = id.split('').reduce((a: number, c: string) => a + c.charCodeAt(0), 0);
  return POLAR_PHOTOS[hash % POLAR_PHOTOS.length];
}

function getVideoThumb(id: string) {
  const hash = id.split('').reduce((a: number, c: string) => a + c.charCodeAt(0), 0);
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
    <div className="min-h-screen bg-surface-950">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-polar-900/20 via-surface-950 to-surface-950" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-polar-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-ice-500/5 rounded-full blur-3xl" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-polar-500/10 border border-polar-500/20 mb-6">
              <Camera className="h-4 w-4 text-polar-400" />
              <span className="text-sm text-polar-400">Media Gallery</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Polar <span className="text-gradient">Visual Archive</span>
            </h1>
            <p className="text-lg text-surface-400 mb-8">
              Explore photographs, videos, and visual documentation from India's polar expeditions
            </p>
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search media by title, caption, or expedition..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                className="w-full px-5 py-3.5 rounded-xl bg-surface-900/80 border border-surface-700 text-white placeholder:text-surface-500 focus:outline-none focus:border-polar-500/50 focus:ring-1 focus:ring-polar-500/30"
              />
              <Eye className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-500" />
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 pb-20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 rounded-xl bg-surface-900/50 border border-surface-800">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-1.5">
              {TYPE_OPTIONS.map((opt) => (
                <button key={opt.value} onClick={() => { setTypeFilter(opt.value); setPage(1); }}
                  className={\`px-3 py-1.5 rounded-lg text-sm font-medium transition-all \${
                    typeFilter === opt.value
                      ? 'bg-polar-500 text-white shadow-lg shadow-polar-500/25'
                      : 'bg-surface-800 text-surface-400 hover:bg-surface-700 hover:text-white'
                  }\`}>
                  {opt.label}
                </button>
              ))}
            </div>
            <select value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
              className="px-3 py-1.5 rounded-lg bg-surface-800 text-surface-300 border border-surface-700 text-sm focus:outline-none focus:border-polar-500/50">
              <option value="">All Categories</option>
              {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-surface-500">{total} items</span>
            <div className="flex items-center gap-1 p-1 rounded-lg bg-surface-800 border border-surface-700">
              <button onClick={() => setViewMode('

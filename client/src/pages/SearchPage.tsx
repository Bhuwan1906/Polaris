import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, Filter, Compass, BookOpen, Database, Camera, X } from 'lucide-react';
import { useSearch } from '@/hooks/useApi';
import { truncate } from '@/lib/utils';

const TYPE_OPTIONS = [
  { value: '', label: 'All Types' },
  { value: 'expedition', label: 'Expeditions' },
  { value: 'report', label: 'Reports' },
  { value: 'publication', label: 'Publications' },
  { value: 'dataset', label: 'Datasets' },
  { value: 'media', label: 'Media' },
];

const REGION_OPTIONS = [
  { value: '', label: 'All Regions' },
  { value: 'ARCTIC', label: 'Arctic' },
  { value: 'ANTARCTIC', label: 'Antarctic' },
  { value: 'HIMALAYA', label: 'Himalaya' },
  { value: 'SOUTHERN_OCEAN', label: 'Southern Ocean' },
];

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'alphabetical', label: 'A-Z' },
];

const TYPE_ICONS: Record<string, any> = {
  expedition: Compass,
  report: BookOpen,
  publication: BookOpen,
  dataset: Database,
  media: Camera,
};

const TYPE_COLORS: Record<string, string> = {
  expedition: 'bg-polar-500/10 text-polar-400',
  report: 'bg-amber-500/10 text-amber-400',
  publication: 'bg-aurora-500/10 text-aurora-400',
  dataset: 'bg-ice-500/10 text-ice-400',
  media: 'bg-rose-500/10 text-rose-400',
};

function getResultLink(result: any): string {
  switch (result.type) {
    case 'expedition': return `/expeditions/${result.id}`;
    case 'publication': return `/publications/${result.id}`;
    case 'dataset': return `/datasets/${result.id}`;
    default: return '#';
  }
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [region, setRegion] = useState(searchParams.get('region') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'relevance');
  const [page, setPage] = useState(1);

  const searchQuery = searchParams.get('q') || '';

  const { data, isLoading } = useSearch({
    q: searchQuery,
    type: type || undefined,
    region: region || undefined,
    sort,
    page,
    limit: 20,
  });

  const results = data?.data || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 1;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (type) params.set('type', type);
    if (region) params.set('region', region);
    if (sort !== 'relevance') params.set('sort', sort);
    setSearchParams(params);
    setPage(1);
  };

  const clearFilters = () => {
    setQuery('');
    setType('');
    setRegion('');
    setSort('relevance');
    setSearchParams({});
    setPage(1);
  };

  const hasFilters = type || region || sort !== 'relevance';

  return (
    <div className="py-12">
      <div className="container-wide">
        {/* Search Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Search POLARIS</h1>
          <p className="mt-2 text-surface-400">Find expeditions, publications, datasets, and media</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mx-auto mt-8 max-w-2xl">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search polar research..."
              className="w-full rounded-2xl border border-surface-700 bg-surface-800/80 py-4 pl-12 pr-32 text-base text-white placeholder-surface-400 outline-none transition-all focus:border-polar-500 focus:ring-2 focus:ring-polar-500/30"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-aurora-gradient px-6 py-2.5 text-sm font-bold text-polar-900">
              Search
            </button>
          </div>
        </form>

        {/* Filters */}
        <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center gap-3">
          <Filter className="h-4 w-4 text-surface-400" />
          <select value={type} onChange={(e) => { setType(e.target.value); setPage(1); }} className="input w-auto text-sm">
            {TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select value={region} onChange={(e) => { setRegion(e.target.value); setPage(1); }} className="input w-auto text-sm">
            {REGION_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }} className="input w-auto text-sm">
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {hasFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-surface-400 hover:text-white">
              <X className="h-3 w-3" /> Clear
            </button>
          )}
        </div>

        {/* Results */}
        <div className="mx-auto mt-8 max-w-4xl">
          {searchQuery && (
            <p className="mb-4 text-sm text-surface-400">
              {total} result{total !== 1 ? 's' : ''} for "<span className="text-white">{searchQuery}</span>"
            </p>
          )}

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-polar-500 border-t-transparent" />
            </div>
          ) : results.length === 0 ? (
            <div className="py-16 text-center">
              <SearchIcon className="mx-auto h-12 w-12 text-surface-600" />
              <p className="mt-4 text-surface-400">
                {searchQuery ? 'No results found. Try different keywords.' : 'Enter a search query to begin.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((result: any) => {
                const Icon = TYPE_ICONS[result.type] || SearchIcon;
                return (
                  <Link
                    key={`${result.type}-${result.id}`}
                    to={getResultLink(result)}
                    className="group flex gap-4 rounded-xl border border-surface-800 bg-surface-900/50 p-4 transition-all hover:border-surface-700 hover:bg-surface-800/50"
                  >
                    <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${TYPE_COLORS[result.type] || 'bg-surface-800 text-surface-400'}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`badge text-xs ${TYPE_COLORS[result.type]}`}>{result.type}</span>
                        {result.year && <span className="text-xs text-surface-500">{result.year}</span>}
                      </div>
                      <h3 className="mt-1 font-medium text-white group-hover:text-polar-300 transition-colors truncate">
                        {result.title}
                      </h3>
                      {result.description && (
                        <p className="mt-1 text-sm text-surface-400 line-clamp-2">
                          {truncate(result.description, 200)}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="btn-ghost disabled:opacity-50">
                Previous
              </button>
              <span className="text-sm text-surface-400">Page {page} of {totalPages}</span>
              <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="btn-ghost disabled:opacity-50">
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

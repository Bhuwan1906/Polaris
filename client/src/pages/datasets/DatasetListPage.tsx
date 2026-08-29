import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Database, Filter } from 'lucide-react';
import { useDatasets } from '@/hooks/useApi';
import { getRegionBadgeClass, REGION_LABELS } from '@/lib/utils';

export default function DatasetListPage() {
  const [page, setPage] = useState(1);
  const [region, setRegion] = useState('');
  const { data, isLoading } = useDatasets({ page, limit: 15, region: region || undefined });
  const datasets = data?.data || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="py-12">
      <div className="container-wide">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ice-500/10">
            <Database className="h-6 w-6 text-ice-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Datasets</h1>
            <p className="text-surface-400">Scientific datasets from polar research expeditions</p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Filter className="h-4 w-4 text-surface-400" />
          <select value={region} onChange={(e) => { setRegion(e.target.value); setPage(1); }} className="input w-auto text-sm">
            <option value="">All Regions</option>
            <option value="ARCTIC">Arctic</option>
            <option value="ANTARCTIC">Antarctic</option>
          </select>
        </div>

        {isLoading ? (
          <div className="mt-12 flex justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-polar-500 border-t-transparent" />
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {datasets.map((ds: any) => (
              <Link key={ds.id} to={`/datasets/${ds.id}`} className="group card-hover p-5">
                <div className="flex items-center gap-2">
                  <span className="badge bg-ice-500/10 text-ice-400">{ds.format}</span>
                  <span className="text-xs text-surface-500">{ds.year}</span>
                </div>
                <h3 className="mt-3 font-semibold text-white group-hover:text-polar-300 transition-colors line-clamp-2">{ds.title}</h3>
                {ds.description && <p className="mt-2 text-sm text-surface-400 line-clamp-2">{ds.description}</p>}
                <div className="mt-3 flex items-center gap-2">
                  <span className={getRegionBadgeClass(ds.region)}>{REGION_LABELS[ds.region] || ds.region}</span>
                  {ds.source && <span className="text-xs text-surface-500">{ds.source}</span>}
                </div>
              </Link>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="btn-ghost disabled:opacity-50">Previous</button>
            <span className="text-sm text-surface-400">Page {page} of {totalPages}</span>
            <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="btn-ghost disabled:opacity-50">Next</button>
          </div>
        )}
      </div>
    </div>
  );
}

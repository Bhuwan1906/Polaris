import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Calendar, FileText, Camera, ChevronRight, Filter } from 'lucide-react';
import { useExpeditions } from '@/hooks/useApi';
import { formatDate, getRegionBadgeClass, truncate, REGION_LABELS, STATUS_LABELS } from '@/lib/utils';

export default function ExpeditionListPage() {
  const [region, setRegion] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useExpeditions({ region: region || undefined, status: status || undefined, page, limit: 12 });
  const expeditions = data?.data || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="py-12">
      <div className="container-wide">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-polar-500/10">
            <Compass className="h-6 w-6 text-polar-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Expedition Explorer</h1>
            <p className="text-surface-400">Browse India's polar expeditions since 1981</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Filter className="h-4 w-4 text-surface-400" />
          <select
            value={region}
            onChange={(e) => { setRegion(e.target.value); setPage(1); }}
            className="input w-auto"
          >
            <option value="">All Regions</option>
            <option value="ARCTIC">Arctic</option>
            <option value="ANTARCTIC">Antarctic</option>
            <option value="HIMALAYA">Himalaya</option>
            <option value="SOUTHERN_OCEAN">Southern Ocean</option>
          </select>
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="input w-auto"
          >
            <option value="">All Status</option>
            <option value="COMPLETED">Completed</option>
            <option value="ONGOING">Ongoing</option>
            <option value="PLANNED">Planned</option>
          </select>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="mt-12 flex justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-polar-500 border-t-transparent" />
          </div>
        ) : expeditions.length === 0 ? (
          <div className="mt-12 text-center">
            <Compass className="mx-auto h-12 w-12 text-surface-600" />
            <p className="mt-4 text-surface-400">No expeditions found</p>
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {expeditions.map((exp: any) => (
                <Link
                  key={exp.id}
                  to={`/expeditions/${exp.id}`}
                  className="group card-hover p-6"
                >
                  <div className="flex items-start justify-between">
                    <span className={getRegionBadgeClass(exp.region)}>
                      {REGION_LABELS[exp.region]}
                    </span>
                    <span className={`badge ${exp.status === 'COMPLETED' ? 'badge-completed' : exp.status === 'ONGOING' ? 'badge-ongoing' : 'badge-planned'}`}>
                      {STATUS_LABELS[exp.status] || exp.status}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-white group-hover:text-polar-300 transition-colors">
                    {exp.name}
                  </h3>

                  <p className="mt-2 text-sm text-surface-400 line-clamp-3">
                    {truncate(exp.description, 180)}
                  </p>

                  <div className="mt-4 flex items-center gap-4 text-xs text-surface-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(exp.startDate).getFullYear()}
                      {exp.endDate && ` – ${new Date(exp.endDate).getFullYear()}`}
                    </span>
                  </div>

                  <div className="mt-3 flex gap-3 text-xs text-surface-500">
                    <span>{exp._count?.reports || 0} reports</span>
                    <span>•</span>
                    <span>{exp._count?.publications || 0} publications</span>
                    <span>•</span>
                    <span>{exp._count?.media || 0} media</span>
                  </div>

                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-polar-400 opacity-0 transition-opacity group-hover:opacity-100">
                    View Details <ChevronRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="btn-ghost disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-sm text-surface-400">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="btn-ghost disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

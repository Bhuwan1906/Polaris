import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight, Filter } from 'lucide-react';
import { usePublications } from '@/hooks/useApi';
import { getRegionBadgeClass, REGION_LABELS } from '@/lib/utils';

export default function PublicationListPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = usePublications({ page, limit: 15 });
  const publications = data?.data || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="py-12">
      <div className="container-wide">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-aurora-500/10">
            <BookOpen className="h-6 w-6 text-aurora-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Publications</h1>
            <p className="text-surface-400">Research publications from India's polar expeditions</p>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-12 flex justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-polar-500 border-t-transparent" />
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {publications.map((pub: any) => (
              <Link key={pub.id} to={`/publications/${pub.id}`} className="group card-hover block p-5">
                <h3 className="font-semibold text-white group-hover:text-polar-300 transition-colors">{pub.title}</h3>
                <p className="mt-1 text-sm text-surface-400">{pub.authors}</p>
                {pub.abstract && <p className="mt-2 text-sm text-surface-400 line-clamp-2">{pub.abstract}</p>}
                <div className="mt-3 flex items-center gap-3 text-xs text-surface-500">
                  {pub.journal && <span className="italic">{pub.journal}</span>}
                  <span>{pub.year}</span>
                  {pub.expedition && (
                    <span className={getRegionBadgeClass(pub.expedition.region)}>
                      {REGION_LABELS[pub.expedition.region]}
                    </span>
                  )}
                  {pub.doi && (
                    <span className="text-polar-400">DOI: {pub.doi}</span>
                  )}
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

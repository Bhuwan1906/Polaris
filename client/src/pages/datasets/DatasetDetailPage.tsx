import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Database, ExternalLink } from 'lucide-react';
import { useDataset } from '@/hooks/useApi';
import { getRegionBadgeClass, REGION_LABELS } from '@/lib/utils';

export default function DatasetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: ds, isLoading } = useDataset(id!);

  if (isLoading) return <div className="flex min-h-[60vh] items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-polar-500 border-t-transparent" /></div>;
  if (!ds) return <div className="container-wide py-20 text-center"><h1 className="text-2xl font-bold text-white">Not found</h1></div>;

  return (
    <div className="py-12">
      <div className="container-wide max-w-4xl">
        <Link to="/datasets" className="inline-flex items-center gap-2 text-sm text-surface-400 hover:text-white mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Datasets
        </Link>

        <div className="card p-8">
          <div className="flex items-center gap-3">
            <Database className="h-5 w-5 text-ice-400" />
            <span className="badge bg-ice-500/10 text-ice-400">{ds.format}</span>
            <span className={getRegionBadgeClass(ds.region)}>{REGION_LABELS[ds.region]}</span>
            <span className="text-sm text-surface-500">{ds.year}</span>
          </div>

          <h1 className="mt-4 text-2xl font-bold text-white">{ds.title}</h1>

          {ds.description && (
            <p className="mt-4 leading-relaxed text-surface-300">{ds.description}</p>
          )}

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-lg border border-surface-700 bg-surface-800/50 p-4 text-sm">
            <div>
              <dt className="text-surface-400">Format</dt>
              <dd className="mt-1 font-medium text-white">{ds.format}</dd>
            </div>
            <div>
              <dt className="text-surface-400">Year</dt>
              <dd className="mt-1 font-medium text-white">{ds.year}</dd>
            </div>
            <div>
              <dt className="text-surface-400">Region</dt>
              <dd className="mt-1 font-medium text-white">{ds.region}</dd>
            </div>
            {ds.source && (
              <div>
                <dt className="text-surface-400">Source</dt>
                <dd className="mt-1 font-medium text-white">{ds.source}</dd>
              </div>
            )}
          </dl>

          {ds.expedition && (
            <div className="mt-6 rounded-lg border border-surface-700 bg-surface-800/50 p-4">
              <p className="text-sm text-surface-400">Related Expedition</p>
              <Link to={`/expeditions/${ds.expedition.id}`} className="mt-1 font-medium text-polar-400 hover:text-polar-300">
                {ds.expedition.name}
              </Link>
            </div>
          )}

          {ds.tags?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {ds.tags.map((tag: any) => (
                <span key={tag.id} className="rounded-full bg-surface-800 px-3 py-1 text-xs text-surface-400">{tag.name}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

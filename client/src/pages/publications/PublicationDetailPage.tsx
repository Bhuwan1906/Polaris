import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, ExternalLink } from 'lucide-react';
import { usePublication } from '@/hooks/useApi';
import { formatDate, getRegionBadgeClass, REGION_LABELS } from '@/lib/utils';

export default function PublicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: pub, isLoading } = usePublication(id!);

  if (isLoading) return <div className="flex min-h-[60vh] items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-polar-500 border-t-transparent" /></div>;
  if (!pub) return <div className="container-wide py-20 text-center"><h1 className="text-2xl font-bold text-white">Not found</h1></div>;

  return (
    <div className="py-12">
      <div className="container-wide max-w-4xl">
        <Link to="/publications" className="inline-flex items-center gap-2 text-sm text-surface-400 hover:text-white mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Publications
        </Link>

        <div className="card p-8">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-aurora-400" />
            <span className="badge bg-aurora-500/10 text-aurora-400">Publication</span>
            <span className="text-sm text-surface-500">{pub.year}</span>
            {pub.expedition && (
              <span className={getRegionBadgeClass(pub.expedition.region)}>
                {REGION_LABELS[pub.expedition.region]}
              </span>
            )}
          </div>

          <h1 className="mt-4 text-2xl font-bold text-white">{pub.title}</h1>
          <p className="mt-2 text-surface-300">{pub.authors}</p>

          {pub.journal && (
            <p className="mt-2 italic text-surface-400">Published in: {pub.journal}</p>
          )}

          {pub.doi && (
            <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-sm text-polar-400 hover:underline">
              <ExternalLink className="h-3.5 w-3.5" /> {pub.doi}
            </a>
          )}

          {pub.abstract && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-white">Abstract</h2>
              <p className="mt-2 leading-relaxed text-surface-300">{pub.abstract}</p>
            </div>
          )}

          {pub.expedition && (
            <div className="mt-6 rounded-lg border border-surface-700 bg-surface-800/50 p-4">
              <p className="text-sm text-surface-400">Related Expedition</p>
              <Link to={`/expeditions/${pub.expedition.id}`} className="mt-1 font-medium text-polar-400 hover:text-polar-300">
                {pub.expedition.name}
              </Link>
            </div>
          )}

          {pub.tags?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {pub.tags.map((tag: any) => (
                <span key={tag.id} className="rounded-full bg-surface-800 px-3 py-1 text-xs text-surface-400">{tag.name}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

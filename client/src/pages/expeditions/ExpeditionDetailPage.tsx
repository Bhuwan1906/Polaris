import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Calendar, MapPin, FileText, BookOpen, Database, Camera, Film,
  Clock, ChevronRight
} from 'lucide-react';
import { useExpedition } from '@/hooks/useApi';
import { formatDate, getRegionBadgeClass, truncate, REGION_LABELS, STATUS_LABELS } from '@/lib/utils';

const tabs = [
  { id: 'overview', label: 'Overview', icon: FileText },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'publications', label: 'Publications', icon: BookOpen },
  { id: 'datasets', label: 'Datasets', icon: Database },
  { id: 'photos', label: 'Photos', icon: Camera },
  { id: 'videos', label: 'Videos', icon: Film },
];

export default function ExpeditionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: expedition, isLoading } = useExpedition(id!);
  const [activeTab, setActiveTab] = useState('overview');

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-polar-500 border-t-transparent" />
      </div>
    );
  }

  if (!expedition) {
    return (
      <div className="container-wide py-20 text-center">
        <h1 className="text-2xl font-bold text-white">Expedition not found</h1>
        <Link to="/expeditions" className="btn-primary mt-4">Back to Expeditions</Link>
      </div>
    );
  }

  const photos = expedition.media?.filter((m: any) => m.type === 'PHOTO') || [];
  const videos = expedition.media?.filter((m: any) => m.type === 'VIDEO') || [];

  return (
    <div>
      {/* Hero */}
      <div className="relative bg-polar-gradient py-16">
        <div className="container-wide">
          <Link to="/expeditions" className="inline-flex items-center gap-2 text-sm text-surface-400 hover:text-white mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Expeditions
          </Link>

          <div className="flex flex-wrap items-start gap-3">
            <span className={getRegionBadgeClass(expedition.region)}>
              {REGION_LABELS[expedition.region]}
            </span>
            <span className={`badge ${expedition.status === 'COMPLETED' ? 'badge-completed' : expedition.status === 'ONGOING' ? 'badge-ongoing' : 'badge-planned'}`}>
              {STATUS_LABELS[expedition.status]}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            {expedition.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-surface-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(expedition.startDate)}
              {expedition.endDate && ` — ${formatDate(expedition.endDate)}`}
            </span>
            {expedition.locations?.length > 0 && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {expedition.locations.map((l: any) => l.name).join(', ')}
              </span>
            )}
          </div>

          {/* Resource counts */}
          <div className="mt-6 flex flex-wrap gap-4">
            {[
              { label: 'Reports', count: expedition.reports?.length || 0, icon: FileText },
              { label: 'Publications', count: expedition.publications?.length || 0, icon: BookOpen },
              { label: 'Datasets', count: expedition.datasets?.length || 0, icon: Database },
              { label: 'Media', count: expedition.media?.length || 0, icon: Camera },
            ].map((r) => (
              <div key={r.label} className="flex items-center gap-2 rounded-lg border border-surface-700 bg-surface-800/50 px-3 py-2 text-sm">
                <r.icon className="h-4 w-4 text-surface-400" />
                <span className="text-white font-medium">{r.count}</span>
                <span className="text-surface-400">{r.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-surface-800 bg-surface-900/30">
        <div className="container-wide">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-polar-500 text-polar-400'
                    : 'border-transparent text-surface-400 hover:text-white'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container-wide py-8">
        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white">About This Expedition</h2>
                <p className="mt-3 leading-relaxed text-surface-300 whitespace-pre-line">
                  {expedition.description}
                </p>
              </div>

              {expedition.highlights && (
                <div>
                  <h2 className="text-xl font-semibold text-white">Key Highlights</h2>
                  <p className="mt-3 leading-relaxed text-surface-300 whitespace-pre-line">
                    {expedition.highlights}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="card p-5">
                <h3 className="font-semibold text-white">Expedition Details</h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-surface-400">Number</dt>
                    <dd className="font-medium text-white">#{expedition.expeditionNumber}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-surface-400">Region</dt>
                    <dd className="text-white">{REGION_LABELS[expedition.region]}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-surface-400">Status</dt>
                    <dd className="text-white">{STATUS_LABELS[expedition.status]}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-surface-400">Start Date</dt>
                    <dd className="text-white">{formatDate(expedition.startDate)}</dd>
                  </div>
                  {expedition.endDate && (
                    <div className="flex justify-between">
                      <dt className="text-surface-400">End Date</dt>
                      <dd className="text-white">{formatDate(expedition.endDate)}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {expedition.locations?.length > 0 && (
                <div className="card p-5">
                  <h3 className="font-semibold text-white">Locations</h3>
                  <div className="mt-3 space-y-2">
                    {expedition.locations.map((loc: any) => (
                      <div key={loc.id} className="flex items-center gap-2 text-sm">
                        <MapPin className="h-3.5 w-3.5 text-polar-400" />
                        <span className="text-surface-300">{loc.name}</span>
                        <span className="text-xs text-surface-500">({loc.type})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reports */}
        {activeTab === 'reports' && (
          <div className="space-y-4">
            {expedition.reports?.length === 0 ? (
              <EmptyState icon={FileText} message="No reports yet" />
            ) : (
              expedition.reports?.map((report: any) => (
                <div key={report.id} className="card p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="badge bg-amber-500/10 text-amber-400">{report.type}</span>
                      <h3 className="mt-2 font-semibold text-white">{report.title}</h3>
                      {report.content && (
                        <p className="mt-2 text-sm text-surface-400 line-clamp-3">{report.content}</p>
                      )}
                      <div className="mt-2 flex items-center gap-3 text-xs text-surface-500">
                        <span>{report.year}</span>
                        <span>•</span>
                        <span className={report.status === 'PUBLISHED' ? 'badge-completed' : 'badge bg-surface-500/10 text-surface-400'}>
                          {report.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  {report.tags?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {report.tags.map((tag: any) => (
                        <span key={tag.id} className="rounded-full bg-surface-800 px-2 py-0.5 text-xs text-surface-400">
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Publications */}
        {activeTab === 'publications' && (
          <div className="space-y-4">
            {expedition.publications?.length === 0 ? (
              <EmptyState icon={BookOpen} message="No publications yet" />
            ) : (
              expedition.publications?.map((pub: any) => (
                <div key={pub.id} className="card p-5">
                  <h3 className="font-semibold text-white">{pub.title}</h3>
                  <p className="mt-1 text-sm text-surface-400">{pub.authors}</p>
                  {pub.abstract && (
                    <p className="mt-2 text-sm text-surface-400 line-clamp-3">{pub.abstract}</p>
                  )}
                  <div className="mt-2 flex items-center gap-3 text-xs text-surface-500">
                    {pub.journal && <span className="italic">{pub.journal}</span>}
                    <span>{pub.year}</span>
                    {pub.doi && (
                      <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="text-polar-400 hover:underline">
                        DOI
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Datasets */}
        {activeTab === 'datasets' && (
          <div className="space-y-4">
            {expedition.datasets?.length === 0 ? (
              <EmptyState icon={Database} message="No datasets yet" />
            ) : (
              expedition.datasets?.map((ds: any) => (
                <div key={ds.id} className="card p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="badge bg-ice-500/10 text-ice-400">{ds.format}</span>
                      <h3 className="mt-2 font-semibold text-white">{ds.title}</h3>
                      {ds.description && (
                        <p className="mt-2 text-sm text-surface-400">{ds.description}</p>
                      )}
                      <div className="mt-2 flex items-center gap-3 text-xs text-surface-500">
                        <span>{ds.year}</span>
                        <span>•</span>
                        <span>{ds.region}</span>
                        {ds.source && (
                          <>
                            <span>•</span>
                            <span>{ds.source}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Photos */}
        {activeTab === 'photos' && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photos.length === 0 ? (
              <EmptyState icon={Camera} message="No photos yet" />
            ) : (
              photos.map((media: any) => (
                <div key={media.id} className="group card-hover overflow-hidden">
                  <div className="aspect-[4/3] bg-surface-800 flex items-center justify-center">
                    <Camera className="h-12 w-12 text-surface-600" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-white">{media.title}</h3>
                    {media.caption && (
                      <p className="mt-1 text-xs text-surface-400 line-clamp-2">{media.caption}</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Videos */}
        {activeTab === 'videos' && (
          <div className="grid gap-4 sm:grid-cols-2">
            {videos.length === 0 ? (
              <EmptyState icon={Film} message="No videos yet" />
            ) : (
              videos.map((media: any) => (
                <div key={media.id} className="card-hover overflow-hidden">
                  <div className="aspect-video bg-surface-800 flex items-center justify-center">
                    <Film className="h-12 w-12 text-surface-600" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-white">{media.title}</h3>
                    {media.caption && (
                      <p className="mt-1 text-sm text-surface-400 line-clamp-2">{media.caption}</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon, message }: { icon: any; message: string }) {
  return (
    <div className="py-12 text-center">
      <Icon className="mx-auto h-10 w-10 text-surface-600" />
      <p className="mt-3 text-surface-400">{message}</p>
    </div>
  );
}

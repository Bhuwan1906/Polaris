import { useState } from 'react';
import { FileText, BookOpen, Database } from 'lucide-react';
import { useReports, usePublications, useDatasets } from '@/hooks/useApi';

export default function AdminResourcesPage() {
  const [tab, setTab] = useState('reports');
  const { data: reportsData, isLoading: reportsLoading } = useReports({ page: 1 });
  const { data: pubsData, isLoading: pubsLoading } = usePublications({ page: 1 });
  const { data: dsData, isLoading: dsLoading } = useDatasets({ page: 1 });

  const isLoading = tab === 'reports' ? reportsLoading : tab === 'publications' ? pubsLoading : dsLoading;

  return (
    <div className="py-12">
      <div className="container-wide">
        <h1 className="text-2xl font-bold text-white">Manage Resources</h1>
        <p className="text-sm text-surface-400">Reports, publications, and datasets</p>

        <div className="mt-6 flex gap-2">
          {[
            { id: 'reports', label: 'Reports', icon: FileText, count: reportsData?.total || 0 },
            { id: 'publications', label: 'Publications', icon: BookOpen, count: pubsData?.total || 0 },
            { id: 'datasets', label: 'Datasets', icon: Database, count: dsData?.total || 0 },
          ].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.id ? 'bg-polar-500 text-white' : 'border border-surface-700 text-surface-400 hover:text-white'
              }`}>
              <t.icon className="h-4 w-4" /> {t.label} ({t.count})
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="mt-12 flex justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-polar-500 border-t-transparent" />
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {tab === 'reports' && reportsData?.data?.map((r: any) => (
              <div key={r.id} className="card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="badge bg-amber-500/10 text-amber-400 text-xs">{r.type}</span>
                    <h3 className="mt-1 font-medium text-white">{r.title}</h3>
                    <p className="text-xs text-surface-500">{r.year} • {r.expedition?.name}</p>
                  </div>
                  <span className={`badge text-xs ${r.status === 'PUBLISHED' ? 'badge-completed' : 'badge bg-surface-500/10 text-surface-400'}`}>
                    {r.status}
                  </span>
                </div>
              </div>
            ))}
            {tab === 'publications' && pubsData?.data?.map((p: any) => (
              <div key={p.id} className="card p-4">
                <h3 className="font-medium text-white">{p.title}</h3>
                <p className="text-xs text-surface-400">{p.authors} • {p.year}</p>
              </div>
            ))}
            {tab === 'datasets' && dsData?.data?.map((d: any) => (
              <div key={d.id} className="card p-4">
                <div className="flex items-center gap-2">
                  <span className="badge bg-ice-500/10 text-ice-400 text-xs">{d.format}</span>
                  <h3 className="font-medium text-white">{d.title}</h3>
                </div>
                <p className="text-xs text-surface-500">{d.year} • {d.region}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

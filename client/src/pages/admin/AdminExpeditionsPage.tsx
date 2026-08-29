import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { useExpeditions } from '@/hooks/useApi';
import { toast } from 'sonner';
import api from '@/lib/api';
import { REGION_LABELS, STATUS_LABELS } from '@/lib/utils';

export default function AdminExpeditionsPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useExpeditions({ page, limit: 20 });
  const expeditions = data?.data || [];

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/expeditions/${id}`);
      toast.success('Expedition deleted');
      refetch();
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="py-12">
      <div className="container-wide">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Manage Expeditions</h1>
            <p className="text-sm text-surface-400">{data?.total || 0} total expeditions</p>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-12 flex justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-polar-500 border-t-transparent" />
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-800 text-left text-surface-400">
                  <th className="pb-3 pr-4 font-medium">Name</th>
                  <th className="pb-3 pr-4 font-medium">Region</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                  <th className="pb-3 pr-4 font-medium">Year</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-800">
                {expeditions.map((exp: any) => (
                  <tr key={exp.id} className="hover:bg-surface-800/30">
                    <td className="py-3 pr-4">
                      <Link to={`/expeditions/${exp.id}`} className="font-medium text-white hover:text-polar-300">
                        {exp.name}
                      </Link>
                    </td>
                    <td className="py-3 pr-4 text-surface-400">{REGION_LABELS[exp.region]}</td>
                    <td className="py-3 pr-4">
                      <span className={`badge ${exp.status === 'COMPLETED' ? 'badge-completed' : exp.status === 'ONGOING' ? 'badge-ongoing' : 'badge-planned'}`}>
                        {STATUS_LABELS[exp.status]}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-surface-400">{new Date(exp.startDate).getFullYear()}</td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/expeditions/${exp.id}`} className="rounded p-1 text-surface-400 hover:text-white">
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                        <button onClick={() => handleDelete(exp.id, exp.name)} className="rounded p-1 text-surface-400 hover:text-red-400">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

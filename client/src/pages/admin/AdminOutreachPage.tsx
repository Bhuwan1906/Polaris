import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { BookOpen, Plus, ExternalLink } from 'lucide-react';
import api from '@/lib/api';
import { STATUS_LABELS } from '@/lib/utils';

export default function AdminOutreachPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['adminOutreach'],
    queryFn: async () => {
      const { data } = await api.get('/outreach');
      return data;
    },
  });

  const items = data?.data || [];

  return (
    <div className="py-12">
      <div className="container-wide">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Outreach Content</h1>
            <p className="text-sm text-surface-400">{data?.total || 0} content items</p>
          </div>
          <Link to="/outreach" className="btn-primary text-sm">
            <Plus className="h-4 w-4" /> Create New
          </Link>
        </div>

        {isLoading ? (
          <div className="mt-12 flex justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-polar-500 border-t-transparent" />
          </div>
        ) : items.length === 0 ? (
          <div className="mt-16 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-surface-600" />
            <p className="mt-4 text-surface-400">No outreach content yet</p>
            <Link to="/outreach" className="btn-primary mt-4">Create Your First Content</Link>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {items.map((item: any) => (
              <div key={item.id} className="card p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="badge bg-green-500/10 text-green-400 text-xs">{item.type.replace('_', ' ')}</span>
                      <span className={`badge text-xs ${
                        item.status === 'DRAFT' ? 'bg-surface-500/10 text-surface-400' :
                        item.status === 'REVIEW' ? 'bg-amber-500/10 text-amber-400' :
                        item.status === 'APPROVED' ? 'bg-green-500/10 text-green-400' :
                        'bg-polar-500/10 text-polar-400'
                      }`}>
                        {STATUS_LABELS[item.status]}
                      </span>
                    </div>
                    <h3 className="mt-2 font-medium text-white">{item.title}</h3>
                    <p className="mt-1 text-xs text-surface-500">
                      Created by {item.creator?.name} • {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

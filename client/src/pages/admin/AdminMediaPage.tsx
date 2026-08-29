import { useState } from 'react';
import { Camera, Trash2 } from 'lucide-react';
import { useMedia } from '@/hooks/useApi';
import api from '@/lib/api';
import { toast } from 'sonner';

export default function AdminMediaPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useMedia({ page, limit: 24 });
  const media = data?.data || [];

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this media item?')) return;
    try {
      await api.delete(`/media/${id}`);
      toast.success('Media deleted');
      refetch();
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="py-12">
      <div className="container-wide">
        <h1 className="text-2xl font-bold text-white">Manage Media</h1>
        <p className="text-sm text-surface-400">{data?.total || 0} media items</p>

        {isLoading ? (
          <div className="mt-12 flex justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-polar-500 border-t-transparent" />
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {media.map((item: any) => (
              <div key={item.id} className="card overflow-hidden">
                <div className="aspect-square bg-surface-800 flex items-center justify-center">
                  <Camera className="h-10 w-10 text-surface-600" />
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="badge bg-surface-800 text-xs text-surface-400">{item.type}</span>
                    <button onClick={() => handleDelete(item.id)} className="text-surface-500 hover:text-red-400">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <h3 className="mt-1 text-sm font-medium text-white line-clamp-2">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

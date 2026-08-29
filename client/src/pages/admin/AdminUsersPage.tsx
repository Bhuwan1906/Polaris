import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Users, Shield } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'sonner';

export default function AdminUsersPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: async () => {
      const { data } = await api.get('/users');
      return data;
    },
  });

  const roleMutation = useMutation({
    mutationFn: async ({ id, role }: { id: string; role: string }) => {
      await api.put(`/users/${id}/role`, { role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      toast.success('Role updated');
    },
  });

  const users = data?.data || [];

  return (
    <div className="py-12">
      <div className="container-wide">
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6 text-teal-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Manage Users</h1>
            <p className="text-sm text-surface-400">{data?.total || 0} registered users</p>
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
                  <th className="pb-3 pr-4 font-medium">Email</th>
                  <th className="pb-3 pr-4 font-medium">Role</th>
                  <th className="pb-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-800">
                {users.map((user: any) => (
                  <tr key={user.id} className="hover:bg-surface-800/30">
                    <td className="py-3 pr-4 font-medium text-white">{user.name}</td>
                    <td className="py-3 pr-4 text-surface-400">{user.email}</td>
                    <td className="py-3 pr-4">
                      <select
                        value={user.role}
                        onChange={(e) => roleMutation.mutate({ id: user.id, role: e.target.value })}
                        className="input w-auto !py-1 text-xs"
                      >
                        <option value="PUBLIC">PUBLIC</option>
                        <option value="RESEARCHER">RESEARCHER</option>
                        <option value="EDUCATOR">EDUCATOR</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    </td>
                    <td className="py-3 text-surface-400">
                      {new Date(user.createdAt).toLocaleDateString()}
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

import { Link } from 'react-router-dom';
import {
  Compass, BookOpen, Database, Camera, Users, FileText, ArrowRight,
  BarChart3, Settings, Shield
} from 'lucide-react';
import { useStats } from '@/hooks/useApi';

export default function AdminDashboardPage() {
  const { data: stats } = useStats();

  const statCards = [
    { label: 'Expeditions', value: stats?.expeditions || 0, icon: Compass, color: 'text-polar-400', bg: 'bg-polar-500/10', href: '/admin/expeditions' },
    { label: 'Publications', value: stats?.publications || 0, icon: BookOpen, color: 'text-aurora-400', bg: 'bg-aurora-500/10', href: '/admin/resources' },
    { label: 'Datasets', value: stats?.datasets || 0, icon: Database, color: 'text-ice-400', bg: 'bg-ice-500/10', href: '/admin/resources' },
    { label: 'Reports', value: stats?.reports || 0, icon: FileText, color: 'text-amber-400', bg: 'bg-amber-500/10', href: '/admin/resources' },
    { label: 'Media', value: stats?.media || 0, icon: Camera, color: 'text-rose-400', bg: 'bg-rose-500/10', href: '/admin/media' },
    { label: 'Users', value: stats?.users || 0, icon: Users, color: 'text-teal-400', bg: 'bg-teal-500/10', href: '/admin/users' },
  ];

  const quickActions = [
    { label: 'Manage Expeditions', icon: Compass, href: '/admin/expeditions', color: 'from-polar-500 to-polar-600' },
    { label: 'Manage Resources', icon: FileText, href: '/admin/resources', color: 'from-aurora-500 to-aurora-600' },
    { label: 'Manage Media', icon: Camera, href: '/admin/media', color: 'from-rose-500 to-rose-600' },
    { label: 'Manage Users', icon: Users, href: '/admin/users', color: 'from-teal-500 to-teal-600' },
    { label: 'Outreach Studio', icon: BookOpen, href: '/outreach', color: 'from-green-500 to-green-600' },
    { label: 'Outreach Content', icon: FileText, href: '/admin/outreach', color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div className="py-12">
      <div className="container-wide">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-polar-500/10">
            <Shield className="h-6 w-6 text-polar-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-surface-400">Manage content, users, and platform settings</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {statCards.map((stat) => (
            <Link key={stat.label} to={stat.href} className="card-hover p-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div className="mt-3 text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-surface-400">{stat.label}</div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                to={action.href}
                className="group card-hover flex items-center gap-4 p-5"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${action.color} text-white`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="font-medium text-white group-hover:text-polar-300 transition-colors">{action.label}</span>
                <ArrowRight className="ml-auto h-4 w-4 text-surface-500 group-hover:text-polar-400" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

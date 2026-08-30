import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, Compass, BookOpen, Database, Camera, MapPin,
  ArrowRight, ChevronRight, Globe, Snowflake, Calendar,
  Users, Award, FileText
} from 'lucide-react';
import { useStats, useFeaturedExpeditions, useLatestPublications } from '@/hooks/useApi';
import { formatDate, getRegionBadgeClass, truncate } from '@/lib/utils';
import { REGION_LABELS } from '@/lib/utils';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { data: stats } = useStats();
  const { data: expeditions } = useFeaturedExpeditions();
  const { data: publications } = useLatestPublications();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[90vh] overflow-hidden">
        {/* Background gradient & pattern */}
        <div className="absolute inset-0 bg-polar-gradient" />
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(79,195,247,0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Decorative aurora glow */}
        <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-polar-500/10 blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-aurora-500/10 blur-3xl" />

        <div className="container-wide relative flex min-h-[90vh] items-center">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-polar-500/20 bg-polar-500/10 px-4 py-2 text-sm text-polar-300">
              <Snowflake className="h-4 w-4" />
              Smart India Hackathon 2026 • PS ID: SIH26063
            </div>

            {/* Title */}
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-white">India's Polar</span>
              <br />
              <span className="text-gradient">Knowledge Gateway</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-surface-300 sm:text-xl">
              Discover, explore and understand India's polar research through
              expeditions, publications, datasets, and media — all in one place.
            </p>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="mx-auto mt-10 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search expeditions, publications, datasets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-surface-700 bg-surface-800/80 py-4 pl-12 pr-32 text-base text-white placeholder-surface-400 backdrop-blur-sm outline-none transition-all focus:border-polar-500 focus:ring-2 focus:ring-polar-500/30"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-aurora-gradient px-6 py-2.5 text-sm font-bold text-polar-900 transition-all hover:shadow-lg hover:shadow-aurora-500/25"
                >
                  Explore
                </button>
              </div>
            </form>

            {/* Quick links */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="text-sm text-surface-500">Popular:</span>
              {['Antarctic Expeditions', 'Climate Change', 'Himadri Station', 'Oceanography'].map((term) => (
                <button
                  key={term}
                  onClick={() => navigate(`/search?q=${encodeURIComponent(term)}`)}
                  className="rounded-full border border-surface-700 px-3 py-1 text-xs text-surface-300 transition-colors hover:border-polar-500/50 hover:text-polar-300"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATISTICS ===== */}
      <section className="relative -mt-16 z-10">
        <div className="container-wide">
          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-surface-700 bg-surface-900/80 p-6 backdrop-blur-md sm:grid-cols-3 lg:grid-cols-6">
            {[
              { label: 'Expeditions', value: stats?.expeditions || 0, icon: Compass, color: 'text-polar-400' },
              { label: 'Publications', value: stats?.publications || 0, icon: BookOpen, color: 'text-aurora-400' },
              { label: 'Datasets', value: stats?.datasets || 0, icon: Database, color: 'text-ice-400' },
              { label: 'Reports', value: stats?.reports || 0, icon: FileText, color: 'text-amber-400' },
              { label: 'Media Resources', value: stats?.media || 0, icon: Camera, color: 'text-rose-400' },
              { label: 'Locations', value: stats?.locations || 0, icon: MapPin, color: 'text-teal-400' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className={`mx-auto h-6 w-6 ${stat.color}`} />
                <div className="mt-2 text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-surface-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED EXPEDITIONS ===== */}
      <section className="py-20">
        <div className="container-wide">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="section-heading">Featured Expeditions</h2>
              <p className="section-subheading">
                Explore India's historic polar expeditions
              </p>
            </div>
            <Link
              to="/expeditions"
              className="hidden items-center gap-1 text-sm font-medium text-polar-400 hover:text-polar-300 sm:flex"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {expeditions?.slice(0, 6).map((exp: any) => (
              <Link
                key={exp.id}
                to={`/expeditions/${exp.id}`}
                className="group card-hover p-6"
              >
                <div className="flex items-start justify-between">
                  <span className={getRegionBadgeClass(exp.region)}>
                    {REGION_LABELS[exp.region] || exp.region}
                  </span>
                  <span className={`badge ${exp.status === 'COMPLETED' ? 'badge-completed' : exp.status === 'ONGOING' ? 'badge-ongoing' : 'badge-planned'}`}>
                    {exp.status}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-white group-hover:text-polar-300 transition-colors">
                  {exp.name}
                </h3>

                <p className="mt-2 text-sm text-surface-400 line-clamp-2">
                  {truncate(exp.description, 150)}
                </p>

                <div className="mt-4 flex items-center gap-4 text-xs text-surface-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(exp.startDate).getFullYear()}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    {exp._count?.reports || 0} reports
                  </span>
                  <span className="flex items-center gap-1">
                    <Camera className="h-3 w-3" />
                    {exp._count?.media || 0} media
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-polar-400 opacity-0 transition-opacity group-hover:opacity-100">
                  Explore <ChevronRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link to="/expeditions" className="btn-secondary">
              View All Expeditions <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== LATEST PUBLICATIONS ===== */}
      <section className="bg-surface-900/30 py-20">
        <div className="container-wide">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="section-heading">Latest Publications</h2>
              <p className="section-subheading">
                Recent research outputs from India's polar science programme
              </p>
            </div>
            <Link
              to="/publications"
              className="hidden items-center gap-1 text-sm font-medium text-polar-400 hover:text-polar-300 sm:flex"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-4">
            {publications?.slice(0, 5).map((pub: any) => (
              <Link
                key={pub.id}
                to={`/publications/${pub.id}`}
                className="group card-hover flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-white group-hover:text-polar-300 transition-colors">
                    {pub.title}
                  </h3>
                  <p className="mt-1 text-sm text-surface-400">{pub.authors}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-surface-500">
                    {pub.journal && <span>{pub.journal}</span>}
                    <span>•</span>
                    <span>{pub.year}</span>
                    {pub.expedition && (
                      <>
                        <span>•</span>
                        <span className={getRegionBadgeClass(pub.expedition.region)}>
                          {REGION_LABELS[pub.expedition.region]}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <ChevronRight className="hidden h-5 w-5 text-surface-500 group-hover:text-polar-400 sm:block" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-20">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-heading">Connected Knowledge</h2>
            <p className="section-subheading">
              Every resource is linked to expeditions, locations, and related research — creating
              a knowledge ecosystem, not just an archive.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Compass,
                title: 'Expedition Explorer',
                description: 'Browse Indian polar expeditions with all connected reports, publications, and media.',
                href: '/expeditions',
                color: 'from-polar-500 to-polar-600',
              },
              {
                icon: Globe,
                title: 'Interactive Map',
                description: 'Explore research stations and expedition locations on an interactive polar map.',
                href: '/map',
                color: 'from-ice-500 to-ice-600',
              },
              {
                icon: Search,
                title: 'Unified Search',
                description: 'Find anything across expeditions, publications, datasets, and media with powerful filters.',
                href: '/search',
                color: 'from-aurora-500 to-aurora-600',
              },
              {
                icon: BookOpen,
                title: 'Education Hub',
                description: 'Learn about polar science through simplified content, facts, and visual storytelling.',
                href: '/education',
                color: 'from-amber-500 to-amber-600',
              },
            ].map((feature) => (
              <Link
                key={feature.href}
                to={feature.href}
                className="group card-hover p-6"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold text-white group-hover:text-polar-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-surface-400">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-2xl border border-surface-700 bg-polar-gradient p-12 text-center">
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-polar-500/10 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-aurora-500/10 blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Explore India's Polar Legacy
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-surface-300">
                From the first expedition in 1981 to today — over four decades of
                polar research by India, all discoverable in one place.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link to="/expeditions" className="btn-aurora">
                  <Compass className="h-5 w-5" />
                  Start Exploring
                </Link>
                <Link to="/education" className="btn-secondary">
                  <Users className="h-5 w-5" />
                  For Students
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

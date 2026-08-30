import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, User, LogOut, Shield, BookOpen, Compass, FileText, Database, Map, Camera, GraduationCap } from 'lucide-react';
import PolarLogo from '@/components/ui/PolarLogo';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
const navLinks = [
  { label: 'Expeditions', href: '/expeditions', icon: Compass, color: 'text-cyan-400' },
  { label: 'Publications', href: '/publications', icon: FileText, color: 'text-blue-400' },
  { label: 'Datasets', href: '/datasets', icon: Database, color: 'text-emerald-400' },
  { label: 'Map', href: '/map', icon: Map, color: 'text-orange-400' },
  { label: 'Gallery', href: '/gallery', icon: Camera, color: 'text-rose-400' },
  { label: 'Education', href: '/education', icon: GraduationCap, color: 'text-amber-400' },
];
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-surface-800/50 bg-polar-950/80 backdrop-blur-xl">
      <div className="container-wide">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <PolarLogo size="md" showText showSubtitle />

          {/* Right side: Search + Auth */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search polar research..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input w-48 pl-10 text-sm lg:w-64"
                />
              </div>
            </form>


            {/* Desktop nav links */}
            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'text-white bg-surface-800'
                        : 'text-surface-400 hover:text-white hover:bg-surface-800/50'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            {/* Auth */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-surface-300 transition-colors hover:bg-surface-800 hover:text-white"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-polar-600">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="hidden sm:inline">{user?.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-surface-700 bg-surface-800 py-2 shadow-2xl">
                      <div className="border-b border-surface-700 px-4 py-2">
                        <p className="text-sm font-medium text-white">{user?.name}</p>
                        <p className="text-xs text-surface-400">{user?.email}</p>
                        <span className="mt-1 inline-block rounded-full bg-polar-500/10 px-2 py-0.5 text-xs text-polar-400">
                          {user?.role}
                        </span>
                      </div>
                      {isAdmin && (
                        <>
                          <Link
                            to="/admin"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-surface-300 hover:bg-surface-700 hover:text-white"
                          >
                            <Shield className="h-4 w-4" />
                            Admin Dashboard
                          </Link>
                          <Link
                            to="/outreach"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-surface-300 hover:bg-surface-700 hover:text-white"
                          >
                            <BookOpen className="h-4 w-4" />
                            Outreach Studio
                          </Link>
                        </>
                      )}
                      <hr className="my-1 border-surface-700" />
                      <button
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                          navigate('/');
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-surface-700"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <Link to="/login" className="btn-ghost text-sm">
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary text-sm !px-4 !py-2">
                  Register
                </Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 text-surface-400 hover:bg-surface-800 hover:text-white md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>

      {/* Mobile menu - Slide-in panel */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setMobileOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-80 max-w-[85vw] bg-surface-900 border-l border-surface-700 shadow-2xl md:hidden overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-surface-800">
              <PolarLogo size="sm" showText />
              <button onClick={() => setMobileOpen(false)} className="rounded-full p-2 bg-surface-800 text-surface-400 hover:text-white hover:bg-surface-700 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            {/* Search */}
            <div className="p-4">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-500" />
                  <input type="text" placeholder="Search polar research..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-800 border border-surface-700 text-white placeholder:text-surface-500 text-sm focus:outline-none focus:border-polar-500/50 transition-all" />
                </div>
              </form>
            </div>
            {/* Nav Links with Icons */}
            <div className="px-3">
              <p className="px-3 mb-2 text-xs font-semibold text-surface-500 uppercase tracking-wider">Explore</p>
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.href;
                return (
                  <Link key={link.href} to={link.href} onClick={() => setMobileOpen(false)} className={cn("flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200", isActive ? "bg-polar-500/15 text-white border border-polar-500/20" : "text-surface-400 hover:bg-surface-800 hover:text-white")}>
                    <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg transition-colors", isActive ? "bg-polar-500/20" : "bg-surface-800")}>
                      <Icon className={cn("h-4 w-4", isActive ? "text-polar-400" : link.color)} />
                    </div>
                    <span>{link.label}</span>
                    {isActive && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-polar-400" />}
                  </Link>
                );
              })}
            </div>
            {/* Auth Section */}
            <div className="p-4 mt-4 border-t border-surface-800">
              {isAuthenticated ? (
                <div>
                  <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-surface-800/50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-polar-500 to-aurora-500"><User className="h-5 w-5 text-white" /></div>
                    <div><p className="text-sm font-medium text-white">{user?.name}</p><p className="text-xs text-surface-400">{user?.role}</p></div>
                  </div>
                  {isAdmin && (<div className="mt-3 space-y-1"><Link to="/admin" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-surface-300 hover:bg-surface-800 hover:text-white transition-colors"><Shield className="h-4 w-4 text-polar-400" /> Admin Dashboard</Link><Link to="/outreach" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-surface-300 hover:bg-surface-800 hover:text-white transition-colors"><BookOpen className="h-4 w-4 text-aurora-400" /> Outreach Studio</Link></div>)}
                  <button onClick={() => { logout(); setMobileOpen(false); navigate("/"); }} className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"><LogOut className="h-4 w-4" /> Sign Out</button>

                </div>
              ) : (
                <div className="space-y-2">
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="flex items-center justify-center w-full rounded-xl py-3 text-sm font-medium text-white bg-surface-800 border border-surface-700 hover:bg-surface-700 transition-colors">Sign In</Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="flex items-center justify-center w-full rounded-xl py-3 text-sm font-medium text-white bg-gradient-to-r from-polar-500 to-aurora-500 hover:from-polar-600 hover:to-aurora-600 transition-all shadow-lg shadow-polar-500/25">Get Started Free</Link>
                </div>
              )}
            </div>
            {/* Footer */}
            <div className="p-4 border-t border-surface-800"><p className="text-xs text-surface-600 text-center">SIH 2026 • PS ID: SIH26063</p></div>
          </div>
        </>
      )}
    </nav>
  );
}

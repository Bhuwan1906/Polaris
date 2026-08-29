import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, User, LogOut, Shield, BookOpen } from 'lucide-react';
import PolarLogo from '@/components/ui/PolarLogo';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Expeditions', href: '/expeditions' },
  { label: 'Publications', href: '/publications' },
  { label: 'Datasets', href: '/datasets' },
  { label: 'Map', href: '/map' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Education', href: '/education' },
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
              className="rounded-lg p-2 text-surface-400 hover:bg-surface-800 hover:text-white lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-surface-800 bg-polar-950 lg:hidden">
          <div className="container-wide space-y-1 py-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-10"
                />
              </div>
            </form>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  location.pathname === link.href
                    ? 'bg-surface-800 text-white'
                    : 'text-surface-400 hover:bg-surface-800/50 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="flex gap-2 pt-2">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-secondary flex-1 text-center text-sm">
                  Sign In
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary flex-1 text-center text-sm">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

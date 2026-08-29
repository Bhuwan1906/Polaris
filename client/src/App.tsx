import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useAuth } from '@/context/AuthContext';

// Layout
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Pages
import HomePage from '@/pages/HomePage';
import SearchPage from '@/pages/SearchPage';
import MapPage from '@/pages/MapPage';
import GalleryPage from '@/pages/GalleryPage';
import EducationPage from '@/pages/EducationPage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ExpeditionListPage from '@/pages/expeditions/ExpeditionListPage';
import ExpeditionDetailPage from '@/pages/expeditions/ExpeditionDetailPage';
import PublicationListPage from '@/pages/publications/PublicationListPage';
import PublicationDetailPage from '@/pages/publications/PublicationDetailPage';
import DatasetListPage from '@/pages/datasets/DatasetListPage';
import DatasetDetailPage from '@/pages/datasets/DatasetDetailPage';
import OutreachStudioPage from '@/pages/outreach/OutreachStudioPage';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AdminExpeditionsPage from '@/pages/admin/AdminExpeditionsPage';
import AdminResourcesPage from '@/pages/admin/AdminResourcesPage';
import AdminMediaPage from '@/pages/admin/AdminMediaPage';
import AdminUsersPage from '@/pages/admin/AdminUsersPage';
import CreditsPage from '@/pages/CreditsPage';
import AdminOutreachPage from '@/pages/admin/AdminOutreachPage';

function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-polar-500 border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = '/login';
    return null;
  }

  if (adminOnly && !isAdmin) {
    return (
      <div className="container-wide py-20 text-center">
        <h1 className="text-2xl font-bold text-white">Access Denied</h1>
        <p className="mt-2 text-surface-400">You need admin privileges to access this page.</p>
      </div>
    );
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/expeditions" element={<ExpeditionListPage />} />
          <Route path="/expeditions/:id" element={<ExpeditionDetailPage />} />

          <Route path="/publications" element={<PublicationListPage />} />
          <Route path="/publications/:id" element={<PublicationDetailPage />} />

          <Route path="/datasets" element={<DatasetListPage />} />
          <Route path="/datasets/:id" element={<DatasetDetailPage />} />

          <Route
            path="/outreach"
            element={
              <ProtectedRoute adminOnly>
                <OutreachStudioPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/expeditions"
            element={
              <ProtectedRoute adminOnly>
                <AdminExpeditionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/resources"
            element={
              <ProtectedRoute adminOnly>
                <AdminResourcesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/media"
            element={
              <ProtectedRoute adminOnly>
                <AdminMediaPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute adminOnly>
                <AdminUsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/outreach"
            element={
              <ProtectedRoute adminOnly>
                <AdminOutreachPage />
              </ProtectedRoute>
            }
          />

          <Route path="/credits" element={<CreditsPage />} />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="flex h-[60vh] flex-col items-center justify-center text-center">
                <h1 className="text-6xl font-bold text-polar-500">404</h1>
                <p className="mt-4 text-xl text-surface-400">Page not found</p>
                <a href="/" className="btn-primary mt-6">
                  Return Home
                </a>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-right" theme="dark" />
    </div>
  );
}

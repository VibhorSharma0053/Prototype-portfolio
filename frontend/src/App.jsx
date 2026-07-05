import { Routes, Route, useLocation, Navigate } from 'react-router';
import { AnimatePresence } from 'motion/react';
import { useAuth } from './context/AuthContext';

import HomePage from './pages/HomePage';
import PrototypesPage from './pages/PrototypesPage';
import PrototypeDetailPage from './pages/PrototypeDetailPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminPrototypesPage from './pages/AdminPrototypesPage';
import AdminPrototypeFormPage from './pages/AdminPrototypeFormPage';
import AdminMessagesPage from './pages/AdminMessagesPage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorPage from './pages/ErrorPage';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/layout/ScrollProgress';
import LoadingScreen from './components/layout/LoadingScreen';
import AdminLayout from './components/admin/AdminLayout';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <ScrollProgress />
      <main>{children}</main>
      <Footer />
    </>
  );
};

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <HomePage />
            </PublicLayout>
          }
        />
        <Route
          path="/prototypes"
          element={
            <PublicLayout>
              <PrototypesPage />
            </PublicLayout>
          }
        />
        <Route
          path="/prototypes/:slug"
          element={
            <PublicLayout>
              <PrototypeDetailPage />
            </PublicLayout>
          }
        />

        {/* Auth Route */}
        <Route path="/login" element={<AdminLoginPage />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminDashboardPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/prototypes"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminPrototypesPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/prototypes/new"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminPrototypeFormPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/prototypes/edit/:id"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminPrototypeFormPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminMessagesPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Error Routes */}
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;

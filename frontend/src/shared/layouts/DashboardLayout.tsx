import { useState, useEffect, useContext } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import Sidebar from '@shared/components/layout/Sidebar';
import Navbar from '@shared/components/layout/Navbar';
import { AuthContext } from '@shared/context/AuthContext';

export default function DashboardLayout() {
  const auth = useContext(AuthContext);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  if (auth?.isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }

  const user = auth?.user;

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((prev) => !prev)}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />
      <Navbar
        onMenuClick={() => setMobileMenuOpen((prev) => !prev)}
        userName={user?.name || 'Usuario'}
        userRole={user?.role || 'Usuario'}
      />
      <main
        className={`pt-16 min-h-screen sidebar-transition ${
          sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]'
        }`}
      >
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  User,
  Users,
  ChevronDown,
  Menu,
  Settings,
  LogOut,
  ShoppingBag,
  X,
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: '1', title: 'Stock crítico', message: 'Arroz 1kg está por debajo del mínimo en Sucursal Norte', type: 'warning', time: 'Hace 5 min', read: false },
  { id: '2', title: 'Venta registrada', message: 'Venta #V-2024-089 por $1,234.50', type: 'success', time: 'Hace 15 min', read: false },
  { id: '3', title: 'Ticket pendiente', message: 'Ticket #TK-023 requiere atención urgente', type: 'info', time: 'Hace 1 hora', read: false },
  { id: '4', title: 'Orden de compa', message: 'OC-2024-045 ha sido aprobada', type: 'success', time: 'Hace 2 horas', read: true },
  { id: '5', title: 'Reclamo nuevo', message: 'Cliente reporta producto dañado en Sucursal Sur', type: 'error', time: 'Hace 3 horas', read: true },
];

const breadcrumbMap: Record<string, { label: string; parent?: string; parentPath?: string }> = {
  '/dashboard': { label: 'Dashboard Ejecutivo' },
  '/productos': { label: 'Productos', parent: 'ERP', parentPath: '/productos' },
  '/categorias': { label: 'Categorías', parent: 'ERP', parentPath: '/productos' },
  '/inventario': { label: 'Inventario', parent: 'ERP', parentPath: '/inventario' },
  '/movimientos': { label: 'Movimientos', parent: 'ERP', parentPath: '/inventario' },
  '/compras': { label: 'Compras', parent: 'ERP', parentPath: '/compras' },
  '/ordenes-compra': { label: 'Órdenes de Compra', parent: 'ERP', parentPath: '/compras' },
  '/proveedores': { label: 'Proveedores', parent: 'ERP', parentPath: '/compras' },
  '/ventas': { label: 'Ventas', parent: 'ERP', parentPath: '/ventas' },
  '/facturacion': { label: 'Facturación', parent: 'ERP', parentPath: '/ventas' },
  '/sucursales': { label: 'Sucursales', parent: 'ERP', parentPath: '/sucursales' },
  '/reportes-erp': { label: 'Reportes ERP', parent: 'ERP', parentPath: '/reportes' },
  '/crm/clientes': { label: 'Clientes', parent: 'CRM', parentPath: '/crm' },
  '/crm/seguimiento': { label: 'Seguimiento', parent: 'CRM', parentPath: '/crm' },
  '/crm/fidelizacion': { label: 'Fidelización', parent: 'CRM', parentPath: '/crm' },
  '/crm/atencion': { label: 'Atención al Cliente', parent: 'CRM', parentPath: '/crm' },
  '/crm/tickets': { label: 'Tickets', parent: 'CRM', parentPath: '/crm' },
  '/crm/reclamos': { label: 'Reclamos', parent: 'CRM', parentPath: '/crm' },
  '/crm/campanas': { label: 'Campañas', parent: 'CRM', parentPath: '/crm' },
  '/crm/reportes': { label: 'Reportes CRM', parent: 'CRM', parentPath: '/crm' },
  '/usuarios': { label: 'Usuarios', parent: 'Administración' },
  '/roles': { label: 'Roles', parent: 'Administración' },
  '/configuracion': { label: 'Configuración', parent: 'Administración' },
  '/perfil': { label: 'Perfil', parent: 'Administración' },
};

interface NavbarProps {
  onMenuClick: () => void;
  userName: string;
  userRole: string;
  userAvatar?: string;
}

export default function Navbar({ onMenuClick, userName, userRole, userAvatar }: NavbarProps) {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const breadcrumb = breadcrumbMap[location.pathname] || { label: 'Dashboard Ejecutivo' };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-auto z-20 h-16 bg-white border-b border-border sidebar-transition">
      <div className="flex items-center justify-between h-full px-4 lg:px-6 gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-text-secondary hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <nav className="hidden sm:flex items-center gap-1.5 text-sm">
            <Link to="/dashboard" className="text-text-secondary hover:text-primary-500 transition-colors">
              MegaMarket
            </Link>
            <span className="text-text-secondary/40 mx-1">/</span>
            {breadcrumb.parent && (
              <>
                <span className="text-text-secondary/60">{breadcrumb.parent}</span>
                <span className="text-text-secondary/40 mx-1">/</span>
              </>
            )}
            <span className="text-text-primary font-semibold truncate">{breadcrumb.label}</span>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div ref={searchRef} className="relative hidden md:block">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-text-secondary hover:bg-gray-100 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-border overflow-hidden"
                >
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                    <Search className="w-4 h-4 text-text-secondary" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar productos, clientes..."
                      className="flex-1 text-sm text-text-primary bg-transparent outline-none placeholder:text-text-secondary/50"
                      autoFocus
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="text-text-secondary hover:text-text-primary">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  {!searchQuery ? (
                    <div className="p-4 text-center text-xs text-text-secondary/60">
                      Escribe para buscar en el sistema
                    </div>
                  ) : (
                    <div className="p-2 space-y-1">
                      <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <ShoppingBag className="w-4 h-4 text-primary-500" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary truncate">Arroz Superior 1kg</p>
                          <p className="text-xs text-text-secondary">Producto</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <Users className="w-4 h-4 text-primary-500" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary truncate">María González</p>
                          <p className="text-xs text-text-secondary">Cliente</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div ref={notifRef} className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative w-9 h-9 flex items-center justify-center rounded-lg text-text-secondary hover:bg-gray-100 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center bg-primary-500 text-white text-[9px] font-bold rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-[360px] bg-white rounded-xl shadow-lg border border-border overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                    <span className="text-sm font-semibold text-text-primary">Notificaciones</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
                        className="text-xs text-primary-500 hover:text-primary-600 font-medium"
                      >
                        Marcar todas leídas
                      </button>
                    )}
                  </div>
                  <div className="max-h-[320px] overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`flex items-start gap-3 px-4 py-3 border-b border-border/50 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors ${
                          !notif.read ? 'bg-primary-50/50' : ''
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                          notif.type === 'warning' ? 'bg-warning' :
                          notif.type === 'success' ? 'bg-success' :
                          notif.type === 'error' ? 'bg-error' : 'bg-info'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary">{notif.title}</p>
                          <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">{notif.message}</p>
                          <p className="text-[10px] text-text-secondary/50 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2.5 border-t border-border text-center">
                    <button className="text-xs text-primary-500 hover:text-primary-600 font-medium">
                      Ver todas las notificaciones
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-semibold">
                {userAvatar ? (
                  <img src={userAvatar} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  userName.charAt(0)
                )}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-text-primary leading-tight">{userName}</p>
                <p className="text-[10px] text-text-secondary leading-tight">{userRole}</p>
              </div>
              <ChevronDown className="hidden md:block w-4 h-4 text-text-secondary" />
            </button>
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-border overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-semibold text-text-primary">{userName}</p>
                    <p className="text-xs text-text-secondary">{userRole}</p>
                    <p className="text-xs text-text-secondary/50 mt-0.5">Matriz Quito</p>
                  </div>
                  <div className="p-1.5">
                    <Link to="/perfil" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors">
                      <User className="w-4 h-4" /> Mi Perfil
                    </Link>
                    <Link to="/configuracion" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors">
                      <Settings className="w-4 h-4" /> Configuración
                    </Link>
                    <button
                      onClick={() => {
                        localStorage.removeItem('megamarket_user');
                        window.location.href = '/login';
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Cerrar sesión
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

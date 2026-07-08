import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '@shared/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  Tags,
  Warehouse,
  ArrowRightLeft,
  ShoppingCart,
  ClipboardList,
  Truck,
  Store,
  Receipt,
  Building2,
  BarChart3,
  Users,
  UserCheck,
  Star,
  Headphones,
  Ticket,
  AlertTriangle,
  Megaphone,
  PieChart,
  UserCog,
  Shield,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronDown,
} from 'lucide-react';
import Logo from './Logo';

interface MenuItem {
  label: string;
  path?: string;
  icon: React.ElementType;
  badge?: number | string;
  children?: { label: string; path: string }[];
}

interface MenuSection {
  title?: string;
  items: MenuItem[];
}

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const menuSections: MenuSection[] = [
  {
    items: [
      { label: 'Dashboard Ejecutivo', path: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'ERP',
    items: [
      { label: 'Productos', path: '/productos', icon: Package },
      { label: 'Categorías', path: '/categorias', icon: Tags },
      { label: 'Inventario', path: '/inventario', icon: Warehouse },
      { label: 'Movimientos', path: '/movimientos', icon: ArrowRightLeft },
      { label: 'Compras', path: '/compras', icon: ShoppingCart },
      { label: 'Órdenes de Compra', path: '/ordenes-compra', icon: ClipboardList },
      { label: 'Proveedores', path: '/proveedores', icon: Truck },
      { label: 'Ventas', path: '/ventas', icon: Store },
      { label: 'Facturación', path: '/facturacion', icon: Receipt },
      { label: 'Sucursales', path: '/sucursales', icon: Building2 },
      { label: 'Reportes ERP', path: '/reportes-erp', icon: BarChart3 },
    ],
  },
  {
    title: 'CRM',
    items: [
      { label: 'Clientes', path: '/crm/clientes', icon: Users },
      { label: 'Seguimiento', path: '/crm/seguimiento', icon: UserCheck },
      { label: 'Fidelización', path: '/crm/fidelizacion', icon: Star },
      { label: 'Atención al Cliente', path: '/crm/atencion', icon: Headphones },
      { label: 'Tickets', path: '/crm/tickets', icon: Ticket },
      { label: 'Reclamos', path: '/crm/reclamos', icon: AlertTriangle },
      { label: 'Campañas', path: '/crm/campanas', icon: Megaphone },
      { label: 'Reportes CRM', path: '/crm/reportes', icon: PieChart },
    ],
  },
  {
    title: 'ADMINISTRACIÓN',
    items: [
      { label: 'Usuarios', path: '/usuarios', icon: UserCog },
      { label: 'Roles', path: '/roles', icon: Shield },
      { label: 'Configuración', path: '/configuracion', icon: Settings },
      { label: 'Perfil', path: '/perfil', icon: User },
      { label: 'Cerrar sesión', icon: LogOut },
    ],
  },
];

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const location = useLocation();
  const auth = useContext(AuthContext);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  const isActive = (path?: string) => {
    if (!path) return false;
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  const isChildActive = (children: { path: string }[]) => {
    return children.some((c) => location.pathname === c.path);
  };

  const toggleExpand = (label: string) => {
    setExpandedMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleLogout = () => {
    auth?.logout();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
        <Logo collapsed={collapsed} />
        <button
          onClick={collapsed ? onToggle : () => {}}
          className="hidden lg:flex w-7 h-7 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 space-y-1 scrollbar-thin">
        {menuSections.map((section, si) => (
          <div key={si}>
            {section.title && !collapsed && (
              <div className="px-3 pt-4 pb-1.5">
                <span className="text-[10px] font-semibold tracking-[0.15em] text-white/40 uppercase">
                  {section.title}
                </span>
              </div>
            )}
            {section.items.map((item) => {
              const active = item.children ? isChildActive(item.children) : isActive(item.path);
              const expanded = expandedMenus[item.label];

              if (item.children) {
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => !collapsed && toggleExpand(item.label)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        active
                          ? 'bg-white/15 text-white shadow-sm'
                          : 'text-white/60 hover:text-white hover:bg-white/10'
                      } ${collapsed ? 'justify-center px-2' : ''}`}
                      title={collapsed ? item.label : undefined}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left truncate">{item.label}</span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
                        </>
                      )}
                    </button>
                    <AnimatePresence>
                      {!collapsed && expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-4 mt-1 space-y-0.5 border-l border-white/10 pl-2">
                            {item.children.map((child) => (
                              <Link
                                key={child.path}
                                to={child.path}
                                onClick={onMobileClose}
                                className={`block px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                                  location.pathname === child.path
                                    ? 'bg-white/15 text-white'
                                    : 'text-white/50 hover:text-white hover:bg-white/10'
                                }`}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              if (item.label === 'Cerrar sesión') {
                return (
                  <button
                    key={item.label}
                    onClick={handleLogout}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-white/60 hover:text-red-200 hover:bg-white/10 ${
                      collapsed ? 'justify-center px-2' : ''
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </button>
                );
              }

              return (
                <Link
                  key={item.path}
                  to={item.path || '#'}
                  onClick={onMobileClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-white/15 text-white shadow-sm'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  } ${collapsed ? 'justify-center px-2' : ''}`}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold bg-white/20 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>


    </div>
  );

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-[280px] z-50 lg:hidden overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #D71920 0%, #B51218 100%)' }}
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>

      <aside
        className={`hidden lg:flex flex-col fixed top-0 left-0 bottom-0 z-30 overflow-hidden sidebar-transition ${
          collapsed ? 'w-[72px]' : 'w-[260px]'
        }`}
        style={{ background: 'linear-gradient(180deg, #D71920 0%, #B51218 100%)' }}
      >
        {sidebarContent}
      </aside>
    </>
  );
}

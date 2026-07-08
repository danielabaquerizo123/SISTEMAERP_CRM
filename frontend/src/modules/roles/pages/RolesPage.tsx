import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Edit2, Trash2, Eye, AlertTriangle, CheckCircle } from 'lucide-react';
import type { Role } from '@types/index';
import Button from '@shared/components/ui/Button';
import Modal from '@shared/components/ui/Modal';
import EmptyState from '@shared/components/ui/EmptyState';
import Input from '@shared/components/ui/Input';
import Select from '@shared/components/ui/Select';
import Textarea from '@shared/components/ui/Textarea';

const ALL_PERMISOS = [
  'ver_ventas', 'crear_ventas', 'editar_ventas', 'anular_ventas',
  'ver_productos', 'crear_productos', 'editar_productos', 'eliminar_productos',
  'ver_inventario', 'crear_inventario', 'editar_inventario', 'ajustar_inventario',
  'ver_usuarios', 'crear_usuarios', 'editar_usuarios', 'eliminar_usuarios',
  'ver_roles', 'crear_roles', 'editar_roles', 'eliminar_roles',
  'ver_reportes', 'exportar_reportes', 'generar_reportes',
  'ver_configuracion', 'editar_configuracion',
  'ver_clientes', 'crear_clientes', 'editar_clientes', 'eliminar_clientes',
  'ver_proveedores', 'crear_proveedores', 'editar_proveedores', 'eliminar_proveedores',
  'ver_compras', 'crear_compras', 'editar_compras', 'anular_compras',
  'ver_crm', 'gestionar_crm',
];

const ALL_PERMISOS_LABELS: Record<string, string> = {
  ver_ventas: 'Ver Ventas',
  crear_ventas: 'Crear Ventas',
  editar_ventas: 'Editar Ventas',
  anular_ventas: 'Anular Ventas',
  ver_productos: 'Ver Productos',
  crear_productos: 'Crear Productos',
  editar_productos: 'Editar Productos',
  eliminar_productos: 'Eliminar Productos',
  ver_inventario: 'Ver Inventario',
  crear_inventario: 'Crear Inventario',
  editar_inventario: 'Editar Inventario',
  ajustar_inventario: 'Ajustar Inventario',
  ver_usuarios: 'Ver Usuarios',
  crear_usuarios: 'Crear Usuarios',
  editar_usuarios: 'Editar Usuarios',
  eliminar_usuarios: 'Eliminar Usuarios',
  ver_roles: 'Ver Roles',
  crear_roles: 'Crear Roles',
  editar_roles: 'Editar Roles',
  eliminar_roles: 'Eliminar Roles',
  ver_reportes: 'Ver Reportes',
  exportar_reportes: 'Exportar Reportes',
  generar_reportes: 'Generar Reportes',
  ver_configuracion: 'Ver Configuración',
  editar_configuracion: 'Editar Configuración',
  ver_clientes: 'Ver Clientes',
  crear_clientes: 'Crear Clientes',
  editar_clientes: 'Editar Clientes',
  eliminar_clientes: 'Eliminar Clientes',
  ver_proveedores: 'Ver Proveedores',
  crear_proveedores: 'Crear Proveedores',
  editar_proveedores: 'Editar Proveedores',
  eliminar_proveedores: 'Eliminar Proveedores',
  ver_compras: 'Ver Compras',
  crear_compras: 'Crear Compras',
  editar_compras: 'Editar Compras',
  anular_compras: 'Anular Compras',
  ver_crm: 'Ver CRM',
  gestionar_crm: 'Gestionar CRM',
};

const INITIAL_ROLES: Role[] = [
  { id: '1', nombre: 'Administrador', descripcion: 'Acceso completo a todas las funcionalidades del sistema', usuarios: 3, permisos: [...ALL_PERMISOS], estado: 'activo' },
  { id: '2', nombre: 'Gerente de Ventas', descripcion: 'Gestión de ventas, clientes y reportes comerciales', usuarios: 5, permisos: ['ver_ventas', 'crear_ventas', 'editar_ventas', 'ver_clientes', 'crear_clientes', 'editar_clientes', 'ver_reportes', 'exportar_reportes', 'ver_productos', 'ver_crm'], estado: 'activo' },
  { id: '3', nombre: 'Encargado de Inventario', descripcion: 'Control de inventario, productos y compras', usuarios: 4, permisos: ['ver_productos', 'crear_productos', 'editar_productos', 'ver_inventario', 'crear_inventario', 'editar_inventario', 'ajustar_inventario', 'ver_compras', 'crear_compras', 'ver_proveedores'], estado: 'activo' },
  { id: '4', nombre: 'Atención al Cliente', descripcion: 'Atención de tickets, reclamos y gestión de clientes', usuarios: 8, permisos: ['ver_clientes', 'editar_clientes', 'ver_crm', 'gestionar_crm', 'ver_ventas'], estado: 'activo' },
  { id: '5', nombre: 'Contador', descripcion: 'Acceso a reportes financieros, facturación y exportación de datos', usuarios: 2, permisos: ['ver_ventas', 'ver_reportes', 'exportar_reportes', 'generar_reportes', 'ver_compras', 'ver_configuracion'], estado: 'activo' },
  { id: '6', nombre: 'Cajero', descripcion: 'Registro de ventas y consulta básica de productos', usuarios: 15, permisos: ['ver_ventas', 'crear_ventas', 'ver_productos', 'ver_clientes'], estado: 'inactivo' },
];

const ITEMS_PER_PAGE = 5;

const estadoOptions = [
  { value: '', label: 'Todos los estados' },
  { value: 'activo', label: 'Activo' },
  { value: 'inactivo', label: 'Inactivo' },
];

const formEstadoOptions = [
  { value: 'activo', label: 'Activo' },
  { value: 'inactivo', label: 'Inactivo' },
];

const permisosGrouped = [
  { group: 'Ventas', keys: ['ver_ventas', 'crear_ventas', 'editar_ventas', 'anular_ventas'] },
  { group: 'Productos', keys: ['ver_productos', 'crear_productos', 'editar_productos', 'eliminar_productos'] },
  { group: 'Inventario', keys: ['ver_inventario', 'crear_inventario', 'editar_inventario', 'ajustar_inventario'] },
  { group: 'Usuarios', keys: ['ver_usuarios', 'crear_usuarios', 'editar_usuarios', 'eliminar_usuarios'] },
  { group: 'Roles', keys: ['ver_roles', 'crear_roles', 'editar_roles', 'eliminar_roles'] },
  { group: 'Reportes', keys: ['ver_reportes', 'exportar_reportes', 'generar_reportes'] },
  { group: 'Configuración', keys: ['ver_configuracion', 'editar_configuracion'] },
  { group: 'Clientes', keys: ['ver_clientes', 'crear_clientes', 'editar_clientes', 'eliminar_clientes'] },
  { group: 'Proveedores', keys: ['ver_proveedores', 'crear_proveedores', 'editar_proveedores', 'eliminar_proveedores'] },
  { group: 'Compras', keys: ['ver_compras', 'crear_compras', 'editar_compras', 'anular_compras'] },
  { group: 'CRM', keys: ['ver_crm', 'gestionar_crm'] },
];

export default function RolesPage() {
  const [search, setSearch] = useState('');
  const [filterEstado, setFilterEstado] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Role | null>(null);
  const [deleteItem, setDeleteItem] = useState<Role | null>(null);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });
  const [saving, setSaving] = useState(false);
  const [items, setItems] = useState<Role[]>(INITIAL_ROLES);

  const [formNombre, setFormNombre] = useState('');
  const [formDescripcion, setFormDescripcion] = useState('');
  const [formEstado, setFormEstado] = useState<'activo' | 'inactivo'>('activo');
  const [formPermisos, setFormPermisos] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return items.filter((r) => {
      const s = !search || r.nombre.toLowerCase().includes(search.toLowerCase()) || r.descripcion.toLowerCase().includes(search.toLowerCase());
      const e = !filterEstado || r.estado === filterEstado;
      return s && e;
    });
  }, [items, search, filterEstado]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const openCreate = () => {
    setEditItem(null);
    setFormNombre(''); setFormDescripcion(''); setFormEstado('activo'); setFormPermisos([]);
    setModalOpen(true);
  };

  const openEdit = (item: Role) => {
    setEditItem(item);
    setFormNombre(item.nombre); setFormDescripcion(item.descripcion); setFormEstado(item.estado); setFormPermisos(item.permisos);
    setModalOpen(true);
  };

  const togglePermiso = (permiso: string) => {
    setFormPermisos((prev) =>
      prev.includes(permiso) ? prev.filter((p) => p !== permiso) : [...prev, permiso]
    );
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      if (editItem) {
        setItems(prev => prev.map(p => p.id === editItem.id ? { ...p, nombre: formNombre, descripcion: formDescripcion, estado: formEstado, permisos: formPermisos } : p));
      } else {
        setItems(prev => [...prev, { id: crypto.randomUUID(), nombre: formNombre, descripcion: formDescripcion, estado: formEstado, permisos: formPermisos, usuarios: 0 }]);
      }
      setSaving(false);
      setModalOpen(false);
      setToast({ message: editItem ? 'Rol actualizado exitosamente' : 'Rol creado exitosamente', visible: true });
      setTimeout(() => setToast({ message: '', visible: false }), 3000);
    }, 500);
  };

  const handleDelete = () => {
    if (deleteItem) setItems(prev => prev.filter(p => p.id !== deleteItem.id));
    setDeleteItem(null);
    setToast({ message: 'Rol eliminado exitosamente', visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 3000);
  };

  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filtered.length);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Roles</h1>
        <p className="text-sm text-text-secondary mt-1">Administra los roles y permisos del sistema MegaMarket</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            placeholder="Buscar rol..."
            className="w-full rounded-lg border border-border bg-white pl-10 pr-3 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <Select
          options={estadoOptions}
          value={filterEstado}
          onChange={(e) => { setFilterEstado(e.target.value); setCurrentPage(1); }}
          className="min-w-[160px]"
        />
        <Button variant="primary" icon={Plus} onClick={openCreate}>
          Nuevo
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-border">
          <EmptyState icon={Search} title="No se encontraron roles" description="Intenta ajustar los filtros o crea un nuevo rol" />
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-border">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Rol</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Descripción</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Usuarios</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Permisos</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Estado</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginated.map((rol) => (
                  <tr key={rol.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3.5 font-medium text-text-primary">{rol.nombre}</td>
                    <td className="px-4 py-3.5 text-text-secondary max-w-[200px] truncate">{rol.descripcion}</td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-50 text-primary-500 text-sm font-semibold">
                        {rol.usuarios}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1 flex-wrap">
                        {rol.permisos.slice(0, 3).map((p) => (
                          <span key={p} className="bg-gray-100 text-gray-600 text-[10px] rounded px-1.5 py-0.5 font-medium">
                            {ALL_PERMISOS_LABELS[p] || p}
                          </span>
                        ))}
                        {rol.permisos.length > 3 && (
                          <span className="text-[10px] text-text-secondary font-medium">+{rol.permisos.length - 3} más</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          rol.estado === 'activo'
                            ? 'bg-success/10 text-success border-success/20'
                            : 'bg-gray-100 text-gray-500 border-gray-200'
                        }`}
                      >
                        {rol.estado === 'activo' ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(rol)}
                          className="p-1.5 rounded-lg text-text-secondary hover:text-primary-500 hover:bg-primary-50 transition-colors"
                          title="Ver"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEdit(rol)}
                          className="p-1.5 rounded-lg text-text-secondary hover:text-primary-500 hover:bg-primary-50 transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteItem(rol)}
                          className="p-1.5 rounded-lg text-text-secondary hover:text-error hover:bg-error/10 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <p className="text-sm text-text-secondary">
              Mostrando {startItem}-{endItem} de {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`min-w-[36px] h-9 px-2 inline-flex items-center justify-center rounded-lg border text-sm font-medium transition-colors ${
                    page === currentPage
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'border-border text-text-secondary hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? 'Editar Rol' : 'Nuevo Rol'}
        size="xl"
        footer={
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button variant="primary" onClick={handleSave} isLoading={saving}>
              {saving ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        }
      >
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Nombre del Rol" value={formNombre} onChange={(e) => setFormNombre(e.target.value)} placeholder="Ej: Administrador" />
            <Select label="Estado" options={formEstadoOptions} value={formEstado} onChange={(e) => setFormEstado(e.target.value as 'activo' | 'inactivo')} />
          </div>
          <Textarea label="Descripción" value={formDescripcion} onChange={(e) => setFormDescripcion(e.target.value)} placeholder="Describe las responsabilidades de este rol" rows={3} />
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">Permisos</label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto p-1">
              {permisosGrouped.map((group) => (
                <div key={group.group} className="border border-border rounded-lg p-3">
                  <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">{group.group}</p>
                  <div className="space-y-1.5">
                    {group.keys.map((key) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={formPermisos.includes(key)}
                          onChange={() => togglePermiso(key)}
                          className="w-4 h-4 rounded border-border text-primary-500 focus:ring-primary-500 cursor-pointer"
                        />
                        <span className="text-sm text-text-primary group-hover:text-primary-500 transition-colors">
                          {ALL_PERMISOS_LABELS[key]}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        size="sm"
        footer={
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => setDeleteItem(null)}>Cancelar</Button>
            <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
          </div>
        }
      >
        <div className="text-center py-2">
          <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6 text-error" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">Confirmar Eliminación</h3>
          <p className="text-sm text-text-secondary">
            ¿Estás seguro de eliminar el rol <strong>{deleteItem?.nombre}</strong>? Esta acción no se puede deshacer.
          </p>
        </div>
      </Modal>

      <AnimatePresence>
        {toast.visible && (
          <motion.div key="toast"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-success text-white px-5 py-3 rounded-lg shadow-lg"
          >
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

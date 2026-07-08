import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  Tag,
  Edit2,
  Trash2,
  X,
  AlertTriangle,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import type { Categoria } from '@types/index';

const initialCategorias: Categoria[] = [
  { id: '1', nombre: 'Abarrotes', descripcion: 'Productos alimenticios no perecederos', productos: 45, estado: 'activo' },
  { id: '2', nombre: 'Lácteos', descripcion: 'Leche, quesos, yogures y derivados', productos: 28, estado: 'activo' },
  { id: '3', nombre: 'Carnes', descripcion: 'Carne de res, cerdo, pollo y pescado', productos: 19, estado: 'activo' },
  { id: '4', nombre: 'Bebidas', descripcion: 'Gaseosas, jugos, agua y bebidas energéticas', productos: 34, estado: 'activo' },
  { id: '5', nombre: 'Limpieza', descripcion: 'Detergentes, desinfectantes y artículos de limpieza', productos: 22, estado: 'activo' },
  { id: '6', nombre: 'Frutas y Verduras', descripcion: 'Productos frescos de la canasta básica', productos: 31, estado: 'activo' },
  { id: '7', nombre: 'Panadería', descripcion: 'Pan, pasteles y productos de repostería', productos: 15, estado: 'inactivo' },
  { id: '8', nombre: 'Conservas', descripcion: 'Atún, sardinas, vegetales enlatados', productos: 12, estado: 'activo' },
  { id: '9', nombre: 'Snacks', descripcion: 'Papas fritas, chifles, frutos secos y golosinas', productos: 24, estado: 'activo' },
  { id: '10', nombre: 'Congelados', descripcion: 'Helados, vegetales congelados y comidas preparadas', productos: 8, estado: 'inactivo' },
];

const ROWS_PER_PAGE = 10;

const estadoBadge = (estado: string) => {
  const map: Record<string, { label: string; class: string }> = {
    activo: { label: 'Activo', class: 'bg-success/10 text-success border-success/20' },
    inactivo: { label: 'Inactivo', class: 'bg-gray-100 text-gray-500 border-gray-200' },
  };
  return map[estado] || map.activo;
};

export default function CategoriasPage() {
  const [search, setSearch] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Categoria | null>(null);
  const [showDelete, setShowDelete] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [categorias, setCategorias] = useState<Categoria[]>(initialCategorias);
  const [formData, setFormData] = useState({ nombre: '', descripcion: '', estado: 'activo' as const });

  const filtered = useMemo(() => {
    return categorias.filter((c) => {
      if (search && !c.nombre.toLowerCase().includes(search.toLowerCase()) && !c.descripcion.toLowerCase().includes(search.toLowerCase())) return false;
      if (estadoFilter && c.estado !== estadoFilter) return false;
      return true;
    });
  }, [search, estadoFilter, categorias]);

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      if (editingItem) {
        setCategorias(prev => prev.map(p => p.id === editingItem.id ? { ...p, ...formData } : p));
      } else {
        setCategorias(prev => [...prev, { id: crypto.randomUUID(), ...formData, productos: 0 }]);
      }
      setSaving(false);
      setShowModal(false);
      setEditingItem(null);
      setSuccessMsg(editingItem ? 'Categoría actualizada exitosamente' : 'Categoría creada exitosamente');
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 500);
  };

  const handleDelete = (id: string) => {
    setCategorias(prev => prev.filter(p => p.id !== id));
    setShowDelete(null);
    setSuccessMsg('Categoría eliminada exitosamente');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const openEdit = (item: Categoria) => {
    setEditingItem(item);
    setFormData({ nombre: item.nombre, descripcion: item.descripcion, estado: item.estado });
    setShowModal(true);
  };

  const openCreate = () => {
    setEditingItem(null);
    setFormData({ nombre: '', descripcion: '', estado: 'activo' });
    setShowModal(true);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Categorías</h1>
          <p className="text-sm text-text-secondary mt-0.5">Gestión de categorías de productos</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors shadow-sm shadow-primary-500/20">
          <Plus className="w-4 h-4" />
          Nueva Categoría
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Buscar por nombre o descripción..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary placeholder:text-text-secondary/40 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <select value={estadoFilter} onChange={(e) => { setEstadoFilter(e.target.value); setPage(1); }} className="px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all">
            <option value="">Todos los estados</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-gray-50/50">
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider">Nombre</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider">Descripción</th>
                <th className="text-center px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider">Productos</th>
                <th className="text-center px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider">Estado</th>
                <th className="text-center px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.map((item) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                        <Tag className="w-4 h-4 text-primary-500" />
                      </div>
                      <span className="text-sm font-medium text-text-primary">{item.nombre}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-text-secondary max-w-xs truncate">{item.descripcion}</td>
                  <td className="px-4 py-3.5 text-sm font-semibold text-text-primary text-center">{item.productos}</td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${estadoBadge(item.estado).class}`}>
                      {estadoBadge(item.estado).label}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg text-text-secondary hover:text-primary-500 hover:bg-primary-50 transition-all" title="Editar">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => setShowDelete(item.id)} className="p-1.5 rounded-lg text-text-secondary hover:text-error hover:bg-error/10 transition-all" title="Eliminar">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-text-secondary">
                    <Tag className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    <p className="text-sm font-medium">No se encontraron categorías</p>
                    <p className="text-xs mt-0.5">Intenta ajustar los filtros o crea una nueva categoría</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <p className="text-sm text-text-secondary">
              Mostrando {(page - 1) * ROWS_PER_PAGE + 1}-{Math.min(page * ROWS_PER_PAGE, filtered.length)} de {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="px-3 py-1.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                Anterior
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const start = Math.max(1, Math.min(page - 2, totalPages - 4));
                const p = start + i;
                if (p > totalPages) return null;
                return (
                  <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${page === p ? 'bg-primary-500 text-white' : 'text-text-secondary hover:bg-gray-100'}`}>
                    {p}
                  </button>
                );
              })}
              <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="px-3 py-1.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div key="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h3 className="text-lg font-semibold text-text-primary">{editingItem ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
                <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg text-text-secondary hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Nombre</label>
                  <input value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" placeholder="Nombre de la categoría" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Descripción</label>
                  <textarea value={formData.descripcion} onChange={(e) => setFormData({...formData, descripcion: e.target.value})} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all min-h-[100px] resize-none" placeholder="Descripción de la categoría" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Estado</label>
                  <select value={formData.estado} onChange={(e) => setFormData({...formData, estado: e.target.value as 'activo' | 'inactivo'})} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all">
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-gray-50/50">
                <button onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-text-secondary hover:bg-gray-100 transition-colors">
                  Cancelar
                </button>
                <button onClick={handleSave} disabled={saving} className="px-4 py-2.5 rounded-lg bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center gap-2">
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {saving ? 'Guardando...' : editingItem ? 'Actualizar Categoría' : 'Crear Categoría'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDelete && (
          <motion.div key="delete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowDelete(null)} />
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-error" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">¿Eliminar categoría?</h3>
              <p className="text-sm text-text-secondary mb-6">Esta acción no se puede deshacer. La categoría será eliminada permanentemente.</p>
              <div className="flex items-center justify-center gap-3">
                <button onClick={() => setShowDelete(null)} className="px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-text-secondary hover:bg-gray-100 transition-colors">
                  Cancelar
                </button>
                <button onClick={() => handleDelete(showDelete)} className="px-4 py-2.5 rounded-lg bg-error text-white text-sm font-semibold hover:bg-red-700 transition-colors flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Eliminar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {successMsg && (
          <motion.div key="toast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-lg bg-success text-white text-sm font-medium shadow-lg">
            <CheckCircle className="w-4 h-4" />
            {successMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

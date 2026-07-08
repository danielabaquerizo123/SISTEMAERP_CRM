import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  Package,
  Edit2,
  Trash2,
  X,
  AlertTriangle,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import type { InventarioItem } from '@types/index';

const initialItems: InventarioItem[] = [
  { id: '1', producto: 'Arroz Superior 1kg', codigo: 'ARR-001', categoria: 'Abarrotes', stockActual: 4500, stockMinimo: 500, stockMaximo: 8000, ubicacion: 'Aisle 1 - Estante A', sucursal: 'Matriz Quito', estado: 'exceso', ultimoMovimiento: '2026-07-05' },
  { id: '2', producto: 'Aceite Vegetal 900ml', codigo: 'ACE-002', categoria: 'Abarrotes', stockActual: 3200, stockMinimo: 300, stockMaximo: 5000, ubicacion: 'Aisle 1 - Estante B', sucursal: 'Matriz Quito', estado: 'normal', ultimoMovimiento: '2026-07-04' },
  { id: '3', producto: 'Azúcar Morena 2kg', codigo: 'AZU-003', categoria: 'Abarrotes', stockActual: 2800, stockMinimo: 400, stockMaximo: 4000, ubicacion: 'Aisle 2 - Estante A', sucursal: 'Sucursal Norte', estado: 'normal', ultimoMovimiento: '2026-07-03' },
  { id: '4', producto: 'Leche Entera 1L', codigo: 'LEC-004', categoria: 'Lácteos', stockActual: 120, stockMinimo: 200, stockMaximo: 5000, ubicacion: 'Refrigerado 1', sucursal: 'Matriz Quito', estado: 'critico', ultimoMovimiento: '2026-07-05' },
  { id: '5', producto: 'Pan Integral 500g', codigo: 'PAN-005', categoria: 'Panadería', stockActual: 45, stockMinimo: 100, stockMaximo: 2000, ubicacion: 'Panadería - Estante A', sucursal: 'Sucursal Sur', estado: 'critico', ultimoMovimiento: '2026-07-05' },
  { id: '6', producto: 'Carne de Res 1kg', codigo: 'CAR-006', categoria: 'Carnes', stockActual: 850, stockMinimo: 100, stockMaximo: 1500, ubicacion: 'Carnicería - Cámara 1', sucursal: 'Matriz Quito', estado: 'normal', ultimoMovimiento: '2026-07-04' },
  { id: '7', producto: 'Pollo Entero 2kg', codigo: 'POL-007', categoria: 'Carnes', stockActual: 30, stockMinimo: 80, stockMaximo: 1200, ubicacion: 'Carnicería - Cámara 2', sucursal: 'Sucursal Norte', estado: 'critico', ultimoMovimiento: '2026-07-05' },
  { id: '8', producto: 'Huevos (30 unidades)', codigo: 'HUE-008', categoria: 'Lácteos', stockActual: 620, stockMinimo: 50, stockMaximo: 2000, ubicacion: 'Refrigerado 2', sucursal: 'Matriz Quito', estado: 'normal', ultimoMovimiento: '2026-07-02' },
  { id: '9', producto: 'Cola Personal 355ml', codigo: 'BEB-009', categoria: 'Bebidas', stockActual: 12000, stockMinimo: 1000, stockMaximo: 15000, ubicacion: 'Aisle 5 - Estante C', sucursal: 'Sucursal Sur', estado: 'normal', ultimoMovimiento: '2026-07-05' },
  { id: '10', producto: 'Detergente Líquido 1L', codigo: 'LIM-010', categoria: 'Limpieza', stockActual: 180, stockMinimo: 150, stockMaximo: 3000, ubicacion: 'Aisle 6 - Estante A', sucursal: 'Matriz Quito', estado: 'bajo', ultimoMovimiento: '2026-07-01' },
  { id: '11', producto: 'Manzana Roja 1kg', codigo: 'FRU-011', categoria: 'Frutas y Verduras', stockActual: 1200, stockMinimo: 100, stockMaximo: 2000, ubicacion: 'Frutas - Estante A', sucursal: 'Sucursal Este', estado: 'normal', ultimoMovimiento: '2026-07-05' },
  { id: '12', producto: 'Queso Fresco 500g', codigo: 'LEC-012', categoria: 'Lácteos', stockActual: 45, stockMinimo: 60, stockMaximo: 800, ubicacion: 'Refrigerado 1', sucursal: 'Sucursal Norte', estado: 'bajo', ultimoMovimiento: '2026-07-04' },
  { id: '13', producto: 'Arroz Premium 5kg', codigo: 'ARR-013', categoria: 'Abarrotes', stockActual: 7200, stockMinimo: 200, stockMaximo: 5000, ubicacion: 'Aisle 1 - Estante A', sucursal: 'Sucursal Oeste', estado: 'exceso', ultimoMovimiento: '2026-07-03' },
  { id: '14', producto: 'Agua Purificada 2L', codigo: 'BEB-014', categoria: 'Bebidas', stockActual: 8500, stockMinimo: 500, stockMaximo: 10000, ubicacion: 'Aisle 5 - Estante A', sucursal: 'Matriz Quito', estado: 'normal', ultimoMovimiento: '2026-07-05' },
  { id: '15', producto: 'Atún en Lata 180g', codigo: 'CON-015', categoria: 'Conservas', stockActual: 3200, stockMinimo: 300, stockMaximo: 5000, ubicacion: 'Aisle 3 - Estante B', sucursal: 'Sucursal Sur', estado: 'normal', ultimoMovimiento: '2026-07-04' },
];

const sucursales = ['Matriz Quito', 'Sucursal Norte', 'Sucursal Sur', 'Sucursal Este', 'Sucursal Oeste'];
const estados = ['normal', 'bajo', 'critico', 'exceso'] as const;

const ROWS_PER_PAGE = 10;

const estadoBadge = (estado: string) => {
  const map: Record<string, { label: string; class: string }> = {
    normal: { label: 'Normal', class: 'bg-success/10 text-success border-success/20' },
    bajo: { label: 'Bajo', class: 'bg-warning/10 text-warning border-warning/20' },
    critico: { label: 'Crítico', class: 'bg-error/10 text-error border-error/20' },
    exceso: { label: 'Exceso', class: 'bg-info/10 text-info border-info/20' },
  };
  return map[estado] || map.normal;
};

export default function InventarioPage() {
  const [search, setSearch] = useState('');
  const [sucursalFilter, setSucursalFilter] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<InventarioItem | null>(null);
  const [showDelete, setShowDelete] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [items, setItems] = useState<InventarioItem[]>(initialItems);
  const [formData, setFormData] = useState({ producto: '', codigo: '', stockActual: 0, stockMinimo: 0, stockMaximo: 0, ubicacion: '', sucursal: '' });

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (search && !item.producto.toLowerCase().includes(search.toLowerCase()) && !item.codigo.toLowerCase().includes(search.toLowerCase())) return false;
      if (sucursalFilter && item.sucursal !== sucursalFilter) return false;
      if (estadoFilter && item.estado !== estadoFilter) return false;
      return true;
    });
  }, [search, sucursalFilter, estadoFilter, items]);

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      if (editingItem) {
        setItems(prev => prev.map(p => p.id === editingItem.id ? { ...p, ...formData } : p));
      } else {
        setItems(prev => [...prev, { id: crypto.randomUUID(), ...formData, categoria: '', estado: 'normal', ultimoMovimiento: new Date().toISOString().split('T')[0] }]);
      }
      setSaving(false);
      setShowModal(false);
      setEditingItem(null);
      setSuccessMsg(editingItem ? 'Item actualizado exitosamente' : 'Item creado exitosamente');
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 500);
  };

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(p => p.id !== id));
    setShowDelete(null);
    setSuccessMsg('Item eliminado exitosamente');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const openEdit = (item: InventarioItem) => {
    setEditingItem(item);
    setFormData({ producto: item.producto, codigo: item.codigo, stockActual: item.stockActual, stockMinimo: item.stockMinimo, stockMaximo: item.stockMaximo, ubicacion: item.ubicacion, sucursal: item.sucursal });
    setShowModal(true);
  };

  const openCreate = () => {
    setEditingItem(null);
    setFormData({ producto: '', codigo: '', stockActual: 0, stockMinimo: 0, stockMaximo: 0, ubicacion: '', sucursal: '' });
    setShowModal(true);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Inventario</h1>
          <p className="text-sm text-text-secondary mt-0.5">Control de existencias y stock</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors shadow-sm shadow-primary-500/20">
          <Plus className="w-4 h-4" />
          Nuevo Item
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Buscar por producto o código..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary placeholder:text-text-secondary/40 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <select value={sucursalFilter} onChange={(e) => { setSucursalFilter(e.target.value); setPage(1); }} className="px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all">
            <option value="">Todas las sucursales</option>
            {sucursales.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={estadoFilter} onChange={(e) => { setEstadoFilter(e.target.value); setPage(1); }} className="px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all">
            <option value="">Todos los estados</option>
            {estados.map((e) => <option key={e} value={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-gray-50/50">
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider">Producto</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider">Código</th>
                <th className="text-right px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider">Stock Actual</th>
                <th className="text-center px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider">Mín/Máx</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider">Ubicación</th>
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
                        <Package className="w-4 h-4 text-primary-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{item.producto}</p>
                        <p className="text-xs text-text-secondary">{item.categoria}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm font-mono text-text-secondary">{item.codigo}</td>
                  <td className="px-4 py-3.5 text-right">
                    <span className={`text-sm font-semibold ${item.estado === 'critico' ? 'text-error' : item.estado === 'bajo' ? 'text-warning' : item.estado === 'exceso' ? 'text-info' : 'text-text-primary'}`}>
                      {item.stockActual.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-center text-sm text-text-secondary">
                    {item.stockMinimo} / {item.stockMaximo}
                  </td>
                  <td className="px-4 py-3.5 text-sm text-text-secondary">{item.ubicacion}</td>
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
                  <td colSpan={7} className="px-4 py-12 text-center text-text-secondary">
                    <Package className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    <p className="text-sm font-medium">No se encontraron items</p>
                    <p className="text-xs mt-0.5">Intenta ajustar los filtros o crea un nuevo item</p>
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
                <h3 className="text-lg font-semibold text-text-primary">{editingItem ? 'Editar Item' : 'Nuevo Item'}</h3>
                <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg text-text-secondary hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Producto</label>
                    <input value={formData.producto} onChange={(e) => setFormData({...formData, producto: e.target.value})} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" placeholder="Nombre del producto" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Código</label>
                    <input value={formData.codigo} onChange={(e) => setFormData({...formData, codigo: e.target.value})} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" placeholder="Ej: ABC-001" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Stock Actual</label>
                    <input type="number" value={formData.stockActual} onChange={(e) => setFormData({...formData, stockActual: Number(e.target.value)})} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Stock Mínimo</label>
                    <input type="number" value={formData.stockMinimo} onChange={(e) => setFormData({...formData, stockMinimo: Number(e.target.value)})} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" placeholder="0" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Stock Máximo</label>
                    <input type="number" value={formData.stockMaximo} onChange={(e) => setFormData({...formData, stockMaximo: Number(e.target.value)})} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Sucursal</label>
                    <select value={formData.sucursal} onChange={(e) => setFormData({...formData, sucursal: e.target.value})} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all">
                      <option value="">Seleccionar</option>
                      {sucursales.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Ubicación</label>
                  <input value={formData.ubicacion} onChange={(e) => setFormData({...formData, ubicacion: e.target.value})} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" placeholder="Ej: Aisle 1 - Estante A" />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-gray-50/50">
                <button onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-text-secondary hover:bg-gray-100 transition-colors">
                  Cancelar
                </button>
                <button onClick={handleSave} disabled={saving} className="px-4 py-2.5 rounded-lg bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center gap-2">
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {saving ? 'Guardando...' : editingItem ? 'Actualizar Item' : 'Crear Item'}
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
              <h3 className="text-lg font-semibold text-text-primary mb-2">¿Eliminar item?</h3>
              <p className="text-sm text-text-secondary mb-6">Esta acción no se puede deshacer. El item será eliminado permanentemente.</p>
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

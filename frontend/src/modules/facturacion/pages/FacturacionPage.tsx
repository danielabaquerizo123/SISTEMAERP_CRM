import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  Receipt,
  Edit2,
  Trash2,
  Eye,
  X,
  AlertTriangle,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import type { Factura } from '@types/index';

const initialFacturas: Factura[] = [
  { id: '1', numero: 'FAC-2024-001', tipo: 'factura', cliente: 'Juan Pérez', identificacion: '1712345678', fechaEmision: '2026-07-05', fechaVencimiento: '2026-08-04', subtotal: 450.00, impuesto: 54.00, total: 504.00, estado: 'emitida', sucursal: 'Matriz Quito' },
  { id: '2', numero: 'FAC-2024-002', tipo: 'factura', cliente: 'María López', identificacion: '1723456789', fechaEmision: '2026-07-05', fechaVencimiento: '2026-08-04', subtotal: 280.00, impuesto: 33.60, total: 313.60, estado: 'pagada', sucursal: 'Sucursal Norte' },
  { id: '3', numero: 'FAC-2024-003', tipo: 'boleta', cliente: 'Carlos Gómez', identificacion: '1734567890', fechaEmision: '2026-07-04', fechaVencimiento: '2026-08-03', subtotal: 112.30, impuesto: 13.48, total: 125.78, estado: 'emitida', sucursal: 'Matriz Quito' },
  { id: '4', numero: 'FAC-2024-004', tipo: 'factura', cliente: 'Ana Martínez', identificacion: '1745678901', fechaEmision: '2026-07-04', fechaVencimiento: '2026-08-03', subtotal: 1560.00, impuesto: 187.20, total: 1747.20, estado: 'vencida', sucursal: 'Sucursal Sur' },
  { id: '5', numero: 'FAC-2024-005', tipo: 'nota-credito', cliente: 'Pedro Sánchez', identificacion: '1756789012', fechaEmision: '2026-07-03', fechaVencimiento: '2026-08-02', subtotal: -234.00, impuesto: -28.08, total: -262.08, estado: 'emitida', sucursal: 'Matriz Quito' },
  { id: '6', numero: 'FAC-2024-006', tipo: 'boleta', cliente: 'José Ruiz', identificacion: '1767890123', fechaEmision: '2026-07-03', fechaVencimiento: '2026-08-02', subtotal: 67.50, impuesto: 8.10, total: 75.60, estado: 'pagada', sucursal: 'Sucursal Este' },
  { id: '7', numero: 'FAC-2024-007', tipo: 'factura', cliente: 'Sofía Jiménez', identificacion: '1778901234', fechaEmision: '2026-07-02', fechaVencimiento: '2026-08-01', subtotal: 892.00, impuesto: 107.04, total: 999.04, estado: 'pagada', sucursal: 'Sucursal Oeste' },
  { id: '8', numero: 'FAC-2024-008', tipo: 'nota-debito', cliente: 'Diego Mora', identificacion: '1789012345', fechaEmision: '2026-07-02', fechaVencimiento: '2026-08-01', subtotal: 34.80, impuesto: 4.18, total: 38.98, estado: 'emitida', sucursal: 'Matriz Quito' },
  { id: '9', numero: 'FAC-2024-009', tipo: 'factura', cliente: 'Valeria Castro', identificacion: '1790123456', fechaEmision: '2026-07-01', fechaVencimiento: '2026-07-31', subtotal: 2100.00, impuesto: 252.00, total: 2352.00, estado: 'vencida', sucursal: 'Sucursal Norte' },
  { id: '10', numero: 'FAC-2024-010', tipo: 'boleta', cliente: 'Andrés Vega', identificacion: '1701234567', fechaEmision: '2026-07-01', fechaVencimiento: '2026-07-31', subtotal: 198.50, impuesto: 23.82, total: 222.32, estado: 'anulada', sucursal: 'Matriz Quito' },
];

const tipos = ['factura', 'boleta', 'nota-credito', 'nota-debito'] as const;
const estados = ['emitida', 'pagada', 'vencida', 'anulada'] as const;
const sucursales = ['Matriz Quito', 'Sucursal Norte', 'Sucursal Sur', 'Sucursal Este', 'Sucursal Oeste'];
const ROWS_PER_PAGE = 10;

const tipoBadge = (tipo: string) => {
  const map: Record<string, { label: string; class: string }> = {
    factura: { label: 'Factura', class: 'bg-primary-500/10 text-primary-500 border-primary-500/20' },
    boleta: { label: 'Boleta', class: 'bg-gray-100 text-gray-500 border-gray-200' },
    'nota-credito': { label: 'N. Crédito', class: 'bg-info/10 text-info border-info/20' },
    'nota-debito': { label: 'N. Débito', class: 'bg-warning/10 text-warning border-warning/20' },
  };
  return map[tipo] || map.factura;
};

const estadoBadge = (estado: string) => {
  const map: Record<string, { label: string; class: string }> = {
    emitida: { label: 'Emitida', class: 'bg-info/10 text-info border-info/20' },
    pagada: { label: 'Pagada', class: 'bg-success/10 text-success border-success/20' },
    vencida: { label: 'Vencida', class: 'bg-error/10 text-error border-error/20' },
    anulada: { label: 'Anulada', class: 'bg-gray-100 text-gray-500 border-gray-200' },
  };
  return map[estado] || map.emitida;
};

export default function FacturacionPage() {
  const [search, setSearch] = useState('');
  const [tipoFilter, setTipoFilter] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Factura | null>(null);
  const [showDelete, setShowDelete] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [items, setItems] = useState<Factura[]>(initialFacturas);
  const [formData, setFormData] = useState({ numero: '', tipo: 'factura' as Factura['tipo'], cliente: '', identificacion: '', fechaEmision: '', fechaVencimiento: '', subtotal: 0, impuesto: 0 });

  const filtered = useMemo(() => {
    return items.filter((f) => {
      if (search && !f.numero.toLowerCase().includes(search.toLowerCase()) && !f.cliente.toLowerCase().includes(search.toLowerCase())) return false;
      if (tipoFilter && f.tipo !== tipoFilter) return false;
      if (estadoFilter && f.estado !== estadoFilter) return false;
      return true;
    });
  }, [search, tipoFilter, estadoFilter, items]);

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      if (editingItem) {
        setItems(prev => prev.map(p => p.id === editingItem.id ? { ...p, ...formData } : p));
      } else {
        setItems(prev => [...prev, { id: crypto.randomUUID(), ...formData, total: Number(formData.subtotal) + Number(formData.impuesto), estado: 'emitida', sucursal: 'Matriz Quito' }]);
      }
      setSaving(false);
      setShowModal(false);
      setEditingItem(null);
      setSuccessMsg(editingItem ? 'Factura actualizada exitosamente' : 'Factura creada exitosamente');
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 500);
  };

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(p => p.id !== id));
    setShowDelete(null);
    setSuccessMsg('Factura eliminada exitosamente');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const openEdit = (item: Factura) => {
    setEditingItem(item);
    setFormData({ numero: item.numero, tipo: item.tipo, cliente: item.cliente, identificacion: item.identificacion, fechaEmision: item.fechaEmision, fechaVencimiento: item.fechaVencimiento, subtotal: item.subtotal, impuesto: item.impuesto });
    setShowModal(true);
  };

  const openCreate = () => {
    setEditingItem(null);
    setFormData({ numero: '', tipo: 'factura', cliente: '', identificacion: '', fechaEmision: '', fechaVencimiento: '', subtotal: 0, impuesto: 0 });
    setShowModal(true);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Facturación</h1>
          <p className="text-sm text-text-secondary mt-0.5">Gestión de facturas, boletas y notas</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors shadow-sm shadow-primary-500/20">
          <Plus className="w-4 h-4" />
          Nueva Factura
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Buscar por número o cliente..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary placeholder:text-text-secondary/40 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <select value={tipoFilter} onChange={(e) => { setTipoFilter(e.target.value); setPage(1); }} className="px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all">
            <option value="">Todos los tipos</option>
            {tipos.map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1).replace('-', ' ')}</option>)}
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
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider">Número</th>
                <th className="text-center px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider">Tipo</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider">Cliente</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider">Emisión</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider">Vencimiento</th>
                <th className="text-right px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider">Total</th>
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
                  <td className="px-4 py-3.5 text-sm font-mono font-medium text-primary-500">{item.numero}</td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${tipoBadge(item.tipo).class}`}>
                      {tipoBadge(item.tipo).label}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                        <Receipt className="w-4 h-4 text-primary-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{item.cliente}</p>
                        <p className="text-xs text-text-secondary">{item.identificacion}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-text-secondary">{item.fechaEmision}</td>
                  <td className="px-4 py-3.5 text-sm text-text-secondary">{item.fechaVencimiento}</td>
                  <td className="px-4 py-3.5 text-sm font-semibold text-text-primary text-right">${item.total.toFixed(2)}</td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${estadoBadge(item.estado).class}`}>
                      {estadoBadge(item.estado).label}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1.5 rounded-lg text-text-secondary hover:text-primary-500 hover:bg-primary-50 transition-all" title="Ver">
                        <Eye className="w-4 h-4" />
                      </button>
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
                  <td colSpan={8} className="px-4 py-12 text-center text-text-secondary">
                    <Receipt className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    <p className="text-sm font-medium">No se encontraron facturas</p>
                    <p className="text-xs mt-0.5">Intenta ajustar los filtros o crea una nueva factura</p>
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
                <h3 className="text-lg font-semibold text-text-primary">{editingItem ? 'Editar Factura' : 'Nueva Factura'}</h3>
                <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg text-text-secondary hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Número</label>
                    <input value={formData.numero} onChange={(e) => setFormData({...formData, numero: e.target.value})} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" placeholder="Ej: FAC-2024-XXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Tipo</label>
                    <select value={formData.tipo} onChange={(e) => setFormData({...formData, tipo: e.target.value as Factura['tipo']})} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all">
                      <option value="factura">Factura</option>
                      <option value="boleta">Boleta</option>
                      <option value="nota-credito">Nota de Crédito</option>
                      <option value="nota-debito">Nota de Débito</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Cliente</label>
                    <input value={formData.cliente} onChange={(e) => setFormData({...formData, cliente: e.target.value})} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" placeholder="Nombre del cliente" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Identificación</label>
                    <input value={formData.identificacion} onChange={(e) => setFormData({...formData, identificacion: e.target.value})} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" placeholder="0000000000" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Fecha Emisión</label>
                    <input type="date" value={formData.fechaEmision} onChange={(e) => setFormData({...formData, fechaEmision: e.target.value})} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Fecha Vencimiento</label>
                    <input type="date" value={formData.fechaVencimiento} onChange={(e) => setFormData({...formData, fechaVencimiento: e.target.value})} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Subtotal</label>
                    <input type="number" value={formData.subtotal} onChange={(e) => setFormData({...formData, subtotal: Number(e.target.value)})} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" placeholder="0.00" step="0.01" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Impuesto</label>
                    <input type="number" value={formData.impuesto} onChange={(e) => setFormData({...formData, impuesto: Number(e.target.value)})} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" placeholder="0.00" step="0.01" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-gray-50/50">
                <button onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-text-secondary hover:bg-gray-100 transition-colors">
                  Cancelar
                </button>
                <button onClick={handleSave} disabled={saving} className="px-4 py-2.5 rounded-lg bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center gap-2">
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {saving ? 'Guardando...' : editingItem ? 'Actualizar Factura' : 'Crear Factura'}
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
              <h3 className="text-lg font-semibold text-text-primary mb-2">¿Eliminar factura?</h3>
              <p className="text-sm text-text-secondary mb-6">Esta acción no se puede deshacer. La factura será eliminada permanentemente.</p>
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

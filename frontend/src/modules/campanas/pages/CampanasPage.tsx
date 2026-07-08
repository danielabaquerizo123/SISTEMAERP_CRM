import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Eye, Edit2, Trash2, X, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import type { Campaña } from '@types/index';

const initialCampanas: Campaña[] = [
  { id: '1', nombre: 'Ofertas de Verano 2026', tipo: 'email', fechaInicio: '2026-07-01', fechaFin: '2026-08-31', audiencia: 15000, presupuesto: 2500, costoReal: 1800, resultados: 450, estado: 'activa', sucursal: 'Matriz Quito' },
  { id: '2', nombre: 'Promo Fin de Semana', tipo: 'sms', fechaInicio: '2026-07-05', fechaFin: '2026-07-06', audiencia: 8000, presupuesto: 500, costoReal: 320, resultados: 120, estado: 'activa', sucursal: 'Todas las sucursales' },
  { id: '3', nombre: 'Lanzamiento Línea Gourmet', tipo: 'redes', fechaInicio: '2026-06-15', fechaFin: '2026-07-15', audiencia: 25000, presupuesto: 4500, costoReal: 4200, resultados: 890, estado: 'activa', sucursal: 'Matriz Quito' },
  { id: '4', nombre: 'Campaña Navideña 2025', tipo: 'evento', fechaInicio: '2025-12-01', fechaFin: '2025-12-31', audiencia: 12000, presupuesto: 8000, costoReal: 7500, resultados: 2300, estado: 'finalizada', sucursal: 'Todas las sucursales' },
  { id: '5', nombre: 'Descuentos por Volumen', tipo: 'email', fechaInicio: '2026-05-01', fechaFin: '2026-06-30', audiencia: 5000, presupuesto: 1500, costoReal: 1200, resultados: 320, estado: 'finalizada', sucursal: 'Matriz Quito' },
  { id: '6', nombre: 'Fidelización Julio', tipo: 'sms', fechaInicio: '2026-07-10', fechaFin: '2026-07-31', audiencia: 6000, presupuesto: 800, costoReal: 0, resultados: 0, estado: 'planificada', sucursal: 'Todas las sucursales' },
  { id: '7', nombre: 'Apertura Local Guayaquil', tipo: 'evento', fechaInicio: '2026-08-01', fechaFin: '2026-08-15', audiencia: 20000, presupuesto: 12000, costoReal: 0, resultados: 0, estado: 'planificada', sucursal: 'Guayaquil' },
  { id: '8', nombre: 'Descuento en Lácteos', tipo: 'promocion', fechaInicio: '2026-06-20', fechaFin: '2026-07-20', audiencia: 10000, presupuesto: 2000, costoReal: 1600, resultados: 580, estado: 'pausada', sucursal: 'Todas las sucursales' },
  { id: '9', nombre: 'Campaña Escolar', tipo: 'promocion', fechaInicio: '2026-02-01', fechaFin: '2026-03-15', audiencia: 18000, presupuesto: 6000, costoReal: 5500, resultados: 1500, estado: 'cancelada', sucursal: 'Todas las sucursales' },
  { id: '10', nombre: 'Redes Sociales Q2', tipo: 'redes', fechaInicio: '2026-04-01', fechaFin: '2026-06-30', audiencia: 35000, presupuesto: 3500, costoReal: 3100, resultados: 2100, estado: 'finalizada', sucursal: 'Matriz Quito' },
];

const tipoBadge: Record<string, string> = {
  email: 'bg-blue-50 text-info',
  sms: 'bg-success-lighter text-success',
  redes: 'bg-purple-100 text-purple-700',
  evento: 'bg-amber-50 text-warning',
  promocion: 'bg-red-50 text-error',
};

const estadoBadge: Record<string, string> = {
  planificada: 'bg-gray-100 text-text-secondary',
  activa: 'bg-success-lighter text-success',
  pausada: 'bg-amber-50 text-warning',
  finalizada: 'bg-blue-50 text-info',
  cancelada: 'bg-red-50 text-error',
};

const ITEMS_PER_PAGE = 8;

function CampanasPage() {
  const [search, setSearch] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<string>('');
  const [filtroEstado, setFiltroEstado] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Campaña | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [toast, setToast] = useState<{ visible: boolean; message: string }>({ visible: false, message: '' });
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<Campaña>>({});
  const [items, setItems] = useState<Campaña[]>(initialCampanas);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const filtrados = useMemo(() => {
    return items.filter(c => {
      const matchSearch = !search || c.nombre.toLowerCase().includes(search.toLowerCase()) || c.sucursal.toLowerCase().includes(search.toLowerCase());
      const matchTipo = !filtroTipo || c.tipo === filtroTipo;
      const matchEstado = !filtroEstado || c.estado === filtroEstado;
      return matchSearch && matchTipo && matchEstado;
    });
  }, [search, filtroTipo, filtroEstado, items]);

  const totalPages = Math.ceil(filtrados.length / ITEMS_PER_PAGE);
  const paginados = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtrados.slice(start, start + ITEMS_PER_PAGE);
  }, [filtrados, currentPage]);

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  };

  const abrirNuevo = () => {
    setEditando(null);
    setForm({ tipo: 'email', estado: 'planificada' });
    setModalOpen(true);
  };

  const abrirEditar = (c: Campaña) => {
    setEditando(c);
    setForm({ ...c });
    setModalOpen(true);
  };

  const guardar = () => {
    setSaving(true);
    setTimeout(() => {
      if (editando) {
        setItems(prev => prev.map(p => p.id === editando.id ? { ...p, ...form } : p));
      } else {
        setItems(prev => [...prev, { ...form, id: crypto.randomUUID() } as Campaña]);
      }
      setSaving(false);
      setModalOpen(false);
      showToast(editando ? 'Campaña actualizada exitosamente' : 'Campaña creada exitosamente');
    }, 1000);
  };

  const confirmarEliminar = (id: string) => {
    setDeleteTarget(id);
    setDeleteOpen(true);
  };

  const eliminar = () => {
    if (!deleteTarget) return;
    setItems(prev => prev.filter(p => p.id !== deleteTarget));
    setDeleteTarget(null);
    setDeleteOpen(false);
    showToast('Campaña eliminada exitosamente');
  };

  const handleFormChange = (field: keyof Campaña, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-bold text-text-primary">Campañas</h1>
          <p className="text-text-secondary mt-1">Gestión de campañas de marketing y promociones</p>
        </motion.div>

        <div className="bg-white rounded-xl border border-border p-5 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Buscar campaña..."
                value={search}
                onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full rounded-lg border border-border bg-white pl-10 pr-3 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <select
              value={filtroTipo}
              onChange={e => { setFiltroTipo(e.target.value); setCurrentPage(1); }}
              className="rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Todos los tipos</option>
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="redes">Redes Sociales</option>
              <option value="evento">Evento</option>
              <option value="promocion">Promoción</option>
            </select>
            <select
              value={filtroEstado}
              onChange={e => { setFiltroEstado(e.target.value); setCurrentPage(1); }}
              className="rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Todos los estados</option>
              <option value="planificada">Planificada</option>
              <option value="activa">Activa</option>
              <option value="pausada">Pausada</option>
              <option value="finalizada">Finalizada</option>
              <option value="cancelada">Cancelada</option>
            </select>
            <button
              onClick={abrirNuevo}
              className="inline-flex items-center gap-2 bg-primary-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nuevo
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border overflow-hidden">
          {filtrados.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-1">No se encontraron campañas</h3>
              <p className="text-sm text-text-secondary text-center max-w-sm">Intenta ajustar los filtros o términos de búsqueda</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-gray-50">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Nombre</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Tipo</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Inicio</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Fin</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Audiencia</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Presupuesto</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Costo</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Estado</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginados.map(c => (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-text-primary font-medium">{c.nombre}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${tipoBadge[c.tipo]}`}>
                          {c.tipo === 'redes' ? 'Redes' : c.tipo === 'promocion' ? 'Promoción' : c.tipo.charAt(0).toUpperCase() + c.tipo.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-text-secondary">{c.fechaInicio}</td>
                      <td className="px-4 py-3 text-sm text-text-secondary">{c.fechaFin}</td>
                      <td className="px-4 py-3 text-sm text-text-secondary text-right font-mono">{c.audiencia.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-text-secondary text-right font-mono">${c.presupuesto.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-text-secondary text-right font-mono">${c.costoReal.toLocaleString()}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${estadoBadge[c.estado]}`}>
                          {c.estado.charAt(0).toUpperCase() + c.estado.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-2 rounded-lg text-text-secondary hover:bg-gray-100 hover:text-primary-500 transition-colors" title="Ver"><Eye className="w-4 h-4" /></button>
                          <button onClick={() => abrirEditar(c)} className="p-2 rounded-lg text-text-secondary hover:bg-gray-100 hover:text-primary-500 transition-colors" title="Editar"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => confirmarEliminar(c.id)} className="p-2 rounded-lg text-text-secondary hover:bg-gray-100 hover:text-error transition-colors" title="Eliminar"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filtrados.length > 0 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-border">
              <span className="text-sm text-text-secondary">
                Mostrando {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtrados.length)}-{Math.min(currentPage * ITEMS_PER_PAGE, filtrados.length)} de {filtrados.length}
              </span>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`inline-flex items-center justify-center min-w-[36px] h-9 px-2 rounded-lg border text-sm font-medium transition-colors ${page === currentPage ? 'bg-primary-500 text-white border-primary-500' : 'border-border text-text-secondary hover:bg-gray-100'}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      <AnimatePresence>
        {modalOpen && (
          <motion.div key="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-lg bg-white rounded-xl shadow-xl">
              <div className="flex items-center justify-between px-6 pt-6 pb-0">
                <h2 className="text-lg font-semibold text-text-primary">{editando ? 'Editar Campaña' : 'Nueva Campaña'}</h2>
                <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg text-text-secondary hover:bg-gray-100 transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="px-6 py-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Nombre</label>
                  <input type="text" value={form.nombre || ''} onChange={e => handleFormChange('nombre', e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Tipo</label>
                    <select value={form.tipo || 'email'} onChange={e => handleFormChange('tipo', e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option value="email">Email</option>
                      <option value="sms">SMS</option>
                      <option value="redes">Redes Sociales</option>
                      <option value="evento">Evento</option>
                      <option value="promocion">Promoción</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Estado</label>
                    <select value={form.estado || 'planificada'} onChange={e => handleFormChange('estado', e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option value="planificada">Planificada</option>
                      <option value="activa">Activa</option>
                      <option value="pausada">Pausada</option>
                      <option value="finalizada">Finalizada</option>
                      <option value="cancelada">Cancelada</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Fecha Inicio</label>
                    <input type="date" value={form.fechaInicio || ''} onChange={e => handleFormChange('fechaInicio', e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Fecha Fin</label>
                    <input type="date" value={form.fechaFin || ''} onChange={e => handleFormChange('fechaFin', e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Audiencia</label>
                  <input type="number" value={form.audiencia || 0} onChange={e => handleFormChange('audiencia', Number(e.target.value))} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Presupuesto</label>
                    <input type="number" value={form.presupuesto || 0} onChange={e => handleFormChange('presupuesto', Number(e.target.value))} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Costo Real</label>
                    <input type="number" value={form.costoReal ?? 0} onChange={e => handleFormChange('costoReal', Number(e.target.value))} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Sucursal</label>
                  <input type="text" value={form.sucursal || ''} onChange={e => handleFormChange('sucursal', e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
              </div>
              <div className="px-6 pb-6 flex items-center justify-end gap-3">
                <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg border border-border text-text-secondary text-sm font-medium hover:bg-gray-100 transition-colors">Cancelar</button>
                <button onClick={guardar} disabled={saving} className="inline-flex items-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors disabled:opacity-50">
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {saving ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteOpen && (
          <motion.div key="delete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-sm bg-white rounded-xl shadow-xl">
              <div className="px-6 pt-6 pb-4 text-center">
                <div className="w-12 h-12 rounded-full bg-error-lighter flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 text-error" />
                </div>
                <h2 className="text-lg font-semibold text-text-primary mb-2">Confirmar eliminación</h2>
                <p className="text-sm text-text-secondary">¿Estás seguro de eliminar esta campaña? Esta acción no se puede deshacer.</p>
              </div>
              <div className="px-6 pb-6 flex items-center justify-center gap-3">
                <button onClick={() => setDeleteOpen(false)} className="px-4 py-2 rounded-lg border border-border text-text-secondary text-sm font-medium hover:bg-gray-100 transition-colors">Cancelar</button>
                <button onClick={eliminar} className="px-4 py-2 rounded-lg bg-error text-white text-sm font-medium hover:bg-red-700 transition-colors">Eliminar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast.visible && (
          <motion.div key="toast"
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white rounded-lg shadow-lg border border-border border-l-4 border-l-success px-4 py-3"
          >
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-success" />
              <p className="flex-1 text-sm text-text-primary">{toast.message}</p>
              <button onClick={() => setToast({ visible: false, message: '' })} className="p-1 rounded-lg text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors flex-shrink-0"><X className="w-4 h-4" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default CampanasPage;

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Eye, Edit2, Trash2, X, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import type { Fidelizacion } from '@types/index';

const initialFidelizacion: Fidelizacion[] = [
  { id: '1', cliente: 'María Fernanda Gómez', puntos: 4500, nivel: 'platino', ingresos: 12500, ultimaVisita: '2026-07-05', membresia: '2027-07-05' },
  { id: '2', cliente: 'Comercializadora Quito SA', puntos: 12000, nivel: 'platino', ingresos: 45000, ultimaVisita: '2026-07-06', membresia: '2027-01-15' },
  { id: '3', cliente: 'Carlos Andrés López', puntos: 800, nivel: 'bronce', ingresos: 2500, ultimaVisita: '2026-06-15', membresia: '2026-09-20' },
  { id: '4', cliente: 'Supermercados del Pacífico SA', puntos: 22000, nivel: 'platino', ingresos: 78000, ultimaVisita: '2026-07-06', membresia: '2026-12-01' },
  { id: '5', cliente: 'Ana Belén Martínez', puntos: 3200, nivel: 'oro', ingresos: 9800, ultimaVisita: '2026-07-01', membresia: '2027-03-10' },
  { id: '6', cliente: 'Distribuidora Andina Cía. Ltda.', puntos: 18000, nivel: 'platino', ingresos: 62000, ultimaVisita: '2026-07-06', membresia: '2026-11-20' },
  { id: '7', cliente: 'Luisa Fernanda Torres', puntos: 2100, nivel: 'plata', ingresos: 6800, ultimaVisita: '2026-06-25', membresia: '2026-10-05' },
  { id: '8', cliente: 'Mercagran S.A.', puntos: 9500, nivel: 'oro', ingresos: 35000, ultimaVisita: '2026-07-04', membresia: '2026-08-15' },
  { id: '9', cliente: 'Almacenes Cuenca Cía. Ltda.', puntos: 5800, nivel: 'oro', ingresos: 18500, ultimaVisita: '2026-07-02', membresia: '2027-02-28' },
  { id: '10', cliente: 'Gabriela Alexandra Ruiz', puntos: 3800, nivel: 'plata', ingresos: 11200, ultimaVisita: '2026-07-05', membresia: '2027-06-01' },
  { id: '11', cliente: 'Farmacias Saludable Cía. Ltda.', puntos: 15000, nivel: 'platino', ingresos: 52000, ultimaVisita: '2026-07-06', membresia: '2026-09-30' },
  { id: '12', cliente: 'Carmen Elena Vargas', puntos: 1500, nivel: 'bronce', ingresos: 4200, ultimaVisita: '2026-06-30', membresia: '2026-12-15' },
];

const nivelBadge: Record<string, string> = {
  bronce: 'bg-amber-100 text-amber-800',
  plata: 'bg-gray-300 text-gray-700',
  oro: 'bg-yellow-500 text-white',
  platino: 'bg-purple-600 text-white',
};

const ITEMS_PER_PAGE = 8;

function FidelizacionPage() {
  const [search, setSearch] = useState('');
  const [filtroNivel, setFiltroNivel] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Fidelizacion | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [toast, setToast] = useState<{ visible: boolean; message: string }>({ visible: false, message: '' });
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<Fidelizacion>>({});
  const [items, setItems] = useState<Fidelizacion[]>(initialFidelizacion);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const filtrados = useMemo(() => {
    return items.filter(f => {
      const matchSearch = !search || f.cliente.toLowerCase().includes(search.toLowerCase());
      const matchNivel = !filtroNivel || f.nivel === filtroNivel;
      return matchSearch && matchNivel;
    });
  }, [search, filtroNivel, items]);

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
    setForm({ nivel: 'bronce' });
    setModalOpen(true);
  };

  const abrirEditar = (f: Fidelizacion) => {
    setEditando(f);
    setForm({ ...f });
    setModalOpen(true);
  };

  const guardar = () => {
    setSaving(true);
    setTimeout(() => {
      if (editando) {
        setItems(prev => prev.map(p => p.id === editando.id ? { ...p, ...form } : p));
      } else {
        setItems(prev => [...prev, { ...form, id: crypto.randomUUID() } as Fidelizacion]);
      }
      setSaving(false);
      setModalOpen(false);
      showToast(editando ? 'Fidelización actualizada exitosamente' : 'Fidelización creada exitosamente');
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
    showToast('Fidelización eliminada exitosamente');
  };

  const handleFormChange = (field: keyof Fidelizacion, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-bold text-text-primary">Fidelización</h1>
          <p className="text-text-secondary mt-1">Programa de fidelización y puntos de clientes</p>
        </motion.div>

        <div className="bg-white rounded-xl border border-border p-5 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Buscar cliente..."
                value={search}
                onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full rounded-lg border border-border bg-white pl-10 pr-3 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <select
              value={filtroNivel}
              onChange={e => { setFiltroNivel(e.target.value); setCurrentPage(1); }}
              className="rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Todos los niveles</option>
              <option value="bronce">Bronce</option>
              <option value="plata">Plata</option>
              <option value="oro">Oro</option>
              <option value="platino">Platino</option>
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
              <h3 className="text-lg font-semibold text-text-primary mb-1">No se encontraron registros</h3>
              <p className="text-sm text-text-secondary text-center max-w-sm">Intenta ajustar los filtros o términos de búsqueda</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-gray-50">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Cliente</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Puntos</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Nivel</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Ingresos Totales</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Última Visita</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Membresía</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginados.map(f => (
                    <tr key={f.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-text-primary font-medium">{f.cliente}</td>
                      <td className="px-4 py-3 text-sm text-text-secondary text-right font-mono">{f.puntos.toLocaleString()}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${nivelBadge[f.nivel]}`}>
                          {f.nivel.charAt(0).toUpperCase() + f.nivel.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-text-secondary text-right font-mono">${f.ingresos.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-text-secondary">{f.ultimaVisita}</td>
                      <td className="px-4 py-3 text-sm text-text-secondary">{f.membresia}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-2 rounded-lg text-text-secondary hover:bg-gray-100 hover:text-primary-500 transition-colors" title="Ver"><Eye className="w-4 h-4" /></button>
                          <button onClick={() => abrirEditar(f)} className="p-2 rounded-lg text-text-secondary hover:bg-gray-100 hover:text-primary-500 transition-colors" title="Editar"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => confirmarEliminar(f.id)} className="p-2 rounded-lg text-text-secondary hover:bg-gray-100 hover:text-error transition-colors" title="Eliminar"><Trash2 className="w-4 h-4" /></button>
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
                <h2 className="text-lg font-semibold text-text-primary">{editando ? 'Editar Fidelización' : 'Nueva Fidelización'}</h2>
                <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg text-text-secondary hover:bg-gray-100 transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="px-6 py-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Cliente</label>
                  <input type="text" value={form.cliente || ''} onChange={e => handleFormChange('cliente', e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Puntos</label>
                    <input type="number" value={form.puntos || 0} onChange={e => handleFormChange('puntos', Number(e.target.value))} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Nivel</label>
                    <select value={form.nivel || 'bronce'} onChange={e => handleFormChange('nivel', e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option value="bronce">Bronce</option>
                      <option value="plata">Plata</option>
                      <option value="oro">Oro</option>
                      <option value="platino">Platino</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Ingresos Totales</label>
                  <input type="number" value={form.ingresos || 0} onChange={e => handleFormChange('ingresos', Number(e.target.value))} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Última Visita</label>
                    <input type="date" value={form.ultimaVisita || ''} onChange={e => handleFormChange('ultimaVisita', e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Membresía</label>
                    <input type="date" value={form.membresia || ''} onChange={e => handleFormChange('membresia', e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
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
                <p className="text-sm text-text-secondary">¿Estás seguro de eliminar este registro de fidelización? Esta acción no se puede deshacer.</p>
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

export default FidelizacionPage;

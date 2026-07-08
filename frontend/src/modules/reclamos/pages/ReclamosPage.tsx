import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Eye, Edit2, Trash2, X, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import type { Reclamo } from '@types/index';

const initialReclamos: Reclamo[] = [
  { id: '1', numero: 'RC-001', cliente: 'María Fernanda Gómez', tipo: 'queja', fecha: '2026-07-05', descripcion: 'Atención lenta en caja rápida', prioridad: 'baja', producto: '', monto: 0, usuario: 'Pedro Pérez', estado: 'resuelto', resolucion: 'Capacitación al personal' },
  { id: '2', numero: 'RC-002', cliente: 'Comercializadora Quito SA', tipo: 'reclamo', fecha: '2026-07-04', descripcion: 'Factura con montos incorrectos', prioridad: 'critica', producto: '', monto: 12500, usuario: 'Lucía Medina', estado: 'en_proceso' },
  { id: '3', numero: 'RC-003', cliente: 'Carlos Andrés López', tipo: 'devolucion', fecha: '2026-07-03', descripcion: 'Producto lácteo caducado', prioridad: 'alta', producto: 'Leche Entera 1L', monto: 45.50, usuario: 'Ana Torres', estado: 'abierto' },
  { id: '4', numero: 'RC-004', cliente: 'Supermercados del Pacífico SA', tipo: 'garantia', fecha: '2026-07-02', descripcion: 'Congelador industrial no funciona', prioridad: 'critica', producto: 'Congelador Industrial CX-500', monto: 3200, usuario: 'Pedro Pérez', estado: 'abierto' },
  { id: '5', numero: 'RC-005', cliente: 'Ana Belén Martínez', tipo: 'queja', fecha: '2026-07-01', descripcion: 'Estacionamiento insuficiente', prioridad: 'baja', producto: '', monto: 0, usuario: 'Lucía Medina', estado: 'resuelto', resolucion: 'Se habilitaron más espacios' },
  { id: '6', numero: 'RC-006', cliente: 'Distribuidora Andina Cía. Ltda.', tipo: 'reclamo', fecha: '2026-06-30', descripcion: 'Cobro duplicado en factura', prioridad: 'critica', producto: '', monto: 8500, usuario: 'Ana Torres', estado: 'en_proceso' },
  { id: '7', numero: 'RC-007', cliente: 'Luisa Fernanda Torres', tipo: 'devolucion', fecha: '2026-06-28', descripcion: 'Arroz con gorgojos', prioridad: 'alta', producto: 'Arroz Costeño 5kg', monto: 32.75, usuario: 'Pedro Pérez', estado: 'rechazado', resolucion: 'No procede según política de calidad' },
  { id: '8', numero: 'RC-008', cliente: 'Mercagran S.A.', tipo: 'garantia', fecha: '2026-06-27', descripcion: 'Báscula digital descalibrada', prioridad: 'media', producto: 'Báscula Digital BD-200', monto: 890, usuario: 'Lucía Medina', estado: 'resuelto', resolucion: 'Reparación exitosa' },
  { id: '9', numero: 'RC-009', cliente: 'Gabriela Alexandra Ruiz', tipo: 'queja', fecha: '2026-06-24', descripcion: 'Producto en mal estado en góndola', prioridad: 'media', producto: '', monto: 0, usuario: 'Ana Torres', estado: 'resuelto', resolucion: 'Producto retirado, personal notificado' },
  { id: '10', numero: 'RC-010', cliente: 'Farmacias Saludable Cía. Ltda.', tipo: 'reclamo', fecha: '2026-06-22', descripcion: 'Incumplimiento de plazos de entrega', prioridad: 'alta', producto: '', monto: 5400, usuario: 'Pedro Pérez', estado: 'abierto' },
  { id: '11', numero: 'RC-011', cliente: 'Carmen Elena Vargas', tipo: 'devolucion', fecha: '2026-06-20', descripcion: 'Bebida gaseosa vencida', prioridad: 'alta', producto: 'Coca-Cola 3L', monto: 18.50, usuario: 'Lucía Medina', estado: 'en_proceso' },
  { id: '12', numero: 'RC-012', cliente: 'Almacenes Cuenca Cía. Ltda.', tipo: 'garantia', fecha: '2026-06-18', descripcion: 'Laptop de escritorio no enciende', prioridad: 'critica', producto: 'Laptop HP ProBook', monto: 4200, usuario: 'Ana Torres', estado: 'abierto' },
];

const tipoBadge: Record<string, string> = {
  queja: 'bg-amber-50 text-warning',
  reclamo: 'bg-red-50 text-error',
  devolucion: 'bg-blue-50 text-info',
  garantia: 'bg-blue-50 text-info',
};

const prioridadBadge: Record<string, string> = {
  baja: 'bg-gray-100 text-text-secondary',
  media: 'bg-blue-50 text-info',
  alta: 'bg-amber-50 text-warning',
  critica: 'bg-red-50 text-error',
};

const estadoBadge: Record<string, string> = {
  abierto: 'bg-blue-50 text-info',
  en_proceso: 'bg-amber-50 text-warning',
  resuelto: 'bg-success-lighter text-success',
  rechazado: 'bg-red-50 text-error',
};

const ITEMS_PER_PAGE = 8;

function ReclamosPage() {
  const [search, setSearch] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<string>('');
  const [filtroEstado, setFiltroEstado] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Reclamo | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [toast, setToast] = useState<{ visible: boolean; message: string }>({ visible: false, message: '' });
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<Reclamo>>({});
  const [items, setItems] = useState<Reclamo[]>(initialReclamos);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const filtrados = useMemo(() => {
    return items.filter(r => {
      const matchSearch = !search || r.cliente.toLowerCase().includes(search.toLowerCase()) || r.numero.toLowerCase().includes(search.toLowerCase()) || r.descripcion.toLowerCase().includes(search.toLowerCase());
      const matchTipo = !filtroTipo || r.tipo === filtroTipo;
      const matchEstado = !filtroEstado || r.estado === filtroEstado;
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
    setForm({ tipo: 'reclamo', prioridad: 'media', estado: 'abierto' });
    setModalOpen(true);
  };

  const abrirEditar = (r: Reclamo) => {
    setEditando(r);
    setForm({ ...r });
    setModalOpen(true);
  };

  const guardar = () => {
    setSaving(true);
    setTimeout(() => {
      if (editando) {
        setItems(prev => prev.map(p => p.id === editando.id ? { ...p, ...form } : p));
      } else {
        setItems(prev => [...prev, { ...form, id: crypto.randomUUID() } as Reclamo]);
      }
      setSaving(false);
      setModalOpen(false);
      showToast(editando ? 'Reclamo actualizado exitosamente' : 'Reclamo creado exitosamente');
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
    showToast('Reclamo eliminado exitosamente');
  };

  const handleFormChange = (field: keyof Reclamo, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-bold text-text-primary">Reclamos</h1>
          <p className="text-text-secondary mt-1">Gestión de reclamos, quejas, devoluciones y garantías</p>
        </motion.div>

        <div className="bg-white rounded-xl border border-border p-5 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Buscar reclamo..."
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
              <option value="queja">Queja</option>
              <option value="reclamo">Reclamo</option>
              <option value="devolucion">Devolución</option>
              <option value="garantia">Garantía</option>
            </select>
            <select
              value={filtroEstado}
              onChange={e => { setFiltroEstado(e.target.value); setCurrentPage(1); }}
              className="rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Todos los estados</option>
              <option value="abierto">Abierto</option>
              <option value="en_proceso">En Proceso</option>
              <option value="resuelto">Resuelto</option>
              <option value="rechazado">Rechazado</option>
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
              <h3 className="text-lg font-semibold text-text-primary mb-1">No se encontraron reclamos</h3>
              <p className="text-sm text-text-secondary text-center max-w-sm">Intenta ajustar los filtros o términos de búsqueda</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-gray-50">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Número</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Cliente</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Tipo</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Fecha</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Prioridad</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Producto</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Monto</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Estado</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginados.map(r => (
                    <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-text-primary font-mono">{r.numero}</td>
                      <td className="px-4 py-3 text-sm text-text-primary font-medium">{r.cliente}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${tipoBadge[r.tipo]}`}>
                          {r.tipo.charAt(0).toUpperCase() + r.tipo.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-text-secondary">{r.fecha}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${prioridadBadge[r.prioridad]}`}>
                          {r.prioridad.charAt(0).toUpperCase() + r.prioridad.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-text-secondary max-w-[150px] truncate">{r.producto || '—'}</td>
                      <td className="px-4 py-3 text-sm text-text-secondary text-right font-mono">${r.monto.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${estadoBadge[r.estado]}`}>
                          {r.estado === 'en_proceso' ? 'En Proceso' : r.estado.charAt(0).toUpperCase() + r.estado.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-2 rounded-lg text-text-secondary hover:bg-gray-100 hover:text-primary-500 transition-colors" title="Ver"><Eye className="w-4 h-4" /></button>
                          <button onClick={() => abrirEditar(r)} className="p-2 rounded-lg text-text-secondary hover:bg-gray-100 hover:text-primary-500 transition-colors" title="Editar"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => confirmarEliminar(r.id)} className="p-2 rounded-lg text-text-secondary hover:bg-gray-100 hover:text-error transition-colors" title="Eliminar"><Trash2 className="w-4 h-4" /></button>
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
                <h2 className="text-lg font-semibold text-text-primary">{editando ? 'Editar Reclamo' : 'Nuevo Reclamo'}</h2>
                <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg text-text-secondary hover:bg-gray-100 transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="px-6 py-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Número</label>
                    <input type="text" value={form.numero || ''} onChange={e => handleFormChange('numero', e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Cliente</label>
                    <input type="text" value={form.cliente || ''} onChange={e => handleFormChange('cliente', e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Tipo</label>
                    <select value={form.tipo || 'reclamo'} onChange={e => handleFormChange('tipo', e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option value="queja">Queja</option>
                      <option value="reclamo">Reclamo</option>
                      <option value="devolucion">Devolución</option>
                      <option value="garantia">Garantía</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Prioridad</label>
                    <select value={form.prioridad || 'media'} onChange={e => handleFormChange('prioridad', e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option value="baja">Baja</option>
                      <option value="media">Media</option>
                      <option value="alta">Alta</option>
                      <option value="critica">Crítica</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Descripción</label>
                  <textarea value={form.descripcion || ''} onChange={e => handleFormChange('descripcion', e.target.value)} rows={3} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Producto</label>
                    <input type="text" value={form.producto || ''} onChange={e => handleFormChange('producto', e.target.value || '')} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Monto</label>
                    <input type="number" value={form.monto || 0} onChange={e => handleFormChange('monto', Number(e.target.value))} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Estado</label>
                    <select value={form.estado || 'abierto'} onChange={e => handleFormChange('estado', e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option value="abierto">Abierto</option>
                      <option value="en_proceso">En Proceso</option>
                      <option value="resuelto">Resuelto</option>
                      <option value="rechazado">Rechazado</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Usuario</label>
                    <input type="text" value={form.usuario || ''} onChange={e => handleFormChange('usuario', e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500" />
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
                <p className="text-sm text-text-secondary">¿Estás seguro de eliminar este reclamo? Esta acción no se puede deshacer.</p>
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

export default ReclamosPage;

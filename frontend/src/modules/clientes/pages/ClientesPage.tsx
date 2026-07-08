import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Eye, Edit2, Trash2, X, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import type { Cliente } from '@types/index';

const initialClientes: Cliente[] = [
  { id: '1', identificacion: '1790012345001', nombre: 'María Fernanda Gómez', email: 'maria.gomez@gmail.com', telefono: '0991234567', direccion: 'Av. Amazonas N42-123', ciudad: 'Quito', provincia: 'Pichincha', tipo: 'natural', categoria: 'Premium', credito: 1500, estado: 'activo', compras: 34, ultimaCompra: '2026-06-28' },
  { id: '2', identificacion: '1790056789001', nombre: 'Comercializadora Quito SA', email: 'info@comercializadoraquito.com', telefono: '022345678', direccion: 'Av. 10 de Agosto 1500', ciudad: 'Quito', provincia: 'Pichincha', tipo: 'juridico', categoria: 'Corporativo', credito: 5000, estado: 'activo', compras: 89, ultimaCompra: '2026-07-05' },
  { id: '3', identificacion: '0990012345001', nombre: 'Carlos Andrés López', email: 'calopez@hotmail.com', telefono: '0987654321', direccion: 'Cdla. Kennedy Norte Mz. 5', ciudad: 'Guayaquil', provincia: 'Guayas', tipo: 'natural', categoria: 'Regular', credito: 300, estado: 'activo', compras: 12, ultimaCompra: '2026-06-15' },
  { id: '4', identificacion: '0990056789001', nombre: 'Supermercados del Pacífico SA', email: 'ventas@superpacifico.com', telefono: '042345678', direccion: 'Av. 9 de Octubre 2000', ciudad: 'Guayaquil', provincia: 'Guayas', tipo: 'juridico', categoria: 'Corporativo', credito: 8000, estado: 'activo', compras: 156, ultimaCompra: '2026-07-06' },
  { id: '5', identificacion: '0190012345001', nombre: 'Ana Belén Martínez', email: 'abmartinez@yahoo.com', telefono: '0976543210', direccion: 'Calle Larga 3-45', ciudad: 'Cuenca', provincia: 'Azuay', tipo: 'natural', categoria: 'Premium', credito: 2000, estado: 'activo', compras: 45, ultimaCompra: '2026-07-01' },
  { id: '6', identificacion: '1890012345001', nombre: 'Pedro José Castillo', email: 'pjcastillo@outlook.com', telefono: '0965432109', direccion: 'Av. Cevallos 5-67', ciudad: 'Ambato', provincia: 'Tungurahua', tipo: 'natural', categoria: 'Regular', credito: 200, estado: 'inactivo', compras: 5, ultimaCompra: '2026-03-10' },
  { id: '7', identificacion: '1790098765001', nombre: 'Distribuidora Andina Cía. Ltda.', email: 'pedidos@distribuidoraandina.com', telefono: '022567890', direccion: 'Av. Eloy Alfaro N50-200', ciudad: 'Quito', provincia: 'Pichincha', tipo: 'juridico', categoria: 'Corporativo', credito: 10000, estado: 'activo', compras: 210, ultimaCompra: '2026-07-06' },
  { id: '8', identificacion: '2390012345001', nombre: 'Luisa Fernanda Torres', email: 'lftorres@gmail.com', telefono: '0954321098', direccion: 'Calle Bolívar 123', ciudad: 'Santo Domingo', provincia: 'Santo Domingo de los Tsáchilas', tipo: 'natural', categoria: 'Premium', credito: 1200, compras: 28, estado: 'activo', ultimaCompra: '2026-06-25' },
  { id: '9', identificacion: '0990098765001', nombre: 'Mercagran S.A.', email: 'contacto@mercagran.com', telefono: '043210987', direccion: 'Av. Quito 500', ciudad: 'Guayaquil', provincia: 'Guayas', tipo: 'juridico', categoria: 'Corporativo', credito: 6000, estado: 'activo', compras: 134, ultimaCompra: '2026-07-04' },
  { id: '10', identificacion: '1790012346001', nombre: 'Juan Pablo Espinoza', email: 'jpespinoza@hotmail.com', telefono: '0943210987', direccion: 'Calle América 456', ciudad: 'Quito', provincia: 'Pichincha', tipo: 'natural', categoria: 'Regular', credito: 150, estado: 'inactivo', compras: 3, ultimaCompra: '2026-01-20' },
  { id: '11', identificacion: '0190056789001', nombre: 'Almacenes Cuenca Cía. Ltda.', email: 'ventas@almacenescuenca.com', telefono: '072345678', direccion: 'Av. de las Américas 789', ciudad: 'Cuenca', provincia: 'Azuay', tipo: 'juridico', categoria: 'Premium', credito: 3500, estado: 'activo', compras: 67, ultimaCompra: '2026-07-02' },
  { id: '12', identificacion: '1790054321001', nombre: 'Gabriela Alexandra Ruiz', email: 'garuiz@gmail.com', telefono: '0932109876', direccion: 'Av. 6 de Diciembre 800', ciudad: 'Quito', provincia: 'Pichincha', tipo: 'natural', categoria: 'Premium', credito: 1800, estado: 'activo', compras: 52, ultimaCompra: '2026-07-05' },
  { id: '13', identificacion: '1990012345001', nombre: 'Roberto Carlos Medina', email: 'rcmedina@yahoo.com', telefono: '0921098765', direccion: 'Av. Amazonas 3-45', ciudad: 'Loja', provincia: 'Loja', tipo: 'natural', categoria: 'Regular', credito: 100, compras: 8, estado: 'activo', ultimaCompra: '2026-06-10' },
  { id: '14', identificacion: '1790076543001', nombre: 'Farmacias Saludable Cía. Ltda.', email: 'info@farmaciasaludable.com', telefono: '022890123', direccion: 'Av. América N30-100', ciudad: 'Quito', provincia: 'Pichincha', tipo: 'juridico', categoria: 'Corporativo', credito: 7500, estado: 'activo', compras: 178, ultimaCompra: '2026-07-06' },
  { id: '15', identificacion: '0990034567001', nombre: 'Carmen Elena Vargas', email: 'cevargas@outlook.com', telefono: '0910987654', direccion: 'Cdla. Urdesa Central', ciudad: 'Guayaquil', provincia: 'Guayas', tipo: 'natural', categoria: 'Premium', credito: 900, estado: 'activo', compras: 22, ultimaCompra: '2026-06-30' },
];

const ciudades = [...new Set(initialClientes.map(c => c.ciudad))];

const ITEMS_PER_PAGE = 8;

function ClientesPage() {
  const [search, setSearch] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<string>('');
  const [filtroCiudad, setFiltroCiudad] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Cliente | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [toast, setToast] = useState<{ visible: boolean; message: string }>({ visible: false, message: '' });
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<Cliente>>({});
  const [clientes, setClientes] = useState<Cliente[]>(initialClientes);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const filtrados = useMemo(() => {
    return clientes.filter(c => {
      const matchSearch = !search || c.nombre.toLowerCase().includes(search.toLowerCase()) || c.identificacion.includes(search) || c.email.toLowerCase().includes(search.toLowerCase());
      const matchTipo = !filtroTipo || c.tipo === filtroTipo;
      const matchCiudad = !filtroCiudad || c.ciudad === filtroCiudad;
      return matchSearch && matchTipo && matchCiudad;
    });
  }, [search, filtroTipo, filtroCiudad, clientes]);

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
    setForm({});
    setModalOpen(true);
  };

  const abrirEditar = (c: Cliente) => {
    setEditando(c);
    setForm({ ...c });
    setModalOpen(true);
  };

  const guardar = () => {
    setSaving(true);
    setTimeout(() => {
      if (editando) {
        setClientes(prev => prev.map(p => p.id === editando.id ? { ...p, ...form } : p));
      } else {
        setClientes(prev => [...prev, { ...form, id: crypto.randomUUID() } as Cliente]);
      }
      setSaving(false);
      setModalOpen(false);
      showToast(editando ? 'Cliente actualizado exitosamente' : 'Cliente creado exitosamente');
    }, 1000);
  };

  const confirmarEliminar = (id: string) => {
    setDeleteTarget(id);
    setDeleteOpen(true);
  };

  const eliminar = () => {
    if (!deleteTarget) return;
    setClientes(prev => prev.filter(p => p.id !== deleteTarget));
    setDeleteTarget(null);
    setDeleteOpen(false);
    showToast('Cliente eliminado exitosamente');
  };

  const cambiarPagina = (page: number) => {
    setCurrentPage(page);
  };

  const handleFormChange = (field: keyof Cliente, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-bold text-text-primary">Clientes</h1>
          <p className="text-text-secondary mt-1">Gestión de clientes del supermercado</p>
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
              value={filtroTipo}
              onChange={e => { setFiltroTipo(e.target.value); setCurrentPage(1); }}
              className="rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Todos los tipos</option>
              <option value="natural">Natural</option>
              <option value="juridico">Jurídico</option>
            </select>
            <select
              value={filtroCiudad}
              onChange={e => { setFiltroCiudad(e.target.value); setCurrentPage(1); }}
              className="rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Todas las ciudades</option>
              {ciudades.map(c => <option key={c} value={c}>{c}</option>)}
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
              <h3 className="text-lg font-semibold text-text-primary mb-1">No se encontraron clientes</h3>
              <p className="text-sm text-text-secondary text-center max-w-sm">Intenta ajustar los filtros o términos de búsqueda</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-gray-50">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Identificación</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Nombre</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Email</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Teléfono</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Ciudad</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Compras</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Estado</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginados.map(c => (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-text-primary font-mono">{c.identificacion}</td>
                      <td className="px-4 py-3 text-sm text-text-primary font-medium">{c.nombre}</td>
                      <td className="px-4 py-3 text-sm text-text-secondary">{c.email}</td>
                      <td className="px-4 py-3 text-sm text-text-secondary">{c.telefono}</td>
                      <td className="px-4 py-3 text-sm text-text-secondary">{c.ciudad}</td>
                      <td className="px-4 py-3 text-sm text-text-secondary text-center">{c.compras}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${c.estado === 'activo' ? 'bg-success-lighter text-success' : 'bg-gray-100 text-text-secondary'}`}>
                          {c.estado === 'activo' ? 'Activo' : 'Inactivo'}
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
                    onClick={() => cambiarPagina(page)}
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
                <h2 className="text-lg font-semibold text-text-primary">{editando ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>
                <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg text-text-secondary hover:bg-gray-100 transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="px-6 py-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Identificación</label>
                  <input type="text" value={form.identificacion || ''} onChange={e => handleFormChange('identificacion', e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Nombre</label>
                  <input type="text" value={form.nombre || ''} onChange={e => handleFormChange('nombre', e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Email</label>
                    <input type="email" value={form.email || ''} onChange={e => handleFormChange('email', e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Teléfono</label>
                    <input type="text" value={form.telefono || ''} onChange={e => handleFormChange('telefono', e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Dirección</label>
                  <input type="text" value={form.direccion || ''} onChange={e => handleFormChange('direccion', e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Ciudad</label>
                    <input type="text" value={form.ciudad || ''} onChange={e => handleFormChange('ciudad', e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Provincia</label>
                    <input type="text" value={form.provincia || ''} onChange={e => handleFormChange('provincia', e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Tipo</label>
                    <select value={form.tipo || 'natural'} onChange={e => handleFormChange('tipo', e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option value="natural">Natural</option>
                      <option value="juridico">Jurídico</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Categoría</label>
                    <input type="text" value={form.categoria || ''} onChange={e => handleFormChange('categoria', e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500" />
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
                <p className="text-sm text-text-secondary">¿Estás seguro de eliminar este cliente? Esta acción no se puede deshacer.</p>
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

export default ClientesPage;

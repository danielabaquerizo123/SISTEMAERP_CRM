import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  Package,
  Filter,
  ChevronDown,
  Eye,
  Edit2,
  Trash2,
  X,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
} from 'lucide-react';
import type { Product } from '@types/index';

const initialProducts: Product[] = [
  { id: '1', codigo: 'ARR-001', nombre: 'Arroz Superior 1kg', categoria: 'Abarrotes', precioCompra: 0.85, precioVenta: 1.15, stock: 4500, stockMinimo: 500, unidad: 'unidad', sucursal: 'Matriz Quito', estado: 'activo', createdAt: '2024-01-15' },
  { id: '2', codigo: 'ACE-002', nombre: 'Aceite Vegetal 900ml', categoria: 'Abarrotes', precioCompra: 1.50, precioVenta: 2.25, stock: 3200, stockMinimo: 300, unidad: 'unidad', sucursal: 'Matriz Quito', estado: 'activo', createdAt: '2024-01-20' },
  { id: '3', codigo: 'AZU-003', nombre: 'Azúcar Morena 2kg', categoria: 'Abarrotes', precioCompra: 1.10, precioVenta: 1.65, stock: 2800, stockMinimo: 400, unidad: 'unidad', sucursal: 'Sucursal Norte', estado: 'activo', createdAt: '2024-02-01' },
  { id: '4', codigo: 'LEC-004', nombre: 'Leche Entera 1L', categoria: 'Lácteos', precioCompra: 0.90, precioVenta: 1.35, stock: 5100, stockMinimo: 200, unidad: 'unidad', sucursal: 'Matriz Quito', estado: 'activo', createdAt: '2024-02-10' },
  { id: '5', codigo: 'PAN-005', nombre: 'Pan Integral 500g', categoria: 'Panadería', precioCompra: 0.40, precioVenta: 0.65, stock: 1800, stockMinimo: 100, unidad: 'unidad', sucursal: 'Sucursal Sur', estado: 'activo', createdAt: '2024-02-15' },
  { id: '6', codigo: 'CAR-006', nombre: 'Carne de Res 1kg', categoria: 'Carnes', precioCompra: 4.50, precioVenta: 6.75, stock: 850, stockMinimo: 100, unidad: 'kg', sucursal: 'Matriz Quito', estado: 'activo', createdAt: '2024-03-01' },
  { id: '7', codigo: 'POL-007', nombre: 'Pollo Entero 2kg', categoria: 'Carnes', precioCompra: 3.20, precioVenta: 4.80, stock: 620, stockMinimo: 80, unidad: 'unidad', sucursal: 'Sucursal Norte', estado: 'activo', createdAt: '2024-03-05' },
  { id: '8', codigo: 'HUE-008', nombre: 'Huevos (30 unidades)', categoria: 'Lácteos', precioCompra: 2.80, precioVenta: 4.20, stock: 0, stockMinimo: 50, unidad: 'unidad', sucursal: 'Matriz Quito', estado: 'agotado', createdAt: '2024-03-10' },
  { id: '9', codigo: 'BEB-009', nombre: 'Cola Personal 355ml', categoria: 'Bebidas', precioCompra: 0.35, precioVenta: 0.55, stock: 12000, stockMinimo: 1000, unidad: 'unidad', sucursal: 'Sucursal Sur', estado: 'activo', createdAt: '2024-03-15' },
  { id: '10', codigo: 'LIM-010', nombre: 'Detergente Líquido 1L', categoria: 'Limpieza', precioCompra: 1.80, precioVenta: 2.70, stock: 950, stockMinimo: 150, unidad: 'unidad', sucursal: 'Matriz Quito', estado: 'activo', createdAt: '2024-03-20' },
  { id: '11', codigo: 'FRU-011', nombre: 'Manzana Roja 1kg', categoria: 'Frutas y Verduras', precioCompra: 0.95, precioVenta: 1.45, stock: 1200, stockMinimo: 100, unidad: 'kg', sucursal: 'Sucursal Este', estado: 'activo', createdAt: '2024-04-01' },
  { id: '12', codigo: 'LEC-012', nombre: 'Queso Fresco 500g', categoria: 'Lácteos', precioCompra: 2.10, precioVenta: 3.15, stock: 45, stockMinimo: 60, unidad: 'unidad', sucursal: 'Sucursal Norte', estado: 'activo', createdAt: '2024-04-05' },
  { id: '13', codigo: 'ARR-013', nombre: 'Arroz Premium 5kg', categoria: 'Abarrotes', precioCompra: 3.75, precioVenta: 5.60, stock: 0, stockMinimo: 200, unidad: 'unidad', sucursal: 'Sucursal Oeste', estado: 'agotado', createdAt: '2024-04-10' },
  { id: '14', codigo: 'BEB-014', nombre: 'Agua Purificada 2L', categoria: 'Bebidas', precioCompra: 0.50, precioVenta: 0.80, stock: 8500, stockMinimo: 500, unidad: 'unidad', sucursal: 'Matriz Quito', estado: 'activo', createdAt: '2024-04-15' },
  { id: '15', codigo: 'CON-015', nombre: 'Atún en Lata 180g', categoria: 'Conservas', precioCompra: 0.95, precioVenta: 1.45, stock: 3200, stockMinimo: 300, unidad: 'unidad', sucursal: 'Sucursal Sur', estado: 'activo', createdAt: '2024-05-01' },
  { id: '16', codigo: 'HAR-016', nombre: 'Harina de Trigo 1kg', categoria: 'Abarrotes', precioCompra: 0.65, precioVenta: 0.98, stock: 2100, stockMinimo: 250, unidad: 'unidad', sucursal: 'Matriz Quito', estado: 'activo', createdAt: '2024-05-05' },
  { id: '17', codigo: 'GAL-017', nombre: 'Galletas Chocolate 200g', categoria: 'Snacks', precioCompra: 0.70, precioVenta: 1.10, stock: 4500, stockMinimo: 400, unidad: 'unidad', sucursal: 'Sucursal Este', estado: 'activo', createdAt: '2024-05-10' },
  { id: '18', codigo: 'CAF-018', nombre: 'Café Molido 250g', categoria: 'Abarrotes', precioCompra: 2.40, precioVenta: 3.60, stock: 780, stockMinimo: 100, unidad: 'unidad', sucursal: 'Matriz Quito', estado: 'activo', createdAt: '2024-05-15' },
  { id: '19', codigo: 'LEC-019', nombre: 'Yogurt Natural 1L', categoria: 'Lácteos', precioCompra: 1.20, precioVenta: 1.80, stock: 0, stockMinimo: 80, unidad: 'unidad', sucursal: 'Sucursal Norte', estado: 'agotado', createdAt: '2024-06-01' },
  { id: '20', codigo: 'DES-020', nombre: 'Desinfectante 1L', categoria: 'Limpieza', precioCompra: 1.30, precioVenta: 1.95, stock: 1500, stockMinimo: 200, unidad: 'unidad', sucursal: 'Matriz Quito', estado: 'activo', createdAt: '2024-06-10' },
];

const categorias = ['Abarrotes', 'Lácteos', 'Carnes', 'Bebidas', 'Limpieza', 'Frutas y Verduras', 'Panadería', 'Conservas', 'Snacks'];
const sucursales = ['Matriz Quito', 'Sucursal Norte', 'Sucursal Sur', 'Sucursal Este', 'Sucursal Oeste'];
const estados = ['activo', 'inactivo', 'agotado'] as const;

const ROWS_PER_PAGE = 10;

const estadoBadge = (estado: string) => {
  const map: Record<string, { label: string; class: string }> = {
    activo: { label: 'Activo', class: 'bg-success/10 text-success border-success/20' },
    inactivo: { label: 'Inactivo', class: 'bg-gray-100 text-gray-500 border-gray-200' },
    agotado: { label: 'Agotado', class: 'bg-error/10 text-error border-error/20' },
  };
  return map[estado] || map.activo;
};

export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [categoriaFilter, setCategoriaFilter] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showDelete, setShowDelete] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [formData, setFormData] = useState<Omit<Product, 'id' | 'createdAt'>>({ codigo: '', nombre: '', categoria: '', precioCompra: 0, precioVenta: 0, stock: 0, stockMinimo: 0, unidad: 'unidad', sucursal: '', estado: 'activo' });

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (search && !p.nombre.toLowerCase().includes(search.toLowerCase()) && !p.codigo.toLowerCase().includes(search.toLowerCase())) return false;
      if (categoriaFilter && p.categoria !== categoriaFilter) return false;
      if (estadoFilter && p.estado !== estadoFilter) return false;
      return true;
    });
  }, [search, categoriaFilter, estadoFilter, products]);

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      if (editingProduct) {
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...formData } : p));
      } else {
        const newProduct: Product = {
          id: crypto.randomUUID(),
          ...formData,
          createdAt: new Date().toISOString().split('T')[0]
        };
        setProducts(prev => [...prev, newProduct]);
      }
      setSaving(false);
      setShowModal(false);
      setEditingProduct(null);
      setSuccessMsg(editingProduct ? 'Producto actualizado exitosamente' : 'Producto creado exitosamente');
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 500);
  };

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setShowDelete(null);
    setSuccessMsg('Producto eliminado exitosamente');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      codigo: product.codigo,
      nombre: product.nombre,
      categoria: product.categoria,
      precioCompra: product.precioCompra,
      precioVenta: product.precioVenta,
      stock: product.stock,
      stockMinimo: product.stockMinimo,
      unidad: product.unidad,
      sucursal: product.sucursal,
      estado: product.estado,
    });
    setShowModal(true);
  };

  const openCreate = () => {
    setEditingProduct(null);
    setFormData({ codigo: '', nombre: '', categoria: '', precioCompra: 0, precioVenta: 0, stock: 0, stockMinimo: 0, unidad: 'unidad', sucursal: '', estado: 'activo' });
    setShowModal(true);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Productos</h1>
          <p className="text-sm text-text-secondary mt-0.5">Gestión de productos del catálogo</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors shadow-sm shadow-primary-500/20">
          <Plus className="w-4 h-4" />
          Nuevo Producto
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Buscar por nombre o código..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary placeholder:text-text-secondary/40 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <select value={categoriaFilter} onChange={(e) => { setCategoriaFilter(e.target.value); setPage(1); }} className="px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all">
            <option value="">Todas las categorías</option>
            {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
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
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider">Código</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider">Producto</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider">Categoría</th>
                <th className="text-right px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider">P. Venta</th>
                <th className="text-right px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider">Stock</th>
                <th className="text-center px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider">Estado</th>
                <th className="text-center px-4 py-3.5 text-xs font-semibold text-text-secondary uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.map((product) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-4 py-3.5 text-sm font-mono text-text-secondary">{product.codigo}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                        <Package className="w-4 h-4 text-primary-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{product.nombre}</p>
                        <p className="text-xs text-text-secondary">{product.sucursal}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-text-secondary">{product.categoria}</td>
                  <td className="px-4 py-3.5 text-sm font-semibold text-text-primary text-right">${product.precioVenta.toFixed(2)}</td>
                  <td className="px-4 py-3.5 text-right">
                    <span className={`text-sm font-semibold ${product.stock === 0 ? 'text-error' : product.stock < product.stockMinimo ? 'text-warning' : 'text-text-primary'}`}>
                      {product.stock.toLocaleString()}
                    </span>
                    <p className="text-[10px] text-text-secondary">mín: {product.stockMinimo}</p>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${estadoBadge(product.estado).class}`}>
                      {estadoBadge(product.estado).label}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => openEdit(product)} className="p-1.5 rounded-lg text-text-secondary hover:text-primary-500 hover:bg-primary-50 transition-all" title="Editar">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => setShowDelete(product.id)} className="p-1.5 rounded-lg text-text-secondary hover:text-error hover:bg-error/10 transition-all" title="Eliminar">
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
                    <p className="text-sm font-medium">No se encontraron productos</p>
                    <p className="text-xs mt-0.5">Intenta ajustar los filtros o crea un nuevo producto</p>
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
                <h3 className="text-lg font-semibold text-text-primary">{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h3>
                <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg text-text-secondary hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Código</label>
                    <input value={formData.codigo} onChange={(e) => setFormData(prev => ({...prev, codigo: e.target.value}))} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" placeholder="Ej: ABC-001" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Categoría</label>
                    <select value={formData.categoria} onChange={(e) => setFormData(prev => ({...prev, categoria: e.target.value}))} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all">
                      <option value="">Seleccionar</option>
                      {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Nombre del producto</label>
                  <input value={formData.nombre} onChange={(e) => setFormData(prev => ({...prev, nombre: e.target.value}))} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" placeholder="Nombre del producto" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Precio de compra</label>
                    <input type="number" value={formData.precioCompra} onChange={(e) => setFormData(prev => ({...prev, precioCompra: parseFloat(e.target.value) || 0}))} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" placeholder="0.00" step="0.01" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Precio de venta</label>
                    <input type="number" value={formData.precioVenta} onChange={(e) => setFormData(prev => ({...prev, precioVenta: parseFloat(e.target.value) || 0}))} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" placeholder="0.00" step="0.01" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Stock inicial</label>
                    <input type="number" value={formData.stock} onChange={(e) => setFormData(prev => ({...prev, stock: parseInt(e.target.value) || 0}))} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Stock mínimo</label>
                    <input type="number" value={formData.stockMinimo} onChange={(e) => setFormData(prev => ({...prev, stockMinimo: parseInt(e.target.value) || 0}))} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all" placeholder="0" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Sucursal</label>
                    <select value={formData.sucursal} onChange={(e) => setFormData(prev => ({...prev, sucursal: e.target.value}))} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all">
                      <option value="">Seleccionar</option>
                      {sucursales.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1.5">Estado</label>
                    <select value={formData.estado} onChange={(e) => setFormData(prev => ({...prev, estado: e.target.value}))} className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all">
                      <option value="activo">Activo</option>
                      <option value="inactivo">Inactivo</option>
                      <option value="agotado">Agotado</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-gray-50/50">
                <button onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-text-secondary hover:bg-gray-100 transition-colors">
                  Cancelar
                </button>
                <button onClick={handleSave} disabled={saving} className="px-4 py-2.5 rounded-lg bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center gap-2">
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {saving ? 'Guardando...' : editingProduct ? 'Actualizar Producto' : 'Crear Producto'}
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
              <h3 className="text-lg font-semibold text-text-primary mb-2">¿Eliminar producto?</h3>
              <p className="text-sm text-text-secondary mb-6">Esta acción no se puede deshacer. El producto será eliminado permanentemente.</p>
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

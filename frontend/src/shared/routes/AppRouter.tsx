import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@shared/context/AuthContext';
import AuthLayout from '@shared/layouts/AuthLayout';
import DashboardLayout from '@shared/layouts/DashboardLayout';
import LoginPage from '@modules/auth/pages/LoginPage';
import DashboardPage from '@modules/dashboard/pages/DashboardPage';

import ProductosPage from '@modules/productos/pages/ProductosPage';
import CategoriasPage from '@modules/categorias/pages/CategoriasPage';
import InventarioPage from '@modules/inventario/pages/InventarioPage';
import MovimientosPage from '@modules/movimientos/pages/MovimientosPage';
import ComprasPage from '@modules/compras/pages/ComprasPage';
import OrdenesCompraPage from '@modules/ordenes-compra/pages/OrdenesCompraPage';
import ProveedoresPage from '@modules/proveedores/pages/ProveedoresPage';
import VentasPage from '@modules/ventas/pages/VentasPage';
import FacturacionPage from '@modules/facturacion/pages/FacturacionPage';
import SucursalesPage from '@modules/sucursales/pages/SucursalesPage';
import ReportesErpPage from '@modules/reportes-erp/pages/ReportesErpPage';

import ClientesPage from '@modules/clientes/pages/ClientesPage';
import SeguimientoPage from '@modules/seguimiento/pages/SeguimientoPage';
import FidelizacionPage from '@modules/fidelizacion/pages/FidelizacionPage';
import AtencionClientePage from '@modules/atencion-cliente/pages/AtencionClientePage';
import TicketsPage from '@modules/crm/pages/TicketsPage';
import ReclamosPage from '@modules/reclamos/pages/ReclamosPage';
import CampanasPage from '@modules/campanas/pages/CampanasPage';
import ReportesCrmPage from '@modules/reportes-crm/pages/ReportesCrmPage';

import UsuariosPage from '@modules/usuarios/pages/UsuariosPage';
import RolesPage from '@modules/roles/pages/RolesPage';
import ConfiguracionPage from '@modules/config/pages/ConfiguracionPage';
import PerfilPage from '@modules/perfil/pages/PerfilPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />

            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/categorias" element={<CategoriasPage />} />
            <Route path="/inventario" element={<InventarioPage />} />
            <Route path="/movimientos" element={<MovimientosPage />} />
            <Route path="/compras" element={<ComprasPage />} />
            <Route path="/ordenes-compra" element={<OrdenesCompraPage />} />
            <Route path="/proveedores" element={<ProveedoresPage />} />
            <Route path="/ventas" element={<VentasPage />} />
            <Route path="/facturacion" element={<FacturacionPage />} />
            <Route path="/sucursales" element={<SucursalesPage />} />
            <Route path="/reportes-erp" element={<ReportesErpPage />} />

            <Route path="/crm/clientes" element={<ClientesPage />} />
            <Route path="/crm/seguimiento" element={<SeguimientoPage />} />
            <Route path="/crm/fidelizacion" element={<FidelizacionPage />} />
            <Route path="/crm/atencion" element={<AtencionClientePage />} />
            <Route path="/crm/tickets" element={<TicketsPage />} />
            <Route path="/crm/reclamos" element={<ReclamosPage />} />
            <Route path="/crm/campanas" element={<CampanasPage />} />
            <Route path="/crm/reportes" element={<ReportesCrmPage />} />

            <Route path="/usuarios" element={<UsuariosPage />} />
            <Route path="/roles" element={<RolesPage />} />
            <Route path="/configuracion" element={<ConfiguracionPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

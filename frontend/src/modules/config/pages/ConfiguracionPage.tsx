import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Save } from 'lucide-react';
import Input from '@shared/components/ui/Input';
import Select from '@shared/components/ui/Select';
import Button from '@shared/components/ui/Button';

type TabKey = 'general' | 'facturacion' | 'inventario' | 'crm' | 'notificaciones';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'general', label: 'General' },
  { key: 'facturacion', label: 'Facturación' },
  { key: 'inventario', label: 'Inventario' },
  { key: 'crm', label: 'CRM' },
  { key: 'notificaciones', label: 'Notificaciones' },
];

const siNoOptions = [
  { value: 'si', label: 'Sí' },
  { value: 'no', label: 'No' },
];

const monedaOptions = [
  { value: 'USD', label: 'USD - Dólar Americano' },
];

const formatoOptions = [
  { value: 'factura', label: 'Factura' },
  { value: 'boleta', label: 'Boleta' },
  { value: 'ambos', label: 'Factura y Boleta' },
];

export default function ConfiguracionPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('general');
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });
  const [saving, setSaving] = useState(false);

  const [empresa, setEmpresa] = useState('MegaMarket');
  const [ruc, setRuc] = useState('1792837465001');
  const [direccion, setDireccion] = useState('Av. Amazonas N52-123, Quito');
  const [telefono, setTelefono] = useState('+593 2 3456 789');
  const [email, setEmail] = useState('info@megamarket.com');
  const [moneda, setMoneda] = useState('USD');

  const [serieFacturas, setSerieFacturas] = useState('001');
  const [impuesto, setImpuesto] = useState('15');
  const [formato, setFormato] = useState('factura');
  const [resolucionSri, setResolucionSri] = useState('SRI-2024-0012345');

  const [stockMinimo, setStockMinimo] = useState('10');
  const [alertasAutomaticas, setAlertasAutomaticas] = useState('si');
  const [controlLotes, setControlLotes] = useState('no');

  const [emailNotificaciones, setEmailNotificaciones] = useState('notificaciones@megamarket.com');
  const [tiempoRespuesta, setTiempoRespuesta] = useState('24');
  const [recordatoriosAuto, setRecordatoriosAuto] = useState('si');

  const [alertasStock, setAlertasStock] = useState('si');
  const [alertasVentas, setAlertasVentas] = useState('si');
  const [reportesDiarios, setReportesDiarios] = useState('no');

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setToast({ message: 'Configuración guardada exitosamente', visible: true });
      setTimeout(() => setToast({ message: '', visible: false }), 3000);
    }, 1000);
  };

  const tabContent = (key: TabKey) => {
    switch (key) {
      case 'general':
        return (
          <motion.div key="general" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <div className="bg-white rounded-xl border border-border p-5 space-y-5">
              <h3 className="text-base font-semibold text-text-primary">Información de la Empresa</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Nombre de la empresa" value={empresa} onChange={(e) => setEmpresa(e.target.value)} />
                <Input label="RUC" value={ruc} onChange={(e) => setRuc(e.target.value)} />
                <div className="md:col-span-2">
                  <Input label="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                </div>
                <Input label="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Select label="Moneda" options={monedaOptions} value={moneda} onChange={(e) => setMoneda(e.target.value)} />
              </div>
            </div>
          </motion.div>
        );
      case 'facturacion':
        return (
          <motion.div key="facturacion" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <div className="bg-white rounded-xl border border-border p-5 space-y-5">
              <h3 className="text-base font-semibold text-text-primary">Configuración de Facturación</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Serie de facturas" value={serieFacturas} onChange={(e) => setSerieFacturas(e.target.value)} placeholder="001" />
                <Input label="Impuesto (%)" type="number" value={impuesto} onChange={(e) => setImpuesto(e.target.value)} />
                <Select label="Formato" options={formatoOptions} value={formato} onChange={(e) => setFormato(e.target.value)} />
                <Input label="Resolución SRI" value={resolucionSri} onChange={(e) => setResolucionSri(e.target.value)} />
              </div>
            </div>
          </motion.div>
        );
      case 'inventario':
        return (
          <motion.div key="inventario" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <div className="bg-white rounded-xl border border-border p-5 space-y-5">
              <h3 className="text-base font-semibold text-text-primary">Configuración de Inventario</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Stock mínimo global" type="number" value={stockMinimo} onChange={(e) => setStockMinimo(e.target.value)} />
                <Select label="Alertas automáticas" options={siNoOptions} value={alertasAutomaticas} onChange={(e) => setAlertasAutomaticas(e.target.value)} />
                <Select label="Control de lotes" options={siNoOptions} value={controlLotes} onChange={(e) => setControlLotes(e.target.value)} />
              </div>
            </div>
          </motion.div>
        );
      case 'crm':
        return (
          <motion.div key="crm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <div className="bg-white rounded-xl border border-border p-5 space-y-5">
              <h3 className="text-base font-semibold text-text-primary">Configuración CRM</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Email notificaciones" type="email" value={emailNotificaciones} onChange={(e) => setEmailNotificaciones(e.target.value)} />
                <Input label="Tiempo respuesta (horas)" type="number" value={tiempoRespuesta} onChange={(e) => setTiempoRespuesta(e.target.value)} />
                <Select label="Recordatorios automáticos" options={siNoOptions} value={recordatoriosAuto} onChange={(e) => setRecordatoriosAuto(e.target.value)} />
              </div>
            </div>
          </motion.div>
        );
      case 'notificaciones':
        return (
          <motion.div key="notificaciones" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <div className="bg-white rounded-xl border border-border p-5 space-y-5">
              <h3 className="text-base font-semibold text-text-primary">Configuración de Notificaciones</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select label="Alertas de stock" options={siNoOptions} value={alertasStock} onChange={(e) => setAlertasStock(e.target.value)} />
                <Select label="Alertas de ventas" options={siNoOptions} value={alertasVentas} onChange={(e) => setAlertasVentas(e.target.value)} />
                <Select label="Reportes diarios" options={siNoOptions} value={reportesDiarios} onChange={(e) => setReportesDiarios(e.target.value)} />
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Configuración</h1>
        <p className="text-sm text-text-secondary mt-1">Administra la configuración del sistema MegaMarket</p>
      </div>

      <div className="flex gap-1 p-1 bg-gray-100 rounded-lg w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab.key
                ? 'bg-white text-primary-500 shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tabContent(activeTab)}
      </AnimatePresence>

      <div className="flex justify-end pt-2">
        <Button variant="primary" icon={Save} onClick={handleSave} isLoading={saving}>
          Guardar Configuración
        </Button>
      </div>

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

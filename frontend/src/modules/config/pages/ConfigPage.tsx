import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2, Settings, Users, Upload, Save, Moon, Sun,
  Bell, Mail, Globe, CalendarDays, Edit3, Trash2, ToggleLeft, ToggleRight,
} from 'lucide-react';
import Button from '@shared/components/ui/Button';
import Input from '@shared/components/ui/Input';
import Select from '@shared/components/ui/Select';
import Badge from '@shared/components/ui/Badge';
import Card from '@shared/components/ui/Card';
import Table from '@shared/components/data/Table';
import Breadcrumb from '@shared/components/ui/Breadcrumb';

type TabKey = 'empresa' | 'preferencias' | 'usuarios';

const tabs: { key: TabKey; label: string; icon: React.FC<{ className?: string }> }[] = [
  { key: 'empresa', label: 'Empresa', icon: Building2 },
  { key: 'preferencias', label: 'Preferencias', icon: Settings },
  { key: 'usuarios', label: 'Usuarios', icon: Users },
];

const monedaOptions = [
  { value: 'USD', label: 'USD - Dólar' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'COP', label: 'COP - Peso Colombiano' },
];

const languageOptions = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'Inglés' },
];

const dateFormatOptions = [
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
];

const mockUsuarios = [
  { id: '1', nombre: 'Admin Principal', email: 'admin@sistema.com', rol: 'Administrador', estado: 'activo', ultimoAcceso: '2026-07-07 09:30' },
  { id: '2', nombre: 'María López', email: 'mlopez@sistema.com', rol: 'Ventas', estado: 'activo', ultimoAcceso: '2026-07-06 14:15' },
  { id: '3', nombre: 'Juan Pérez', email: 'jperez@sistema.com', rol: 'Almacén', estado: 'activo', ultimoAcceso: '2026-07-05 11:00' },
  { id: '4', nombre: 'Carmen Silva', email: 'csilva@sistema.com', rol: 'Contabilidad', estado: 'inactivo', ultimoAcceso: '2026-06-28 16:45' },
  { id: '5', nombre: 'Daniel Castro', email: 'dcastro@sistema.com', rol: 'Soporte', estado: 'activo', ultimoAcceso: '2026-07-07 08:00' },
];

export default function ConfigPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('empresa');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({ email: true, push: false, sms: true });

  const usersColumns = [
    { key: 'nombre', label: 'Nombre', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'rol', label: 'Rol', sortable: true },
    {
      key: 'estado', label: 'Estado', sortable: true,
      render: (value: string) => (
        <Badge variant={value === 'activo' ? 'success' : 'error'} size="sm">
          {value === 'activo' ? 'Activo' : 'Inactivo'}
        </Badge>
      ),
    },
    { key: 'ultimoAcceso', label: 'Último Acceso', sortable: true },
    {
      key: 'acciones', label: 'Acciones', sortable: false,
      render: () => (
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#8B5CF6] hover:bg-[#F8F7FC] transition-colors" title="Editar">
            <Edit3 className="h-4 w-4" />
          </button>
          <button className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#EF4444] hover:bg-red-50 transition-colors" title="Eliminar">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <Breadcrumb items={[{ label: 'Inicio', href: '/' }, { label: 'Configuración' }]} />

      <div>
        <h1 className="text-2xl font-bold text-[#2D2D2D]">Configuración</h1>
        <p className="text-sm text-[#6B7280] mt-1">Administra la configuración del sistema</p>
      </div>

      <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive ? 'bg-white text-[#8B5CF6] shadow-sm' : 'text-[#6B7280] hover:text-[#2D2D2D]'}
              `.trim()}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'empresa' && (
          <motion.div
            key="empresa"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <Card title="Información de la Empresa">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input label="Nombre Empresa" defaultValue="Mi Empresa S.A." placeholder="Ingrese el nombre" />
                <Input label="RUC" defaultValue="1799999999001" placeholder="Ingrese el RUC" />
                <div className="md:col-span-2">
                  <Input label="Dirección" defaultValue="Av. Principal N52-123" placeholder="Ingrese la dirección" />
                </div>
                <Input label="Teléfono" defaultValue="+593 2 3456 789" placeholder="Ingrese el teléfono" />
                <Input label="Email" defaultValue="info@miempresa.com" placeholder="Ingrese el email" />
              </div>
            </Card>

            <Card title="Configuración Regional">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Select label="Moneda" options={monedaOptions} defaultValue="USD" />
                <Input label="IVA Porcentaje" defaultValue="15" type="number" placeholder="%" />
              </div>
            </Card>

            <Card title="Logo de la Empresa">
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#8B5CF6]/40 transition-colors cursor-pointer">
                <Upload className="h-10 w-10 text-[#9CA3AF] mx-auto mb-3" />
                <p className="text-sm font-medium text-[#2D2D2D]">Arrastra tu logo aquí</p>
                <p className="text-xs text-[#6B7280] mt-1">PNG, JPG o SVG · Max 2MB</p>
                <Button variant="outline" size="sm" className="mt-4">
                  Seleccionar archivo
                </Button>
              </div>
            </Card>

            <div className="flex justify-end">
              <Button variant="primary" icon={Save}>
                Guardar Cambios
              </Button>
            </div>
          </motion.div>
        )}

        {activeTab === 'preferencias' && (
          <motion.div
            key="preferencias"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <Card title="Apariencia">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon className="h-5 w-5 text-[#6B7280]" /> : <Sun className="h-5 w-5 text-[#6B7280]" />}
                  <div>
                    <p className="text-sm font-medium text-[#2D2D2D]">Modo Oscuro</p>
                    <p className="text-xs text-[#6B7280]">Cambia entre tema claro y oscuro</p>
                  </div>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${darkMode ? 'bg-[#8B5CF6]' : 'bg-gray-300'}`}
                >
                  <motion.div
                    animate={{ x: darkMode ? 24 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                  />
                </button>
              </div>
            </Card>

            <Card title="Idioma y Región">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Select label="Idioma" options={languageOptions} defaultValue="es" />
                <Select label="Formato de Fecha" options={dateFormatOptions} defaultValue="DD/MM/YYYY" />
                <Input label="Elementos por Página" defaultValue="10" type="number" min={5} max={100} />
              </div>
            </Card>

            <Card title="Notificaciones">
              <div className="space-y-4">
                {[
                  { key: 'email' as const, label: 'Notificaciones por Email', desc: 'Recibe alertas e informes por correo', icon: Mail },
                  { key: 'push' as const, label: 'Notificaciones Push', desc: 'Notificaciones en tiempo real en el navegador', icon: Bell },
                  { key: 'sms' as const, label: 'Notificaciones SMS', desc: 'Alertas vía mensaje de texto', icon: Globe },
                ].map((item) => {
                  const Icon = item.icon;
                  const isOn = notifications[item.key];
                  return (
                    <div key={item.key} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-[#6B7280]" />
                        <div>
                          <p className="text-sm font-medium text-[#2D2D2D]">{item.label}</p>
                          <p className="text-xs text-[#6B7280]">{item.desc}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${isOn ? 'bg-[#8B5CF6]' : 'bg-gray-300'}`}
                      >
                        <motion.div
                          animate={{ x: isOn ? 24 : 2 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </Card>

            <div className="flex justify-end">
              <Button variant="primary" icon={Save}>
                Guardar Cambios
              </Button>
            </div>
          </motion.div>
        )}

        {activeTab === 'usuarios' && (
          <motion.div
            key="usuarios"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <Card title="Usuarios del Sistema">
              <Table
                columns={usersColumns}
                data={mockUsuarios}
                emptyMessage="No hay usuarios registrados"
              />
            </Card>

            <div className="flex justify-end">
              <Button variant="primary" icon={Users}>
                Agregar Usuario
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Calendar, Clock, Package, ShoppingBag, CheckCircle, Eye, EyeOff } from 'lucide-react';
import Input from '@shared/components/ui/Input';
import Button from '@shared/components/ui/Button';

const MOCK_USER = {
  name: 'Admin Principal',
  email: 'admin@megamarket.com',
  role: 'Administrador',
  sucursal: 'Matriz Quito',
  telefono: '0991234567',
  created: '01/01/2024',
  lastAccess: 'Hoy 15:30',
  productosGestionados: 1250,
  ventasRegistradas: 342,
};

export default function PerfilPage() {
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });
  const [saving, setSaving] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [nombre, setNombre] = useState(MOCK_USER.name);
  const [email, setEmail] = useState(MOCK_USER.email);
  const [telefono, setTelefono] = useState(MOCK_USER.telefono);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const initials = MOCK_USER.name.split(' ').map((n) => n[0]).slice(0, 2).join('');

  const stats = [
    { icon: Calendar, label: 'Usuario desde', value: MOCK_USER.created },
    { icon: Clock, label: 'Último acceso', value: MOCK_USER.lastAccess },
    { icon: Package, label: 'Productos gestionados', value: MOCK_USER.productosGestionados.toLocaleString() },
    { icon: ShoppingBag, label: 'Ventas registradas', value: MOCK_USER.ventasRegistradas.toLocaleString() },
  ];

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setToast({ message: 'Perfil actualizado exitosamente', visible: true });
      setTimeout(() => setToast({ message: '', visible: false }), 3000);
    }, 1000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Mi Perfil</h1>
        <p className="text-sm text-text-secondary mt-1">Gestiona tu información personal y configuración de cuenta</p>
      </div>

      <div className="bg-white rounded-xl border border-border p-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-primary-500 text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
            {initials}
          </div>
          <div>
            <h2 className="text-xl font-bold text-text-primary">{MOCK_USER.name}</h2>
            <p className="text-sm text-text-secondary">{MOCK_USER.role}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 text-xs text-text-secondary">
                <User className="w-3.5 h-3.5" />
                {MOCK_USER.sucursal}
              </span>
              <span className="text-text-secondary">·</span>
              <span className="inline-flex items-center gap-1 text-xs bg-success/10 text-success px-2 py-0.5 rounded-full font-medium">
                Activo
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl border border-border p-4">
              <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-primary-500" />
              </div>
              <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
              <p className="text-xs text-text-secondary mt-0.5">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-border p-5 space-y-6">
        <h3 className="text-base font-semibold text-text-primary">Información Personal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          <Input label="Sucursal" value={MOCK_USER.sucursal} disabled />
          <Input label="Rol" value={MOCK_USER.role} disabled />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border p-5 space-y-6">
        <h3 className="text-base font-semibold text-text-primary">Cambiar Contraseña</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Input
              label="Contraseña actual"
              type={showCurrent ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-[38px] text-text-secondary hover:text-text-primary"
            >
              {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <div className="relative">
            <Input
              label="Nueva contraseña"
              type={showNew ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-[38px] text-text-secondary hover:text-text-primary"
            >
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <div className="relative">
            <Input
              label="Confirmar contraseña"
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-[38px] text-text-secondary hover:text-text-primary"
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button variant="primary" icon={User} onClick={handleSave} isLoading={saving}>
          Actualizar Perfil
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

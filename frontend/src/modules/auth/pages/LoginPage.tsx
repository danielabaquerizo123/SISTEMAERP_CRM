import { useState, useContext, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@shared/context/AuthContext';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, LogIn } from 'lucide-react';

export default function LoginPage() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 200));
    const success = await auth?.login(email, password);
    setLoading(false);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Credenciales inválidas');
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-primary">Iniciar sesión</h2>
        <p className="text-sm text-text-secondary mt-1">Ingresa tus credenciales</p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-lg bg-error/10 border border-error/20 text-sm text-error"
        >
          {error}
        </motion.div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="usuario@megamarket.com"
            className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-white text-sm text-text-primary placeholder:text-text-secondary/40 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">Contraseña</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-border bg-white text-sm text-text-primary placeholder:text-text-secondary/40 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-sm shadow-primary-500/20"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </div>

      <div className="p-3 rounded-lg bg-gray-50 border border-border text-xs text-text-secondary leading-relaxed">
        <p className="font-medium text-text-primary mb-1">Acceso de prueba:</p>
        <p>
          <span className="font-mono">admin@megamarket.com</span> / <span className="font-mono">123456</span>
        </p>
        <p className="text-[10px] text-text-secondary/60 mt-1">Cualquier usuario con contraseña 123456</p>
      </div>
    </motion.form>
  );
}

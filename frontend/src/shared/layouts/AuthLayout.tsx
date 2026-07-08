import { useState, useEffect, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '@shared/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

import supermercado1 from '@/assets/login/supermercado1.jpg';
import supermercado2 from '@/assets/login/supermercado2.jpg';
import supermercado3 from '@/assets/login/supermercado3.jpg';
import supermercado4 from '@/assets/login/supermercado4.jpg';

const slides = [
  {
    src: supermercado1,
    title: 'Pasillos Modernos',
    subtitle: 'Gestión inteligente de supermercados',
    gradient: 'from-[#D71920] via-[#B51218] to-[#8B0000]',
  },
  {
    src: supermercado2,
    title: 'Productos Frescos',
    subtitle: 'Control de inventario y ventas',
    gradient: 'from-[#B51218] via-[#8B0000] to-[#660000]',
  },
  {
    src: supermercado3,
    title: 'Cajas de Pago',
    subtitle: 'Experiencia del cliente',
    gradient: 'from-[#D71920] via-[#B51218] to-[#8B0000]',
  },
  {
    src: supermercado4,
    title: 'Centro Logístico',
    subtitle: 'Inventario y distribución eficiente',
    gradient: 'from-[#8B0000] via-[#B51218] to-[#D71920]',
  },
];

export default function AuthLayout() {
  const auth = useContext(AuthContext);
  const [current, setCurrent] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  if (auth?.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const slide = slides[current];

  const handleImgError = (i: number) => {
    setImgErrors((prev) => ({ ...prev, [i]: true }));
  };

  const fallbackBg = (i: number) => {
    const colors = ['#D71920', '#006450', '#19376D', '#78321E'];
    return colors[i % colors.length];
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gray-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex items-center gap-3"
            >
              <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" fill="white" stroke="white" strokeWidth="1.5"/>
                  <path d="M9 22V12H15V22" fill="#D71920"/>
                </svg>
              </div>
              <div>
                <p className="text-lg font-bold text-white leading-tight">MegaMarket</p>
                <p className="text-[9px] text-white/50 uppercase tracking-widest font-medium">ERP + CRM</p>
              </div>
            </motion.div>
          </div>

          <div className="flex-1 flex items-center">
            <div className="w-full max-w-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-full h-48 mb-8 flex items-center justify-center overflow-hidden rounded-xl">
                    {imgErrors[current] ? (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ backgroundColor: fallbackBg(current) }}
                      >
                        <div className="text-center">
                          <svg className="w-12 h-12 mx-auto mb-2 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-xs text-white/50">{slide.title}</p>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={slide.src}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                        onError={() => handleImgError(current)}
                      />
                    )}
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-2 leading-tight tracking-tight">
                    {slide.title}
                  </h1>
                  <p className="text-base text-white/70 font-light leading-relaxed">
                    {slide.subtitle}
                  </p>
                  <div className="flex items-center gap-2 mt-7">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === current ? 'w-8 bg-white' : 'w-1.5 bg-white/25 hover:bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center justify-between text-white/30 text-[11px]">
            <span>© 2024 MegaMarket</span>
            <div className="flex items-center gap-4">
              <span className="hover:text-white/50 cursor-pointer transition-colors">Términos</span>
              <span className="hover:text-white/50 cursor-pointer transition-colors">Privacidad</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-surface">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-primary-500 flex items-center justify-center shadow-md mb-3">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" fill="white"/>
                <path d="M9 22V12H15V22" fill="#D71920"/>
              </svg>
            </div>
            <p className="text-xl font-bold text-text-primary">MegaMarket</p>
            <p className="text-[10px] text-text-secondary uppercase tracking-widest font-medium">ERP + CRM</p>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

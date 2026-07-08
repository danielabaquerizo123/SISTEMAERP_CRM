import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

const typeConfig: Record<ToastType, { icon: React.FC<{ className?: string }>; bg: string; border: string; iconColor: string }> = {
  success: {
    icon: CheckCircle,
    bg: 'bg-white',
    border: 'border-l-[#10B981]',
    iconColor: 'text-[#10B981]',
  },
  error: {
    icon: AlertCircle,
    bg: 'bg-white',
    border: 'border-l-[#EF4444]',
    iconColor: 'text-[#EF4444]',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-white',
    border: 'border-l-[#F59E0B]',
    iconColor: 'text-[#F59E0B]',
  },
  info: {
    icon: Info,
    bg: 'bg-white',
    border: 'border-l-[#3B82F6]',
    iconColor: 'text-[#3B82F6]',
  },
};

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  isVisible,
  onClose,
}) => {
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [isVisible, onClose]);

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className={`
            fixed top-4 right-4 z-[100] max-w-sm w-full
            rounded-lg shadow-lg border border-[#E5E7EB] border-l-4
            ${config.bg} ${config.border}
            px-4 py-3
          `.trim()}
        >
          <div className="flex items-start gap-3">
            <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${config.iconColor}`} />
            <p className="flex-1 text-sm text-[#2D2D2D]">{message}</p>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-[#6B7280] hover:text-[#2D2D2D] hover:bg-[#F8F7FC] transition-colors flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;

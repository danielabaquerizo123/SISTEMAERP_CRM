import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';

type AlertVariant = 'success' | 'warning' | 'error' | 'info';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  message: string;
  onClose?: () => void;
}

const variantConfig: Record<AlertVariant, { icon: React.FC<{ className?: string }>; border: string; bg: string; iconColor: string }> = {
  success: {
    icon: CheckCircle,
    border: 'border-l-[#10B981]',
    bg: 'bg-emerald-50',
    iconColor: 'text-[#10B981]',
  },
  warning: {
    icon: AlertTriangle,
    border: 'border-l-[#F59E0B]',
    bg: 'bg-amber-50',
    iconColor: 'text-[#F59E0B]',
  },
  error: {
    icon: AlertCircle,
    border: 'border-l-[#EF4444]',
    bg: 'bg-red-50',
    iconColor: 'text-[#EF4444]',
  },
  info: {
    icon: Info,
    border: 'border-l-[#3B82F6]',
    bg: 'bg-blue-50',
    iconColor: 'text-[#3B82F6]',
  },
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  message,
  onClose,
}) => {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        className={`
          flex items-start gap-3 rounded-lg border-l-4 p-4
          ${config.border} ${config.bg}
        `.trim()}
      >
        <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${config.iconColor}`} />
        <div className="flex-1 min-w-0">
          {title && (
            <p className="text-sm font-semibold text-[#2D2D2D]">{title}</p>
          )}
          <p className="text-sm text-[#6B7280]">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#6B7280] hover:text-[#2D2D2D] hover:bg-black/5 transition-colors flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Alert;

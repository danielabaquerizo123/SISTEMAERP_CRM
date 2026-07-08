import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  subtitle?: string;
  color?: string;
  prefix?: string;
  suffix?: string;
  animated?: boolean;
  progress?: number;
}

function useCounter(end: number, duration = 1.5, start = 0) {
  const [count, setCount] = useState(start);
  const ref = useRef<number>(start);
  const inView = useInView({ once: true });

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      ref.current = start + (end - start) * eased;
      setCount(ref.current);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, start, inView]);

  const style = count >= 1000 ? 'compact' : 'full';
  const display =
    style === 'compact'
      ? `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}k`
      : count.toFixed(0);

  return { display, inView };
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value: rawValue,
  icon: Icon,
  trend,
  trendLabel,
  subtitle,
  color = '#8B5CF6',
  prefix = '',
  suffix = '',
  animated = true,
  progress,
}) => {
  const numericValue =
    typeof rawValue === 'string'
      ? parseFloat(rawValue.replace(/[$,]/g, ''))
      : rawValue;

  const { display, inView: isVisible } = useCounter(
    animated ? numericValue : 0,
    1.5
  );

  const displayValue = animated
    ? rawValue
    : rawValue;

  const isTrendPositive = trend !== undefined && trend > 0;
  const isTrendNegative = trend !== undefined && trend < 0;
  const isTrendNeutral = trend === 0;

  return (
    <motion.div
      ref={useRef(null)}
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.1)' }}
      className="bg-white rounded-2xl border border-gray-100 p-6 transition-shadow duration-300 relative overflow-hidden group"
    >
      <div
        className="absolute inset-0 opacity-[0.03] transition-opacity duration-300 group-hover:opacity-[0.06]"
        style={{
          background: `linear-gradient(135deg, ${color} 0%, transparent 60%)`,
        }}
      />

      <div className="flex items-start justify-between relative">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-500 tracking-wide uppercase">
            {title}
          </p>
          <div className="flex items-baseline gap-1.5 mt-2">
            {prefix && (
              <span className="text-2xl font-bold text-gray-400">{prefix}</span>
            )}
            <motion.span
              key={displayValue}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-gray-900 tracking-tight"
            >
              {displayValue}
            </motion.span>
            {suffix && (
              <span className="text-sm font-medium text-gray-400">{suffix}</span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-2">
            {trend !== undefined && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className={`
                  inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold
                  ${isTrendPositive ? 'bg-emerald-50 text-emerald-600' : ''}
                  ${isTrendNegative ? 'bg-red-50 text-red-600' : ''}
                  ${isTrendNeutral ? 'bg-gray-50 text-gray-500' : ''}
                `}
              >
                {isTrendPositive && <TrendingUp className="w-3.5 h-3.5" />}
                {isTrendNegative && <TrendingDown className="w-3.5 h-3.5" />}
                {isTrendNeutral && <Minus className="w-3.5 h-3.5" />}
                <span>
                  {isTrendPositive ? '+' : ''}
                  {trend}%
                </span>
              </motion.div>
            )}
            {trendLabel && (
              <span className="text-xs text-gray-400">{trendLabel}</span>
            )}
          </div>
        </div>
        <motion.div
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 relative overflow-hidden"
          style={{ backgroundColor: `${color}12` }}
        >
          <Icon className="w-7 h-7" style={{ color }} strokeWidth={1.5} />
        </motion.div>
      </div>

      {subtitle && (
        <p className="text-sm text-gray-500 mt-3 relative">{subtitle}</p>
      )}

      {progress !== undefined && (
        <div className="mt-4 relative">
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.min(progress, 100)}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ backgroundColor: color }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default StatsCard;

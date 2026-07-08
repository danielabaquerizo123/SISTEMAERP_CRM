interface BadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'gray';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

const classes: Record<string, string> = {
  primary: 'bg-primary-50 text-primary-600 border-primary-200',
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  error: 'bg-error/10 text-error border-error/20',
  info: 'bg-info/10 text-info border-info/20',
  gray: 'bg-gray-100 text-gray-500 border-gray-200',
};

const sizeClasses = {
  sm: 'px-1.5 py-0.5 text-[10px]',
  md: 'px-2 py-0.5 text-[11px]',
};

export default function Badge({ variant = 'gray', size = 'sm', children }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full font-medium border ${classes[variant]} ${sizeClasses[size]}`}>
      {children}
    </span>
  );
}

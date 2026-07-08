interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  title?: string;
}

const paddings = { sm: 'p-4', md: 'p-5', lg: 'p-6' };

export default function Card({ children, className = '', padding = 'md', hover = false, title }: CardProps) {
  return (
    <div className={`bg-white rounded-xl border border-border ${paddings[padding]} ${hover ? 'hover:shadow-md transition-shadow duration-300' : ''} ${className}`}>
      {title && <h3 className="text-base font-semibold text-text-primary mb-4">{title}</h3>}
      {children}
    </div>
  );
}

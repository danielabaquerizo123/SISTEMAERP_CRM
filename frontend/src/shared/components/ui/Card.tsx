interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const paddings = { sm: 'p-4', md: 'p-5', lg: 'p-6' };

export default function Card({ children, className = '', padding = 'md', hover = false }: CardProps) {
  return (
    <div className={`bg-white rounded-xl border border-border ${paddings[padding]} ${hover ? 'hover:shadow-md transition-shadow duration-300' : ''} ${className}`}>
      {children}
    </div>
  );
}

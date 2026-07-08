import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center gap-1 text-sm">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={item.label + index}>
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-[#6B7280]" />
            )}
            {isLast || !item.href ? (
              <span
                className={
                  isLast
                    ? 'font-semibold text-[#2D2D2D]'
                    : 'text-[#6B7280]'
                }
              >
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                className="text-[#6B7280] hover:text-[#8B5CF6] transition-colors"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;

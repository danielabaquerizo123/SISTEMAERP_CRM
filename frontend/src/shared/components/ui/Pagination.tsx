import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const delta = 2;
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);
    if (left > 2) pages.push('...');
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  if (totalPages <= 1) return null;

  const baseBtn =
    'inline-flex items-center justify-center rounded-lg border border-[#E5E7EB] text-sm font-medium transition-colors';
  const btnSize = 'min-w-[36px] h-9 px-2';

  return (
    <nav className="flex items-center justify-center gap-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${baseBtn} ${btnSize} ${
          currentPage === 1
            ? 'text-[#6B7280] opacity-50 cursor-not-allowed'
            : 'text-[#6B7280] hover:bg-[#F8F7FC] hover:text-[#2D2D2D]'
        }`}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {getPageNumbers().map((page, index) =>
        typeof page === 'string' ? (
          <span key={`ellipsis-${index}`} className={`${btnSize} inline-flex items-center justify-center text-sm text-[#6B7280]`}>
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`${baseBtn} ${btnSize} ${
              page === currentPage
                ? 'bg-[#8B5CF6] text-white border-[#8B5CF6] hover:bg-[#7C3AED]'
                : 'text-[#6B7280] hover:bg-[#F8F7FC] hover:text-[#2D2D2D]'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${baseBtn} ${btnSize} ${
          currentPage === totalPages
            ? 'text-[#6B7280] opacity-50 cursor-not-allowed'
            : 'text-[#6B7280] hover:bg-[#F8F7FC] hover:text-[#2D2D2D]'
        }`}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
};

export default Pagination;

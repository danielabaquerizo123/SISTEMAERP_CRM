import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Inbox,
} from 'lucide-react';

export interface Column<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

interface TableProps<T = any> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: string) => void;
  selectedRows?: string[];
  onSelectRow?: (id: string) => void;
  onSelectAll?: () => void;
  hasSelection?: boolean;
  idKey?: string;
}

const SkeletonRow: React.FC<{ cols: number }> = ({ cols }) => (
  <tr>
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: `${60 + Math.random() * 40}%` }} />
      </td>
    ))}
  </tr>
);

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: 0.2 },
  }),
};

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  onRowClick,
  isLoading = false,
  emptyMessage = 'No se encontraron registros',
  sortColumn,
  sortDirection,
  onSort,
  selectedRows = [],
  onSelectRow,
  onSelectAll,
  hasSelection = false,
  idKey = 'id',
}) => {
  const allSelected = data.length > 0 && selectedRows.length === data.length;
  const someSelected = selectedRows.length > 0 && selectedRows.length < data.length;

  const renderSortIcon = (column: Column) => {
    if (!column.sortable) return null;
    if (sortColumn !== column.key) {
      return <ChevronsUpDown className="h-3.5 w-3.5 ml-1 text-gray-400 flex-shrink-0" />;
    }
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-3.5 w-3.5 ml-1 text-primary-500 flex-shrink-0" />
    ) : (
      <ChevronDown className="h-3.5 w-3.5 ml-1 text-primary-500 flex-shrink-0" />
    );
  };

  const handleHeaderClick = (column: Column) => {
    if (column.sortable && onSort) {
      onSort(column.key);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-border">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-gray-50">
            <tr>
              {hasSelection && (
                <th className="px-6 py-3 text-left w-12">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary-500 focus:ring-primary-500 h-4 w-4"
                      checked={allSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = someSelected;
                      }}
                      onChange={() => onSelectAll?.()}
                    />
                  </label>
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`
                    px-6 py-3 text-left text-xs uppercase tracking-wider text-text-secondary font-semibold
                    ${column.sortable ? 'cursor-pointer select-none hover:text-text-primary' : ''}
                  `.trim()}
                  onClick={() => handleHeaderClick(column)}
                >
                  <div className="flex items-center gap-1">
                    {column.label}
                    {renderSortIcon(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-border bg-white">
            {isLoading ? (
              <>
                {Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonRow key={i} cols={columns.length + (hasSelection ? 1 : 0)} />
                ))}
              </>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (hasSelection ? 1 : 0)}
                  className="px-6 py-16 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-3 text-text-secondary">
                    <Inbox className="h-12 w-12 text-gray-300" />
                    <p className="text-sm font-medium">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              <AnimatePresence mode="popLayout">
                {data.map((row, index) => {
                  const rowId = row[idKey];
                  const isSelected = selectedRows.includes(rowId);

                  return (
                    <motion.tr
                      key={rowId ?? index}
                      custom={index}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
                      layout
                      className={`
                        transition-colors duration-150
                        ${onRowClick ? 'cursor-pointer' : ''}
                        ${isSelected ? 'bg-primary-50/50' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                        hover:bg-gray-50
                      `.trim()}
                      onClick={() => onRowClick?.(row)}
                    >
                      {hasSelection && (
                        <td className="px-6 py-4 w-12" onClick={(e) => e.stopPropagation()}>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-primary-500 focus:ring-primary-500 h-4 w-4"
                              checked={isSelected}
                              onChange={() => onSelectRow?.(rowId)}
                            />
                          </label>
                        </td>
                      )}
                      {columns.map((column) => (
                        <td key={column.key} className="px-6 py-4 text-sm text-text-primary whitespace-nowrap">
                          {column.render
                            ? column.render(row[column.key], row)
                            : row[column.key] ?? '-'}
                        </td>
                      ))}
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

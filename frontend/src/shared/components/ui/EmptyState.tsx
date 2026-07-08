import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 rounded-full bg-[#F8F7FC] flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-[#6B7280]" />
      </div>
      <h3 className="text-lg font-semibold text-[#2D2D2D] mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-[#6B7280] text-center max-w-sm mb-6">{description}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;

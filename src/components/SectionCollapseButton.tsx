import React from 'react';

interface SectionCollapseButtonProps {
  isCollapsed: boolean;
  onToggle: () => void;
  className?: string;
  id?: string;
}

export const SectionCollapseButton: React.FC<SectionCollapseButtonProps> = ({
  isCollapsed,
  onToggle,
  className = '',
  id,
}) => {
  return (
    <button
      id={id}
      type="button"
      onClick={onToggle}
      aria-expanded={!isCollapsed}
      className={`px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#0d1527] hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-xs sm:text-sm font-medium text-slate-200 hover:text-white transition-all shadow-sm cursor-pointer inline-flex items-center justify-center flex-shrink-0 active:scale-95 min-w-[80px] text-center ${className}`}
    >
      {isCollapsed ? 'Expand' : 'Collapse'}
    </button>
  );
};

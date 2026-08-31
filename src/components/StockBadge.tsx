import React from 'react';

export type StockStatusType = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';

export interface StockStatusInfo {
  type: StockStatusType;
  emoji: '🟢' | '🟡' | '🔴';
  label: string;
  shortLabel: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  dotClass: string;
  glowClass: string;
}

export function getStockStatusInfo(stockQuantity: number): StockStatusInfo {
  if (stockQuantity <= 0) {
    return {
      type: 'OUT_OF_STOCK',
      emoji: '🔴',
      label: '🔴 Out of Stock',
      shortLabel: 'Out of Stock',
      bgClass: 'bg-red-950/70',
      borderClass: 'border-red-500/40',
      textClass: 'text-red-400',
      dotClass: 'bg-red-500',
      glowClass: 'shadow-red-500/20'
    };
  }
  if (stockQuantity <= 3) {
    return {
      type: 'LOW_STOCK',
      emoji: '🟡',
      label: `🟡 Only ${stockQuantity} Available`,
      shortLabel: `Only ${stockQuantity} Left`,
      bgClass: 'bg-amber-950/70',
      borderClass: 'border-amber-500/40',
      textClass: 'text-amber-300',
      dotClass: 'bg-amber-400',
      glowClass: 'shadow-amber-500/20'
    };
  }
  return {
    type: 'IN_STOCK',
    emoji: '🟢',
    label: '🟢 In Stock — Ready to Dispatch',
    shortLabel: 'In Stock — Ready to Dispatch',
    bgClass: 'bg-emerald-950/70',
    borderClass: 'border-emerald-500/40',
    textClass: 'text-emerald-300',
    dotClass: 'bg-emerald-400',
    glowClass: 'shadow-emerald-500/20'
  };
}

interface StockBadgeProps {
  stockQuantity: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showExactUnits?: boolean;
  className?: string;
}

export const StockBadge: React.FC<StockBadgeProps> = ({
  stockQuantity,
  size = 'md',
  showExactUnits = false,
  className = ''
}) => {
  const info = getStockStatusInfo(stockQuantity);

  const sizeClasses = {
    xs: 'text-[10px] px-2 py-0.5 gap-1',
    sm: 'text-[11px] px-2.5 py-0.5 gap-1.5',
    md: 'text-xs px-3 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2'
  };

  return (
    <span
      className={`inline-flex items-center font-bold rounded-full border backdrop-blur-md transition-all shadow-sm ${info.bgClass} ${info.borderClass} ${info.textClass} ${sizeClasses[size]} ${className}`}
    >
      <span className="text-[1.1em] leading-none">{info.emoji}</span>
      <span className="tracking-tight whitespace-nowrap">
        {info.type === 'IN_STOCK' && (
          <>
            In Stock — Ready to Dispatch
            {showExactUnits && <span className="opacity-80 font-normal ml-1">({stockQuantity} Units)</span>}
          </>
        )}
        {info.type === 'LOW_STOCK' && `Only ${stockQuantity} Available`}
        {info.type === 'OUT_OF_STOCK' && 'Out of Stock'}
      </span>
    </span>
  );
};

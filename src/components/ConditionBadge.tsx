import React from 'react';
import { ProductCondition } from '../types';

export interface ConditionInfo {
  type: 'NEW' | 'USED' | 'REFURBISHED' | 'OPEN BOX';
  label: string;
  subLabel: string;
  badgeEmoji: string;
  badgeDotColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  badgeGlow: string;
  tagColor: string;
  defaultWarranty: string;
}

export function normalizeCondition(condition?: string): ConditionInfo['type'] {
  if (!condition) return 'USED';
  const upper = condition.toUpperCase().trim();
  if (upper.includes('NEW') || upper === 'BRAND NEW') return 'NEW';
  if (upper.includes('OPEN') || upper === 'OPEN BOX') return 'OPEN BOX';
  if (upper.includes('REFURB') || upper === 'FACTORY CERTIFIED' || upper === 'BULK REFURBISHED GRADE-A') return 'REFURBISHED';
  if (upper.includes('USED') || upper.includes('TESTED')) return 'USED';
  return 'USED';
}

export const CONDITION_DETAILS: Record<ConditionInfo['type'], ConditionInfo> = {
  NEW: {
    type: 'NEW',
    label: 'NEW',
    subLabel: 'Brand new / sealed',
    badgeEmoji: '🟢',
    badgeDotColor: 'bg-emerald-500',
    badgeBg: 'bg-emerald-950/80',
    badgeBorder: 'border-emerald-500/50',
    badgeText: 'text-emerald-300',
    badgeGlow: 'shadow-emerald-500/20',
    tagColor: 'text-emerald-400',
    defaultWarranty: '1-Year Official Warranty'
  },
  USED: {
    type: 'USED',
    label: 'USED',
    subLabel: 'Used but tested',
    badgeEmoji: '🔵',
    badgeDotColor: 'bg-blue-500',
    badgeBg: 'bg-blue-950/80',
    badgeBorder: 'border-blue-500/50',
    badgeText: 'text-blue-300',
    badgeGlow: 'shadow-blue-500/20',
    tagColor: 'text-blue-400',
    defaultWarranty: '7-Day Checking Warranty'
  },
  REFURBISHED: {
    type: 'REFURBISHED',
    label: 'REFURBISHED',
    subLabel: 'Professionally refurbished',
    badgeEmoji: '🟠',
    badgeDotColor: 'bg-orange-500',
    badgeBg: 'bg-orange-950/80',
    badgeBorder: 'border-orange-500/50',
    badgeText: 'text-orange-300',
    badgeGlow: 'shadow-orange-500/20',
    tagColor: 'text-orange-400',
    defaultWarranty: '1-Month Replacement Warranty'
  },
  'OPEN BOX': {
    type: 'OPEN BOX',
    label: 'OPEN BOX',
    subLabel: 'Opened/activated but unused or lightly used',
    badgeEmoji: '🟣',
    badgeDotColor: 'bg-purple-500',
    badgeBg: 'bg-purple-950/80',
    badgeBorder: 'border-purple-500/50',
    badgeText: 'text-purple-300',
    badgeGlow: 'shadow-purple-500/20',
    tagColor: 'text-purple-400',
    defaultWarranty: '15-Day Checking Warranty'
  }
};

export function getConditionInfo(condition?: string): ConditionInfo {
  const norm = normalizeCondition(condition);
  return CONDITION_DETAILS[norm];
}

interface ConditionBadgeProps {
  condition?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubLabel?: boolean;
  className?: string;
}

export const ConditionBadge: React.FC<ConditionBadgeProps> = ({
  condition,
  size = 'md',
  showSubLabel = false,
  className = ''
}) => {
  const info = getConditionInfo(condition);

  if (size === 'sm') {
    return (
      <span 
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md font-bold text-[10px] tracking-wide border backdrop-blur-md shadow-sm ${info.badgeBg} ${info.badgeBorder} ${info.badgeText} ${info.badgeGlow} ${className}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${info.badgeDotColor} animate-pulse`} />
        <span>{info.label}</span>
      </span>
    );
  }

  if (size === 'lg') {
    return (
      <div className={`flex flex-col gap-0.5 p-2 rounded-xl border backdrop-blur-md ${info.badgeBg} ${info.badgeBorder} ${info.badgeGlow} ${className}`}>
        <div className="flex items-center gap-2">
          <span className="text-sm">{info.badgeEmoji}</span>
          <span className={`font-black text-xs sm:text-sm tracking-wider uppercase ${info.badgeText}`}>
            {info.label}
          </span>
        </div>
        <p className="text-[11px] text-slate-300 font-medium">
          {info.subLabel}
        </p>
      </div>
    );
  }

  // Medium (default for cards & lists)
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border backdrop-blur-md shadow-md ${info.badgeBg} ${info.badgeBorder} ${info.badgeText} ${info.badgeGlow} ${className}`}>
      <span className="text-xs">{info.badgeEmoji}</span>
      <span className="font-extrabold text-[11px] uppercase tracking-wider">
        {info.label}
      </span>
      {showSubLabel && (
        <span className="text-[10px] text-slate-300 font-normal border-l border-white/20 pl-1.5 hidden sm:inline">
          {info.subLabel}
        </span>
      )}
    </div>
  );
};

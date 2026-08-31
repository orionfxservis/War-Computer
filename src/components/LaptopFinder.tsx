import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Check, 
  RotateCcw, 
  Zap, 
  ArrowRight, 
  GraduationCap, 
  Briefcase, 
  Laptop2, 
  Palette, 
  Code2, 
  Gamepad2, 
  Building, 
  Film,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Filter
} from 'lucide-react';
import { Product } from '../types';

export type LaptopUseCase = 
  | 'student' 
  | 'office' 
  | 'freelancing' 
  | 'graphic_design' 
  | 'programming' 
  | 'gaming' 
  | 'business' 
  | 'video_editing';

export type BudgetBracket = 
  | 'under_30k'
  | '30k_50k' 
  | '50k_75k' 
  | '75k_100k' 
  | '100k_150k' 
  | '150k_plus';

export interface UseCaseOption {
  id: LaptopUseCase;
  label: string;
  emoji: string;
  description: string;
  recommendedSpecs: string;
}

export interface BudgetOption {
  id: BudgetBracket;
  label: string;
  suggestedCategory: string;
  categoryEmoji: string;
  minPrice: number;
  maxPrice: number;
  subText: string;
  popularModels?: string;
}

export const USE_CASES: UseCaseOption[] = [
  {
    id: 'student',
    label: 'Student',
    emoji: '🎓',
    description: 'Online classes, assignments, browsing & presentations with long battery life.',
    recommendedSpecs: 'Intel Core i3/i5 or Ryzen 3/5 • 8GB-16GB RAM • Fast SSD'
  },
  {
    id: 'office',
    label: 'Office',
    emoji: '💼',
    description: 'Excel, accounting, email, ERP software, and multi-tab web productivity.',
    recommendedSpecs: 'Intel Core i5/i7 (8th-11th Gen) • 16GB RAM • Reliable keyboard'
  },
  {
    id: 'freelancing',
    label: 'Freelancing',
    emoji: '👨‍💻',
    description: 'Upwork, Fiverr, Zoom meetings, content research, and dependable all-day use.',
    recommendedSpecs: 'Full HD IPS Display • 16GB RAM • 512GB SSD • 4+ Hrs Battery'
  },
  {
    id: 'graphic_design',
    label: 'Graphic Design',
    emoji: '🎨',
    description: 'Photoshop, Illustrator, Canva, Figma & color-accurate graphic work.',
    recommendedSpecs: '100% sRGB / Retina display • 16GB+ RAM • Dedicated / Iris GPU'
  },
  {
    id: 'programming',
    label: 'Programming',
    emoji: '💻',
    description: 'VS Code, Python, Node, Docker, React, VMs and multi-screen workflows.',
    recommendedSpecs: 'Multi-Core CPU (Ryzen 7 / Core i7) • 16GB-32GB RAM • Fast NVMe'
  },
  {
    id: 'gaming',
    label: 'Gaming',
    emoji: '🎮',
    description: 'GTA V, Warzone, Valorant, CS2, Cyberpunk with high FPS & dedicated GPU.',
    recommendedSpecs: 'RTX 3050/4050/4060+ GPU • 144Hz Screen • Dual-Fan Cooling'
  },
  {
    id: 'business',
    label: 'Business',
    emoji: '🏢',
    description: 'Executive ultra-lightweight design, metal build, security & premium build.',
    recommendedSpecs: 'ThinkPad X1 / EliteBook / MacBook • vPro Security • Under 1.4kg'
  },
  {
    id: 'video_editing',
    label: 'Video Editing',
    emoji: '🎬',
    description: 'Premiere Pro, DaVinci Resolve, 4K rendering, After Effects & timeline scrub.',
    recommendedSpecs: 'Dedicated RTX Graphics / Apple Silicon M2/M3/M4 • 16GB-32GB RAM'
  }
];

export const BUDGET_BRACKETS: BudgetOption[] = [
  {
    id: 'under_30k',
    label: 'Under Rs. 30,000',
    suggestedCategory: 'Basic / Chromebook',
    categoryEmoji: '🎒',
    minPrice: 0,
    maxPrice: 30000,
    subText: 'Web browsing, YouTube & lightweight ChromeOS',
    popularModels: 'Dell Chromebook 3100, HP Stream'
  },
  {
    id: '30k_50k',
    label: 'Rs. 30K–50K',
    suggestedCategory: 'Student / Office',
    categoryEmoji: '🎓',
    minPrice: 30000,
    maxPrice: 50000,
    subText: 'Zoom, assignments, MS Office & accounting',
    popularModels: 'HP ProBook 440 G5, HP Fortis 14, Dell OptiPlex'
  },
  {
    id: '50k_75k',
    label: 'Rs. 50K–75K',
    suggestedCategory: 'Business / Freelancing',
    categoryEmoji: '💼',
    minPrice: 50000,
    maxPrice: 75000,
    subText: 'Most Popular in Pakistan! Core i5/i7 16GB RAM',
    popularModels: 'HP EliteBook 840 G7, Dell Latitude 7400'
  },
  {
    id: '75k_100k',
    label: 'Rs. 75K–100K',
    suggestedCategory: 'Professional',
    categoryEmoji: '⚡',
    minPrice: 75000,
    maxPrice: 100000,
    subText: 'Heavy multitasking, Ryzen 7 & ThinkPads',
    popularModels: 'ThinkPad T14 Gen 2, Dell Latitude 5520'
  },
  {
    id: '100k_150k',
    label: 'Rs. 100K–150K',
    suggestedCategory: 'Performance',
    categoryEmoji: '🚀',
    minPrice: 100000,
    maxPrice: 150000,
    subText: 'Dedicated NVIDIA GPU, 144Hz & creator displays',
    popularModels: 'ASUS TUF F15 144Hz, IdeaPad Creator Edition'
  },
  {
    id: '150k_plus',
    label: 'Rs. 150K+',
    suggestedCategory: 'Workstation / Gaming',
    categoryEmoji: '👑',
    minPrice: 150000,
    maxPrice: 9999999,
    subText: 'Flagship RTX 4050/4090, Apple M2/M4 & OLED',
    popularModels: 'HP Victus RTX, MacBook Air M2, ThinkPad X1 OLED'
  }
];

interface LaptopFinderProps {
  selectedUseCase: LaptopUseCase | null;
  selectedBudget: BudgetBracket | null;
  onSelectUseCase: (useCase: LaptopUseCase | null) => void;
  onSelectBudget: (budget: BudgetBracket | null) => void;
  onReset: () => void;
  matchCount: number;
}

export const LaptopFinder: React.FC<LaptopFinderProps> = ({
  selectedUseCase,
  selectedBudget,
  onSelectUseCase,
  onSelectBudget,
  onReset,
  matchCount
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const activeUseCaseObj = USE_CASES.find(u => u.id === selectedUseCase);
  const activeBudgetObj = BUDGET_BRACKETS.find(b => b.id === selectedBudget);
  const hasActiveFinder = !!selectedUseCase || !!selectedBudget;

  return (
    <div 
      id="laptop-finder-container"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-slate-900/95 border border-orange-500/30 p-5 sm:p-7 shadow-2xl backdrop-blur-2xl mb-10 ring-1 ring-orange-500/20"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Header Banner */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-[11px] font-black uppercase text-orange-400 tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> SMART RECOMMENDATION ASSISTANT
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">• Built for Pakistan Hardware Buyers</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span className="text-orange-400">🔎</span> Find Your Perfect Laptop
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Don't worry about complicated processor model numbers or generations. Simply tell us your <strong>use case</strong> and <strong>budget</strong>, and we’ll match you with verified, 100% tested machines.
          </p>
        </div>

        {/* Status / Reset Actions */}
        <div className="flex items-center gap-2.5 self-start md:self-auto flex-wrap">
          {hasActiveFinder && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-300 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-orange-400" />
              <span>{matchCount} Matching {matchCount === 1 ? 'Laptop' : 'Laptops'}</span>
            </div>
          )}

          {hasActiveFinder && (
            <button
              id="laptop-finder-reset-btn"
              onClick={onReset}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 hover:border-orange-500/40 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5 text-orange-400" />
              <span>Clear Finder</span>
            </button>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer transition-all"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="relative z-10 pt-6 space-y-8">
          
          {/* STEP 1: What do you need it for? */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white font-black text-xs flex items-center justify-center shadow-md shadow-orange-500/30">
                  1
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-white tracking-wide uppercase">
                  What do you need it for?
                </h3>
              </div>
              {selectedUseCase && (
                <span className="text-xs text-orange-400 font-bold hidden sm:inline">
                  Selected: {activeUseCaseObj?.label}
                </span>
              )}
            </div>

            {/* 8 Distinct Use Cases */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
              {USE_CASES.map((useCase) => {
                const isSelected = selectedUseCase === useCase.id;
                return (
                  <button
                    key={useCase.id}
                    id={`finder-usecase-${useCase.id}`}
                    onClick={() => onSelectUseCase(isSelected ? null : useCase.id)}
                    className={`group relative p-3 rounded-2xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between min-h-[96px] ${
                      isSelected
                        ? 'bg-gradient-to-b from-orange-500/25 to-orange-600/15 border-orange-500 text-white shadow-xl shadow-orange-500/20 ring-2 ring-orange-500/40 scale-[1.02]'
                        : 'bg-slate-950/70 border-white/10 text-slate-300 hover:text-white hover:border-white/25 hover:bg-slate-900/90'
                    }`}
                  >
                    <div className="text-2xl sm:text-3xl mb-1.5 transition-transform group-hover:scale-110">
                      {useCase.emoji}
                    </div>
                    <div className="w-full">
                      <div className="font-black text-xs tracking-tight truncate">
                        {useCase.label}
                      </div>
                      <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5 font-medium">
                        {useCase.id === 'student' ? 'Assignments' :
                         useCase.id === 'office' ? 'Excel & Docs' :
                         useCase.id === 'freelancing' ? 'Remote Work' :
                         useCase.id === 'graphic_design' ? 'Photoshop' :
                         useCase.id === 'programming' ? 'VS Code & Dev' :
                         useCase.id === 'gaming' ? 'Dedicated GPU' :
                         useCase.id === 'business' ? 'Executive' : '4K Resolve'}
                      </div>
                    </div>

                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-orange-500 text-slate-950 flex items-center justify-center shadow-md">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Spec insight for selected use case */}
            {activeUseCaseObj && (
              <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-start gap-2.5 text-xs text-orange-200">
                <Zap className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white font-bold">{activeUseCaseObj.label} Recommendations: </strong>
                  <span>{activeUseCaseObj.description} Recommended baseline: </span>
                  <span className="text-orange-300 font-mono font-semibold">{activeUseCaseObj.recommendedSpecs}</span>
                </div>
              </div>
            )}
          </div>

          {/* STEP 2: Your Budget */}
          <div className="space-y-3.5 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white font-black text-xs flex items-center justify-center shadow-md shadow-orange-500/30">
                  2
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-white tracking-wide uppercase">
                  Your Budget
                </h3>
              </div>
              {selectedBudget && (
                <span className="text-xs text-orange-400 font-bold hidden sm:inline">
                  Budget: {activeBudgetObj?.label}
                </span>
              )}
            </div>

            {/* 6 Budget Brackets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
              {BUDGET_BRACKETS.map((budget) => {
                const isSelected = selectedBudget === budget.id;
                return (
                  <button
                    key={budget.id}
                    id={`finder-budget-${budget.id}`}
                    onClick={() => onSelectBudget(isSelected ? null : budget.id)}
                    className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-b from-orange-500/25 to-orange-600/15 border-orange-500 text-white shadow-xl shadow-orange-500/20 ring-2 ring-orange-500/40 scale-[1.02]'
                        : 'bg-slate-950/70 border-white/10 text-slate-300 hover:text-white hover:border-white/25 hover:bg-slate-900/90'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs sm:text-sm font-black tracking-tight text-white">
                          {budget.label}
                        </span>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-orange-500 text-slate-950 flex items-center justify-center shadow-md">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-orange-500/15 border border-orange-500/30 text-[10px] font-bold text-orange-300 mb-1.5">
                        <span>{budget.categoryEmoji}</span>
                        <span className="truncate">{budget.suggestedCategory}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium line-clamp-2">
                      {budget.subText}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Active Summary & Direct Scroll Trigger */}
          {hasActiveFinder && (
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-orange-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center flex-shrink-0 border border-orange-500/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <div className="text-white font-bold">
                    Filter Active: {selectedUseCase ? activeUseCaseObj?.label : 'All Laptops'} {selectedBudget ? `• Budget: ${activeBudgetObj?.label}` : ''}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Showing {matchCount} verified and tested machines below with checking warranty included.
                  </div>
                </div>
              </div>

              <a
                href="#catalog-product-list"
                className="px-4 py-2 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto uppercase tracking-wide"
              >
                <span>View {matchCount} Matching Laptops</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

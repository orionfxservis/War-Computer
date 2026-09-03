import React, { useState, useRef, useEffect } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { SiteThemeId, SiteThemeConfig } from '../types';
import { SITE_THEMES } from '../utils/themeConstants';

interface ThemeColorToggleProps {
  currentTheme: SiteThemeId;
  onThemeChange: (themeId: SiteThemeId) => void;
}

/**
 * 8-pointed sunburst star icon with hollow circular center matching 780.JPG
 */
export const ThemeSunburstIcon: React.FC<{ className?: string; color?: string }> = ({ 
  className = "w-5 h-5",
  color 
}) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    style={color ? { color } : undefined}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2.2L14.2 5.5L18.1 5.8L18.4 9.7L21.8 12L18.4 14.3L18.1 18.2L14.2 18.5L12 21.8L9.8 18.5L5.9 18.2L5.6 14.3L2.2 12L5.6 9.7L5.9 5.8L9.8 5.5L12 2.2ZM12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM12 9.8C13.22 9.8 14.2 10.78 14.2 12C14.2 13.22 13.22 14.2 12 14.2C10.78 14.2 9.8 13.22 9.8 12C9.8 10.78 10.78 9.8 12 9.8Z" 
    />
  </svg>
);

export const ThemeColorToggle: React.FC<ThemeColorToggleProps> = ({
  currentTheme,
  onThemeChange
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toastTimeoutRef = useRef<any>(null);

  const activeThemeConfig = SITE_THEMES.find(t => t.id === currentTheme) || SITE_THEMES[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Direct toggle on click (cycles to next theme)
  const handleCycleTheme = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = SITE_THEMES.findIndex(t => t.id === currentTheme);
    const nextIndex = (currentIndex + 1) % SITE_THEMES.length;
    const nextTheme = SITE_THEMES[nextIndex];
    selectTheme(nextTheme.id);
  };

  const selectTheme = (themeId: SiteThemeId) => {
    onThemeChange(themeId);
    const selected = SITE_THEMES.find(t => t.id === themeId);
    if (selected) {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      setToastMessage(`${selected.name} (${selected.paletteLabel})`);
      toastTimeoutRef.current = setTimeout(() => {
        setToastMessage(null);
      }, 2400);
    }
    setMenuOpen(false);
  };

  return (
    <div ref={menuRef} className="relative inline-flex items-center flex-shrink-0">
      
      {/* Container with the toggle button styled exactly like 780.JPG */}
      <div className="flex items-center gap-1">
        <button
          id="theme-color-toggle-btn"
          type="button"
          onClick={handleCycleTheme}
          onContextMenu={(e) => {
            e.preventDefault();
            setMenuOpen(prev => !prev);
          }}
          title={`Click to cycle theme (Current: ${activeThemeConfig.name} - ${activeThemeConfig.paletteLabel}). Right click or hover for theme list.`}
          aria-label="Toggle Color Theme"
          className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#0c1322] hover:bg-[#131d33] border border-slate-700/70 hover:border-slate-500 text-amber-400 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg active:scale-95 group focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          style={{
            boxShadow: `0 2px 10px ${activeThemeConfig.colors.glow}`
          }}
        >
          {/* Subtle glowing ring matching active theme */}
          <div 
            className="absolute inset-0 rounded-xl opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${activeThemeConfig.colors.icon} 0%, transparent 70%)`
            }}
          />

          {/* 8-pointed Sunburst Star Icon from 780.JPG */}
          <div className="transform transition-transform duration-300 group-hover:rotate-45 group-active:scale-90">
            <ThemeSunburstIcon 
              className="w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]" 
              color={activeThemeConfig.colors.icon}
            />
          </div>
        </button>

        {/* Small theme menu dropdown trigger chevron */}
        <button
          id="theme-menu-trigger-btn"
          type="button"
          onClick={() => setMenuOpen(prev => !prev)}
          title="Choose Theme Palette"
          aria-label="Choose Theme Palette"
          className="h-8 sm:h-9 px-1 rounded-lg bg-[#0c1322]/80 hover:bg-[#131d33] border border-slate-700/50 text-slate-400 hover:text-white text-[10px] flex items-center justify-center transition-colors cursor-pointer"
        >
          <span className="text-[9px] tracking-tighter">▼</span>
        </button>
      </div>

      {/* Floating Toast Notification when theme changes */}
      {toastMessage && (
        <div 
          id="theme-toast-indicator"
          className="absolute bottom-full mb-2 right-0 z-50 pointer-events-none whitespace-nowrap bg-slate-900/95 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20 shadow-2xl backdrop-blur-xl animate-fade-in flex items-center gap-2"
          style={{
            boxShadow: `0 4px 20px ${activeThemeConfig.colors.glow}`
          }}
        >
          <span 
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: activeThemeConfig.colors.icon }}
          />
          <span>Active: {toastMessage}</span>
        </div>
      )}

      {/* Interactive Theme Selection Popover Menu */}
      {menuOpen && (
        <div 
          id="theme-selection-menu"
          className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-slate-950/95 border border-slate-700/80 rounded-2xl p-3 shadow-2xl backdrop-blur-2xl z-50 space-y-1.5 animate-in fade-in zoom-in-95 duration-150"
          style={{
            boxShadow: `0 20px 50px rgba(0,0,0,0.8), 0 0 30px ${activeThemeConfig.colors.glow}`
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 mb-1 border-b border-slate-800 px-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Interactive Color Themes</span>
            </div>
            <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
              4 Palettes
            </span>
          </div>

          <p className="text-[11px] text-slate-400 px-1 pb-1">
            Custom color identity designed specifically for War Computers:
          </p>

          {/* Theme List */}
          <div className="space-y-1">
            {SITE_THEMES.map((theme) => {
              const isSelected = theme.id === currentTheme;
              return (
                <button
                  key={theme.id}
                  id={`theme-option-${theme.id}`}
                  onClick={() => selectTheme(theme.id)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-white/20 shadow-md ring-1 ring-white/10'
                      : 'bg-slate-900/40 hover:bg-slate-900/80 border-transparent hover:border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    {/* Color Swatch Dots */}
                    <div className="flex items-center -space-x-1 flex-shrink-0">
                      <span 
                        className="w-3.5 h-3.5 rounded-full border border-slate-900 shadow-sm"
                        style={{ backgroundColor: theme.colors.primary }}
                        title={`Primary: ${theme.colors.primary}`}
                      />
                      <span 
                        className="w-3.5 h-3.5 rounded-full border border-slate-900 shadow-sm"
                        style={{ backgroundColor: theme.colors.secondary }}
                        title={`Secondary: ${theme.colors.secondary}`}
                      />
                      <span 
                        className="w-3.5 h-3.5 rounded-full border border-slate-900 shadow-sm"
                        style={{ backgroundColor: theme.colors.accent }}
                        title={`Accent: ${theme.colors.accent}`}
                      />
                    </div>

                    {/* Theme Name & Palette Label */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-xs font-extrabold truncate ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                          {theme.name}
                        </span>
                        {theme.badge && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-white/10 text-slate-300">
                            {theme.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 truncate">
                        {theme.paletteLabel}
                      </p>
                    </div>
                  </div>

                  {/* Active Indicator Checkmark */}
                  {isSelected ? (
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center text-slate-950 font-bold flex-shrink-0 shadow"
                      style={{ backgroundColor: theme.colors.icon }}
                    >
                      <Check className="w-3 h-3 text-slate-950 stroke-[3]" />
                    </div>
                  ) : (
                    <span className="text-[11px] text-slate-500 group-hover:text-slate-400">Select</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800/80 px-1 text-[10px] text-slate-500 text-center">
            💡 Tip: Click the sunburst button anytime to instantly cycle themes.
          </div>
        </div>
      )}

    </div>
  );
};

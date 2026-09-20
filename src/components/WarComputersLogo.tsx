import React from 'react';
import { SiteThemeId } from '../types';

export interface WarComputersLogoProps {
  /**
   * Layout variant:
   * - 'full': Complete horizontal logo with hardware emblem + 'WAR COMPUTERS' typography
   * - 'icon': Emblem only (Desktop PC tower, monitor, laptop with dynamic velocity swirl)
   * - 'wordmark': Typography only ('WAR COMPUTERS')
   */
  variant?: 'full' | 'icon' | 'wordmark';
  /**
   * Theme styling mode:
   * - 'theme' (default): Dynamically adapts colors, gradients, and glows to the active site theme
   * - 'original': Faithful reproduction of the authentic original logo colors (Classic Blue + Emerald & Teal)
   */
  colorMode?: 'theme' | 'original';
  /**
   * Optional manual theme override for previews or specific cards
   */
  themeOverride?: SiteThemeId;
  /**
   * Size presets or custom sizing via className
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Subtle hover glow effect
   */
  glowOnHover?: boolean;
}

export const WarComputersLogo: React.FC<WarComputersLogoProps> = ({
  variant = 'full',
  colorMode = 'theme',
  themeOverride,
  size = 'md',
  className = '',
  onClick,
  glowOnHover = true,
}) => {
  // Size mapping
  const heightClasses = {
    xs: 'h-6',
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-11',
    lg: 'h-12 sm:h-14',
    xl: 'h-16 sm:h-20',
  };

  const selectedHeight = heightClasses[size] || heightClasses.md;

  // Unique IDs for SVG gradients to prevent DOM collisions
  const idPrefix = React.useId().replace(/:/g, '');
  const arrowGradId = `war-logo-arrow-grad-${idPrefix}`;
  const hardwareGradId = `war-logo-hw-grad-${idPrefix}`;
  const textGradId = `war-logo-txt-grad-${idPrefix}`;

  // Theme color definitions for theme-specific adjustments
  // If themeOverride is specified, we use explicit inline colors;
  // otherwise, we use CSS variables (--logo-*) with fallbacks so CSS can drive it in real-time.
  const themeColors = {
    'war-blue': {
      textPrimary: '#0284c7',    // Vibrant Royal War Blue
      textSecondary: '#0369a1',  // Deep Blue
      hardware: '#0d9488',       // Teal-Green
      hardwareLight: '#10b981',  // Emerald
      arrowStart: '#0284c7',     // Electric Blue
      arrowMid: '#06b6d4',       // Cyan
      arrowEnd: '#10b981',       // Emerald Green
      glow: 'rgba(2, 132, 199, 0.4)',
    },
    'tech-cyan': {
      textPrimary: '#22d3ee',    // Electric Cyber Cyan
      textSecondary: '#06b6d4',  // Teal Cyan
      hardware: '#06b6d4',       // Cyber Teal
      hardwareLight: '#67e8f9',  // Ice Cyan
      arrowStart: '#38bdf8',     // Sky Blue
      arrowMid: '#22d3ee',       // Electric Cyan
      arrowEnd: '#06b6d4',       // Deep Cyan
      glow: 'rgba(6, 182, 212, 0.55)',
    },
    'premium-gold': {
      textPrimary: '#facc15',    // Polished Imperial Gold
      textSecondary: '#eab308',  // Rich Gold
      hardware: '#eab308',       // Gold Hardware
      hardwareLight: '#fde047',  // Champagne
      arrowStart: '#fef08a',     // Light Gold
      arrowMid: '#facc15',       // Radiant Gold
      arrowEnd: '#d97706',       // Amber Bronze
      glow: 'rgba(234, 179, 8, 0.5)',
    },
    'modern-red': {
      textPrimary: '#f87171',    // Vibrant Crimson Coral
      textSecondary: '#ef4444',  // Bold Performance Red
      hardware: '#ef4444',       // Crimson Hardware
      hardwareLight: '#fca5a5',  // Coral Light
      arrowStart: '#f87171',     // Bright Coral
      arrowMid: '#ef4444',       // Electric Red
      arrowEnd: '#b91c1c',       // Ruby Red
      glow: 'rgba(239, 68, 68, 0.5)',
    },
  };

  const activeColors = themeOverride ? themeColors[themeOverride] : null;

  // In original mode, always use the authentic colors from the user's logo.png
  const isOriginal = colorMode === 'original';

  // SVG Dimensioning
  // Full logo: 330 x 90 (aspect ratio ~ 3.67 : 1)
  // Icon only: 136 x 90 (aspect ratio ~ 1.51 : 1)
  // Wordmark: 190 x 90 (aspect ratio ~ 2.11 : 1)
  const viewBox = variant === 'icon' 
    ? '0 0 136 90' 
    : variant === 'wordmark' 
      ? '136 0 194 90' 
      : '0 0 330 90';

  return (
    <div 
      className={`inline-flex items-center select-none group transition-transform duration-200 ${
        glowOnHover ? 'hover:scale-[1.02]' : ''
      } ${className}`}
      onClick={onClick}
    >
      <svg
        viewBox={viewBox}
        className={`${selectedHeight} w-auto object-contain transition-all duration-300 ${
          glowOnHover ? 'group-hover:drop-shadow-[0_0_12px_var(--logo-glow,rgba(2,132,199,0.4))]' : ''
        }`}
        style={
          activeColors
            ? ({
                '--logo-text-primary': activeColors.textPrimary,
                '--logo-text-secondary': activeColors.textSecondary,
                '--logo-hardware': activeColors.hardware,
                '--logo-hardware-light': activeColors.hardwareLight,
                '--logo-arrow-start': activeColors.arrowStart,
                '--logo-arrow-mid': activeColors.arrowMid,
                '--logo-arrow-end': activeColors.arrowEnd,
                '--logo-glow': activeColors.glow,
              } as React.CSSProperties)
            : undefined
        }
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Hardware Gradient (Green-Teal or Theme) */}
          <linearGradient id={hardwareGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop 
              offset="0%" 
              stopColor={isOriginal ? '#0d9488' : activeColors?.hardware || 'var(--logo-hardware, #0d9488)'} 
            />
            <stop 
              offset="100%" 
              stopColor={isOriginal ? '#10b981' : activeColors?.hardwareLight || 'var(--logo-hardware-light, #10b981)'} 
            />
          </linearGradient>

          {/* Dynamic Looping Velocity Arrow Gradient (Cyan to Emerald, or Theme-specific) */}
          <linearGradient id={arrowGradId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop 
              offset="0%" 
              stopColor={isOriginal ? '#0284c7' : activeColors?.arrowStart || 'var(--logo-arrow-start, #0284c7)'} 
            />
            <stop 
              offset="50%" 
              stopColor={isOriginal ? '#06b6d4' : activeColors?.arrowMid || 'var(--logo-arrow-mid, #06b6d4)'} 
            />
            <stop 
              offset="100%" 
              stopColor={isOriginal ? '#10b981' : activeColors?.arrowEnd || 'var(--logo-arrow-end, #10b981)'} 
            />
          </linearGradient>

          {/* Typography Gradient for 'WAR' & 'COMPUTERS' */}
          <linearGradient id={textGradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop 
              offset="0%" 
              stopColor={isOriginal ? '#0284c7' : activeColors?.textPrimary || 'var(--logo-text-primary, #0284c7)'} 
            />
            <stop 
              offset="100%" 
              stopColor={isOriginal ? '#0369a1' : activeColors?.textSecondary || 'var(--logo-text-secondary, #0369a1)'} 
            />
          </linearGradient>

          {/* Drop Shadow for dynamic arrow & screen depth */}
          <filter id={`shadow-${idPrefix}`} x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" floodColor="#000000" />
          </filter>
        </defs>

        {/* =========================================================================
            PART 1: THE HARDWARE EMBLEM (Desktop PC, Monitor, Laptop, Velocity Swirl)
           ========================================================================= */}
        {(variant === 'full' || variant === 'icon') && (
          <g id="war-computers-hardware-emblem">
            
            {/* 1. DESKTOP TOWER (Far Left) */}
            <g id="desktop-tower" filter={`url(#shadow-${idPrefix})`}>
              {/* Outer Case */}
              <rect
                x="12"
                y="22"
                width="22"
                height="48"
                rx="2.5"
                fill={`url(#${hardwareGradId})`}
              />
              {/* Internal Bevel Highlight */}
              <rect
                x="13.5"
                y="23.5"
                width="19"
                height="45"
                rx="1.5"
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.8"
                strokeOpacity="0.25"
              />

              {/* Optical Bays / Drive Slots */}
              <rect x="16" y="27" width="14" height="3" rx="0.8" fill="#04202e" fillOpacity="0.8" />
              <rect x="16" y="32" width="14" height="3" rx="0.8" fill="#04202e" fillOpacity="0.8" />

              {/* Status LED Lights & Power Button */}
              <circle cx="17.5" cy="40" r="1.5" fill="#ffffff" fillOpacity="0.9" />
              <circle cx="23" cy="40" r="1.2" fill="#38bdf8" />
              <circle cx="27.5" cy="40" r="1.2" fill="#22c55e" />

              {/* Lower Expansion / Ventilation Port */}
              <rect x="16" y="56" width="14" height="4.5" rx="1" fill="#04202e" fillOpacity="0.8" />
              <line x1="18" y1="58.2" x2="28" y2="58.2" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.6" />

              {/* Base Feet */}
              <rect x="13.5" y="70" width="19" height="1.8" rx="0.9" fill="#04202e" fillOpacity="0.9" />
            </g>

            {/* 2. DESKTOP MONITOR (Behind Laptop, Center) */}
            <g id="desktop-monitor">
              {/* Monitor Stand Base & Neck */}
              <path
                d="M 62,64 L 66,64 L 66,70 L 62,70 Z"
                fill={`url(#${hardwareGradId})`}
              />
              <rect
                x="50"
                y="70"
                width="28"
                height="3.5"
                rx="1.5"
                fill={`url(#${hardwareGradId})`}
              />

              {/* Outer Monitor Frame */}
              <rect
                x="37"
                y="22"
                width="56"
                height="42"
                rx="3"
                fill="none"
                stroke={`url(#${hardwareGradId})`}
                strokeWidth="3.2"
              />

              {/* Inner Screen Surface with subtle glass sheen */}
              <rect
                x="40"
                y="25"
                width="50"
                height="36"
                rx="1.5"
                fill="#02121c"
                fillOpacity="0.6"
              />
            </g>

            {/* 3. OPEN LAPTOP (Foreground, In Front of Monitor) */}
            <g id="open-laptop">
              {/* Laptop Screen Lid (Upright) */}
              <rect
                x="68"
                y="28"
                width="48"
                height="35"
                rx="2.5"
                fill="none"
                stroke={`url(#${hardwareGradId})`}
                strokeWidth="3.2"
              />
              {/* Inner Laptop Display Surface */}
              <rect
                x="71.5"
                y="31.5"
                width="41"
                height="28"
                rx="1.5"
                fill="#02121c"
                fillOpacity="0.8"
              />

              {/* Laptop Base Tray in 3D Perspective */}
              <polygon
                points="66,63  118,63  124,72  60,72"
                fill={`url(#${hardwareGradId})`}
              />
              {/* Keyboard Tray Inner Recess */}
              <polygon
                points="68,64.5  116,64.5  121,70.5  63,70.5"
                fill="#02121c"
                fillOpacity="0.65"
              />
              {/* Centered Precision Trackpad */}
              <polygon
                points="88,66  96,66  97,69.5  87,69.5"
                fill={`url(#${hardwareGradId})`}
                fillOpacity="0.7"
              />
            </g>

            {/* 4. DYNAMIC 3D VELOCITY ORBIT SWIRL & ARROW HEAD */}
            <g id="velocity-orbit-swirl" filter={`url(#shadow-${idPrefix})`}>
              
              {/* The Dynamic Elliptical Orbit Loop */}
              {/* Sweeps from bottom-left under PC/monitor, arcs across the laptop front, and loops over the top-right with an arrow */}
              <path
                d="M 46,74 C 44,61 48,45 61,31 C 72,19 86,13 103,13 C 109,13 113,15 116,18"
                fill="none"
                stroke={`url(#${arrowGradId})`}
                strokeWidth="4.8"
                strokeLinecap="round"
              />

              {/* Front Foreground Arch (Sweeping across the laptop) */}
              <path
                d="M 116,18 C 122,23 124,31 123,41 C 121,54 112,65 99,73 C 86,81 71,84 57,80 C 51,78 46,74 46,74"
                fill="none"
                stroke={`url(#${arrowGradId})`}
                strokeWidth="5.2"
                strokeLinecap="round"
              />

              {/* Upper Main Velocity Arrow Head (pointing ↗ top-right) */}
              <path
                d="M 103,4 L 123,12 L 115,28 L 111,19 L 102,15 Z"
                fill={`url(#${arrowGradId})`}
              />

              {/* Bottom Return Tail Arrow (encircling the hardware base) */}
              <path
                d="M 92,79 L 108,82 L 102,70 L 100,75 Z"
                fill={`url(#${arrowGradId})`}
                fillOpacity="0.9"
              />
            </g>

          </g>
        )}

        {/* =========================================================================
            PART 2: 'WAR COMPUTERS' GEOMETRIC TYPOGRAPHY
           ========================================================================= */}
        {(variant === 'full' || variant === 'wordmark') && (
          <g id="war-computers-typography" className="transition-all duration-300">
            
            {/* Top Line: 'WAR' in bold futuristic techno geometry */}
            <g id="text-war" fill={`url(#${textGradId})`}>
              {/* LETTER 'W' (Stylized double-slanted strokes matching logo.png) */}
              <path
                d="M 144,44 L 151.5,18 L 158,18 L 163,35.5 L 168,18 L 174.5,18 L 182,44 L 175.5,44 L 171.5,28 L 166.5,44 L 159.5,44 L 154.5,28 L 150.5,44 Z"
              />
              
              {/* LETTER 'A' (Bold geometric sans with sharp apex) */}
              <path
                d="M 183.5,44 L 193.5,18 L 202,18 L 212,44 L 205,44 L 202.8,38 L 192.2,38 L 190.2,44 Z M 194,32.5 L 201,32.5 L 197.5,22.5 Z"
              />

              {/* LETTER 'R' (Bold modern curved bowl with kicked right leg) */}
              <path
                d="M 214.5,18 L 227.5,18 C 233.5,18 237.5,21.5 237.5,27 C 237.5,31 234.5,33.8 230.5,35 L 238.5,44 L 230.5,44 L 224,36 L 221,36 L 221,44 L 214.5,44 Z M 221,30.5 L 226.5,30.5 C 229.5,30.5 231,29.2 231,27 C 231,24.8 229.5,23.5 226.5,23.5 L 221,23.5 Z"
              />
            </g>

            {/* Bottom Line: 'COMPUTERS' (Clean bold geometric uppercase) */}
            <g 
              id="text-computers" 
              fill={`url(#${textGradId})`} 
              fontFamily="'Chakra Petch', 'Space Grotesk', -apple-system, sans-serif" 
              fontWeight="800" 
              fontSize="21.5" 
              letterSpacing="2.6"
            >
              <text x="144" y="68">
                COMPUTERS
              </text>
            </g>

          </g>
        )}
      </svg>
    </div>
  );
};

import React from 'react';
import { HERO_SCROLLING_IMAGES } from '../data/products';
import { Sparkles, Eye, ShieldAlert } from 'lucide-react';

interface ContinuousImageMarqueeProps {
  onSelectCategory?: (category: any) => void;
}

export const ContinuousImageMarquee: React.FC<ContinuousImageMarqueeProps> = ({ onSelectCategory }) => {
  // To create a seamless infinite loop without empty gaps or stutter,
  // we duplicate the items 3 times so the CSS translateX(-50%) cycle never exposes an edge.
  const marqueeItems = [...HERO_SCROLLING_IMAGES, ...HERO_SCROLLING_IMAGES, ...HERO_SCROLLING_IMAGES];

  return (
    <div className="relative w-full overflow-hidden py-4 select-none">
      {/* Left and Right Subtle Fade Gradients for clean edge blending */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      {/* Infinite scrolling track */}
      <div className="animate-marquee-continuous flex items-center gap-4 sm:gap-6 py-2">
        {marqueeItems.map((item, idx) => (
          <div
            key={`marquee-${idx}`}
            className="group relative flex-shrink-0 w-64 sm:w-80 h-44 sm:h-52 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/90 shadow-xl transition-all duration-300 hover:border-orange-500/80 hover:shadow-2xl hover:shadow-orange-500/20"
          >
            {/* HD Image */}
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              referrerPolicy="no-referrer"
            />

            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

            {/* Floating Top Tag */}
            <div className="absolute top-3 left-3">
              <span className="bg-orange-500/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold uppercase px-2.5 py-1 rounded-md shadow flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {item.tag}
              </span>
            </div>

            {/* Bottom Content Banner */}
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-[11px] font-semibold text-orange-400 uppercase tracking-wider">
                {item.category}
              </p>
              <h4 className="text-sm sm:text-base font-bold text-white truncate drop-shadow">
                {item.title}
              </h4>
            </div>

            {/* Hover Quick Look Overlay */}
            <div className="absolute inset-0 bg-orange-950/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="bg-slate-900/90 border border-orange-500/60 text-orange-300 text-xs font-semibold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <Eye className="w-3.5 h-3.5" /> High Performance
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

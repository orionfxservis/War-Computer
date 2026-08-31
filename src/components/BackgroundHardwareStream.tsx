import React from 'react';

// Lightweight Optimized Hardware Thumbnails for smooth background drift (Laptops, Desktops, Chromebooks)
const HERO_HARDWARE_ROW_TOP = [
  {
    id: 'hero-hw-1',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=480&q=65'
  },
  {
    id: 'hero-hw-2',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=480&q=65'
  },
  {
    id: 'hero-hw-3',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=480&q=65'
  },
  {
    id: 'hero-hw-4',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=480&q=65'
  },
  {
    id: 'hero-hw-5',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=480&q=65'
  },
  {
    id: 'hero-hw-6',
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=480&q=65'
  }
];

const HERO_HARDWARE_ROW_BOTTOM = [
  {
    id: 'hero-hw-7',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=480&q=65'
  },
  {
    id: 'hero-hw-8',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=480&q=65'
  },
  {
    id: 'hero-hw-9',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=480&q=65'
  },
  {
    id: 'hero-hw-10',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=480&q=65'
  },
  {
    id: 'hero-hw-11',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=480&q=65'
  },
  {
    id: 'hero-hw-12',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=480&q=65'
  }
];

export const BackgroundHardwareStream: React.FC = () => {
  return (
    <div
      id="background-hardware-hero-stream"
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden opacity-[0.25] select-none filter contrast-[1.05]"
      aria-hidden="true"
      style={{ contain: 'strict' }}
    >
      <div className="flex flex-col justify-center h-full w-full gap-8 sm:gap-14 py-2">
        
        {/* Top Hero-Scale Panoramic Ribbon (Drifts smoothly to the Left) */}
        <div className="relative w-full overflow-hidden flex items-center">
          <div className="flex gap-6 sm:gap-8 w-max animate-hardware-hero-drift-left">
            {/* Loop Segment 1 */}
            {HERO_HARDWARE_ROW_TOP.map((scene, idx) => (
              <div
                key={`hero-r1-a-${scene.id}-${idx}`}
                className="w-[75vw] sm:w-[55vw] md:w-[42vw] lg:w-[32vw] max-w-[600px] min-w-[280px] sm:min-w-[400px] h-[180px] sm:h-[240px] md:h-[280px] rounded-3xl overflow-hidden relative border border-white/10 bg-slate-950/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex-shrink-0"
              >
                <img
                  src={scene.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.12] saturate-[0.85] transform scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/60" />
              </div>
            ))}

            {/* Loop Segment 2 (Duplicate for seamless continuous loop) */}
            {HERO_HARDWARE_ROW_TOP.map((scene, idx) => (
              <div
                key={`hero-r1-b-${scene.id}-${idx}`}
                className="w-[75vw] sm:w-[55vw] md:w-[42vw] lg:w-[32vw] max-w-[600px] min-w-[280px] sm:min-w-[400px] h-[180px] sm:h-[240px] md:h-[280px] rounded-3xl overflow-hidden relative border border-white/10 bg-slate-950/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex-shrink-0"
              >
                <img
                  src={scene.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.12] saturate-[0.85] transform scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/60" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Hero-Scale Panoramic Ribbon (Drifts smoothly to the Right) */}
        <div className="relative w-full overflow-hidden flex items-center">
          <div className="flex gap-6 sm:gap-8 w-max animate-hardware-hero-drift-right">
            {/* Loop Segment 1 */}
            {HERO_HARDWARE_ROW_BOTTOM.map((scene, idx) => (
              <div
                key={`hero-r2-a-${scene.id}-${idx}`}
                className="w-[75vw] sm:w-[55vw] md:w-[42vw] lg:w-[32vw] max-w-[600px] min-w-[280px] sm:min-w-[400px] h-[180px] sm:h-[240px] md:h-[280px] rounded-3xl overflow-hidden relative border border-white/10 bg-slate-950/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex-shrink-0"
              >
                <img
                  src={scene.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.12] saturate-[0.85] transform scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/60" />
              </div>
            ))}

            {/* Loop Segment 2 (Duplicate for seamless continuous loop) */}
            {HERO_HARDWARE_ROW_BOTTOM.map((scene, idx) => (
              <div
                key={`hero-r2-b-${scene.id}-${idx}`}
                className="w-[75vw] sm:w-[55vw] md:w-[42vw] lg:w-[32vw] max-w-[600px] min-w-[280px] sm:min-w-[400px] h-[180px] sm:h-[240px] md:h-[280px] rounded-3xl overflow-hidden relative border border-white/10 bg-slate-950/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex-shrink-0"
              >
                <img
                  src={scene.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.12] saturate-[0.85] transform scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/60" />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Radial and Linear Vignette Overlays for deep atmospheric contrast */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 pointer-events-none opacity-85" />
    </div>
  );
};

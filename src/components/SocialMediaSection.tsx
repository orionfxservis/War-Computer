import React, { useState } from 'react';
import { 
  Youtube, 
  Instagram, 
  MessageSquare, 
  Share2, 
  ExternalLink, 
  Check, 
  Play, 
  Sparkles, 
  Heart,
  MessageCircle
} from 'lucide-react';
import { SOCIAL_FEEDS } from '../data/products';

export const SocialMediaSection: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleToggleLike = (id: string) => {
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="pt-10 pb-6 sm:pb-8 relative z-10 border-t border-slate-800/80 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest font-mono">
                WAR COMPUTERS COMMUNITY & BENCHMARKS
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase mt-1">
              Social Media & Creator Ecosystem
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Watch live stress-tests, custom liquid loop battlestations, and B2B classroom deployments.
            </p>
          </div>

          {/* Social Hub Links & Share */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={handleCopyShare}
              className="px-3.5 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md hover:bg-slate-800 border border-slate-700/80 text-xs font-bold text-slate-200 flex items-center gap-2 cursor-pointer transition-all shadow-sm"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-orange-400" />
                  <span>Share Catalog</span>
                </>
              )}
            </button>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-xl bg-red-600/20 backdrop-blur-md hover:bg-red-600/30 border border-red-500/40 text-red-400 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Youtube className="w-4 h-4 text-red-500" />
              <span>YouTube Tech</span>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-xl bg-pink-600/20 backdrop-blur-md hover:bg-pink-600/30 border border-pink-500/40 text-pink-400 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              <span>@WarComputers</span>
            </a>

            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-xl bg-indigo-600/20 backdrop-blur-md hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              <span>Discord (12.4k Builders)</span>
            </a>
          </div>
        </div>

        {/* Dynamic Social Feeds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOCIAL_FEEDS.map((feed) => {
            const isLiked = likedPosts[feed.id];

            return (
              <div key={feed.id} className="group relative flex flex-col">
                {/* Glow aura */}
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-orange-500/50 to-amber-500/50 opacity-0 group-hover:opacity-100 blur-md transition-all duration-300 pointer-events-none" />

                <div className="relative z-10 flex-1 bg-slate-900/75 backdrop-blur-xl rounded-2xl border border-slate-800/90 group-hover:border-orange-500/60 overflow-hidden shadow-lg group-hover:shadow-[0_0_25px_rgba(249,115,22,0.2)] transition-all duration-300 flex flex-col">
                  {/* Media banner */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                    <img
                      src={feed.image}
                      alt={feed.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                    {/* Channel Tag */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-white text-[11px] font-semibold">
                      {feed.channel === 'YouTube' && <Youtube className="w-3.5 h-3.5 text-red-500" />}
                      {feed.channel === 'Instagram' && <Instagram className="w-3.5 h-3.5 text-pink-400" />}
                      {feed.channel === 'Discord' && <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />}
                      <span>{feed.handle}</span>
                    </div>

                    {feed.channel === 'YouTube' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/40 group-hover:scale-110 transition-transform">
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-2">
                      {feed.title}
                    </h4>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
                      <button
                        onClick={() => handleToggleLike(feed.id)}
                        className="flex items-center gap-1.5 hover:text-red-400 transition-colors cursor-pointer"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                        <span>{isLiked ? 'Liked' : feed.likes}</span>
                      </button>

                      <a
                        href="https://youtube.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-orange-400 hover:text-orange-300 font-bold flex items-center gap-1"
                      >
                        <span>View Post</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

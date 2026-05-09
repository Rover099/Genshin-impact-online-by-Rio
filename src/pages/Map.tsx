import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Search, Compass, Layers, Plus, Minus, Filter } from 'lucide-react';
import { cn } from '../utils/cn';

export default function InteractiveMap() {
  const [zoom, setZoom] = useState(1);
  const [activeFilter, setActiveFilter] = useState('all');

  const markers = [
    { id: 1, x: 30, y: 40, type: 'waypoint', name: 'Mondstadt' },
    { id: 2, x: 45, y: 60, type: 'statue', name: 'Statue of The Seven' },
    { id: 3, x: 60, y: 30, type: 'boss', name: 'Stormterror' },
    { id: 4, x: 75, y: 55, type: 'domain', name: 'Valley of Remembrance' },
    { id: 5, x: 40, y: 80, type: 'chest', name: 'Luxurious Chest' },
  ];

  return (
    <div className="pt-20 h-screen min-h-[800px] flex flex-col overflow-hidden bg-genshin-surface">
      {/* Top Bar */}
      <div className="bg-genshin-dark border-b border-white/10 p-4 shrink-0 z-20 shadow-lg">
         <div className="max-w-7xl mx-auto flex items-center justify-between">
           <h1 className="text-xl font-bold uppercase tracking-widest text-glow-gold flex items-center gap-2">
             <Compass className="text-genshin-gold" /> Teyvat Interactive Map
           </h1>
           <div className="relative w-64 hidden sm:block">
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
             <input 
               type="text" 
               placeholder="Search resources..."
               className="w-full bg-white/5 border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-sm focus:border-genshin-gold outline-none transition-colors"
             />
           </div>
         </div>
      </div>

      <div className="flex-1 relative flex">
        {/* Sidebar */}
        <div className="w-80 bg-genshin-dark/95 backdrop-blur-md border-r border-white/5 flex flex-col z-20 absolute md:relative inset-y-0 left-0 transform -translate-x-full md:translate-x-0 transition-transform">
          <div className="p-6 overflow-y-auto flex-1">
             <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
               <Layers size={16} /> Map Filters
             </h2>
             
             <div className="space-y-4">
               {['all', 'waypoints', 'statues', 'domains', 'bosses', 'resources'].map(filter => (
                 <button
                   key={filter}
                   onClick={() => setActiveFilter(filter)}
                   className={cn(
                     "w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between border",
                     activeFilter === filter 
                       ? "bg-genshin-gold/10 border-genshin-gold text-genshin-gold" 
                       : "bg-white/5 border-transparent text-gray-300 hover:bg-white/10"
                   )}
                 >
                   <span className="capitalize">{filter}</span>
                   {activeFilter === filter && <div className="w-2 h-2 rounded-full bg-genshin-gold" />}
                 </button>
               ))}
             </div>

             <div className="mt-8 pt-8 border-t border-white/10">
               <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-4">Progress</h3>
               <div className="space-y-4">
                 <div>
                   <div className="flex justify-between text-xs mb-1">
                     <span className="text-gray-300">Anemoculus</span>
                     <span className="text-genshin-anemo">45/65</span>
                   </div>
                   <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-genshin-anemo w-[70%]" />
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-xs mb-1">
                     <span className="text-gray-300">Geoculus</span>
                     <span className="text-genshin-geo">120/131</span>
                   </div>
                   <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-genshin-geo w-[90%]" />
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* Map Canvas */}
        <div className="flex-1 relative overflow-hidden bg-[#1E2536] cursor-grab active:cursor-grabbing">
          {/* Map Grid Pattern background */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}
          />
          
          <motion.div 
            className="absolute inset-0"
            animate={{ scale: zoom }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag
            dragConstraints={{ left: -1000, right: 1000, top: -1000, bottom: 1000 }}
          >
             {/* Map Image Placeholder */}
             <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop" className="absolute inset-0 w-full h-[150%] object-cover object-bottom opacity-30 mix-blend-luminosity" alt="Map Base" />
             
             {/* Map Borders / Rivers pseudo-styling */}
             <svg className="absolute inset-0 w-full h-full text-genshin-hydro/20" preserveAspectRatio="none" viewBox="0 0 1000 1000">
                <path d="M 0,500 Q 250,400 500,500 T 1000,500" stroke="currentColor" strokeWidth="4" fill="none" />
                <path d="M 400,0 Q 450,250 400,500 T 400,1000" stroke="currentColor" strokeWidth="4" fill="none" />
             </svg>

             {/* Region Labels */}
             <div className="absolute top-[20%] left-[30%] text-4xl font-black uppercase tracking-[1em] text-white/20 select-none pointer-events-none">Mondstadt</div>
             <div className="absolute top-[60%] left-[50%] text-4xl font-black uppercase tracking-[1em] text-white/20 select-none pointer-events-none">Liyue</div>

             {/* Markers */}
             {markers.map(marker => (
               <div
                 key={marker.id}
                 className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                 style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
               >
                 <div className="relative">
                   <div className="w-8 h-8 rounded-full bg-genshin-dark border-2 border-genshin-gold flex items-center justify-center text-genshin-gold shadow-[0_0_15px_rgba(255,215,0,0.5)] group-hover:scale-110 transition-transform">
                     {marker.type === 'statue' ? <Star size={16} /> : <MapPin size={16} />}
                   </div>
                   {/* Tooltip */}
                   <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-black/90 backdrop-blur-md rounded text-xs font-bold border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                     {marker.name}
                   </div>
                 </div>
               </div>
             ))}
          </motion.div>

          {/* Controls */}
          <div className="absolute right-6 bottom-6 flex flex-col gap-2 z-20">
            <button 
              onClick={() => setZoom(Math.min(zoom + 0.2, 2.5))}
              className="w-10 h-10 rounded-full bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-genshin-gold hover:text-black transition-colors shadow-lg"
            >
              <Plus size={20} />
            </button>
            <button 
              onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}
              className="w-10 h-10 rounded-full bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-genshin-gold hover:text-black transition-colors shadow-lg"
            >
              <Minus size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useUserStore, useUiStore } from '../stores';
import { Calendar, MessageSquare, AlertCircle, RefreshCw, Award } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function Portal() {
  const { addPrimogems } = useUserStore();
  const { addNotification } = useUiStore();
  const [claimed, setClaimed] = useState(false);

  const handleClaim = () => {
    if (claimed) return;
    addPrimogems(60);
    setClaimed(true);
    addNotification("Daily Login: Claimed 60 Primogems!", "success");
  };

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - User Dashboard / Daily */}
        <div className="lg:col-span-1 space-y-8">
          {/* Daily Check-in */}
          <div className="glass-panel p-6 rounded-2xl border-t border-genshin-amber/50 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 text-genshin-amber/10">
              <Calendar size={120} />
            </div>
            <h2 className="text-xl font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
              <Award className="text-genshin-amber" /> Daily Tasks
            </h2>
            
            <div className="flex items-center justify-between bg-black/40 p-4 rounded-xl mb-6 border border-white/5">
              <div>
                <p className="font-bold text-lg mb-1 text-genshin-gold">60 Primogems</p>
                <p className="text-xs text-gray-400">Daily Login Reward</p>
              </div>
              <Button 
                onClick={handleClaim} 
                disabled={claimed}
                variant={claimed ? "secondary" : "primary"}
                size="sm"
              >
                {claimed ? "Claimed" : "Claim"}
              </Button>
            </div>

            <div className="space-y-3">
              {[
                { task: 'Complete 4 Daily Commissions', progress: '0/4', active: true },
                { task: 'Defeat 1 Elite Boss', progress: '1/1', active: false },
                { task: 'Mine 10 Ores', progress: '10/10', active: false },
              ].map((t, i) => (
                <div key={i} className="flex items-center justify-between text-sm p-3 bg-white/5 rounded-lg border border-transparent hover:border-white/10 transition-colors">
                  <span className={t.active ? "text-white" : "text-gray-500 line-through"}>{t.task}</span>
                  <span className={t.active ? "text-genshin-amber font-mono" : "text-gray-600"}>{t.progress}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Server Status */}
          <div className="glass-panel p-6 rounded-2xl">
             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
               <RefreshCw size={14} /> Server Status
             </h3>
             <div className="space-y-4">
               <div className="flex justify-between items-center">
                 <span className="text-sm">America</span>
                 <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/> Online - 24ms</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-sm">Europe</span>
                 <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/> Online - 110ms</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-sm">Asia</span>
                 <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500"/> Busy - 210ms</span>
               </div>
             </div>
          </div>
        </div>

        {/* Right Column - News & Community */}
        <div className="lg:col-span-2 space-y-8">
           {/* Featured Banner */}
           <div className="w-full aspect-[2/1] md:aspect-[3/1] rounded-2xl overflow-hidden relative group cursor-pointer border border-white/10">
             <img src="https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1200&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Event" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
               <span className="bg-genshin-amber text-black text-xs font-bold px-2 py-1 rounded w-fit mb-2 uppercase tracking-widest">Version 4.5</span>
               <h2 className="text-2xl font-black text-glow-gold">Gems of the Desolate Peaks</h2>
               <p className="text-gray-300 text-sm mt-2 max-w-lg">Explore the new regions and discover hidden secrets in the Chasm. Available now.</p>
             </div>
           </div>

           {/* Updates List */}
           <div className="glass-panel rounded-2xl overflow-hidden">
             <div className="p-4 bg-black/40 border-b border-white/10 flex items-center justify-between">
               <h3 className="font-bold flex items-center gap-2 uppercase tracking-widest"><AlertCircle size={18} className="text-genshin-gold"/> Recent Notices</h3>
               <button className="text-xs text-gray-400 hover:text-white uppercase tracking-widest">View All</button>
             </div>
             <div>
               {[
                 { type: 'Event', tag: 'bg-purple-500/20 text-purple-400 border-purple-500/20', title: 'Ley Line Overflow Event Duration', date: 'Oct 12' },
                 { type: 'Update', tag: 'bg-blue-500/20 text-blue-400 border-blue-500/20', title: 'Version 4.5 Update Notice', date: 'Oct 10' },
                 { type: 'Info', tag: 'bg-gray-500/20 text-gray-400 border-gray-500/20', title: 'Known Issues in Co-op Mode', date: 'Oct 08' },
                 { type: 'News', tag: 'bg-genshin-gold/20 text-genshin-gold border-genshin-gold/20', title: 'Character Teaser - "Neuvillette: The Water\'s Whisper"', date: 'Oct 05' },
               ].map((item, i) => (
                 <a key={i} href="#" className="flex items-center p-4 border-b border-white/5 hover:bg-white/5 transition-colors gap-4">
                   <div className={cn("px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border", item.tag)}>
                     {item.type}
                   </div>
                   <h4 className="flex-1 text-sm font-medium hover:text-genshin-gold transition-colors">{item.title}</h4>
                   <span className="text-xs text-gray-500">{item.date}</span>
                 </a>
               ))}
             </div>
           </div>

           {/* Community Chat Widget Placeholder */}
           <div className="glass-panel p-6 rounded-2xl h-64 flex flex-col items-center justify-center text-center border-dashed border-2 border-white/10">
             <MessageSquare size={48} className="text-gray-600 mb-4" />
             <h3 className="font-bold mb-2">Global Chat Offline</h3>
             <p className="text-sm text-gray-400 max-w-sm mb-4">You need to link your HoYoverse account to access the community hub and team builder.</p>
             <Button variant="outline">Link Account</Button>
           </div>
        </div>
      </div>
    </div>
  );
}

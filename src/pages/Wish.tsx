import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useUserStore, useUiStore } from '../stores';
import { mockCharacters } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Star } from 'lucide-react';
import { cn } from '../utils/cn';
import { Character } from '../types';

export default function Wish() {
  const { primogems, spendPrimogems, unlockCharacter } = useUserStore();
  const { addNotification } = useUiStore();
  
  const [isWishing, setIsWishing] = useState(false);
  const [pullResult, setPullResult] = useState<Character[] | null>(null);
  const [pity, setPity] = useState(0);

  const handleWish = (times: number) => {
    const cost = times * 160;
    if (!spendPrimogems(cost)) {
      addNotification("Not enough Primogems!", "error");
      return;
    }

    setIsWishing(true);
    
    // Simulate pull
    setTimeout(() => {
      const results: Character[] = [];
      let currentPity = pity;

      for(let i = 0; i < times; i++) {
        currentPity++;
        let rarity = 3;
        const roll = Math.random() * 100;

        if (currentPity >= 90) {
          rarity = 5;
          currentPity = 0;
        } else if (roll <= 0.6) {
          rarity = 5;
          currentPity = 0;
        } else if (roll <= 5.7) { // 5.1 + 0.6
          rarity = 4;
        }

        if (rarity === 5) {
          const fiveStars = mockCharacters.filter(c => c.rarity === 5);
          const char = fiveStars[Math.floor(Math.random() * fiveStars.length)];
          results.push(char);
          unlockCharacter(char.id);
        } else if (rarity === 4) {
          const fourStars = mockCharacters.filter(c => c.rarity === 4);
          const char = fourStars[Math.floor(Math.random() * fourStars.length)];
          results.push(char);
          unlockCharacter(char.id);
        } else {
          // 3 star generic weapon
          results.push({
            id: `w3-${Date.now()}-${i}`,
            name: "Debate Club",
            rarity: 3,
            imageUrl: "https://images.unsplash.com/photo-1590483736622-398541ce0114?q=80&w=300&auto=format&fit=crop",
            element: 'Geo', // placeholder
            weapon: 'Claymore',
            region: 'Mondstadt',
            description: "",
            bannerImageUrl: "",
            avatarUrl: "",
            stats: { hp: 0, atk: 39, def: 0, mastery: 0 }
          });
        }
      }

      setPity(currentPity);
      setPullResult(results);
      setIsWishing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2500&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-genshin-dark/80 backdrop-blur-sm" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-10 h-full flex flex-col">
        {/* Header containing currency */}
        <div className="flex justify-between items-center bg-black/40 p-4 rounded-full border border-white/10 mb-8 backdrop-blur-md">
           <h1 className="text-2xl font-black italic tracking-widest text-glow-gold px-4">WISH</h1>
           <div className="flex items-center gap-6 px-4">
             <div className="flex items-center gap-2">
               <span className="text-gray-400 text-sm">Pity:</span>
               <span className="font-mono text-genshin-amber">{pity} / 90</span>
             </div>
             <div className="flex items-center gap-2 bg-black/50 px-4 py-1.5 rounded-full border border-genshin-gold/30">
               <img src="https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Item_Primogem.png" className="w-6 h-6 object-contain" alt="Primogem" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
               <Star size={16} className="text-genshin-gold fill-genshin-gold md:hidden" />
               <span className="font-mono font-bold">{primogems}</span>
             </div>
           </div>
        </div>

        {/* Banner Display */}
        <div className="flex-1 flex items-center justify-center relative mb-12">
          {isWishing ? (
             <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               className="text-center"
             >
               <div className="w-16 h-16 border-4 border-genshin-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
               <p className="text-xl font-bold tracking-widest animate-pulse text-genshin-gold">Wishing...</p>
             </motion.div>
          ) : (
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="relative w-full max-w-5xl aspect-[21/9] rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl shadow-genshin-gold/20"
             >
               <img src="https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Banner" />
               <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent p-12 flex flex-col justify-center">
                 <h2 className="text-5xl font-black tracking-widest text-glow-gold drop-shadow-xl mb-2">REIGN OF SERENITY</h2>
                 <p className="text-2xl font-light tracking-widest mb-8 text-white drop-shadow-lg">Raiden Shogun Event Wish</p>
                 <div className="flex items-center gap-4">
                   <div className="bg-black/60 backdrop-blur-md px-6 py-2 rounded-full border border-genshin-electro/50 flex items-center gap-2">
                     <span className="w-3 h-3 rounded-full bg-genshin-electro animate-pulse" />
                     <span className="font-bold text-genshin-electro tracking-widest uppercase">Drop Rate Boost</span>
                   </div>
                 </div>
               </div>
             </motion.div>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-end gap-6 mb-12">
           <Button onClick={() => handleWish(1)} disabled={isWishing} variant="secondary" size="lg" className="h-16 px-10 border-white/20">
             <div className="flex flex-col items-center">
               <span className="text-sm">Wish x1</span>
               <span className="text-xs text-genshin-gold flex items-center gap-1"><Star size={10} className="fill-genshin-gold"/> 160</span>
             </div>
           </Button>
           <Button onClick={() => handleWish(10)} disabled={isWishing} size="lg" className="h-16 px-12">
             <div className="flex flex-col items-center">
               <span className="text-base tracking-widest">Wish x10</span>
               <span className="text-xs text-black/70 flex items-center gap-1"><Star size={10} className="fill-black"/> 1600</span>
             </div>
           </Button>
        </div>
      </div>

      {/* Results Modal */}
      <AnimatePresence>
        {pullResult && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          >
            <div className="max-w-6xl w-full">
              <h2 className="text-center text-3xl font-black tracking-widest text-glow-gold mb-12 uppercase">Wish Results</h2>
              
              <div className="flex flex-wrap justify-center gap-4">
                {pullResult.map((res, i) => (
                  <motion.div
                    key={res.id + i}
                    initial={{ opacity: 0, scale: 0, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                    className={cn(
                      "relative w-24 h-64 md:w-32 md:h-80 clip-slanted overflow-hidden group border",
                      res.rarity === 5 ? "border-genshin-gold shadow-[0_0_20px_rgba(255,215,0,0.5)]" : 
                      res.rarity === 4 ? "border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]" : "border-gray-500"
                    )}
                  >
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-t z-10",
                      res.rarity === 5 ? "from-genshin-gold/90 to-transparent" : 
                      res.rarity === 4 ? "from-purple-500/90 to-transparent" : "from-gray-600/90 to-transparent"
                    )} />
                    <img src={res.imageUrl} className="absolute inset-0 w-full h-full object-cover" alt={res.name} />
                    <div className="absolute inset-x-0 bottom-0 z-20 p-2 flex flex-col items-center pb-4">
                       <div className="flex mb-1">
                         {Array(res.rarity).fill(0).map((_, j) => (
                           <Star key={j} size={10} className={cn(
                             "fill-current",
                             res.rarity === 5 ? "text-yellow-200" : res.rarity === 4 ? "text-purple-200" : "text-gray-300"
                           )} />
                         ))}
                       </div>
                       <span className="text-xs font-bold text-center drop-shadow-md truncate w-full">{res.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center mt-12">
                <Button onClick={() => setPullResult(null)} size="lg" className="w-64">Continue</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift } from 'lucide-react';
import { Button } from './ui/Button';

export function ExitIntent() {
  const [show, setShow] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggered) {
        setShow(true);
        setHasTriggered(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasTriggered]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-lg bg-[#1a1a2e] border border-[#ffd700]/30 rounded-2xl shadow-[0_0_50px_rgba(255,215,0,0.15)] overflow-hidden relative"
          >
            <button 
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
            >
              <X />
            </button>
            
            <div className="h-40 bg-[url('https://images.unsplash.com/photo-1542382257-80ddcbef2b75?q=80&w=800&auto=format&fit=crop')] bg-cover relative">
               <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] to-transparent" />
               <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#ffd700] rounded-full flex items-center justify-center text-black shadow-lg shadow-[#ffd700]/50">
                 <Gift size={32} />
               </div>
            </div>

            <div className="p-8 pt-12 text-center">
              <h2 className="text-3xl font-black uppercase tracking-widest text-[#ffd700] drop-shadow-md mb-2">Wait, Traveler!</h2>
              <p className="text-gray-300 mb-6">Don't leave yet. Claim your <span className="font-bold text-white">Free Welcome Bundle</span> instantly. Includes 1600 Primogems and a guaranteed 4-Star Character.</p>
              
              <div className="flex flex-col gap-4">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ffd700] transition-colors"
                />
                <Button size="lg" className="w-full text-lg uppercase tracking-widest" onClick={() => setShow(false)}>
                  Claim Now
                </Button>
                <button onClick={() => setShow(false)} className="text-xs text-gray-500 uppercase tracking-widest hover:text-gray-300 transition-colors mt-2">
                  No thanks, I'll pass
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

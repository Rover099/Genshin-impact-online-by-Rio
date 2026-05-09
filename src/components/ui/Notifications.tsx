import React from 'react';
import { useUiStore } from '../../stores';
import { AnimatePresence, motion } from 'motion/react';
import { X, Bell } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Notifications() {
  const { notifications, removeNotification } = useUiStore();

  return (
    <div className="fixed top-24 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className={cn(
              "pointer-events-auto flex items-start gap-3 p-4 rounded-lg clip-slanted glass-panel backdrop-blur-md border",
              n.type === 'success' ? 'border-green-500/30' :
              n.type === 'warning' ? 'border-genshin-amber/30' :
              n.type === 'error' ? 'border-red-500/30' : 'border-white/10'
            )}
          >
            <div className={cn(
              "mt-0.5",
               n.type === 'success' ? 'text-green-400' :
               n.type === 'warning' ? 'text-genshin-amber' :
               n.type === 'error' ? 'text-red-400' : 'text-genshin-gold'
            )}>
              <Bell size={18} />
            </div>
            <div className="flex-1 text-sm font-medium text-white">{n.message}</div>
            <button 
              onClick={() => removeNotification(n.id)}
              className="text-gray-400 hover:text-white"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { cn } from '../utils/cn';
import { Button } from './ui/Button';
import { Menu, X, Gift, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Characters', path: '/characters' },
    { name: 'Map', path: '/map' },
    { name: 'Wish', path: '/wish' },
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-genshin-amber text-black text-center py-1.5 text-xs font-bold tracking-wider flex items-center justify-center gap-2 z-50 relative">
        <Gift size={14} /> NEW PLAYERS: CLAIM 1600 PRIMOGEMS UPON REGISTRATION <Gift size={14} />
      </div>

      <header
        className={cn(
          "fixed top-7 left-0 right-0 z-40 transition-all duration-300",
          isScrolled ? "glass-panel py-3" : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-genshin-gold clip-slanted flex items-center justify-center text-genshin-dark font-black transform group-hover:rotate-12 transition-transform">
              G
            </div>
            <span className="font-bold text-xl tracking-widest text-glow-gold hidden sm:block">GENSHIN PORTAL</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium uppercase tracking-widest transition-colors hover:text-genshin-gold pb-1 relative",
                  location.pathname === link.path ? "text-genshin-gold border-b-2 border-genshin-gold" : "text-gray-300"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="hidden lg:flex">Log In</Button>
            <Button size="sm" className="hidden lg:flex gap-2">
              <Zap size={14} /> Play Now
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 flex"
          >
            <div className="flex-1 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
            <div className="w-72 bg-genshin-surface h-full border-l border-white/10 flex flex-col p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-lg text-genshin-gold tracking-widest">MENU</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white">
                  <X />
                </button>
              </div>
              
              <nav className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-lg font-medium",
                      location.pathname === link.path ? "text-genshin-gold" : "text-gray-300 hover:text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-4">
                <Button variant="outline" className="w-full">Log In</Button>
                <Button className="w-full gap-2"><Zap size={16}/> Play Now</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Youtube, Disc as Discord } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black/80 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-genshin-gold clip-slanted flex items-center justify-center text-genshin-dark font-black">
                G
              </div>
              <span className="font-bold text-xl tracking-widest text-glow-gold">GENSHIN PORTAL</span>
            </div>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Experience the vast open world of Teyvat directly in your browser. 
              No downloads, just immediate adventure. Join millions of travelers today.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 tracking-wider uppercase text-sm">Quick Links</h4>
            <ul className="space-y-3 test-sm">
              <li><Link to="/characters" className="text-gray-400 hover:text-genshin-gold transition-colors">Characters</Link></li>
              <li><Link to="/map" className="text-gray-400 hover:text-genshin-gold transition-colors">Interactive Map</Link></li>
              <li><Link to="/wish" className="text-gray-400 hover:text-genshin-gold transition-colors">Wish Simulator</Link></li>
              <li><Link to="/news" className="text-gray-400 hover:text-genshin-gold transition-colors">News & Events</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 tracking-wider uppercase text-sm">Community</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-genshin-gold hover:text-genshin-dark transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-genshin-gold hover:text-genshin-dark transition-all">
                <Youtube size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-genshin-gold hover:text-genshin-dark transition-all">
                <Discord size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Genshin Online Portal. Not affiliated with miHoYo / Cognosphere.</p>
          <div className="flex gap-4">
            <Link to="#" className="hover:text-white">Privacy Policy</Link>
            <Link to="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

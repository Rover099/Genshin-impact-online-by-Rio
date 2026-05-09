import React, { useState } from 'react';
import { motion } from 'motion/react';
import { mockCharacters } from '../data/mockData';
import { Element, WeaponType, Character } from '../types';
import { Search } from 'lucide-react';
import { cn } from '../utils/cn';

const elements: Element[] = ['Pyro', 'Hydro', 'Anemo', 'Electro', 'Dendro', 'Cryo', 'Geo'];
const weapons: WeaponType[] = ['Sword', 'Claymore', 'Polearm', 'Catalyst', 'Bow'];

export default function Characters() {
  const [filterElement, setFilterElement] = useState<Element | null>(null);
  const [filterWeapon, setFilterWeapon] = useState<WeaponType | null>(null);
  const [search, setSearch] = useState('');

  const filtered = mockCharacters.filter(c => {
    if (filterElement && c.element !== filterElement) return false;
    if (filterWeapon && c.weapon !== filterWeapon) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-glow-gold mb-8 text-center">
          Character Archive
        </h1>

        {/* Filters */}
        <div className="w-full glass-panel p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-center justify-between z-10">
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <span className="text-sm text-gray-400 uppercase tracking-widest w-full md:w-auto">Elements</span>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setFilterElement(null)}
                className={cn("px-3 py-1 rounded-full text-xs font-bold transition-all", !filterElement ? "bg-white text-black" : "bg-white/10 hover:bg-white/20 text-white")}
              >
                ALL
              </button>
              {elements.map(el => (
                <button
                  key={el}
                  onClick={() => setFilterElement(el === filterElement ? null : el)}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-bold transition-all",
                    filterElement === el ? "bg-genshin-amber text-black" : "bg-white/10 hover:bg-white/20 text-white"
                  )}
                >
                  {el}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search characters..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black/50 border border-white/20 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-genshin-gold transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filtered.map(char => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          No characters match your current filters.
        </div>
      )}
    </div>
  );
}

function CharacterCard({ character }: { character: Character }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group relative cursor-pointer clip-slanted overflow-hidden aspect-[3/4]"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t z-10",
        character.rarity === 5 ? "from-genshin-gold/80 via-transparent to-transparent" : "from-purple-500/80 via-transparent to-transparent"
      )} />
      
      <img 
        src={character.imageUrl} 
        alt={character.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 z-20 p-4 flex flex-col justify-end">
        <div className="flex items-center gap-1 mb-1">
          {Array(character.rarity).fill(0).map((_, i) => (
            <Star key={i} size={12} className="fill-genshin-gold text-genshin-gold" />
          ))}
        </div>
        <h3 className="text-xl font-bold uppercase tracking-wide drop-shadow-md">{character.name}</h3>
        <p className="text-xs text-gray-300 uppercase tracking-widest">{character.element} • {character.weapon}</p>
      </div>

      {/* Hover Reveal Card */}
      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-black/80 backdrop-blur-md p-4 z-30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-genshin-gold/50 flex flex-col justify-center">
         <p className="text-xs text-gray-300 line-clamp-3 mb-4">{character.description}</p>
         <div className="grid grid-cols-2 gap-2 text-xs">
           <div><span className="text-gray-500">HP:</span> {character.stats.hp}</div>
           <div><span className="text-gray-500">ATK:</span> {character.stats.atk}</div>
           <div><span className="text-gray-500">DEF:</span> {character.stats.def}</div>
           <div><span className="text-gray-500">EM:</span> {character.stats.mastery}</div>
         </div>
      </div>
    </motion.div>
  );
}

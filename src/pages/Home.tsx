import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Play, ChevronRight, Star, Shield, Users, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUiStore } from '../stores';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/Accordion';

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const addNotification = useUiStore(state => state.addNotification);

  useEffect(() => {
    // Simulate real-time pulls
    const fakeUsers = ['Traveler99', 'PaimonLover', 'ArchonHunter', 'DilucMains'];
    const interval = setInterval(() => {
      const user = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
      addNotification(`🔥 ${user} just unlocked a 5-star character!`, 'success');
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        {/* Background Image / Video Placeholder */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-genshin-dark z-10" />
          <img 
            src="https://images.unsplash.com/photo-1542382257-80ddcbef2b75?q=80&w=2500&auto=format&fit=crop" 
            alt="Teyvat Landscape" 
            className="w-full h-full object-cover object-center transform scale-110"
          />
        </motion.div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 w-full flex flex-col items-center text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-genshin-gold/30 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-medium tracking-wide">Limited Early Access — Join 50M+ Travelers</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-tr from-white via-white to-gray-400 drop-shadow-2xl mb-6"
          >
            ENTER <span className="text-glow-gold text-genshin-gold">TEYVAT</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 font-light"
          >
            Play Genshin Impact instantly in your browser. No 50GB downloads. No waiting. Just seamless, high-fidelity cloud gaming.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <Button size="lg" className="group relative overflow-hidden h-16 px-10 text-xl">
              <span className="relative z-10 font-black tracking-wider flex items-center gap-2">
                PLAY NOW FREE <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </Button>
            <Button size="lg" variant="glass" className="glass-panel text-white hover:bg-white/10 border-white/20 h-16 px-8 flex items-center gap-2">
              <Play fill="currentColor" size={20} /> Watch Trailer
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center gap-6 mt-16 text-sm text-gray-400 justify-center flex-wrap"
          >
            <div className="flex items-center gap-2"><Users size={16}/> 50M+ Players</div>
            <div className="w-1 h-1 rounded-full bg-gray-600" />
            <div className="flex items-center gap-2"><Globe size={16}/> Play Anywhere</div>
            <div className="w-1 h-1 rounded-full bg-gray-600" />
            <div className="flex items-center gap-2"><Shield size={16}/> 256-bit Secure</div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-xs uppercase tracking-widest text-gray-400">Scroll to explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-genshin-gold to-transparent" />
        </motion.div>
      </section>

      {/* VALUE PROPS / CONVERSION FUNNEL */}
      <section className="py-24 bg-genshin-dark relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-wider uppercase mb-4 text-glow-gold">Tired of Waiting?</h2>
            <p className="text-xl text-gray-400">Experience next-gen cloud gaming infrastructure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Instant Access",
                desc: "Skip the 50GB+ download and installation. Click play and enter Teyvat in under 5 seconds.",
                icon: <Zap size={32} className="text-genshin-amber" />
              },
              {
                title: "Cross-Save Sync",
                desc: "Link your existing HoYoverse account. Your progress, characters, and primogems sync seamlessly.",
                icon: <Globe size={32} className="text-genshin-hydro" />
              },
              {
                title: "High Fidelity",
                desc: "Powered by GeForce NOW infrastructure. Experience 4K graphics at 60fps directly in your browser.",
                icon: <Star size={32} className="text-genshin-gold" />
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="glass-panel p-8 rounded-2xl border-white/5 hover:border-genshin-gold/30 transition-colors group"
              >
                <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-genshin-surface relative z-10 border-y border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-wider uppercase mb-4 text-glow-gold">Frequently Asked Questions</h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is this official?</AccordionTrigger>
              <AccordionContent>
                No, this is a concept demo created for illustrative purposes and is not affiliated with miHoYo / Cognosphere. It demonstrates how a high-converting cloud gaming portal for Genshin Impact could be built.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Do I need to download anything?</AccordionTrigger>
              <AccordionContent>
                No download is required. The game streams directly to your browser using advanced cloud gaming technology, meaning you can play instantly on any device that supports a modern web browser.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it safe to connect my account?</AccordionTrigger>
              <AccordionContent>
                We use industry-standard 256-bit SSL encryption and OAuth 2.0. We never see your password, and all data is handled securely through the official API endpoints.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Will my progress carry over to mobile/PC?</AccordionTrigger>
              <AccordionContent>
                Yes! Because it connects to your existing HoYoverse account, any progress made here will instantly sync with your mobile, PC, and console versions of the game.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-genshin-amber/20" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518331539958-8167f2ecf30b?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay" />
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-genshin-dark to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-genshin-dark to-transparent" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-8">
            Your Journey Begins Here
          </h2>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            100% Free to Start. No Credit Card Required. Cancel Anytime.
          </p>
          <Button size="lg" className="h-20 px-12 text-2xl w-full sm:w-auto shadow-[0_0_40px_rgba(255,215,0,0.4)] animate-pulse-slow">
            CLAIM 1600 PRIMOGEMS & PLAY
          </Button>
        </div>
      </section>
    </div>
  );
}

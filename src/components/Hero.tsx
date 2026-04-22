import { motion } from 'motion/react';
import { Target, Shield, Trophy } from 'lucide-react';
import Button from './ui/Button';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 overflow-hidden bg-dark-surface">
      {/* Background Decor - Editorial Style */}
      <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-brand-primary rounded-full opacity-10 blur-[140px]" />
      <div className="absolute bottom-[-50px] left-[-50px] w-[500px] h-[500px] bg-brand-accent rounded-full opacity-5 blur-[120px]" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-12 items-center relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="col-span-12 lg:col-span-8 flex flex-col justify-center"
        >
          <span className="text-[12px] font-mono text-brand-primary uppercase mb-6 tracking-[0.4em] font-bold">
            // ASCEND TO THE SUMMIT
          </span>

          <h1 className="text-7xl md:text-[10rem] font-black leading-[0.82] mb-10 uppercase italic tracking-tighter">
            Reach The<br />
            <span className="text-transparent text-stroke border-y-2 border-brand-primary/30 py-2 inline-block">
              Zenith.
            </span>
          </h1>

          <p className="text-xl text-white/50 mb-12 max-w-lg leading-relaxed font-medium">
            Elite Rocket League boosting and performance coaching. 
            Dominate the pitch with SSL-tier players and dedicated mentors.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <Button size="lg" glow>Order Boost</Button>
            <Button variant="outline" size="lg">Book Coaching</Button>
          </div>

          <div className="mt-20 grid grid-cols-3 gap-12 border-t border-white/5 pt-10">
            <div className="flex flex-col">
              <span className="text-xl font-display font-black tracking-widest italic text-brand-primary">15K+</span>
              <span className="text-[9px] text-white/40 uppercase font-black tracking-[0.2em]">Boosts Completed</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-black tracking-widest italic text-brand-primary">4.9/5</span>
              <span className="text-[9px] text-white/40 uppercase font-black tracking-[0.2em]">Customer Rating</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-black tracking-widest italic text-brand-primary">24/7</span>
              <span className="text-[9px] text-white/40 uppercase font-black tracking-[0.2em]">Elite Support</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="col-span-12 lg:col-span-4 hidden lg:block"
        >
          <div className="rotate-2 glass-card p-1 border border-white/10 backdrop-blur-xl relative">
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-primary/20 blur-xl rounded-full" />
            <div className="border border-white/10 p-8 flex flex-col gap-8">
               <div className="flex justify-between items-center">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 italic">Live Tracking</h3>
                  <span className="text-[9px] bg-brand-primary/10 text-brand-primary px-3 py-1 font-black uppercase tracking-widest">Active</span>
               </div>
               
               <div className="space-y-6">
                 {[1,2].map(i => (
                   <div key={i} className="p-4 bg-black/40 border border-white/5">
                      <div className="text-[9px] text-white/30 uppercase font-bold tracking-widest mb-2">Order #{i}0482</div>
                      <div className="flex justify-between items-center">
                        <span className="font-black text-lg italic uppercase text-white/80">GC I → SSL</span>
                        <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse shadow-[0_0_10px_rgba(0,243,255,1)]" />
                      </div>
                   </div>
                 ))}
               </div>

               <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                  <div>
                    <p className="text-[9px] text-white/30 uppercase font-bold tracking-widest">Active Players</p>
                    <p className="text-lg font-black italic">142</p>
                  </div>
                  <Trophy className="text-brand-primary" size={32} />
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

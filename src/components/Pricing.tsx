import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, ChevronRight, Check, Loader2, CheckSquare } from 'lucide-react';
import Button from './ui/Button';
import { cn } from '../lib/utils';
import { useFirebase } from '../lib/FirebaseContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError } from '../lib/firebase';

const RANKS = [
  'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Champion', 'Grand Champion', 'Supersonic Legend'
];

export default function Pricing() {
  const { user, signIn } = useFirebase();
  const [currentRank, setCurrentRank] = useState('Platinum');
  const [targetRank, setTargetRank] = useState('Diamond');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const calculatePrice = () => {
    const curIdx = RANKS.indexOf(currentRank);
    const tarIdx = RANKS.indexOf(targetRank);
    if (tarIdx <= curIdx) return 0;
    const gap = tarIdx - curIdx;
    const base = gap * 15;
    const difficultyMultiplier = (tarIdx / 2) + 1;
    return Math.floor(base * difficultyMultiplier);
  };

  const currentPrice = calculatePrice();

  const handleOrder = async () => {
    if (!user) {
      await signIn();
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        userId: user.uid,
        serviceId: 'boosting_rank',
        currentRank,
        targetRank,
        price: currentPrice,
        status: 'pending',
        type: 'boosting',
        createdAt: Date.now(),
        serverTimestamp: serverTimestamp()
      });
      setSuccess(true);
    } catch (error) {
      handleFirestoreError(error, 'create', 'bookings');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <section id="pricing" className="py-24 bg-black relative">
        <div className="max-w-xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(0,242,255,0.4)]"
          >
            <CheckSquare size={40} className="text-black" />
          </motion.div>
          <h2 className="text-4xl font-extrabold mb-4 font-display italic uppercase">Order Received!</h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Your boost order from <span className="text-white font-bold">{currentRank}</span> to <span className="text-brand-primary font-bold">{targetRank}</span> has been received. 
            A booster will be assigned shortly.
          </p>
          <Button variant="outline" onClick={() => setSuccess(false)}>New Order</Button>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-24 bg-dark-surface relative">
       <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-left">
          <span className="text-[12px] font-mono text-brand-primary uppercase mb-4 tracking-[0.3em] font-bold block">// REAL-TIME CONFIG</span>
          <h2 className="text-5xl md:text-8xl font-black mb-4 uppercase italic">Order <span className="text-stroke text-transparent">Rank Boost</span></h2>
        </div>

        <div className="grid grid-cols-12 gap-12 items-start">
          {/* Selector Area */}
          <div className="col-span-12 lg:col-span-8 space-y-12">
            <div className="glass-card p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[100px] -z-10" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div>
                   <label className="block text-[11px] uppercase tracking-[0.2em] text-white/40 mb-6 font-black italic">Current Rank</label>
                   <div className="grid grid-cols-2 gap-3">
                     {RANKS.map(rank => (
                       <button
                         key={rank}
                         onClick={() => {
                           setCurrentRank(rank);
                           if (RANKS.indexOf(targetRank) <= RANKS.indexOf(rank)) {
                             const nextIdx = Math.min(RANKS.indexOf(rank) + 1, RANKS.length - 1);
                             setTargetRank(RANKS[nextIdx]);
                           }
                         }}
                         className={cn(
                           "px-4 py-4 text-[11px] font-black transition-all duration-300 text-left uppercase tracking-widest italic border",
                           currentRank === rank 
                             ? "bg-brand-primary text-black border-brand-primary" 
                             : "bg-white/5 border-white/5 hover:border-white/20 text-white/40"
                         )}
                       >
                         {rank}
                       </button>
                     ))}
                   </div>
                 </div>

                 <div>
                   <label className="block text-[11px] uppercase tracking-[0.2em] text-white/40 mb-6 font-black italic">Desired Rank</label>
                   <div className="grid grid-cols-2 gap-3">
                     {RANKS.map(rank => (
                       <button
                         key={rank}
                         disabled={RANKS.indexOf(rank) <= RANKS.indexOf(currentRank)}
                         onClick={() => setTargetRank(rank)}
                         className={cn(
                           "px-4 py-4 text-[11px] font-black transition-all duration-300 text-left uppercase tracking-widest italic border",
                           targetRank === rank 
                             ? "bg-brand-primary text-black border-brand-primary" 
                             : "bg-white/5 border-white/5 hover:border-white/20 text-white/40",
                           RANKS.indexOf(rank) <= RANKS.indexOf(currentRank) && "opacity-20 cursor-not-allowed"
                         )}
                       >
                         {rank}
                       </button>
                     ))}
                   </div>
                 </div>
              </div>
            </div>
            
            <div className="flex items-center gap-8 p-10 bg-white/5 border-l-4 border-brand-primary relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-full bg-brand-primary/5 -skew-x-12 translate-x-12" />
               <Trophy className="shrink-0 text-brand-primary" size={40} />
               <p className="text-md text-white/50 font-medium italic leading-relaxed">Boosts are typically completed within 24-48 hours. Our boosters use hardware-spoofing and secure VPNs to ensure 100% safety of your account.</p>
            </div>
          </div>

          {/* Checkout Card */}
          <motion.div 
            layout
            className="col-span-12 lg:col-span-4 rotate-1 sticky top-28"
          >
             <div className="glass-card p-1">
               <div className="border border-white/10 p-10 flex flex-col gap-8 bg-black/40">
                  <div className="flex justify-between items-center border-b border-white/10 pb-6 uppercase font-black italic">
                    <span className="text-[10px] text-white/40 tracking-widest uppercase">Order Summary</span>
                    <span className="text-[9px] bg-brand-primary/10 text-brand-primary px-3 py-1 uppercase">Instant start</span>
                  </div>

                  <div className="flex items-center justify-between font-black text-xl italic uppercase tracking-tighter">
                     <span>{currentRank}</span>
                     <ChevronRight className="text-brand-primary shrink-0" size={20} />
                     <span className="text-brand-primary text-right">{targetRank}</span>
                  </div>

                  <div className="space-y-4">
                     {['Live Order Tracking', 'Priority Boosting', 'Stealth VPN'].map(feature => (
                       <div key={feature} className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.1em] text-white/50">
                         <div className="w-1 h-1 bg-brand-primary rotate-45" />
                         <span>{feature}</span>
                       </div>
                     ))}
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <div className="flex justify-between items-end mb-8">
                      <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Total Cost</span>
                      <span className="text-5xl font-black italic tracking-tighter">${currentPrice || '--'}</span>
                    </div>
                    <Button 
                      className="w-full" 
                      size="lg" 
                      glow={!isSubmitting} 
                      onClick={handleOrder}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" /> : (user ? 'Checkout' : 'Login')}
                    </Button>
                  </div>
               </div>
             </div>
          </motion.div>
        </div>
       </div>
    </section>
  );
}

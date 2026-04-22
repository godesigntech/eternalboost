/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import BookingCalendar from './components/BookingCalendar';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import { motion, useScroll, useSpring } from 'motion/react';
import { useFirebase } from './lib/FirebaseContext';

export default function App() {
  const { profile } = useFirebase();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen bg-black selection:bg-brand-primary selection:text-black">
      {/* Global Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-primary z-[100] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
        <Hero />
        <Services />
        <Pricing />
        <BookingCalendar />
        <Reviews />
        <Contact />
        
        {profile?.role === 'admin' && <AdminPanel />}
      </main>

      <footer className="py-24 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="md:col-span-2">
                    <span className="font-display font-bold text-2xl tracking-tighter italic block mb-6">
                        ETERNAL<span className="text-brand-primary">BOOST</span>
                    </span>
                    <p className="text-white/40 max-w-sm leading-relaxed">
                        The world's most trusted Rocket League boosting and coaching platform. 
                        Helping players reach their potential since 2018.
                    </p>
                </div>
                <div>
                   <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Quick Links</h4>
                   <ul className="space-y-4 text-sm text-white/40">
                      <li><a href="#services" className="hover:text-brand-primary transition-colors">Services</a></li>
                      <li><a href="#pricing" className="hover:text-brand-primary transition-colors">Pricing</a></li>
                      <li><a href="#coaching" className="hover:text-brand-primary transition-colors">Coaching</a></li>
                   </ul>
                </div>
                <div>
                   <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Support</h4>
                   <ul className="space-y-4 text-sm text-white/40">
                      <li><a href="#contact" className="hover:text-brand-primary transition-colors">Contact</a></li>
                      <li><a href="#" className="hover:text-brand-primary transition-colors">Refund Policy</a></li>
                      <li><a href="#" className="hover:text-brand-primary transition-colors">Terms of Service</a></li>
                   </ul>
                </div>
            </div>
            <div className="pt-12 border-t border-white/5 text-center">
                <p className="text-white/10 text-[10px] uppercase font-bold tracking-[0.2em] mb-4">
                    © {new Date().getFullYear()} ETERNALBOOST. ALL RIGHTS RESERVED.
                </p>
                <p className="text-white/5 text-[10px] max-w-2xl mx-auto">
                    Rocket League is a registered trademark of Psyonix. EternalBoost is not affiliated with, endorsed, or sponsored by Psyonix, Epic Games, or any Rocket League tournament organizer.
                </p>
            </div>
        </div>
      </footer>
    </div>
  );
}

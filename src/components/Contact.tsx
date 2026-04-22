import { motion } from 'motion/react';
import { Send, MessageSquare } from 'lucide-react';
import Button from './ui/Button';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-dark-surface border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-brand-primary/5 blur-[120px] rounded-full -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          <div>
            <span className="text-[12px] font-mono text-brand-primary uppercase mb-6 tracking-[0.4em] font-bold block">// DIRECT PIPELINE</span>
            <h2 className="text-5xl md:text-8xl font-black mb-8 uppercase italic leading-[0.85]">Need <br /><span className="text-stroke text-transparent">Support?</span></h2>
            <p className="text-white/50 mb-12 text-lg max-w-lg leading-relaxed">
              Our team is available 24/7. Join our Discord community for instant support or fill out the form for business inquiries.
            </p>

            <div className="space-y-6">
               <a href="#" className="flex items-center gap-6 p-6 glass-card group transition-all">
                  <div className="w-16 h-16 bg-brand-primary rotate-45 flex items-center justify-center transition-transform group-hover:rotate-[135deg]">
                    <MessageSquare size={24} className="text-black -rotate-45" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Join our Discord</h4>
                    <p className="text-[10px] text-white/30 uppercase mt-1">Instant support and updates.</p>
                  </div>
               </a>
            </div>
          </div>

          <div className="glass-card p-1 rotate-1">
             <form className="p-10 bg-black/40 border border-white/10 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3 block italic">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/5 p-4 text-sm font-black italic focus:border-brand-primary/50 outline-none transition-all uppercase tracking-widest text-white" 
                    placeholder="PLAYER_NAME"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3 block italic">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-white/5 border border-white/5 p-4 text-sm font-black italic focus:border-brand-primary/50 outline-none transition-all uppercase tracking-widest text-white" 
                    placeholder="EMAIL@DOMAIN.COM"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3 block italic">Transmission</label>
                  <textarea 
                    rows={4} 
                    className="w-full bg-white/5 border border-white/5 p-4 text-sm font-black italic focus:border-brand-primary/50 outline-none transition-all uppercase tracking-widest text-white resize-none" 
                    placeholder="HOW CAN WE HELP?"
                  />
                </div>

                <Button className="w-full" size="lg" glow>
                  Send Transmission
                </Button>
             </form>
          </div>

        </div>
      </div>
    </section>
  );
}

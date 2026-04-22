import { motion } from 'motion/react';
import { Zap, Menu, X, User as UserIcon, LogOut, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import Button from './ui/Button';
import { useFirebase } from '../lib/FirebaseContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, signIn, logout } = useFirebase();

  const links = [
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Coaching', href: '#coaching' },
    { name: 'Reviews', href: '#reviews' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-8 h-8 bg-brand-primary rotate-45 flex items-center justify-center transition-transform group-hover:rotate-[135deg]">
            <div className="w-4 h-4 bg-black -rotate-45" />
          </div>
          <span className="font-display font-black text-xl tracking-tighter uppercase italic">
            ETERNAL<span className="text-brand-primary">BOOST</span>
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-white/60 hover:text-white transition-colors font-bold text-[11px] uppercase tracking-[0.2em]"
            >
              {link.name}
            </motion.a>
          ))}
          
          <div className="flex items-center gap-6 border-l border-white/5 pl-8">
            {user ? (
              <div className="flex items-center gap-4">
                {profile?.role === 'admin' && (
                  <a href="#admin" className="text-brand-accent hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                    <ShieldAlert size={16} />
                    Admin
                  </a>
                )}
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <UserIcon size={16} className="text-brand-primary" />
                   </div>
                   <button onClick={logout} className="text-white/40 hover:text-white transition-colors">
                      <LogOut size={16} />
                   </button>
                </div>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={signIn}>Login</Button>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-dark-elevated border-b border-white/10 px-6 py-8 flex flex-col gap-6"
        >
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-lg font-display uppercase tracking-widest text-white/80"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          {user ? (
             <Button variant="outline" className="w-full" onClick={logout}>Logout</Button>
          ) : (
             <Button variant="primary" className="w-full" onClick={signIn}>Login</Button>
          )}
        </motion.div>
      )}
    </nav>
  );
}

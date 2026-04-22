import { motion } from 'motion/react';
import { Rocket, GraduationCap, Clock, ShieldCheck } from 'lucide-react';
import Button from './ui/Button';

const services = [
  {
    id: 'boost',
    icon: Rocket,
    title: 'Rank Boosting',
    description: 'Reach your dream rank with our Supersonic Legend boosters. Safe, fast, and anonymous.',
    features: ['Manual Boosting Only', 'Order Tracking', 'VPN Protection'],
    price: 'From $15.00',
    color: 'brand-primary'
  },
  {
    id: 'coach',
    icon: GraduationCap,
    title: 'Pro Coaching',
    description: 'Learn from the best. 1-on-1 sessions tailored to your needs from mechanics to rotations.',
    features: ['Live VOD Reviews', 'Mechanical Training', 'Private Lobby Drills'],
    price: 'From $25.00',
    color: 'brand-accent'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-dark-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[10px] font-black tracking-[0.3em] text-brand-primary uppercase mb-4 block">Professional Grade</span>
          <h2 className="text-5xl md:text-7xl font-black mb-4 uppercase italic">Elite <span className="text-stroke text-transparent">Services</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-card group p-12 relative overflow-hidden"
            >
              <service.icon className="w-16 h-16 text-brand-primary/20 mb-8 absolute -top-4 -right-4 grayscale group-hover:grayscale-0 group-hover:text-brand-primary transition-all duration-700" />
              
              <h3 className="text-4xl font-black mb-6 italic tracking-tight">{service.title}</h3>
              <p className="text-white/40 mb-10 leading-relaxed text-lg font-medium">
                {service.description}
              </p>

              <ul className="space-y-4 mb-12 border-t border-white/5 pt-8">
                {service.features.map(f => (
                  <li key={f} className="flex items-center gap-4 text-[12px] font-black uppercase tracking-widest text-white/60">
                    <div className="w-1.5 h-1.5 bg-brand-primary rotate-45" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/30 uppercase font-black tracking-widest mb-1">Starting At</span>
                  <span className="text-4xl font-black italic text-white">${service.price.split('$')[1]}</span>
                </div>
                <Button variant={service.id === 'boost' ? 'primary' : 'outline'} size="md">
                  Configure
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

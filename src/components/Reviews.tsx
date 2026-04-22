import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: "JAX_RL",
    rank: "GC 2",
    content: "Needed that final push to GC and EternalBoost delivered. My booster was insane and the communication was top tier. Definitely recommend.",
    rating: 5
  },
  {
    name: "CYBER_GHOST",
    rank: "Diamond 3",
    content: "The coaching session changed my game. I finally understand how to rotate properly. Already climbed two divisions!",
    rating: 5
  },
  {
    name: "MISTRAL",
    rank: "Champ 1",
    content: "Fast, secure, and professional. I was worried about account safety but they handled everything with VPNs and total privacy.",
    rating: 5
  }
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-dark-surface relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 text-left">
          <span className="text-[10px] font-black tracking-[0.3em] text-brand-primary uppercase mb-4 block">Proven Success</span>
          <h2 className="text-5xl md:text-7xl font-black mb-4 uppercase italic">Player <span className="text-stroke text-transparent">Feedback</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 relative group"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-white/5 transition-colors" />
              
              <div className="flex gap-1 mb-8">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-primary text-brand-primary" />
                ))}
              </div>

              <p className="text-lg text-white/70 italic mb-10 leading-relaxed font-medium">
                "{review.content}"
              </p>

              <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center font-black italic text-brand-primary border border-white/5">
                  {review.name[0]}
                </div>
                <div>
                  <h4 className="font-black italic uppercase tracking-tighter text-white">{review.name}</h4>
                  <p className="text-[9px] text-white/30 uppercase font-bold tracking-widest leading-none mt-1">{review.rank}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { REVIEWS } from '../constants';
import { Star, Quote } from 'lucide-react';

export default function Reviews() {
  return (
    <section id="reviews" className="py-32 px-4 relative overflow-hidden bg-cafe-dark">
      {/* Decorative Accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-cafe-gold/20 to-transparent" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cafe-primary/5 rounded-full blur-[120px] -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-px w-10 bg-cafe-gold" />
              <span className="text-cafe-gold font-black uppercase tracking-[0.4em] text-[10px]">Testimonials</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none">
              Daily <span className="text-cafe-gold italic underline decoration-white/10 underline-offset-8">Dreamers</span>
            </h2>
            <p className="text-white/50 text-lg font-medium italic">
              "The best conversations happen over a cup of Norte. Join our growing community of coffee connoisseurs."
            </p>
          </div>
          <div className="hidden md:flex flex-col items-end gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-cafe-gold text-cafe-gold drop-shadow-[0_0_8px_rgba(201,160,80,0.4)]" />
              ))}
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">4.9/5 Average Rating</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 bg-white/5 rounded-[3rem] relative border border-white/10 group hover:bg-white/10 transition-all duration-700 backdrop-blur-xl shadow-2xl hover:-translate-y-3"
            >
              <Quote className="absolute top-10 right-10 text-cafe-gold/10 group-hover:text-cafe-gold/20 transition-colors" size={60} />
              
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < review.rating ? 'fill-cafe-gold text-cafe-gold' : 'text-white/10'} />
                ))}
              </div>

              <p className="text-white/70 mb-10 text-lg font-medium leading-relaxed italic relative z-10">
                "{review.comment}"
              </p>

              <div className="flex items-center gap-5 pt-8 border-t border-white/5">
                <div className="relative">
                  <div className="absolute inset-0 bg-cafe-gold/20 rounded-2xl blur-md group-hover:bg-cafe-gold/40 transition-colors" />
                  <img 
                    src={review.avatar} 
                    alt={review.name} 
                    className="w-14 h-14 rounded-2xl border-2 border-cafe-gold relative z-10 object-cover shadow-lg"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="font-black text-white uppercase tracking-tight text-lg">{review.name}</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-cafe-gold/60">Verified Connoisseur</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

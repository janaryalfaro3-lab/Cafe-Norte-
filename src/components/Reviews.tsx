import { motion } from 'framer-motion';
import { REVIEWS } from '../constants';
import { Star, Quote } from 'lucide-react';

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-serif text-cafe-dark mb-4">Words from our <br /> <span className="italic">Daily Dreamers</span></h2>
            <p className="text-cafe-dark/60">The best conversations happen over a cup of Norte. Join the community in San Rafael.</p>
          </div>
          <div className="hidden md:flex gap-4">
             {/* Decorative stars/elements could go here */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="p-8 shiny-card rounded-3xl relative border border-white/40 group hover:bg-white transition-all shadow-2xl hover:-translate-y-2"
            >
              <Quote className="absolute top-6 right-8 text-cafe-brown/10" size={40} />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < review.rating ? 'fill-cafe-gold text-cafe-gold' : 'text-cafe-brown/20'} />
                ))}
              </div>

              <p className="text-cafe-dark/80 mb-8 italic leading-relaxed">
                "{review.comment}"
              </p>

              <div className="flex items-center gap-4">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full border-2 border-cafe-gold" />
                <div>
                  <div className="font-bold text-cafe-dark">{review.name}</div>
                  <div className="text-[10px] uppercase tracking-widest text-cafe-gold">Verified Customer</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

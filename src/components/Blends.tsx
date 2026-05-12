import { motion } from 'framer-motion';
import { BLENDS } from '../constants';
import { ShoppingCart, Leaf, Heart } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';

export default function Blends() {
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <section id="blends" className="py-24 px-4 bg-cafe-dark relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cafe-primary/10 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cafe-gold/5 rounded-full blur-[100px] -ml-48 -mb-48" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="h-px w-12 bg-cafe-gold/30" />
            <span className="text-cafe-gold font-black uppercase tracking-[0.4em] text-[10px]">Exceptional Roasts</span>
            <div className="h-px w-12 bg-cafe-gold/30" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter"
          >
            The Master <span className="text-cafe-gold italic">Roasts</span>
          </motion.h2>

          <p className="text-white/60 max-w-xl mx-auto font-medium text-lg italic">
            "Every bean tells a story of high-altitude volcanic soil and meticulous artisanal roasting."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {BLENDS.map((blend, idx) => {
            const isFavorite = isInWishlist(blend.id);
            
            return (
              <motion.div
                key={blend.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white/5 border border-white/10 rounded-[2.5rem] p-4 hover:bg-white/10 transition-all duration-700 backdrop-blur-md"
              >
                <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5] mb-6">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-cafe-dark/80 via-transparent to-transparent z-10"
                  />
                  
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    src={blend.image} 
                    alt={blend.name}
                    className="w-full h-full object-cover transition-all"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating Specs */}
                  <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="bg-cafe-gold text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                      {blend.roast} Roast
                    </div>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist({ ...blend, category: "Blends" })}
                    className={`absolute top-6 right-6 p-4 rounded-full backdrop-blur-xl transition-all z-20 shadow-2xl border border-white/20 transform active:scale-90 ${
                      isFavorite 
                        ? 'bg-cafe-gold text-white scale-110' 
                        : 'bg-white/10 text-white hover:bg-cafe-gold'
                    }`}
                  >
                    <Heart size={20} className={isFavorite ? "fill-white" : ""} />
                  </button>
                </div>

                <div className="px-4 pb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-cafe-gold transition-colors">
                      {blend.name}
                    </h3>
                    <div className="text-cafe-gold font-black text-xl">
                      ₱{blend.price}
                    </div>
                  </div>
                  
                  <p className="text-white/50 text-sm mb-8 leading-relaxed font-medium line-clamp-2 italic">
                    "{blend.description}"
                  </p>

                  <button className="w-full group/btn relative py-5 bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cafe-gold/50 transition-all">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="absolute inset-0 bg-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity"
                    />
                    <div className="relative z-10 flex items-center justify-center gap-3 text-white font-black uppercase tracking-[0.2em] text-[10px]">
                      <ShoppingCart size={16} className="text-cafe-gold group-hover/btn:rotate-12 transition-transform" />
                      Add to Collection
                    </div>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

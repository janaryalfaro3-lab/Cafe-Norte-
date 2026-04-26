import { motion } from 'framer-motion';
import { BLENDS } from '../constants';
import { ShoppingCart, Leaf, Heart } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';

export default function Blends() {
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <section id="blends" className="py-24 px-4 bg-white/20 backdrop-blur-xs overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-cafe-dark mb-4"
          >
            The Collection
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-cafe-brown mx-auto mb-6"
          />
          <p className="text-cafe-dark/70 max-w-xl mx-auto font-medium">
            Each blend is small-batch roasted to ensure the highest 
            fidelity of flavor and aroma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {BLENDS.map((blend, idx) => {
            const isFavorite = isInWishlist(blend.id);
            
            return (
              <motion.div
                key={blend.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group relative bg-white p-6 rounded-3xl border border-cafe-cream shadow-xl shadow-cafe-dark/5 hover:shadow-2xl transition-all duration-500"
              >
                <div className="overflow-hidden rounded-2xl aspect-[4/5] bg-cafe-cream/30 mb-6 relative shadow-inner">
                  <motion.img 
                    whileHover={{ scale: 1.05, filter: "brightness(1.08) contrast(1.02)" }}
                    transition={{ duration: 0.4 }}
                    src={blend.image} 
                    alt={blend.name}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  
                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(blend)}
                    className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all z-10 shadow-lg ${
                      isFavorite 
                        ? 'bg-cafe-gold text-white' 
                        : 'bg-white/70 text-cafe-dark hover:bg-white'
                    }`}
                  >
                    <Heart size={20} className={isFavorite ? "fill-white" : ""} />
                  </button>
                </div>

                <div className="flex justify-between items-start mb-2">
                  <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-cafe-gold font-bold">
                    <Leaf size={12} /> {blend.roast} Roast
                  </span>
                  <span className="font-serif text-lg font-bold text-cafe-brown">₱{blend.price}</span>
                </div>

                <h3 className="text-2xl font-serif text-cafe-dark mb-3 group-hover:text-cafe-gold transition-colors">
                  {blend.name}
                </h3>
                
                <p className="text-cafe-dark/60 text-sm mb-6 leading-relaxed">
                  {blend.description}
                </p>

                <button className="w-full py-4 shiny-button rounded-xl font-bold flex items-center justify-center gap-2 group/btn">
                  <ShoppingCart size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  Add to Cart
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

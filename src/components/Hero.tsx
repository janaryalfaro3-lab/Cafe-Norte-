import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-8"
        >
          <div className="absolute inset-0 bg-cafe-gold/20 rounded-full blur-2xl animate-pulse" />
          <img 
            src="https://i.pinimg.com/736x/b4/7c/79/b47c797a767c5ed1cadb64ced39d23cf.jpg" 
            alt="Cafe Norte Logo" 
            className="w-full h-full object-cover rounded-full border-4 border-cafe-gold shadow-2xl relative z-10"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-12 h-1 bg-cafe-gold mx-auto mb-8"
        />
        
        <motion.span 
          initial={{ opacity: 0, letterSpacing: "1em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ delay: 0.2, duration: 1 }}
          className="inline-block text-cafe-gold font-black uppercase text-xs mb-8"
        >
          Freshly Made in Italy
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-7xl md:text-9xl font-black text-white mb-10 leading-tight tracking-tighter drop-shadow-2xl"
        >
          Cafe <span className="text-cafe-gold italic underline decoration-white/10 decoration-8 underline-offset-8">Norte</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-lg md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed font-bold italic"
        >
          Coffee is officially the #1 preferred drink for people worldwide. 
          At Cafe Norte, we ensure every cup lives up to that title with 
          authentic Italian roasts crafted for your lifestyle.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.a 
            href="#order" 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-12 py-5 bg-cafe-primary text-white font-black rounded-full group uppercase tracking-[0.2em] text-xs shadow-2xl shadow-cafe-primary/30 overflow-hidden"
          >
            <motion.div 
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-20"
            />
            <span className="relative z-10 flex items-center gap-2">
              Order Now
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown size={14} className="-rotate-90" />
              </motion.div>
            </span>
          </motion.a>
          
          <motion.a 
            href="#menu" 
            whileHover={{ scale: 1.05, borderColor: "rgba(201, 160, 80, 1)", color: "rgba(201, 160, 80, 1)" }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 border-2 border-white/20 text-white font-black rounded-full uppercase tracking-[0.2em] text-xs transition-all backdrop-blur-md"
          >
            Explore Menu
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1 h-12 bg-linear-to-b from-cafe-gold to-transparent rounded-full shadow-lg shadow-cafe-gold/20"
        />
      </motion.div>
    </section>
  );
}

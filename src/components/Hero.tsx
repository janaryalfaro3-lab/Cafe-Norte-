import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-16 overflow-hidden">
      {/* 3D Wallpaper Background */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://imgs.search.brave.com/Qqt_qcSiYSMjzcXSwEtKiyo5XF_Xa2SNwzcD7_66Y1I/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDk5MDY0/OTcuanBn" 
          alt="Coffee Wallpaper" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cafe-cream via-transparent to-cafe-cream" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl relative z-10"
      >
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block text-cafe-brown font-black tracking-[0.4em] uppercase text-xs mb-8"
        >
          Freshly Made in Italy
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-6xl md:text-8xl font-black text-cafe-dark mb-10 leading-tight tracking-tighter"
        >
          Cafe <span className="text-cafe-gold italic">Norte</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-2xl text-cafe-dark/90 mb-12 max-w-3xl mx-auto leading-relaxed font-bold italic"
        >
          Coffee is officially the #1 preferred drink for people worldwide. 
          At Cafe Norte, we ensure every cup lives up to that title with 
          authentic Italian roasts crafted for your lifestyle.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.a 
            href="#order" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-12 py-5 bg-cafe-gold text-cafe-dark font-black rounded-full group uppercase tracking-[0.2em] text-xs shadow-2xl shadow-cafe-gold/30 overflow-hidden"
          >
            <motion.div 
              animate={{ x: ['100%', '-100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-white/20 skew-x-20"
            />
            <span className="relative z-10">Order Now</span>
          </motion.a>
          
          <motion.a 
            href="#menu" 
            whileHover={{ scale: 1.05, borderColor: "rgba(100, 70, 48, 1)" }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 border-2 border-cafe-brown/40 text-cafe-brown font-black rounded-full uppercase tracking-[0.2em] text-xs transition-colors backdrop-blur-sm"
          >
            Explore Menu
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

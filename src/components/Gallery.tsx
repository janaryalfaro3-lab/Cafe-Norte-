import { motion } from 'framer-motion';
import { GALLERY } from '../constants';
import { Instagram, Heart, MessageCircle } from 'lucide-react';

export default function Gallery() {
  const instagramPhotos = [
    { id: 1, url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=400&auto=format&fit=crop", likes: "1.2k", comments: "48" },
    { id: 2, url: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400&auto=format&fit=crop", likes: "850", comments: "22" },
    { id: 3, url: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=400&auto=format&fit=crop", likes: "2.1k", comments: "96" },
    { id: 4, url: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=400&auto=format&fit=crop", likes: "1.5k", comments: "34" },
  ];

  return (
    <section id="gallery" className="py-32 px-4 bg-cafe-dark relative overflow-hidden">
      {/* Decorative Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-cafe-gold/5 rounded-full blur-[150px] -z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="h-px w-10 bg-cafe-gold/30" />
            <span className="text-cafe-gold font-black uppercase tracking-[0.4em] text-[10px]">The Atmosphere</span>
            <div className="h-px w-10 bg-cafe-gold/30" />
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">Through the <span className="text-cafe-gold italic underline decoration-white/10 underline-offset-8">Lens</span></h2>
          <p className="text-white/40 font-medium italic text-lg">"Capturing the artisanal heartbeat of Cafe Norte."</p>
        </div>

        {/* Ambiance Gallery - Masonry-ish grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
          {GALLERY.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className={`relative group overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl ${
                idx % 3 === 0 ? 'md:col-span-2 md:aspect-video' : 'aspect-square'
              }`}
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full"
              >
                <img 
                  src={img} 
                  alt="Ambiance" 
                  className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-700" 
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="absolute inset-0 bg-linear-to-t from-cafe-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-32">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 bg-white/5 p-8 rounded-[3rem] border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-full blur-md opacity-50" />
                <div className="relative w-20 h-20 bg-gradient-to-tr from-yellow-100 via-red-200 to-purple-200 p-1 rounded-full">
                  <div className="w-full h-full bg-cafe-dark rounded-full p-1">
                    <div className="w-full h-full bg-white/5 rounded-full flex items-center justify-center text-white">
                      <Instagram size={32} />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-black text-white tracking-tight uppercase italic">@CafeNorte</h3>
                <p className="text-[10px] text-cafe-gold tracking-[0.4em] uppercase font-black">Coffee Culture Online</p>
              </div>
            </div>
            <button className="px-10 py-5 bg-cafe-primary text-white font-black rounded-full text-xs uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-cafe-primary/20">
              Follow Our Roastery
            </button>
          </div>

          {/* Instagram Feed Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {instagramPhotos.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative aspect-square rounded-[2rem] overflow-hidden cursor-pointer border border-white/5"
              >
                <img 
                  src={post.url} 
                  alt="Instagram Post" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-cafe-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-1">
                    <Heart size={24} className="fill-cafe-gold text-cafe-gold" /> 
                    <span className="text-[10px] font-black uppercase tracking-widest">{post.likes}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <MessageCircle size={24} className="fill-white/20 text-white" /> 
                    <span className="text-[10px] font-black uppercase tracking-widest">{post.comments}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

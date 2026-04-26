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
    <section id="gallery" className="py-24 px-4 bg-white/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-cafe-dark mb-4 uppercase tracking-tighter">Through the <span className="text-cafe-brown">Lens</span></h2>
          <p className="text-cafe-dark/70 font-medium">Capturing the artisan craft of Cafe Norte.</p>
        </div>

        {/* Ambiance Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {GALLERY.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="aspect-square rounded-2xl overflow-hidden shadow-lg shadow-cafe-brown/5"
            >
              <img src={img} alt="Ambiance" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000 brightness-90 hover:brightness-110" />
            </motion.div>
          ))}
        </div>

        <div className="border-t border-cafe-brown/10 pt-24">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-0.5 rounded-full">
                <div className="w-full h-full bg-white rounded-full p-1">
                  <div className="w-full h-full bg-cafe-cream rounded-full flex items-center justify-center text-cafe-dark">
                    <Instagram size={28} />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-cafe-dark">@CafeNorte</h3>
                <p className="text-sm text-cafe-dark/60 tracking-wide uppercase font-bold">Follow our journey</p>
              </div>
            </div>
            <button className="px-8 py-3 bg-cafe-dark text-white font-bold rounded-full text-sm hover:translate-y-[-2px] transition-transform shadow-md">
              Open Instagram
            </button>
          </div>

          {/* Instagram Feed Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {instagramPhotos.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
              >
                <img src={post.url} alt="Instagram Post" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold">
                  <div className="flex items-center gap-1"><Heart size={20} className="fill-white" /> {post.likes}</div>
                  <div className="flex items-center gap-1"><MessageCircle size={20} className="fill-white" /> {post.comments}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

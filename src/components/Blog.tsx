import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BLOG_POSTS } from '../constants';
import { Calendar, ArrowRight, X } from 'lucide-react';

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<typeof BLOG_POSTS[0] | null>(null);

  return (
    <section id="blog" className="py-24 px-4 bg-cafe-light relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-cafe-dark mb-2">Coffee Benefits</h2>
            <p className="text-cafe-dark/70 tracking-[0.3em] uppercase text-[10px] font-black">Nourish Your Body and Mind</p>
          </div>
          <button className="px-8 py-4 bg-cafe-brown text-white rounded-full font-black text-xs tracking-widest uppercase hover:bg-cafe-dark transition-all shadow-xl shadow-cafe-brown/20">
            See all stories
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {BLOG_POSTS.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer bg-white p-6 rounded-[2.5rem] border border-cafe-brown/5 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="overflow-hidden rounded-3xl mb-6 relative aspect-[16/9] shadow-inner">
                <motion.img 
                  whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
                  transition={{ duration: 0.4 }}
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cafe-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                   <span className="text-white font-black uppercase text-xs tracking-widest flex items-center gap-2">Read Article <ArrowRight size={16} /></span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-cafe-brown text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                <Calendar size={14} />
                {post.date}
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-cafe-dark mb-4 group-hover:text-cafe-brown transition-colors">
                {post.title}
              </h3>
              
              <p className="text-cafe-dark/60 leading-relaxed mb-6 font-medium">
                {post.excerpt}
              </p>
              
              <div className="w-16 h-1 bg-cafe-gold group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPost && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-cafe-dark/90 backdrop-blur-md cursor-pointer"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden relative shadow-2xl cursor-default"
            >
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:rotate-90 transition-transform group"
              >
                <X size={24} className="text-cafe-dark group-hover:text-cafe-gold transition-colors" />
              </button>

              <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-1/2 aspect-square md:aspect-auto">
                  <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                </div>
                <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto max-h-[85vh] md:max-h-[600px]">
                  <button 
                    onClick={() => setSelectedPost(null)}
                    className="flex items-center gap-2 text-cafe-brown/60 hover:text-cafe-brown text-[10px] font-black uppercase tracking-widest mb-8 transition-colors group"
                  >
                    <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={14} />
                    Back to all benefits
                  </button>

                  <div className="flex items-center gap-2 text-cafe-brown text-[10px] font-black uppercase tracking-widest mb-4">
                    <Calendar size={14} />
                    {selectedPost.date}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-cafe-dark mb-6 leading-tight">
                    {selectedPost.title}
                  </h3>
                  <div className="space-y-6 text-cafe-dark/70 leading-relaxed font-medium">
                    <p className="text-lg text-cafe-brown italic font-bold">
                      {selectedPost.excerpt}
                    </p>
                    <p>
                      At Cafe Norte, we believe coffee is more than just a morning ritual—it's a gateway to wellness. Our artisan roasts are carefully processed to retain maximum beneficial compounds.
                    </p>
                    <p>
                      Research shows that regular coffee consumption is associated with a lower risk of several conditions, thanks to its high concentration of polyphenols and essential nutrients.
                    </p>
                    <p>
                      Beyond the physiological, the shared experience of a perfect cup fosters community and mental well-being. Visit us to experience the science and art of coffee firsthand.
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedPost(null)}
                    className="mt-12 px-10 py-5 bg-cafe-dark text-white rounded-full font-black text-xs tracking-widest uppercase hover:bg-cafe-brown transition-all"
                  >
                    Back to Coffee Benefits
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

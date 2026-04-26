import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Trash2, ShoppingCart } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistDrawer({ isOpen, onClose }: WishlistDrawerProps) {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-cafe-light z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-cafe-brown/10 flex justify-between items-center bg-white/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <Heart className="text-cafe-gold fill-cafe-gold" size={24} />
                <h2 className="text-2xl font-serif text-cafe-dark">Your Wishlist</h2>
                <span className="bg-cafe-gold/20 text-cafe-gold text-xs font-bold px-2 py-0.5 rounded-full">
                  {wishlist.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-cafe-brown/5 rounded-full transition-colors text-cafe-brown"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-cafe-cream rounded-full flex items-center justify-center text-cafe-brown/40">
                    <Heart size={40} />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-cafe-dark">No favorites yet</h3>
                    <p className="text-cafe-dark/60 text-sm mt-1">Start exploring our blends to find your next favorite.</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-cafe-brown text-white rounded-full text-sm font-bold mt-4"
                  >
                    Browse Blends
                  </button>
                </div>
              ) : (
                wishlist.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex gap-4 p-4 bg-white rounded-2xl border border-cafe-brown/5 group hover:border-cafe-gold/30 transition-all"
                  >
                    <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="font-serif text-lg text-cafe-dark">{item.name}</h4>
                        <p className="text-cafe-gold font-bold">₱{item.price}</p>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button className="flex-1 py-2 bg-cafe-brown text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-cafe-dark transition-all">
                          <ShoppingCart size={14} /> Add to Cart
                        </button>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="p-2 border border-cafe-brown/10 text-cafe-brown/40 hover:text-red-500 hover:border-red-200 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {wishlist.length > 0 && (
              <div className="p-6 border-t border-cafe-brown/10 bg-white/50 backdrop-blur-md">
                <button className="w-full py-4 bg-cafe-dark text-white rounded-xl font-bold hover:bg-cafe-brown transition-all shadow-lg shadow-cafe-brown/10">
                  Add All to Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

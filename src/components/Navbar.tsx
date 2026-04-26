import { motion } from 'framer-motion';
import { Coffee, ShoppingCart, User, Menu, X, Heart } from 'lucide-react';
import { useState } from 'react';
import { useWishlist } from '../contexts/WishlistContext';
import WishlistDrawer from './WishlistDrawer';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { wishlist } = useWishlist();

  const navLinks = [
    { name: 'Menu', href: '#menu' },
    { name: 'Ordering', href: '#order' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Benefits', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cafe-cream/80 backdrop-blur-md border-b border-cafe-brown/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={(e) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-4 group cursor-pointer"
            >
              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                <img 
                  src="https://scontent.fmnl17-6.fna.fbcdn.net/v/t39.30808-1/679835132_122093239365299350_5498513086116890739_n.jpg?stp=c212.0.1624.1624a_dst-jpg_s200x200_tt6&_nc_cat=109&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=kii5IuFw4zIQ7kNvwG6zCpq&_nc_oc=AdqFE3fg_NU-Y9eYe288lyI_TID3mMD36odgVV7QmjQPWlKmPA23wfw0FKIc038XoFo&_nc_zt=24&_nc_ht=scontent.fmnl17-6.fna&_nc_gid=nyFsuVC0u3ZwWPZQgwr86Q&_nc_ss=7b2a8&oh=00_Af103ATDcGsoQI4AYUEJWWo_oyadJoJd8yzDX0FClx7ANA&oe=69F36A77" 
                  alt="Cafe Norte Logo" 
                  className="w-full h-full object-cover rounded-full border-2 border-cafe-gold shadow-md group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex flex-col ml-2">
                <span className="font-black text-2xl tracking-tighter text-cafe-brown leading-none uppercase italic">Cafe Norte</span>
                <span className="text-[8px] font-bold text-cafe-gold/80 tracking-[0.4em] mt-1 uppercase ml-1">Authentic Italian Experience</span>
              </div>
            </motion.div>

            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  whileHover={{ y: -1 }}
                  className="text-[11px] font-black text-cafe-dark hover:text-cafe-brown transition-colors uppercase tracking-[0.2em]"
                >
                  {link.name}
                </motion.a>
              ))}
              <div className="flex items-center gap-6 border-l border-cafe-brown/10 pl-8 ml-4">
                <button
                  onClick={() => setIsWishlistOpen(true)}
                  className="text-cafe-dark hover:text-cafe-brown transition-colors relative group"
                >
                  <Heart size={20} className={wishlist.length > 0 ? "fill-cafe-gold text-cafe-gold" : "text-cafe-dark"} />
                  {wishlist.length > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-cafe-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                    >
                      {wishlist.length}
                    </motion.span>
                  )}
                </button>
                <button className="text-cafe-dark hover:text-cafe-brown transition-colors">
                  <User size={20} />
                </button>
                <button className="text-cafe-dark hover:text-cafe-brown transition-colors relative">
                  <ShoppingCart size={20} />
                  <span className="absolute -top-2 -right-2 bg-cafe-dark text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
                </button>
              </div>
            </div>

            <div className="md:hidden flex items-center gap-4">
              <button 
                onClick={() => setIsWishlistOpen(true)}
                className="text-cafe-dark relative"
              >
                <Heart size={20} className={wishlist.length > 0 ? "fill-cafe-gold text-cafe-gold" : ""} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-cafe-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button className="text-cafe-dark relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-cafe-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
              </button>
              <button onClick={() => setIsOpen(!isOpen)} className="text-cafe-dark">
                {isOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-cafe-cream"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setIsOpen(false);
                    handleScroll(e, link.href);
                  }}
                  className="block text-base font-medium text-cafe-dark/80 hover:text-cafe-dark"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </>
  );
}

import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Coffee, ShoppingCart, User, Menu, X, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useWishlist } from '../contexts/WishlistContext';
import WishlistDrawer from './WishlistDrawer';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { wishlist } = useWishlist();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Menu', href: '#menu' },
    { name: 'Ordering', href: '#order' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Benefits', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-cafe-dark/95 backdrop-blur-xl py-2' : 'bg-transparent py-4'
      }`}>
        {/* Scroll Progress Bar */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-cafe-gold origin-left z-50"
          style={{ scaleX }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-4 group cursor-pointer"
            >
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 bg-cafe-gold/20 rounded-full blur-lg group-hover:bg-cafe-gold/40 transition-colors" />
                <img 
                  src="https://i.pinimg.com/736x/b4/7c/79/b47c797a767c5ed1cadb64ced39d23cf.jpg" 
                  alt="Cafe Norte Logo" 
                  className="w-full h-full object-cover rounded-full border-2 border-cafe-gold shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="hidden sm:flex flex-col ml-2">
                <span className="font-black text-2xl tracking-tighter text-white leading-none uppercase italic group-hover:text-cafe-gold transition-colors">Cafe Norte</span>
                <span className="text-[8px] font-black text-cafe-gold tracking-[0.4em] mt-1 uppercase ml-1">Authentic Italian Experience</span>
              </div>
            </motion.div>

            <div className="hidden md:flex items-center gap-8 lg:gap-10">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  whileHover={{ y: -2 }}
                  className="relative text-[10px] font-black text-white/70 hover:text-white transition-colors uppercase tracking-[0.25em] group"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-cafe-gold transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
              
              <div className="flex items-center gap-6 border-l border-white/10 pl-8 ml-4">
                <button
                  onClick={() => setIsWishlistOpen(true)}
                  className="text-white hover:text-cafe-gold transition-all relative group transform active:scale-90"
                >
                  <Heart size={20} className={wishlist.length > 0 ? "fill-cafe-gold text-cafe-gold" : "text-white"} />
                  {wishlist.length > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-cafe-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-lg"
                    >
                      {wishlist.length}
                    </motion.span>
                  )}
                </button>
                <button className="text-white hover:text-cafe-gold transition-all transform active:scale-90 relative">
                  <ShoppingCart size={20} />
                  <span className="absolute -top-2 -right-2 bg-cafe-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-lg">0</span>
                </button>
              </div>
            </div>

            <div className="md:hidden flex items-center gap-6">
              <button 
                onClick={() => setIsWishlistOpen(true)}
                className="text-white relative group"
              >
                <Heart size={20} className={wishlist.length > 0 ? "fill-cafe-gold text-cafe-gold" : ""} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-cafe-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="text-white p-2 bg-white/5 rounded-xl border border-white/10"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-0 right-0 bg-cafe-dark/fb border-b border-white/10 backdrop-blur-3xl"
            >
              <div className="px-6 pt-4 pb-10 space-y-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      setIsOpen(false);
                      handleScrollTo(e, link.href);
                    }}
                    className="block text-sm font-black text-white/60 hover:text-cafe-gold uppercase tracking-[0.3em] transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-6 border-t border-white/5 flex gap-8">
                   <button className="text-white/60 flex items-center gap-3">
                     <User size={20} />
                     <span className="text-[10px] uppercase font-black tracking-widest">Account</span>
                   </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </>
  );
}

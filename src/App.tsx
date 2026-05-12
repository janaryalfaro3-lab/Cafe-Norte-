/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Ordering from './components/Ordering';
import Loyalty from './components/Loyalty';
import Reviews from './components/Reviews';
import Gallery from './components/Gallery';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GlobalBackground from './components/GlobalBackground';
import Wendy from './components/Wendy';
import { motion, AnimatePresence } from 'framer-motion';
import { WishlistProvider } from './contexts/WishlistContext';

export default function App() {
  return (
    <WishlistProvider>
      <div className="relative overflow-x-hidden pt-16">
        <GlobalBackground />
        
        <Navbar />

        <main>
          <Hero />
          
          <Menu />
          
          <section id="loyalty">
            <Loyalty />
          </section>

          <Ordering />

          <Reviews />

          <Gallery />

          <Blog />

          <Contact />
        </main>

        <Footer />
        <Wendy />
        
        {/* Scroll to Top decorative element or extra polish can go here */}
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed bottom-8 right-8 z-40 hidden md:block"
          >
            {/* Minimalist social link floating or something similar */}
          </motion.div>
        </AnimatePresence>
      </div>
    </WishlistProvider>
  );
}

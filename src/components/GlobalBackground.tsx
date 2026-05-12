import { motion } from 'framer-motion';

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 -z-50 pointer-events-none bg-[#050807]">
      {/* Persistent Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-60 contrast-110 brightness-75"
        >
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlays to ensure content readability across the whole page */}
        <div className="absolute inset-0 bg-linear-to-b from-cafe-dark/95 via-cafe-dark/20 to-cafe-dark/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.4)_0%,transparent_80%)]" />
      </div>

      {/* Global Animated Accents */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-0 left-0 w-full h-full bg-radial-gradient from-cafe-gold/5 via-transparent to-transparent pointer-events-none"
      />
    </div>
  );
}

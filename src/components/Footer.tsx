import { Coffee, Instagram, Facebook, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050807] text-white py-32 px-4 relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cafe-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-4 mb-10 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 bg-cafe-gold/20 rounded-full blur-md group-hover:bg-cafe-gold/40 transition-colors" />
                <img 
                  src="https://i.pinimg.com/736x/b4/7c/79/b47c797a767c5ed1cadb64ced39d23cf.jpg" 
                  alt="Cafe Norte Logo" 
                  className="w-full h-full object-cover rounded-full border-2 border-cafe-gold relative z-10 hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tighter uppercase italic text-white group-hover:text-cafe-gold transition-colors">Cafe Norte</span>
                <span className="text-[7px] font-black tracking-[0.4em] text-cafe-gold uppercase">Authentic Italian</span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-10 font-medium italic">
              "A minimalist coffee sanctuary dedicated to the craft of small-batch roasting and the community of dreamers."
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                <a key={idx} href="#" className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cafe-gold hover:border-cafe-gold transition-all duration-500 text-white/30 hover:text-white shadow-xl group">
                  <Icon size={20} className="group-hover:scale-125 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-10 text-cafe-gold">Explore</h4>
            <ul className="space-y-6 text-white/40 text-sm font-black uppercase tracking-widest">
              <li><a href="#order" className="hover:text-white transition-colors flex items-center gap-2 group"><div className="w-0 h-px bg-cafe-gold group-hover:w-4 transition-all" /> Ordering</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors flex items-center gap-2 group"><div className="w-0 h-px bg-cafe-gold group-hover:w-4 transition-all" /> Gallery</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors flex items-center gap-2 group"><div className="w-0 h-px bg-cafe-gold group-hover:w-4 transition-all" /> Benefits</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors flex items-center gap-2 group"><div className="w-0 h-px bg-cafe-gold group-hover:w-4 transition-all" /> Connect</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-10 text-cafe-gold">The Sanctuary</h4>
            <ul className="space-y-6 text-white/40 text-sm font-black uppercase tracking-widest leading-relaxed">
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-cafe-primary rounded-full animate-pulse" /> Open 24/7</li>
              <li>San Rafael, Tarlac City</li>
              <li>Tarlac, Philippines 2300</li>
              <li className="text-white/60">0976 442 1242</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.4em] mb-10 text-cafe-gold">The Society</h4>
            <p className="text-white/40 text-sm mb-8 font-medium italic">"Join the inner circle for artisan secrets and exclusive cupping invites."</p>
            <div className="flex bg-white/5 rounded-2xl border border-white/10 overflow-hidden focus-within:border-cafe-gold transition-all shadow-2xl backdrop-blur-xl">
              <input type="email" placeholder="email@norte.ph" className="bg-transparent px-8 py-5 text-xs font-black focus:outline-none flex-1 placeholder:text-white/10 text-white uppercase tracking-widest" />
              <button className="px-6 text-cafe-gold hover:bg-cafe-gold hover:text-white transition-all transform active:scale-95">
                <Mail size={24} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[8px] uppercase tracking-[0.5em] text-white/20 font-black">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="text-cafe-gold/40">© 2026 Cafe Norte Coffee Co.</span>
            <span className="hidden md:block text-white/5">|</span>
            <span className="italic">Crafted by Master Baster</span>
          </div>
          <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors hover:tracking-[0.7em] duration-500">Privacy</a>
            <a href="#" className="hover:text-white transition-colors hover:tracking-[0.7em] duration-500">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

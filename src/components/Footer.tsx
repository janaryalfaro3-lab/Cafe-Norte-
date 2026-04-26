import { Coffee, Instagram, Facebook, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-cafe-brown text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                <img 
                  src="https://scontent.fmnl17-6.fna.fbcdn.net/v/t39.30808-1/679835132_122093239365299350_5498513086116890739_n.jpg?stp=c212.0.1624.1624a_dst-jpg_s200x200_tt6&_nc_cat=109&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=kii5IuFw4zIQ7kNvwG6zCpq&_nc_oc=AdqFE3fg_NU-Y9eYe288lyI_TID3mMD36odgVV7QmjQPWlKmPA23wfw0FKIc038XoFo&_nc_zt=24&_nc_ht=scontent.fmnl17-6.fna&_nc_gid=nyFsuVC0u3ZwWPZQgwr86Q&_nc_ss=7b2a8&oh=00_Af103ATDcGsoQI4AYUEJWWo_oyadJoJd8yzDX0FClx7ANA&oe=69F36A77" 
                  alt="Cafe Norte Logo" 
                  className="w-full h-full object-cover rounded-full border border-white/20"
                />
              </div>
              <span className="font-black text-xl tracking-tight">CAFE NORTE</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-8 font-medium">
              A minimalist coffee sanctuary dedicated to the craft of small-batch roasting and the community of dreamers.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                <a key={idx} href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-cafe-gold hover:border-cafe-gold transition-all text-white/50 hover:text-white">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-8 text-white">Quick Links</h4>
            <ul className="space-y-4 text-white/50 text-sm font-bold">
              <li><a href="#order" className="hover:text-cafe-gold transition-colors">Order Online</a></li>
              <li><a href="#gallery" className="hover:text-cafe-gold transition-colors">Ambiance Gallery</a></li>
              <li><a href="#blog" className="hover:text-cafe-gold transition-colors">Coffee Benefits</a></li>
              <li><a href="#contact" className="hover:text-cafe-gold transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-8 text-white">Shop Info</h4>
            <ul className="space-y-4 text-white/50 text-sm font-bold">
              <li>Open 24 Hours</li>
              <li>7 Days a Week</li>
              <li>Brgy. San Rafael, Tarlac City</li>
              <li>Philippines</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-8 text-white">Stay Updated</h4>
            <p className="text-white/50 text-sm mb-6 font-medium">Join our mailing list for secret blends and event invites.</p>
            <div className="flex bg-white/5 rounded-2xl border border-white/10 overflow-hidden focus-within:border-cafe-gold transition-colors">
              <input type="email" placeholder="email@example.ph" className="bg-transparent px-6 py-4 text-sm focus:outline-none flex-1 placeholder:text-white/20" />
              <button className="p-4 text-cafe-gold hover:bg-cafe-gold hover:text-white transition-all">
                <Mail size={24} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-white/20 font-black">
          <div>© 2026 Cafe Norte Coffee Co. All rights reserved.</div>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

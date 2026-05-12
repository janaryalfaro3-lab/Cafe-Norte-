import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Award, Coffee, Zap } from 'lucide-react';

export default function Loyalty() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const perks = [
    { icon: <Coffee size={24} />, title: "Free 10th Cup", desc: "Every 9 cups of our signature blend gets you the 10th on the house." },
    { icon: <Zap size={24} />, title: "Skip the Line", desc: "Priority pick-up for all members ordering through the app or website." },
    { icon: <Award size={24} />, title: "Special Events", desc: "Exclusive invites to cupping sessions and roasting workshops." }
  ];

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email");
      return;
    }

    setStatus('submitting');
    try {
      const { db, collection, addDoc, serverTimestamp, handleFirestoreError, OperationType } = await import('../lib/firebase');
      const path = 'subscriptions';
      
      await addDoc(collection(db, path), {
        email,
        type: 'Loyalty Society',
        createdAt: serverTimestamp()
      }).catch(err => handleFirestoreError(err, OperationType.CREATE, path));

      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error("Subscription Error:", error);
      setStatus('idle');
    }
  };

  return (
    <section className="py-32 px-4 bg-cafe-dark relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-cafe-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[600px] h-[600px] bg-cafe-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              className="h-1 w-12 bg-cafe-gold mb-8 hidden lg:block"
            />
            <span className="text-cafe-gold font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Membership Experience</span>
            <h2 className="text-6xl md:text-8xl font-black text-white mb-8 leading-none tracking-tighter uppercase">
              Star <span className="text-cafe-gold italic underline decoration-white/10 decoration-8 underline-offset-12">Society</span>
            </h2>
            <p className="text-white/50 mb-12 text-lg leading-relaxed font-medium italic">
              "We believe in rewarding our most dedicated coffee explorers. Join our 
              society to unlock exclusive perks, early access to new blends, and 
              special rewards that make every sip more meaningful."
            </p>
            
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-cafe-primary text-white p-8 rounded-[2.5rem] flex items-center gap-6 shadow-2xl border border-white/10"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                    <Coffee size={24} className="text-white" />
                  </div>
                  <p className="font-black uppercase tracking-widest text-xs">Welcome to the Society! Check your inbox soon.</p>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleJoin}
                  className="flex flex-col sm:flex-row gap-4 relative"
                >
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-10 py-6 focus:outline-none focus:border-cafe-gold transition-all text-white font-bold placeholder:text-white/20 shadow-inner group"
                  />
                  <button 
                    type="submit"
                    disabled={status === 'submitting'}
                    className="px-12 py-6 bg-cafe-primary text-white rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-cafe-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {status === 'submitting' ? 'Joining...' : (
                      <>
                        <Gift size={18} className="text-cafe-gold" />
                        Join The Inner Circle
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {perks.map((perk, idx) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 group hover:bg-white/10 transition-all duration-700 shadow-2xl hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-cafe-gold/20 text-cafe-gold rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-cafe-gold group-hover:text-white transition-all shadow-lg border border-cafe-gold/30">
                  {perk.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 text-white uppercase tracking-tight">{perk.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed font-medium line-clamp-3">{perk.desc}</p>
              </motion.div>
            ))}
            
            {/* VIP Status Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-10 bg-linear-to-br from-cafe-gold/20 to-cafe-primary/20 backdrop-blur-xl rounded-[3rem] border border-cafe-gold/30 flex flex-col justify-center items-center text-center relative overflow-hidden group col-span-1 sm:col-span-1"
            >
              <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
              <Award size={48} className="text-cafe-gold mb-6 relative z-10" />
              <div className="text-white font-black text-4xl mb-2 relative z-10">VIP</div>
              <p className="text-white/60 text-[10px] uppercase font-black tracking-widest relative z-10 mt-2">Elevated Status</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

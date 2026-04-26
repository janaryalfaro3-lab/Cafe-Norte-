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
    <section className="py-24 px-4 bg-cafe-cream/60 backdrop-blur-sm relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-cafe-brown/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/40 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-cafe-brown font-black uppercase tracking-[0.3em] text-xs mb-4 block">Membership</span>
            <h2 className="text-4xl md:text-5xl font-black text-cafe-dark mb-6 leading-tight">
              The Norte <br /> <span className="italic font-normal text-cafe-brown">Star Society</span>
            </h2>
            <p className="text-cafe-dark/70 mb-10 text-lg leading-relaxed font-medium">
              We believe in rewarding our most dedicated coffee explorers. Join our 
              society to unlock exclusive perks, early access to new blends, and 
              special rewards that make every sip more meaningful.
            </p>
            
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-cafe-brown text-white p-6 rounded-3xl flex items-center gap-4"
                >
                  <Coffee size={24} className="text-cafe-gold" />
                  <p className="font-bold">Welcome to the Society! Check your inbox soon.</p>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleJoin}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white border border-cafe-brown/10 rounded-full px-8 py-5 focus:outline-none focus:border-cafe-gold shadow-lg shadow-cafe-brown/5 text-cafe-dark font-bold placeholder:text-cafe-dark/30"
                  />
                  <button 
                    type="submit"
                    disabled={status === 'submitting'}
                    className="px-10 py-5 bg-cafe-brown text-white rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-cafe-dark transition-all shadow-xl shadow-cafe-brown/20 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {status === 'submitting' ? 'Joining...' : (
                      <>
                        <Gift size={20} className="" />
                        Join the Society
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {perks.map((perk, idx) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-white/60 backdrop-blur-md rounded-[2.5rem] border border-white group hover:bg-white transition-all shadow-xl shadow-cafe-brown/5"
              >
                <div className="w-14 h-14 bg-cafe-brown/10 text-cafe-brown rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
                  {perk.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-cafe-dark">{perk.title}</h3>
                <p className="text-sm text-cafe-dark/60 leading-relaxed font-medium">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

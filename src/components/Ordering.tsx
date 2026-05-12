import { motion } from 'framer-motion';
import { ShoppingBag, CheckCircle2, CreditCard, Truck } from 'lucide-react';
import { useState } from 'react';

export default function Ordering() {
  const [step, setStep] = useState(1);

  const [orderInfo, setOrderInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    experience: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCompleteOrder = async () => {
    if (!orderInfo.fullName || !orderInfo.email || !orderInfo.address) {
      alert("Please fill all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const { db, collection, addDoc, serverTimestamp, handleFirestoreError, OperationType } = await import('../lib/firebase');
      const path = 'orders';
      
      await addDoc(collection(db, path), {
        ...orderInfo,
        status: 'pending',
        createdAt: serverTimestamp()
      }).catch(err => handleFirestoreError(err, OperationType.CREATE, path));

      setStep(3);
    } catch (error) {
      console.error("Order Error:", error);
      alert("Something went wrong with your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order" className="py-32 px-4 bg-cafe-dark relative overflow-hidden">
      {/* Decorative Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-cafe-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-px h-full bg-linear-to-b from-transparent via-cafe-gold/20 to-transparent" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            className="h-1 w-20 bg-cafe-gold mx-auto mb-8"
          />
          <h2 className="text-6xl md:text-8xl font-black mb-6 uppercase tracking-tighter text-white leading-none">
            Simple <span className="text-cafe-gold italic underline decoration-white/10 decoration-8 underline-offset-12">Rituals</span>
          </h2>
          <p className="text-white/40 font-medium italic text-lg max-w-2xl mx-auto">
            "Every perfect cup begins with a simple click. Experience the artisan journey from our roastery to your doorstep."
          </p>
        </div>

        <div className="bg-white/5 rounded-[4rem] p-10 md:p-20 border border-white/10 backdrop-blur-3xl shadow-[0_0_100px_rgba(0,98,65,0.1)] relative overflow-hidden group">
          <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-cafe-gold/5 to-transparent skew-x-[-25deg] transition-all duration-1000 group-hover:left-full pointer-events-none" />
          
          <div className="flex justify-between mb-24 relative z-10 max-w-2xl mx-auto">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center gap-6 relative">
                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center border-2 transition-all duration-700 shadow-2xl relative z-10 ${
                  step >= s ? 'bg-cafe-gold border-cafe-gold text-white font-black scale-110 rotate-12' : 'bg-white/5 border-white/10 text-white/20'
                }`}>
                  {step > s ? <CheckCircle2 size={32} /> : <span className="text-xl italic">{s}</span>}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-[0.4em] transition-colors duration-500 ${step >= s ? 'text-cafe-gold' : 'text-white/20'}`}>
                  {s === 1 ? 'Selection' : s === 2 ? 'Details' : 'Confirm'}
                </span>
                {s < 3 && (
                  <div className={`absolute top-8 left-1/2 w-full h-px transition-all duration-1000 ${
                    step > s ? 'bg-cafe-gold' : 'bg-white/10'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <div className="min-h-[400px] relative z-10">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                <div className="text-center">
                  <h3 className="text-4xl font-black text-white uppercase tracking-tight mb-4">Choose Your Path</h3>
                  <p className="text-white/30 text-sm font-bold uppercase tracking-widest italic">How would you like to experience Norte?</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  {[
                    { title: 'One-time Purchase', desc: 'A singular encounter with our rarest beans.', icon: <ShoppingBag size={40} /> },
                    { title: 'Monthly Subscription', desc: 'Consistent excellence, delivered every 30 days.', icon: <Truck size={40} /> }
                  ].map((option) => (
                    <button 
                      key={option.title}
                      onClick={() => {
                        setOrderInfo({ ...orderInfo, experience: option.title });
                        setStep(2);
                      }}
                      className="p-12 rounded-[3rem] border border-white/10 hover:border-cafe-gold transition-all duration-700 text-left bg-white/5 hover:bg-white/10 group relative overflow-hidden backdrop-blur-md shadow-2xl hover:-translate-y-2 text-white"
                    >
                      <div className="absolute inset-0 bg-linear-to-tr from-cafe-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="w-20 h-20 bg-cafe-gold/10 rounded-2xl flex items-center justify-center mb-8 text-cafe-gold group-hover:bg-cafe-gold group-hover:text-white transition-all shadow-lg">
                        {option.icon}
                      </div>
                      <div className="font-black text-2xl mb-4 uppercase tracking-tighter italic">{option.title}</div>
                      <div className="text-sm text-white/40 font-medium italic group-hover:text-white/60">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                <div className="flex items-center justify-between">
                  <h3 className="text-4xl font-black text-white uppercase tracking-tight italic">Excellence <span className="text-cafe-gold">Details</span></h3>
                  <button onClick={() => setStep(1)} className="text-[10px] font-black text-white/20 uppercase tracking-widest hover:text-cafe-gold transition-colors">← Change selection</button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-4 group">Full Name</label>
                       <input 
                         type="text" 
                         placeholder="E.g. Marco Polo" 
                         value={orderInfo.fullName}
                         onChange={(e) => setOrderInfo({ ...orderInfo, fullName: e.target.value })}
                         className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 focus:outline-none focus:border-cafe-gold transition-all text-white placeholder-white/10 font-bold" 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-4">Email Address</label>
                       <input 
                         type="email" 
                         placeholder="E.g. explorer@norte.ph" 
                         value={orderInfo.email}
                         onChange={(e) => setOrderInfo({ ...orderInfo, email: e.target.value })}
                         className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 focus:outline-none focus:border-cafe-gold transition-all text-white placeholder-white/10 font-bold" 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-4">Delivery Sanctuary</label>
                       <textarea 
                         placeholder="Your complete address..." 
                         value={orderInfo.address}
                         onChange={(e) => setOrderInfo({ ...orderInfo, address: e.target.value })}
                         className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 focus:outline-none focus:border-cafe-gold transition-all h-40 text-white placeholder-white/10 font-bold resize-none" 
                       />
                    </div>
                  </div>
                  <div className="bg-white/5 p-12 rounded-[3.5rem] border border-white/10 flex flex-col justify-between backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-linear-to-b from-cafe-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="space-y-10 relative z-10">
                      <div className="flex items-center gap-6 text-white pb-8 border-b border-white/5 group/row">
                        <div className="w-16 h-16 rounded-2xl bg-cafe-gold/10 flex items-center justify-center text-cafe-gold group-hover/row:scale-110 transition-transform">
                          <CreditCard size={28} />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-black text-[10px] uppercase tracking-[0.3em] text-cafe-gold">Payment Method</span>
                          <span className="font-black text-lg uppercase tracking-tight italic">Digital Mastery</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-white pb-8 border-b border-white/5 group/row">
                        <div className="w-16 h-16 rounded-2xl bg-cafe-gold/10 flex items-center justify-center text-cafe-gold group-hover/row:scale-110 transition-transform">
                          <Truck size={28} />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-black text-[10px] uppercase tracking-[0.3em] text-cafe-gold">Logistics</span>
                          <span className="font-black text-lg uppercase tracking-tight italic">Priority Delivery</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={handleCompleteOrder} 
                      disabled={isSubmitting}
                      className="w-full py-8 mt-12 rounded-full font-black text-xs uppercase tracking-[0.4em] bg-cafe-primary text-white hover:scale-105 active:scale-95 transition-all shadow-[0_0_50px_rgba(0,98,65,0.4)] disabled:opacity-50 relative z-10"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                      ) : 'Initiate Order'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                <div className="relative inline-block mb-12">
                   <div className="absolute inset-0 bg-cafe-primary blur-[40px] opacity-20" />
                   <div className="w-32 h-32 bg-cafe-primary rounded-[2.5rem] flex items-center justify-center mx-auto text-white shadow-2xl relative rotate-12 scale-110">
                    <CheckCircle2 size={64} />
                   </div>
                </div>
                <h3 className="text-6xl font-black mb-4 text-white uppercase tracking-tighter">Artisan <span className="text-cafe-gold">Confirmed</span></h3>
                <p className="text-white/40 mb-12 font-medium italic text-lg max-w-md mx-auto">"Your journey has begun. Our master roasters have been notified and excellence is being prepared."</p>
                <div className="flex flex-col items-center gap-6">
                  <button onClick={() => setStep(1)} className="px-12 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.3em] text-[10px] rounded-full hover:bg-white/10 transition-all hover:scale-105 active:scale-95">
                    Start New Ritual
                  </button>
                  <p className="text-cafe-gold/40 text-[8px] font-black uppercase tracking-widest">Order ID: #NORTE-{Math.floor(Math.random() * 9000) + 1000}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

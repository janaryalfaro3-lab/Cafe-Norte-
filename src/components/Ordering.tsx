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
    <section id="order" className="py-24 px-4 bg-cafe-brown/95 backdrop-blur-lg text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">Ordering Made Simple</h2>
          <p className="text-white/70 font-medium">Freshly roasted beans delivered from our San Rafael shop to your doorstep.</p>
        </div>

        <div className="bg-white/10 rounded-[3rem] p-8 md:p-12 border border-white/20 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] transition-all duration-1000 group-hover:left-full pointer-events-none" />
          
          <div className="flex justify-between mb-12 relative z-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all shadow-lg ${
                  step >= s ? 'bg-cafe-brown border-cafe-brown text-white font-black scale-110' : 'border-white/20 text-white/20'
                }`}>
                  {step > s ? <CheckCircle2 size={28} /> : <span className="text-lg">{s}</span>}
                </div>
                <span className={`text-[10px] uppercase tracking-[0.3em] font-black ${step >= s ? 'text-white' : 'text-white/20'}`}>
                  {s === 1 ? 'Selection' : s === 2 ? 'Details' : 'Confirm'}
                </span>
              </div>
            ))}
          </div>

          <div className="min-h-[350px] relative z-10">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <h3 className="text-3xl font-black text-white">Choose Your Experience</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {['One-time Purchase', 'Monthly Subscription'].map((option) => (
                    <button 
                      key={option}
                      onClick={() => {
                        setOrderInfo({ ...orderInfo, experience: option });
                        setStep(2);
                      }}
                      className="p-8 rounded-[2.5rem] border border-white/20 hover:border-white transition-all text-left bg-white/5 hover:bg-white/10 group relative overflow-hidden backdrop-blur-md shadow-inner"
                    >
                      <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <ShoppingBag className="mb-6 text-white" size={32} />
                      <div className="font-black text-xl mb-2 text-white uppercase tracking-tight">{option}</div>
                      <div className="text-sm text-white/50 font-medium">Premium freshly roasted beans.</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <h3 className="text-3xl font-black text-white">Shipping & Payment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      value={orderInfo.fullName}
                      onChange={(e) => setOrderInfo({ ...orderInfo, fullName: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-white transition-colors text-white placeholder-white/30 font-bold" 
                    />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      value={orderInfo.email}
                      onChange={(e) => setOrderInfo({ ...orderInfo, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-white transition-colors text-white placeholder-white/30 font-bold" 
                    />
                    <textarea 
                      placeholder="Delivery Address" 
                      value={orderInfo.address}
                      onChange={(e) => setOrderInfo({ ...orderInfo, address: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-white transition-colors h-32 text-white placeholder-white/30 font-bold" 
                    />
                  </div>
                  <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 space-y-8 flex flex-col justify-between backdrop-blur-md">
                    <div className="space-y-6">
                      <div className="flex items-center gap-5 text-white">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
                          <CreditCard size={24} />
                        </div>
                        <span className="font-black text-sm uppercase tracking-widest">Digital Payment</span>
                      </div>
                      <div className="flex items-center gap-5 text-white">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
                          <Truck size={24} />
                        </div>
                        <span className="font-black text-sm uppercase tracking-widest">Next-day Global Delivery</span>
                      </div>
                    </div>
                    <button 
                      onClick={handleCompleteOrder} 
                      disabled={isSubmitting}
                      className="w-full py-5 rounded-full font-black text-xs uppercase tracking-[0.3em] bg-cafe-brown text-white hover:bg-cafe-dark transition-all shadow-2xl shadow-cafe-brown/20 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Processing...' : 'Complete Secure Order'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-cafe-brown shadow-2xl">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-serif mb-2 text-white italic">Order Confirmed!</h3>
                <p className="text-white/60 mb-8 font-medium">Thank you for supporting Cafe Norte. Your brew is being prepared.</p>
                <button onClick={() => setStep(1)} className="text-white font-black uppercase tracking-widest text-sm hover:underline hover:text-cafe-cream transition-colors">
                  Place another order
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

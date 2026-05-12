import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStatus('submitting');
      try {
        const { db, collection, addDoc, serverTimestamp, handleFirestoreError, OperationType } = await import('../lib/firebase');
        const path = 'messages';
        
        await addDoc(collection(db, path), {
          ...formData,
          createdAt: serverTimestamp()
        }).catch(err => handleFirestoreError(err, OperationType.CREATE, path));

        setStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: 'General Inquiry',
          message: ''
        });
        setTimeout(() => setStatus('idle'), 5000);
      } catch (error) {
        console.error("Submission Error:", error);
        setStatus('idle');
        // Optionally show an error alert here
      }
    }
  };

  return (
    <section id="contact" className="py-32 px-4 bg-cafe-dark relative overflow-hidden">
      {/* Decorative Accents */}
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-cafe-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-px h-full bg-linear-to-b from-transparent via-cafe-gold/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-px w-12 bg-cafe-gold" />
              <span className="text-cafe-gold font-black uppercase tracking-[0.4em] text-[10px]">Get in Touch</span>
            </motion.div>
            
            <h2 className="text-6xl md:text-8xl font-black text-white mb-12 leading-none tracking-tighter uppercase">
              Visit Our <br /> <span className="text-cafe-gold italic underline decoration-white/10 decoration-8 underline-offset-12">Sanctuary</span>
            </h2>
            
            <div className="space-y-12 mb-16">
              {[
                { icon: <MapPin size={24} />, title: "The Roastery", content: "Brgy. San Rafael, Tarlac City, Tarlac", link: "https://www.google.com/maps/place/JS+NORTH+BUILDING/@15.452848,120.5993975,17z" },
                { icon: <Mail size={24} />, title: "Email Us", content: "cafenorte13@gmail.com" },
                { icon: <Phone size={24} />, title: "Call Us", content: "0976 442 1242" }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-8 group"
                >
                  <div className="w-16 h-16 bg-white/5 border border-white/10 text-cafe-gold rounded-[1.5rem] flex items-center justify-center shrink-0 group-hover:bg-cafe-gold group-hover:text-white transition-all duration-500 shadow-xl">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-white text-xl uppercase tracking-tight mb-2">{item.title}</h4>
                    <p className="text-white/40 font-medium italic">{item.content}</p>
                    {item.link && (
                      <a 
                        href={item.link}
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-block mt-4 text-[10px] font-black uppercase tracking-widest text-cafe-gold hover:text-white transition-colors border-b border-cafe-gold/30 pb-1"
                      >
                        Navigate to Norte →
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="rounded-[3rem] overflow-hidden grayscale contrast-125 border border-white/10 shadow-2xl h-[400px] relative">
              <div className="absolute inset-0 bg-cafe-dark/20 z-10 pointer-events-none" />
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3851.346!2d120.5968!3d15.4528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396c68c826b5e13%3A0x877ba7723b407862!2sJS%20NORTH%20BUILDING!5e0!3m2!1sen!2sph!4v1714100000000!5m2!1sen!2sph" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-2xl p-12 md:p-16 rounded-[4rem] border border-white/10 shadow-2xl relative overflow-hidden"
          >
            <AnimatePresence>
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-cafe-primary z-50 flex flex-col items-center justify-center text-white p-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                  >
                    <CheckCircle2 size={100} className="mb-8 text-cafe-gold" />
                  </motion.div>
                  <h3 className="text-5xl font-black mb-4 uppercase tracking-tighter">Connection<br/>Made!</h3>
                  <p className="text-white/70 font-medium italic mb-10 max-w-xs mx-auto">"Our baristas will prioritize your message and respond with craftsmanship."</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="px-10 py-5 bg-white text-cafe-dark rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:scale-105 transition-all"
                  >
                    Send Another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <h3 className="text-4xl font-black text-white mb-10 uppercase tracking-tight italic">Drop a <span className="text-cafe-gold">line</span></h3>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 ml-4">First Name</label>
                  <input 
                    type="text" 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    placeholder="E.g. Leonardo"
                    className={`w-full bg-white/5 border ${errors.firstName ? 'border-red-500' : 'border-white/10'} rounded-[1.5rem] px-8 py-6 focus:outline-none focus:border-cafe-gold transition-all text-white font-bold placeholder:text-white/10`} 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 ml-4">Last Name</label>
                  <input 
                    type="text" 
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    placeholder="E.g. Da Vinci"
                    className={`w-full bg-white/5 border ${errors.lastName ? 'border-red-500' : 'border-white/10'} rounded-[1.5rem] px-8 py-6 focus:outline-none focus:border-cafe-gold transition-all text-white font-bold placeholder:text-white/10`} 
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 ml-4">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="name@exclusive.com"
                  className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-[1.5rem] px-8 py-6 focus:outline-none focus:border-cafe-gold transition-all text-white font-bold placeholder:text-white/10`} 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 ml-4">Subject</label>
                <div className="relative">
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-8 py-6 focus:outline-none focus:border-cafe-gold appearance-none cursor-pointer text-white font-bold"
                  >
                    <option className="bg-cafe-dark">General Inquiry</option>
                    <option className="bg-cafe-dark">Ordering Issues</option>
                    <option className="bg-cafe-dark">Partnership</option>
                    <option className="bg-cafe-dark">Wholesale</option>
                  </select>
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                    <ArrowRight size={18} className="rotate-90" />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 ml-4">Your Message</label>
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="How can we craft your journey today?"
                  className={`w-full bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-[1.5rem] px-8 py-6 focus:outline-none focus:border-cafe-gold h-48 transition-all text-white font-bold placeholder:text-white/10 resize-none`} 
                />
              </div>
              <button 
                type="submit"
                disabled={status === 'submitting'}
                className="w-full relative group overflow-hidden py-6 bg-cafe-primary text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.4em] transition-all disabled:opacity-70 shadow-2xl shadow-cafe-primary/30 active:scale-95"
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                {status === 'submitting' ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                ) : (
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Submit to Master Baster
                    <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

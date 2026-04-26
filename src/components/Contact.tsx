import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';

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
    <section id="contact" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-cafe-dark mb-8">Visit Our <span className="italic">Sanctuary</span></h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cafe-gold/20 text-cafe-gold rounded-full flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-cafe-dark text-lg">Address</h4>
                  <p className="text-cafe-dark/60">Brgy. San Rafael, Tarlac City, <br />Tarlac, Philippines 2300</p>
                  <a 
                    href="https://www.google.com/maps/place/JS+NORTH+BUILDING/@15.452848,120.5993975,17z/data=!3m1!4b1!4m6!3m5!1s0x3396c68c826b5e13:0x877ba7723b407862!8m2!3d15.452848!4d120.5993975!16s%2Fg%2F11sjhf61l6" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-block mt-4 text-xs font-black uppercase tracking-widest text-cafe-gold hover:text-cafe-brown transition-colors border-b-2 border-cafe-gold/20 pb-1"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cafe-gold/20 text-cafe-gold rounded-full flex items-center justify-center shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-cafe-dark text-lg">Email</h4>
                  <p className="text-cafe-dark/60">cafenorte13@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cafe-gold/20 text-cafe-gold rounded-full flex items-center justify-center shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-cafe-dark text-lg">Phone</h4>
                  <p className="text-cafe-dark/60">09764421242</p>
                </div>
              </div>
            </div>

            {/* Google Maps Iframe placeholder for San Rafael Tarlac */}
            <div className="rounded-3xl overflow-hidden grayscale contrast-125 hover:grayscale-0 transition-all duration-700 h-[300px] border border-cafe-brown/10 shadow-lg group">
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
            className="bg-cafe-cream/50 backdrop-blur-sm p-10 rounded-[3rem] border border-white shadow-xl shadow-cafe-brown/5 relative overflow-hidden"
          >
            <AnimatePresence>
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-cafe-brown z-10 flex flex-col items-center justify-center text-white p-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                  >
                    <CheckCircle2 size={64} className="mb-4 text-cafe-gold" />
                  </motion.div>
                  <h3 className="text-3xl font-black mb-2">Message Sent!</h3>
                  <p className="text-cafe-cream/80">Thank you for reaching out. Our baristas will get back to you shortly.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-8 text-xs font-black uppercase tracking-widest border-b-2 border-cafe-gold pb-1 hover:text-cafe-gold transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <h3 className="text-3xl font-serif text-cafe-dark mb-8 italic">Let's connect</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-cafe-brown/60">First Name</label>
                  <input 
                    type="text" 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className={`w-full bg-white border ${errors.firstName ? 'border-red-400' : 'border-cafe-brown/10'} rounded-2xl px-6 py-4 focus:outline-none focus:border-cafe-gold transition-colors`} 
                  />
                  {errors.firstName && <p className="text-[10px] text-red-500 font-bold flex items-center gap-1"><AlertCircle size={10} /> {errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-cafe-brown/60">Last Name</label>
                  <input 
                    type="text" 
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className={`w-full bg-white border ${errors.lastName ? 'border-red-400' : 'border-cafe-brown/10'} rounded-2xl px-6 py-4 focus:outline-none focus:border-cafe-gold transition-colors`} 
                  />
                  {errors.lastName && <p className="text-[10px] text-red-500 font-bold flex items-center gap-1"><AlertCircle size={10} /> {errors.lastName}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-cafe-brown/60">Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full bg-white border ${errors.email ? 'border-red-400' : 'border-cafe-brown/10'} rounded-2xl px-6 py-4 focus:outline-none focus:border-cafe-gold transition-colors`} 
                />
                {errors.email && <p className="text-[10px] text-red-500 font-bold flex items-center gap-1"><AlertCircle size={10} /> {errors.email}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-cafe-brown/60">Subject</label>
                <select 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-white border border-cafe-brown/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-cafe-gold appearance-none cursor-pointer"
                >
                  <option>General Inquiry</option>
                  <option>Ordering Issues</option>
                  <option>Partnership</option>
                  <option>Wholesale</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-cafe-brown/60">Message</label>
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className={`w-full bg-white border ${errors.message ? 'border-red-400' : 'border-cafe-brown/10'} rounded-2xl px-6 py-4 focus:outline-none focus:border-cafe-gold h-40 transition-colors`} 
                />
                {errors.message && <p className="text-[10px] text-red-500 font-bold flex items-center gap-1"><AlertCircle size={10} /> {errors.message}</p>}
              </div>
              <button 
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-5 bg-cafe-brown text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-cafe-dark transition-all group disabled:opacity-70"
              >
                {status === 'submitting' ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

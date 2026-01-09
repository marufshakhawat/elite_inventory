
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { supabase } from '../utils/supabase';
import { LoadingDots } from '../App';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToast } = useApp();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Order Delivery Issue',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            subject: formData.subject, 
            message: formData.message 
          }
        ]);

      if (error) throw error;

      setSubmitted(true);
      addToast('Message sent successfully', 'success');
    } catch (err: any) {
      console.error('Submission Error:', err.message);
      addToast('Failed to send message. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">Help & Support</h1>
        <p className="text-slate-500">Have a question about your order or need help with a product? We are here to help!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100"><Mail className="w-5 h-5" /></div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email</p>
                <p className="text-sm font-bold text-slate-900">info@eliteinventory.store</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100"><Phone className="w-5 h-5" /></div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Phone</p>
                <div className="text-sm font-bold text-slate-900 space-y-1">
                  <p>+880 1626-881259</p>
                  <p>+880 1931-900433</p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100"><MapPin className="w-5 h-5" /></div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Address</p>
                <p className="text-sm font-bold text-slate-900">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>

          <div className="bg-[#25D366] p-8 rounded-[2rem] text-white shadow-lg shadow-[#25D366]/20">
            <svg viewBox="0 0 24 24" className="w-8 h-8 mb-4 fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.347.223-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <h4 className="text-lg font-bold mb-2">WhatsApp Support</h4>
            <p className="text-white/80 text-xs leading-relaxed mb-6">Need a fast answer? Reach out directly via WhatsApp for instant technical support.</p>
            <a 
              href="https://wa.me/8801931900433" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-white text-[#25D366] py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center"
            >
              Message Us
            </a>
          </div>
        </div>

        <div className="lg:col-span-2">
          {submitted ? (
            <div className="bg-white p-16 rounded-[3rem] border border-slate-100 shadow-xl text-center space-y-6">
              <div className="w-20 h-20 bg-emerald-50 rounded-full border border-emerald-100 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Message Sent!</h2>
              <p className="text-slate-500 max-w-sm mx-auto">Thanks for reaching out. We've received your message and our team will get back to you as soon as possible.</p>
              <button 
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: 'Order Delivery Issue', message: '' });
                }} 
                className="text-slate-900 font-bold hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="yourname@email.com"
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900" 
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Reason for Contact</label>
                <select 
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 appearance-none"
                >
                  <option>Order Delivery Issue</option>
                  <option>Payment Question</option>
                  <option>Bulk Order Request</option>
                  <option>Other Question</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Your Message</label>
                <textarea 
                  rows={5} 
                  required 
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us how we can help..."
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900"
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all uppercase text-xs tracking-widest shadow-lg disabled:opacity-50"
              >
                {loading ? (
                  <LoadingDots color="text-white" />
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;


import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Loader2, CheckCircle2 } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { supabase } from '../utils/supabase';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setChatOpen, addToast } = useApp();
  
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
                <p className="text-sm font-bold text-slate-900">Banani, Dhaka-1213<br />Bangladesh</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2rem] text-white">
            <MessageSquare className="w-8 h-8 mb-4 text-slate-400" />
            <h4 className="text-lg font-bold mb-2">Live Chat</h4>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">Need a fast answer? Try our support chat for instant help with common questions.</p>
            <button 
              onClick={() => setChatOpen(true)}
              className="w-full bg-white text-slate-900 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-100 transition-all"
            >
              Start Chatting
            </button>
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
                  <Loader2 className="w-4 h-4 animate-spin" />
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

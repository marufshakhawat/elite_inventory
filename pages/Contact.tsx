
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useApp } from '../store/AppContext';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const { setChatOpen } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Elite Support</h1>
        <p className="text-slate-500 whitespace-nowrap overflow-hidden text-ellipsis md:whitespace-normal">Need assistance with a license or have a business inquiry? Our specialists are active 24/7.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100"><Mail className="w-5 h-5" /></div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email Protocol</p>
                <p className="text-sm font-bold text-slate-900">info@eliteinventory.store</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100"><Phone className="w-5 h-5" /></div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Elite Lines</p>
                <div className="text-sm font-bold text-slate-900 space-y-1">
                  <p>+880 1626-881259</p>
                  <p>+880 1931-900433</p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100"><MapPin className="w-5 h-5" /></div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Global HQ</p>
                <p className="text-sm font-bold text-slate-900">Banani, Dhaka-1213<br />Bangladesh</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2rem] text-white">
            <MessageSquare className="w-8 h-8 mb-4 text-slate-400" />
            <h4 className="text-lg font-bold mb-2">Real-time Chat</h4>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">Access our AI-powered support chatbot for instant verification status updates and license recovery.</p>
            <button 
              onClick={() => setChatOpen(true)}
              className="w-full bg-white text-slate-900 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-100 transition-all"
            >
              Launch Chatbot
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          {submitted ? (
            <div className="bg-white p-16 rounded-[3rem] border border-slate-100 shadow-xl text-center space-y-6">
              <div className="w-20 h-20 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center mx-auto">
                <Send className="w-8 h-8 text-slate-900" />
              </div>
              <h2 className="text-2xl font-bold">Transmission Received</h2>
              <p className="text-slate-500 max-w-sm mx-auto">Your inquiry has been queued for review. Expect a response in your inbox within 12 hours.</p>
              <button onClick={() => setSubmitted(false)} className="text-slate-900 font-bold hover:underline">Send another inquiry</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input type="text" required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input type="email" required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 appearance-none">
                  <option>License Delivery Issue</option>
                  <option>Payment Verification</option>
                  <option>Bulk Order Inquiry</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Message Detail</label>
                <textarea rows={5} required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900"></textarea>
              </div>
              <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all uppercase text-xs tracking-widest shadow-lg">
                <Send className="w-4 h-4" /> Deploy Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;

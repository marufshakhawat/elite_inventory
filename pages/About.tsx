
import React from 'react';
import { ShieldCheck, Zap, Globe, Star, CheckCircle2, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pb-20">
      {/* Hero Section - Official Slogan */}
      <section className="bg-[#020617] py-24 sm:py-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-slate-800/20 blur-[120px] rounded-full"></div>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }}></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8 animate-fadeIn">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-4">
            <Award className="w-4 h-4 text-slate-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
              Official Marketplace
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
            Instant. Premium. <span className="text-slate-500">Yours.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Your trusted source for authentic, premium digital subscriptions. We provide elite tools for creators and professionals in Bangladesh and beyond.
          </p>
        </div>
      </section>

      {/* Core Values - Derived from FB posts */}
      <section className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: 'Authentic Assets', 
              desc: 'We strictly provide genuine subscriptions and official license keys. No crack, no risk—just pure premium performance.', 
              icon: ShieldCheck 
            },
            { 
              title: 'Fast Delivery', 
              desc: 'Time is your most valuable asset. Our delivery protocol ensures your digital products reach you within 30-90 minutes.', 
              icon: Zap 
            },
            { 
              title: 'Seamless Support', 
              desc: 'Dedicated technical assistance available always. We ensure your creative and professional workflow never stops.', 
              icon: Star 
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl space-y-5 group hover:-translate-y-2 transition-all duration-500">
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-200">
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Philosophy */}
      <section className="max-w-7xl mx-auto px-4 py-24 md:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 space-y-10">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tight text-slate-900">Why Elite Inventory?</h2>
              <div className="h-1.5 w-20 bg-slate-900 rounded-full"></div>
            </div>
            
            <p className="text-slate-600 leading-relaxed text-lg font-light">
              We curate only the best digital solutions for our community. Whether it's empowering editors with <b>CapCut Pro's</b> AI-driven features and 4K exports, or providing uninterrupted access to <b>Netflix's</b> global library, we focus on quality over quantity.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                'AI-Powered Creative Features',
                'Global Streaming Access',
                'Safe & Secure Transactions',
                'Uninterrupted Support',
                'Affordable Premium Pricing',
                'Dhaka-Based Verification'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-slate-900" />
                  <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 -z-10"></div>
            <div className="bg-white p-3 rounded-[3rem] shadow-2xl overflow-hidden aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-full object-cover rounded-[2.5rem]" 
                alt="Elite Workplace" 
              />
            </div>
            <div className="absolute bottom-8 -left-8 bg-slate-900 text-white p-8 rounded-3xl shadow-2xl max-w-[200px] animate-bounce-slow">
              <p className="text-3xl font-black">100%</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Authentic Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Local Commitment Section */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="bg-slate-50 rounded-[3rem] p-12 md:p-20 text-center space-y-8 border border-slate-100">
          <div className="max-w-2xl mx-auto space-y-4">
            <Globe className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Proudly Based in Dhaka</h2>
            <p className="text-slate-500 font-light leading-relaxed">
              Serving the creative minds of Bangladesh. From our headquarters in Dhaka, we ensure that premium global software remains accessible and affordable for every local professional, student, and creator.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-12 pt-8 border-t border-slate-200">
            <div>
              <p className="text-4xl font-black text-slate-900">24/7</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Always Open</p>
            </div>
            <div className="w-px h-12 bg-slate-200 hidden sm:block"></div>
            <div>
              <p className="text-4xl font-black text-slate-900">Elite</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Verified Status</p>
            </div>
            <div className="w-px h-12 bg-slate-200 hidden sm:block"></div>
            <div>
              <p className="text-4xl font-black text-slate-900">Dhaka</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Home Base</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

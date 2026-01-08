
import React from 'react';
import { ShieldCheck, Zap, Globe, Cpu } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pb-20">
      <section className="bg-slate-900 py-24 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h1 className="text-5xl font-bold tracking-tight">Digital Infrastructure, <br />Redefined.</h1>
          <p className="text-slate-400 text-lg font-light leading-relaxed">
            Elite Inventory was founded on the principle of providing seamless access to the world's most critical digital tools. We bridge the gap between complex licensing and professional productivity.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Verified Sourcing', desc: 'Every key in our inventory undergoes a rigorous 3-step verification protocol to ensure 100% authenticity.', icon: ShieldCheck },
            { title: 'Instant Deployment', desc: 'Our automated fulfillment engine ensures your digital assets are delivered to your dashboard in minutes.', icon: Zap },
            { title: 'Global Reach', desc: 'Supporting professionals across 150+ countries with regional-agnostic software solutions.', icon: Globe }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl space-y-4">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                <item.icon className="w-6 h-6 text-slate-900" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Our Evolution</h2>
            <p className="text-slate-600 leading-relaxed">
              Since 2021, we have served over 50,000 professionals, ranging from independent creators to enterprise developers. Our inventory has expanded from simple productivity keys to full-scale AI infrastructure and streaming solutions.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-slate-900">50K+</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Users Served</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">99.9%</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Uptime SLA</p>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-slate-100 aspect-square rounded-[3rem] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale opacity-80" alt="Team" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

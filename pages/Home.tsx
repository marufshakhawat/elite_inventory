
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck, Globe, Cpu, Play, Terminal, Box, Shield } from 'lucide-react';
import { useApp } from '../store/AppContext';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { products } = useApp();
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <div className="space-y-16 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[45vh] min-h-[400px] overflow-hidden bg-[#020617] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-slate-800/10 blur-[100px] rounded-full"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] to-[#020617]"></div>
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full text-white">
          <div className="max-w-2xl space-y-6 animate-fadeIn">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400">
                Premium Marketplace
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              Instant. Premium. <br /> 
              <span className="text-slate-500">Accessible.</span>
            </h1>
            
            <p className="text-lg text-slate-400 font-light leading-relaxed">
              Official license keys and premium subscriptions delivered instantly to your dashboard.
            </p>
            
            <div className="pt-4">
              <Link to="/shop" className="group relative inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-white bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all text-xs uppercase tracking-widest">
                Start Browsing <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="max-w-7xl mx-auto px-4 -mt-12 relative z-20 reveal" ref={addToRefs}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 bg-white rounded-[2rem] border border-slate-100 shadow-xl px-10">
          {[
            { icon: Zap, title: 'Instant Delivery', desc: 'Auto-fulfillment' },
            { icon: ShieldCheck, title: 'Genuine Keys', desc: '100% Verified' },
            { icon: Globe, title: 'No Limits', desc: 'Global access' },
            { icon: Box, title: 'Full Support', desc: '24/7 coverage' },
          ].map((feat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-2">
              <feat.icon className="w-5 h-5 text-slate-900 mb-1" />
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">{feat.title}</h4>
              <p className="text-[10px] text-slate-400">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Assets */}
      <section className="max-w-7xl mx-auto px-4 reveal" ref={addToRefs}>
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Popular Products</h2>
            <p className="text-sm text-slate-400">Hand-picked premium essentials.</p>
          </div>
          <Link to="/shop" className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b-2 border-slate-900 pb-1">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 reveal" ref={addToRefs}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group relative h-72 overflow-hidden rounded-[2.5rem] bg-[#0f172a] border border-white/5 flex flex-col justify-end p-10">
            <div className="absolute top-8 right-8 opacity-[0.05] group-hover:scale-105 transition-all duration-700">
              <Cpu className="w-40 h-40 text-white" />
            </div>
            <div className="relative z-20 space-y-3">
              <h3 className="text-3xl font-bold text-white">Software</h3>
              <p className="text-sm text-slate-400 max-w-xs font-light">Pro tools for professional workflows.</p>
              <Link to="/shop?category=Software & Apps" className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest mt-2">
                Explore <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          <div className="group relative h-72 overflow-hidden rounded-[2.5rem] bg-[#1e1e1e] border border-white/5 flex flex-col justify-end p-10">
            <div className="absolute top-8 right-8 opacity-[0.05] group-hover:scale-105 transition-all duration-700">
              <Play className="w-40 h-40 text-white" />
            </div>
            <div className="relative z-20 space-y-3">
              <h3 className="text-3xl font-bold text-white">Streaming</h3>
              <p className="text-sm text-slate-400 max-w-xs font-light">Premium entertainment, anywhere.</p>
              <Link to="/shop?category=Streaming Platform" className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest mt-2">
                Explore <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 reveal" ref={addToRefs}>
        <div className="bg-[#020617] rounded-[2.5rem] py-14 px-10 text-center text-white border border-white/5 shadow-2xl">
          <div className="max-w-xl mx-auto space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tight">Get Updates.</h2>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Receive notifications when high-demand assets are back in stock.
              </p>
            </div>
            
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={e => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex-[2] px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white text-sm outline-none focus:ring-1 focus:ring-slate-500"
              />
              <button className="flex-1 bg-white text-slate-900 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest">
                Join Now
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

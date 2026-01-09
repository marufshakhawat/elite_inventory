
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck, Globe, Cpu, Play, Terminal, Box, Shield } from 'lucide-react';
import { useApp } from '../store/AppContext';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { products } = useApp();
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section - Smaller & Cleaner */}
      <section className="relative h-[45vh] min-h-[380px] overflow-hidden bg-[#020617] flex items-center">
        {/* Subtle Mesh Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-slate-800/10 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-slate-700/5 blur-[100px] rounded-full"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] to-[#020617]"></div>
          
          {/* Subtle Pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full text-white">
          <div className="max-w-2xl space-y-6 animate-fadeIn">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              <Terminal className="w-3 h-3 text-slate-400" />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400">
                Elite Inventory / V2.4.0
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              Elevated <span className="text-slate-500 font-semibold">Digital</span> <br /> 
              subscriptions.
            </h1>
            
            <div className="text-base md:text-lg text-slate-400 max-w-lg font-light leading-relaxed">
              <p>Premium license keys and elite digital subscriptions curated for the modern professional.</p>
              <p className="mt-2 text-slate-500 font-medium">Secured, verified, and delivered instantly.</p>
            </div>
            
            <div className="pt-4">
              <Link to="/shop" className="group relative inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-white bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all text-sm uppercase tracking-widest shadow-2xl">
                Shop Marketplace <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 px-10">
          {[
            { icon: Zap, title: 'Instant Delivery', desc: 'Auto-fulfillment' },
            { icon: ShieldCheck, title: 'Verified Keys', desc: '100% Genuine assets' },
            { icon: Globe, title: 'Global Access', desc: 'No region restrictions' },
            { icon: Box, title: 'Lifetime Support', desc: '24/7 technical coverage' },
          ].map((feat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-2">
              <div className="mb-1">
                <feat.icon className="w-5 h-5 text-slate-900" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">{feat.title}</h4>
                <p className="text-[10px] text-slate-400 mt-1">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Assets */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Trending Assets</h2>
            <p className="text-sm text-slate-400">High-demand subscriptions this cycle.</p>
          </div>
          <Link to="/shop" className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b-2 border-slate-900 pb-1 hover:opacity-70 transition-opacity">
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
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group relative h-80 overflow-hidden rounded-[2.5rem] bg-[#0f172a] border border-white/5 flex flex-col justify-end p-10">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
            <div className="absolute top-8 right-8 opacity-[0.05] group-hover:scale-105 transition-transform duration-700">
              <Cpu className="w-40 h-40 text-white" />
            </div>
            <div className="relative z-20 space-y-3">
              <h3 className="text-3xl font-bold tracking-tight text-white">Premium Softwares</h3>
              <p className="text-sm text-slate-400 max-w-xs font-light">Essential licenses for productivity and professional efficiency.</p>
              <Link to="/shop?category=Software & Apps" className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full text-xs font-bold hover:bg-slate-100 transition-all uppercase tracking-widest mt-2">
                Explore <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          <div className="group relative h-80 overflow-hidden rounded-[2.5rem] bg-[#1e1e1e] border border-white/5 flex flex-col justify-end p-10">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
            <div className="absolute top-8 right-8 opacity-[0.05] group-hover:scale-105 transition-transform duration-700">
              <Play className="w-40 h-40 text-white" />
            </div>
            <div className="relative z-20 space-y-3">
              <h3 className="text-3xl font-bold tracking-tight text-white">Streaming Solutions</h3>
              <p className="text-sm text-slate-400 max-w-xs font-light">Full access to global entertainment and ultra-HD media platforms.</p>
              <Link to="/shop?category=Streaming Platform" className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full text-xs font-bold hover:bg-slate-100 transition-all uppercase tracking-widest mt-2">
                Explore <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter - Smaller & More Focused */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-[#020617] rounded-[2.5rem] py-14 px-10 text-center text-white relative overflow-hidden border border-white/5 shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Priority Restock Drops.</h2>
              <p className="text-slate-400 text-sm md:text-base font-light max-lg mx-auto leading-relaxed">
                Be the first to know when high-demand professional licenses and elite digital subscriptions are restocked.
              </p>
            </div>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto" onSubmit={e => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Secure email address" 
                className="flex-[2.5] px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white text-sm outline-none focus:ring-1 focus:ring-slate-500 transition-all placeholder:text-slate-600"
              />
              <button className="flex-1 bg-white text-slate-900 px-8 py-4 rounded-full text-xs font-bold hover:bg-slate-200 transition-all uppercase tracking-widest">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Explicit Legal Verification Section for Google Bot */}
      <section className="max-w-7xl mx-auto px-4 text-center">
        <div className="py-8 border-t border-slate-100 flex items-center justify-center gap-6">
           <Link to="/privacy" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 flex items-center gap-1.5">
             <Shield className="w-3 h-3" /> Privacy Policy
           </Link>
           <Link to="/terms" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900">
             Terms of Service
           </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

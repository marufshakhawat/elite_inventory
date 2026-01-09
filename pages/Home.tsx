
import React from 'react';
import { Link } from 'react-router-dom';
// Added CheckCircle2 to the imports from lucide-react
import { ArrowRight, Zap, ShieldCheck, Globe, Cpu, Play, Terminal, Box, Shield, Star, Users, Award, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useApp } from '../store/AppContext';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { products } = useApp();
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  const stats = [
    { label: 'Active Users', value: '25K+', icon: Users },
    { label: 'Keys Delivered', value: '1.2M+', icon: Zap },
    { label: 'Verified Assets', value: '500+', icon: ShieldCheck },
    { label: 'Average Rating', value: '4.9/5', icon: Star },
  ];

  const categories = [
    { name: 'Writing Tools', icon: Terminal, color: 'bg-blue-500', count: '12 Assets' },
    { name: 'Streaming Platform', icon: Play, color: 'bg-red-500', count: '45 Assets' },
    { name: 'Graphics Tools', icon: Cpu, color: 'bg-indigo-500', count: '28 Assets' },
    { name: 'Premium VPN', icon: Shield, color: 'bg-emerald-500', count: '15 Assets' },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative h-[65vh] min-h-[500px] overflow-hidden bg-[#020617] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] to-[#020617]"></div>
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full text-white">
          <div className="max-w-3xl space-y-8 animate-fadeIn">
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
                Lumina Marketplace / Digital Excellence
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tighter">
              Instant Access to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Premium Tech.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-xl font-light leading-relaxed">
              Curated professional license keys and elite digital subscriptions. Verified by specialists, delivered in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/shop" className="group relative inline-flex items-center justify-center px-10 py-5 rounded-full font-bold text-slate-900 bg-white hover:bg-slate-100 transition-all text-sm uppercase tracking-widest shadow-2xl">
                Start Exploring <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="inline-flex items-center justify-center px-10 py-5 rounded-full font-bold text-white bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all text-sm uppercase tracking-widest">
                Our Guarantee
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 -mt-20 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 flex flex-col items-center text-center space-y-2 hover:translate-y-[-5px] transition-transform">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-2">
                <stat.icon className="w-6 h-6 text-slate-900" />
              </div>
              <h4 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Spotlight */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Browse by Category</h2>
          <p className="text-slate-400 text-sm">Find the specific tools your workflow demands.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <Link 
              key={idx} 
              to={`/category/${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group relative bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 ${cat.color} opacity-[0.03] rounded-full translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700`}></div>
              <cat.icon className="w-10 h-10 text-slate-900 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">{cat.name}</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{cat.count}</p>
              <div className="mt-6 flex items-center gap-2 text-slate-900 font-bold text-[10px] uppercase tracking-widest group-hover:gap-4 transition-all">
                Browse Collection <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Assets */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Trending Assets</h2>
            <p className="text-sm text-slate-400">The most requested professional subscriptions right now.</p>
          </div>
          <Link to="/shop" className="group flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-widest border-b-2 border-slate-900 pb-1 hover:opacity-70 transition-opacity">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trust & Verification Banner */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-[#0f172a] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[100%] bg-blue-600/10 blur-[100px] rounded-full"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1 rounded-full">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Elite Verification Protocol</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">Authenticity in every pixel.</h2>
              <p className="text-slate-400 font-light leading-relaxed">
                Every license key in our inventory undergoes a rigorous 3-step verification process by our security team in Dhaka. We guarantee 100% uptime for all personal and shared assets.
              </p>
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Official Licenses</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Secure Delivery</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 text-center">
                <Award className="w-10 h-10 text-blue-400 mx-auto mb-4" />
                <h4 className="font-bold text-xl">Elite Tier</h4>
                <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mt-1">Vendor Status</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 text-center translate-y-8">
                <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
                <h4 className="font-bold text-xl">Verified</h4>
                <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mt-1">Key Integrity</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Operative Feedback</h2>
          <p className="text-slate-400 text-sm">Real stories from our professional community.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Adnan Sami', role: 'Motion Designer', text: 'Elite Inventory is my go-to for CapCut and Canva Pro. Instant delivery every single time.' },
            { name: 'Rifah Tasnim', role: 'Software Engineer', text: 'Genuine ChatGPT Plus at a fraction of the cost. The shared account works flawlessly.' },
            { name: 'Zayed Khan', role: 'Digital Marketer', text: 'The support team in Dhaka is top-notch. They helped me set up my VPN within minutes.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative group hover:shadow-xl transition-all">
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />)}
              </div>
              <p className="text-slate-600 font-light italic leading-relaxed">"{item.text}"</p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white font-black text-sm uppercase">
                  {item.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

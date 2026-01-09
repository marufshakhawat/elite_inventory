
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Home, ShoppingBag, ArrowLeft, ShieldAlert, Zap } from 'lucide-react';

const NotFound: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.03]">
        <h1 className="text-[20rem] sm:text-[30rem] font-black leading-none pointer-events-none">404</h1>
      </div>
      
      <div className="max-w-2xl w-full text-center space-y-12 animate-fadeIn">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-100 px-4 py-1.5 rounded-full mb-4">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-rose-800">
              Access Restricted
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter leading-tight uppercase">
            Asset Coordinates <br /> 
            <span className="text-slate-400">Lost In Space</span>
          </h2>
          
          <p className="text-slate-500 text-sm sm:text-lg font-medium leading-relaxed max-w-md mx-auto">
            The digital infrastructure you're looking for doesn't exist or has been moved to a restricted sector.
          </p>
        </div>

        {/* Recovery Search */}
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSearch} className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-slate-900 transition-colors" />
            <input 
              type="text" 
              placeholder="Search for another asset..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-[2rem] shadow-xl shadow-slate-200/50 outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium text-sm"
            />
            <button 
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white p-3 rounded-full hover:bg-slate-800 transition-all active:scale-95 shadow-lg"
            >
              <Zap className="w-4 h-4 fill-white" />
            </button>
          </form>
        </div>

        {/* Recovery Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white transition-all text-xs font-bold uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
          
          <Link 
            to="/" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all text-xs font-bold uppercase tracking-widest shadow-xl shadow-slate-900/10"
          >
            <Home className="w-4 h-4" /> Return Home
          </Link>
          
          <Link 
            to="/shop" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white transition-all text-xs font-bold uppercase tracking-widest"
          >
            <ShoppingBag className="w-4 h-4" /> Shop Now
          </Link>
        </div>
        
        <div className="pt-8 border-t border-slate-100 inline-block">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            ErrorCode: 0x404_NULL_REFERENCE
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

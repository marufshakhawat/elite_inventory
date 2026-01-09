
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Search, User, Heart, Menu, X, LogOut, 
  Home as HomeIcon, LayoutGrid, PenTool, GraduationCap, Layers, 
  Feather, Lock, AppWindow, PieChart, Monitor, Gamepad2, Tv, Gift 
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { slugify } from '../utils/mockData.ts';

const Navbar: React.FC = () => {
  const { cart, user, isAuth, logout } = useApp();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const menuItems = [
    { label: 'Home', path: '/', icon: HomeIcon },
    { label: 'All Products', path: '/shop', icon: LayoutGrid },
    { label: 'Writing Tools', path: '/category/writing-tools', icon: PenTool },
    { label: 'Educational Tools', path: '/category/educational-tools', icon: GraduationCap },
    { label: 'Graphics Tools', path: '/category/graphics-tools', icon: Layers },
    { label: 'Graphics Resources', path: '/category/graphics-resources', icon: Feather },
    { label: 'Premium VPN', path: '/category/premium-vpn', icon: Lock },
    { label: 'Software & Apps', path: '/category/software-apps', icon: AppWindow },
    { label: 'Marketing Tools', path: '/category/marketing-tools', icon: PieChart },
    { label: 'Web Elements', path: '/category/web-elements', icon: Monitor },
    { label: 'Gaming', path: '/category/gaming', icon: Gamepad2 },
    { label: 'Streaming Platform', path: '/category/streaming-platform', icon: Tv },
    { label: 'Gift Card', path: '/category/gift-card', icon: Gift },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsDrawerOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-24">
            <div className="flex items-center">
              {/* Menu Trigger */}
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="p-2 mr-2 text-slate-600 hover:text-slate-900 transition-colors"
                aria-label="Open Menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <Link to="/" className="flex items-center">
                <img src="https://lh3.googleusercontent.com/d/1WVWnBlpWY9YGtOO_c_03Nl0RJ_km-_W7" alt="Elite Inventory" className="w-[160px] sm:w-[220px] h-auto" />
              </Link>
            </div>

            {/* Desktop & Tablet Search */}
            <div className="hidden md:flex items-center flex-1 max-w-sm mx-4 lg:mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search inventory..."
                  className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/shop?q=${(e.target as HTMLInputElement).value}`)}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
              <Link to="/wishlist" className="hidden sm:block text-slate-600 hover:text-slate-900 transition-colors">
                <Heart className="w-5 h-5" />
              </Link>
              <Link to="/cart" className="relative group text-slate-600 hover:text-slate-900 p-2">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-slate-900 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              {isAuth ? (
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} className="text-slate-600 hover:text-slate-900 p-2">
                    <User className="w-5 h-5" />
                  </Link>
                  <button onClick={logout} className="hidden md:block text-slate-600 hover:text-slate-900 p-2">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="bg-slate-900 text-white px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Slide-out Sidebar Drawer */}
      <div 
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setIsDrawerOpen(false)}
        />
        
        {/* Drawer Content */}
        <aside 
          className={`absolute top-0 left-0 w-[280px] sm:w-[320px] h-full bg-[#111317] text-slate-300 shadow-2xl transition-transform duration-300 ease-out transform flex flex-col ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          {/* Header */}
          <div className="flex-none p-4 sm:p-6 border-b border-white/10 flex justify-between items-center bg-[#111317]">
            <span className="text-base sm:text-lg font-bold text-white tracking-tight">ELITE MENU</span>
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>

          {/* Search Area */}
          <div className="flex-none p-4 sm:p-6 border-b border-white/10 bg-[#111317]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search inventory..."
                className="w-full bg-[#1c1f26] border-none rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:ring-1 focus:ring-slate-700 transition-all outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/shop?q=${(e.target as HTMLInputElement).value}`);
                    setIsDrawerOpen(false);
                  }
                }}
              />
            </div>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 overflow-y-auto no-scrollbar py-2">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(item.path)}
                className="w-full flex items-center gap-4 px-6 py-4 hover:bg-white/5 hover:text-white transition-all group border-l-4 border-transparent hover:border-slate-100"
              >
                <item.icon className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors flex-shrink-0" />
                <span className="text-[14px] sm:text-[15px] font-medium tracking-wide whitespace-nowrap">{item.label}</span>
              </button>
            ))}
            <div className="h-10"></div>
          </nav>
          
          {/* Footer */}
          <div className="flex-none p-6 border-t border-white/10 bg-[#111317]">
            <p className="text-[10px] text-slate-600 uppercase font-bold tracking-widest text-center">
              ELITE INVENTORY V2.4.0
            </p>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Navbar;

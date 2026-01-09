
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AppProvider, useApp } from './store/AppContext.tsx';
import { CheckCircle, Info, X, ChevronUp, AlertCircle, AlertTriangle, MessageCircle } from 'lucide-react';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';
import Shop from './pages/Shop.tsx';
import ProductDetail from './pages/ProductDetail.tsx';
import Cart from './pages/Cart.tsx';
import Checkout from './pages/Checkout.tsx';
import Auth from './pages/Auth.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Admin from './pages/Admin.tsx';
import Wishlist from './pages/Wishlist.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import Legal from './pages/Legal.tsx';
import NotFound from './pages/NotFound.tsx';

export const LoadingDots: React.FC<{ color?: string, size?: string }> = ({ color = 'text-slate-900', size = '' }) => (
  <div className="flex items-center justify-center gap-1.5 py-4">
    <div className={`w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:-0.3s] ${color} ${size}`}></div>
    <div className={`w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:-0.15s] ${color} ${size}`}></div>
    <div className={`w-2 h-2 rounded-full bg-current animate-bounce ${color} ${size}`}></div>
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AuthHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuth, isLoading } = useApp();

  useEffect(() => {
    if (!isLoading && isAuth && location.pathname === '/' && location.hash.includes('access_token')) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuth, isLoading, location, navigate]);

  return null;
};

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-24 right-8 z-50 p-4 rounded-full bg-slate-900/80 backdrop-blur-md text-white border border-white/10 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Back to Top"
    >
      <ChevronUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
    </button>
  );
};

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/8801931900433"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all group border border-white/10 flex items-center justify-center animate-fadeIn"
      aria-label="WhatsApp Support"
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.347.223-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-[#25D366] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl hidden sm:inline-block">
        WhatsApp Support
      </span>
    </a>
  );
};

const ToastContainer = () => {
  const { toasts, removeToast } = useApp();
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-3 pointer-events-none w-full max-w-sm px-4">
      {toasts.map(toast => (
        <div 
          key={toast.id} 
          className="pointer-events-auto flex items-center gap-3 bg-slate-900/95 text-white px-5 py-4 rounded-2xl shadow-2xl animate-fadeIn border border-white/10 backdrop-blur-md w-full"
        >
          {toast.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
          ) : toast.type === 'error' ? (
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
          ) : (
            <Info className="w-5 h-5 text-blue-400 shrink-0" />
          )}
          <p className="text-[10px] font-bold uppercase tracking-widest flex-1 leading-relaxed">{toast.message}</p>
          <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-white transition-colors shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

const ProtectedRoute: React.FC<{ children?: React.ReactNode, adminOnly?: boolean }> = ({ children, adminOnly = false }) => {
  const { isAuth, user, isLoading } = useApp();
  const location = useLocation();
  
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 gap-4">
        <LoadingDots />
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verifying Identity...</p>
      </div>
    );
  }

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 gap-4">
        <LoadingDots />
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fetching Profile...</p>
      </div>
    );
  }

  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 transition-colors duration-500">
      <ScrollToTop />
      <AuthHandler />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/category/:categorySlug" element={<Shop />} />
          <Route path="/product/:productSlug" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth defaultView="signup" />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/privacy" element={<Legal type="privacy" />} />
          <Route path="/terms" element={<Legal type="terms" />} />
          <Route path="/faq" element={<Legal type="faq" />} />
          <Route path="/shipping" element={<Legal type="shipping" />} />
          <Route path="/returns" element={<Legal type="returns" />} />
          <Route path="/cookies" element={<Legal type="cookies" />} />

          <Route 
            path="/checkout" 
            element={<ProtectedRoute><Checkout /></ProtectedRoute>} 
          />
          <Route 
            path="/dashboard" 
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/admin" 
            element={<ProtectedRoute adminOnly={true}><Admin /></ProtectedRoute>} 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BackToTopButton />
      <WhatsAppButton />
      <ToastContainer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </Router>
  );
};

export default App;

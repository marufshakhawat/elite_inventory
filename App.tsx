
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AppProvider, useApp } from './store/AppContext.tsx';
import { CheckCircle, Info, X, ChevronUp, AlertCircle, AlertTriangle } from 'lucide-react';
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
import Chatbot from './components/Chatbot.tsx';

// Smooth Three-Dots Glowing Component
export const LoadingDots: React.FC<{ color?: string, size?: string }> = ({ color = 'text-slate-900', size = '' }) => (
  <div className={`dot-glowing ${color} ${size}`}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AuthErrorHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useApp();

  useEffect(() => {
    const hash = location.hash;
    if (hash && hash.includes('error=')) {
      const params = new URLSearchParams(hash.replace('#', '?'));
      const errorMsg = params.get('error_description') || 'Authentication failed';
      const errorCode = params.get('error_code');

      if (errorCode === 'otp_expired' || errorMsg.includes('invalid') || errorMsg.includes('expired')) {
        addToast('Verification link expired. Please request a new one.', 'error');
        navigate('/login?error=expired', { replace: true });
      }
    }
  }, [location, navigate, addToast]);

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
  
  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <LoadingDots />
    </div>
  );

  if (!isAuth) return <Navigate to="/login" replace />;
  if (adminOnly && user?.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <ScrollToTop />
      <AuthErrorHandler />
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <BackToTopButton />
      <Chatbot />
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

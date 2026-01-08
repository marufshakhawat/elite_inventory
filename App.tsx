
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './store/AppContext';
import { CheckCircle, Info, X, ChevronUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import Chatbot from './components/Chatbot';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
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
      className={`fixed bottom-8 right-8 z-50 p-4 rounded-full bg-slate-900/80 backdrop-blur-md text-white border border-white/10 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group ${
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
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map(toast => (
        <div 
          key={toast.id} 
          className="pointer-events-auto flex items-center gap-3 bg-slate-900 text-white px-5 py-4 rounded-2xl shadow-2xl animate-fadeIn min-w-[280px] border border-white/10 backdrop-blur-md"
        >
          {toast.type === 'success' ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Info className="w-5 h-5 text-blue-400" />}
          <p className="text-xs font-bold uppercase tracking-widest flex-1">{toast.message}</p>
          <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

const ProtectedRoute: React.FC<{ children?: React.ReactNode, adminOnly?: boolean }> = ({ children, adminOnly = false }) => {
  const { isAuth, user } = useApp();
  if (!isAuth) return <Navigate to="/login" replace />;
  if (adminOnly && user?.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Legal and Informational Routes */}
          <Route path="/privacy" element={<Legal type="privacy" />} />
          <Route path="/terms" element={<Legal type="terms" />} />
          <Route path="/faq" element={<Legal type="faq" />} />
          <Route path="/shipping" element={<Legal type="shipping" />} />
          <Route path="/returns" element={<Legal type="returns" />} />
          <Route path="/cookies" element={<Legal type="cookies" />} />

          {/* Protected Routes */}
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

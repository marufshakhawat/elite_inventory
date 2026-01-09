
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Loader2, AlertTriangle } from 'lucide-react';
import { useApp } from '../store/AppContext';

type AuthView = 'login' | 'signup';

const Auth: React.FC = () => {
  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    let success = false;
    if (view === 'login') {
      success = await login(email, password);
      if (success) navigate('/dashboard');
    } else if (view === 'signup') {
      success = await signup(email, password, name);
      if (success) navigate('/dashboard');
    }

    setLoading(false);
  };

  const getTitle = () => {
    if (view === 'login') return 'Welcome Back';
    return 'Create Account';
  };

  const getSubtitle = () => {
    if (view === 'login') return 'Please enter your details to login.';
    return 'Start your premium shopping journey.';
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6">
            <img src="https://lh3.googleusercontent.com/d/1WVWnBlpWY9YGtOO_c_03Nl0RJ_km-_W7" alt="Elite Inventory" className="w-[220px] h-auto mx-auto" />
          </Link>
          <h2 className="text-3xl font-bold text-slate-900">{getTitle()}</h2>
          <p className="text-slate-500 mt-2">{getSubtitle()}</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {view === 'signup' && (
              <div className="space-y-4 animate-fadeIn">
                {/* Critical Security Warning */}
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex gap-3 items-start">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[10px] sm:text-xs text-amber-900 font-bold leading-relaxed uppercase">
                    Security Policy: Please remember your password carefully. Elite Inventory uses decentralized protocols; there is no password reset option after account creation.
                  </p>
                </div>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="text" placeholder="Full Name" required
                    value={name} onChange={e => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                  />
                </div>
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="email" placeholder="Email Address" required
                value={email} onChange={e => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="password" placeholder="Password" required
                value={password} onChange={e => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center group shadow-lg shadow-slate-100 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {view === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-slate-600">
          {view === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            onClick={() => setView(view === 'login' ? 'signup' : 'login')} 
            className="font-bold text-slate-900 hover:underline"
          >
            {view === 'login' ? 'Create one now' : 'Sign in instead'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;

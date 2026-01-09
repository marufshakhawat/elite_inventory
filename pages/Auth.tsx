
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User, ShieldCheck, ArrowRight, Loader2, Info } from 'lucide-react';
import { useApp } from '../store/AppContext';

type AuthView = 'login' | 'signup';

const Auth: React.FC<{ defaultView?: AuthView }> = ({ defaultView = 'login' }) => {
  const [view, setView] = useState<AuthView>(defaultView);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup, isAuth, user } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const alreadyMember = searchParams.get('registered') === 'true';

  useEffect(() => {
    if (isAuth && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuth, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (view === 'login') {
      const success = await login(email, password);
      if (success) navigate('/dashboard');
    } else {
      const success = await signup(email, password, name);
      if (success) {
        // AppContext adds a toast, just stay here to let them read it
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6">
            <img src="https://lh3.googleusercontent.com/d/1WVWnBlpWY9YGtOO_c_03Nl0RJ_km-_W7" alt="Elite Inventory" className="w-[180px] h-auto mx-auto" />
          </Link>
          <h2 className="text-3xl font-bold text-slate-900">{view === 'login' ? 'Welcome Back' : 'Join Us'}</h2>
          <p className="text-slate-500 mt-2">{view === 'login' ? 'Sign in to access your products.' : 'Create an account to get started.'}</p>
        </div>

        {alreadyMember && view === 'login' && (
          <div className="mb-6 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex gap-3 items-center animate-fadeIn">
            <Info className="w-5 h-5 text-indigo-600 shrink-0" />
            <p className="text-xs text-indigo-700 font-semibold">Account already exists. Please sign in below.</p>
          </div>
        )}

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {view === 'signup' && (
              <div className="relative animate-fadeIn">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="text" placeholder="Full Name" required
                  value={name} onChange={e => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all text-sm font-medium"
                />
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="email" placeholder="Email Address" required
                value={email} onChange={e => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all text-sm font-medium"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="password" placeholder="Password" required
                value={password} onChange={e => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all text-sm font-medium"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {view === 'login' ? 'Sign In' : 'Sign Up'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-slate-600 font-medium">
          {view === 'login' ? "New here?" : "Already have an account?"}{' '}
          <button 
            onClick={() => setView(view === 'login' ? 'signup' : 'login')} 
            className="font-bold text-slate-900 hover:underline"
          >
            {view === 'login' ? 'Create Account' : 'Login Instead'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;

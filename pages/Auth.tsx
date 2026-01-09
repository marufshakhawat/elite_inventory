
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertTriangle, RefreshCw, Info, Timer, ShieldCheck } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { LoadingDots } from '../App';

type AuthView = 'login' | 'signup';

interface AuthProps {
  defaultView?: AuthView;
}

const Auth: React.FC<AuthProps> = ({ defaultView = 'login' }) => {
  const [view, setView] = useState<AuthView>(defaultView);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [smtpError, setSmtpError] = useState(false);
  const [searchParams] = useSearchParams();
  const isLinkExpired = searchParams.get('error') === 'expired';

  const { login, signup, resendVerification, isAuth, isLoading, user } = useApp();
  const navigate = useNavigate();

  // Handle automatic redirect if already authenticated and profile is loaded
  useEffect(() => {
    if (isAuth && !isLoading && user) {
      const destination = user.role === 'admin' ? '/admin' : '/dashboard';
      navigate(destination, { replace: true });
    }
  }, [isAuth, isLoading, user, navigate]);

  useEffect(() => {
    if (isLinkExpired) {
      setShowResend(true);
    }
  }, [isLinkExpired]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShowResend(false);
    setSmtpError(false);
    
    if (view === 'login') {
      const success = await login(email, password);
      if (!success) {
        setShowResend(true);
        setLoading(false);
      }
    } else if (view === 'signup') {
      try {
        const success = await signup(email, password, name);
        if (success) {
          setView('login');
          setPassword('');
          setShowResend(true);
        }
      } catch (err: any) {
        const msg = err.message?.toLowerCase() || '';
        if (msg.includes('error sending') || msg.includes('smtp')) {
          setSmtpError(true);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResend = async () => {
    if (!email) {
      alert("Please enter your email address first.");
      return;
    }
    setLoading(true);
    await resendVerification(email);
    setLoading(false);
  };

  const getTitle = () => {
    if (view === 'login') return 'Welcome Back';
    return 'Create Account';
  };

  const getSubtitle = () => {
    if (view === 'login') return 'Log in to your secure workspace.';
    return 'Access the professional marketplace.';
  };

  // If user is authenticated but profile is loading, show dots.
  // Otherwise, show the auth forms if not authenticated.
  if (isLoading && isAuth) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <LoadingDots />
    </div>
  );

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10 animate-fadeIn">
          <Link to="/" className="inline-block mb-6">
            <img src="https://lh3.googleusercontent.com/d/1WVWnBlpWY9YGtOO_c_03Nl0RJ_km-_W7" alt="Elite Inventory" className="w-[220px] h-auto mx-auto" />
          </Link>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{getTitle()}</h2>
          <p className="text-slate-500 mt-2 font-medium">{getSubtitle()}</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl relative overflow-hidden animate-scaleIn">
          {isLinkExpired && (
             <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex gap-3 items-start animate-fadeIn">
                <Timer className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-rose-900 uppercase tracking-widest leading-none mb-1">Link Expired</p>
                  <p className="text-[9px] text-rose-700 leading-normal uppercase font-bold">
                    Verification tokens expire quickly. Please request a new link below.
                  </p>
                </div>
             </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {view === 'signup' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center text-center">
                  <ShieldCheck className="w-5 h-5 text-slate-900 mb-2" />
                  <p className="text-[10px] text-slate-500 font-bold leading-relaxed uppercase tracking-tight max-w-[240px]">
                    Verify email to access assets. No recovery without verification.
                  </p>
                </div>
                
                {smtpError && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex gap-3 items-start">
                    <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] sm:text-xs text-blue-900 font-bold leading-relaxed uppercase">
                        Mail Server Latency
                      </p>
                      <p className="text-[9px] text-blue-700 mt-1 leading-normal uppercase">
                        Please try again in 5 minutes or contact support if the issue persists.
                      </p>
                    </div>
                  </div>
                )}

                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="text" placeholder="Full Name" required
                    value={name} onChange={e => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all font-bold text-sm"
                  />
                </div>
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="email" placeholder="Email Address" required
                value={email} onChange={e => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all font-bold text-sm"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="password" placeholder="Password" required
                value={password} onChange={e => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all font-bold text-sm"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center group shadow-lg shadow-slate-100 disabled:opacity-80"
            >
              {loading ? (
                <LoadingDots color="text-white" />
              ) : (
                <>
                  {view === 'login' ? 'Authenticate' : 'Begin Deployment'}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {showResend && (
            <div className="mt-6 text-center animate-fadeIn">
              <button 
                onClick={handleResend}
                disabled={loading}
                className="inline-flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-[0.2em] disabled:opacity-30"
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                Resend Verification
              </button>
            </div>
          )}
        </div>

        <p className="text-center mt-8 text-slate-500 text-sm font-medium">
          {view === 'login' ? "New operative?" : "Already verified?"}{' '}
          <button 
            onClick={() => {
              setView(view === 'login' ? 'signup' : 'login');
              setShowResend(false);
              setSmtpError(false);
            }} 
            className="font-black text-slate-900 hover:underline tracking-tight"
          >
            {view === 'login' ? 'Create Account' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;

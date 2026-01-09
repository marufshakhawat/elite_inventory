
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User, AlertTriangle, RefreshCw, Info, Timer, ShieldCheck } from 'lucide-react';
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
  const [smtpStatus, setSmtpStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [searchParams] = useSearchParams();
  const isLinkExpired = searchParams.get('error') === 'expired';

  const { login, signup, resendVerification, isAuth, isLoading, user } = useApp();
  const navigate = useNavigate();

  // Redirect if already authenticated
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
    setSmtpStatus('idle');
    
    if (view === 'login') {
      const success = await login(email, password);
      if (!success) {
        // If login fails, offer resend in case it was a verification issue
        setShowResend(true);
        setLoading(false);
      }
    } else if (view === 'signup') {
      setSmtpStatus('sending');
      try {
        const success = await signup(email, password, name);
        if (success) {
          setSmtpStatus('sent');
          setView('login');
          setPassword('');
          setShowResend(true);
        } else {
          setSmtpStatus('idle');
        }
      } catch (err: any) {
        setSmtpStatus('idle');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResend = async () => {
    if (!email) {
      alert("Enter your email first.");
      return;
    }
    setLoading(true);
    setSmtpStatus('sending');
    await resendVerification(email);
    setSmtpStatus('sent');
    setLoading(false);
  };

  const getTitle = () => (view === 'login' ? 'Welcome Back' : 'Create Account');
  const getSubtitle = () => (view === 'login' ? 'Log in to access your secure inventory.' : 'Join the elite marketplace.');

  // Refined visibility logic
  if (isLoading && isAuth) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <LoadingDots />
    </div>
  );

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 animate-fadeIn">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6">
            <img src="https://lh3.googleusercontent.com/d/1WVWnBlpWY9YGtOO_c_03Nl0RJ_km-_W7" alt="Elite Inventory" className="w-[200px] h-auto mx-auto" />
          </Link>
          <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">{getTitle()}</h2>
          <p className="text-slate-500 mt-2 font-medium">{getSubtitle()}</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl relative overflow-hidden animate-scaleIn">
          {isLinkExpired && (
             <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex gap-3 items-start animate-fadeIn">
                <Timer className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <p className="text-[10px] text-rose-700 leading-normal uppercase font-semibold">
                  Verification link expired. Request a new one below.
                </p>
             </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {view === 'signup' && (
              <div className="space-y-4 animate-fadeIn">
                {/* SMALL, CENTERED, SIMPLE SECURITY POLICY */}
                <div className="flex flex-col items-center text-center px-4">
                  <ShieldCheck className="w-5 h-5 text-slate-900 mb-2" />
                  <p className="text-[10px] text-slate-500 font-semibold leading-relaxed uppercase tracking-tight max-w-[240px]">
                    Verify your email to keep your account safe. No verification means no access.
                  </p>
                </div>
                
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="text" placeholder="Full Name" required
                    value={name} onChange={e => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all font-semibold text-sm"
                  />
                </div>
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="email" placeholder="Email Address" required
                value={email} onChange={e => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all font-semibold text-sm"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="password" placeholder="Password" required
                value={password} onChange={e => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all font-semibold text-sm"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-semibold hover:bg-slate-800 transition-all flex items-center justify-center group shadow-lg shadow-slate-100 disabled:opacity-80 min-h-[56px] uppercase tracking-widest text-sm"
            >
              {loading ? <LoadingDots color="text-white" /> : (view === 'login' ? 'Login' : 'Register')}
            </button>
          </form>

          {(showResend || smtpStatus === 'sent') && (
            <div className="mt-6 text-center animate-fadeIn">
              <div className="p-3 bg-slate-50 rounded-xl mb-4">
                <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-widest leading-relaxed">
                  {smtpStatus === 'sent' ? 'Verification Sent! Check your Inbox & Spam folders.' : 'Missing verification?'}
                </p>
              </div>
              <button 
                onClick={handleResend}
                disabled={loading}
                className="inline-flex items-center gap-2 text-[10px] font-semibold text-slate-900 hover:opacity-70 transition-colors uppercase tracking-[0.2em] disabled:opacity-30"
              >
                {loading ? <LoadingDots size="w-3 h-3" /> : <RefreshCw className="w-3 h-3" />}
                Resend Confirmation
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
              setSmtpStatus('idle');
            }} 
            className="font-semibold text-slate-900 hover:underline tracking-tight"
          >
            {view === 'login' ? 'Create Account' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;

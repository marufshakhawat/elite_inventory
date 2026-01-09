
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Loader2, AlertTriangle, RefreshCw, Info } from 'lucide-react';
import { useApp } from '../store/AppContext';

type AuthView = 'login' | 'signup';

const Auth: React.FC = () => {
  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [smtpError, setSmtpError] = useState(false);
  const { login, signup, resendVerification } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShowResend(false);
    setSmtpError(false);
    
    if (view === 'login') {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setShowResend(true);
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
      }
    }

    setLoading(false);
  };

  const handleResend = async () => {
    if (!email) return;
    setLoading(true);
    await resendVerification(email);
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
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex gap-3 items-start">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[10px] sm:text-xs text-amber-900 font-bold leading-relaxed uppercase">
                    Security Policy: You must verify your email. Elite Inventory uses decentralized protocols; no recovery is possible without a verified identity.
                  </p>
                </div>
                
                {smtpError && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex gap-3 items-start">
                    <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] sm:text-xs text-blue-900 font-bold leading-relaxed uppercase">
                        Mail Server Issue Detected
                      </p>
                      <p className="text-[9px] text-blue-700 mt-1 leading-normal uppercase">
                        The "Error sending confirmation mail" is a server-side SMTP issue. Please ensure your Supabase SMTP settings and "Sender Email" are correctly configured.
                      </p>
                    </div>
                  </div>
                )}

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

          {showResend && (
            <div className="mt-6 text-center animate-fadeIn">
              <button 
                onClick={handleResend}
                disabled={loading || !email}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest disabled:opacity-30"
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                Didn't receive email? Resend
              </button>
            </div>
          )}
        </div>

        <p className="text-center mt-8 text-slate-600">
          {view === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            onClick={() => {
              setView(view === 'login' ? 'signup' : 'login');
              setShowResend(false);
              setSmtpError(false);
            }} 
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

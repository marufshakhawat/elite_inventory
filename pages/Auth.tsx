
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Phone, ShieldCheck, Info } from 'lucide-react';
import { useApp } from '../store/AppContext';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [emailOrUser, setEmailOrUser] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(emailOrUser, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6">
            <img src="https://lh3.googleusercontent.com/d/1WVWnBlpWY9YGtOO_c_03Nl0RJ_km-_W7" alt="Elite Inventory" className="w-[220px] h-auto mx-auto" />
          </Link>
          <h2 className="text-3xl font-bold text-slate-900">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-slate-500 mt-2">{isLogin ? 'Please enter your details to login.' : 'Start your premium shopping journey.'}</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="space-y-4 animate-fadeIn">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="text" placeholder="Full Name" required
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="text" placeholder="Phone Number" required
                    value={phone} onChange={e => setPhone(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                  />
                </div>
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" placeholder="Username or Email" required
                value={emailOrUser} onChange={e => setEmailOrUser(e.target.value)}
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

            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:underline">Forgot password?</button>
              </div>
            )}

            <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center group shadow-lg shadow-slate-100">
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {isLogin && (
            <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Demo Credentials</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div className="text-[10px] space-y-1">
                  <p className="font-bold text-slate-700">ADMIN ACCOUNT</p>
                  <p className="text-slate-500">User: <span className="font-mono text-slate-900 select-all">eliteadmin</span></p>
                  <p className="text-slate-500">Pass: <span className="font-mono text-slate-900 select-all">tekalagboteka</span></p>
                </div>
                <div className="h-px bg-slate-200" />
                <div className="text-[10px] space-y-1">
                  <p className="font-bold text-slate-700">USER ACCOUNT</p>
                  <p className="text-slate-500">User: <span className="font-mono text-slate-900 select-all">eliteuser</span></p>
                  <p className="text-slate-500">Pass: <span className="font-mono text-slate-900 select-all">1234userektachor</span></p>
                </div>
              </div>
            </div>
          )}

          <div className="my-8 flex items-center">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="px-4 text-[10px] text-slate-400 font-bold uppercase">or continue with</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-center gap-3 p-4 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all group">
              <img src="https://www.google.com/favicon.ico" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" alt="Google" />
              <span className="text-sm font-bold text-slate-700">Continue with Google</span>
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="font-bold text-slate-900 hover:underline"
          >
            {isLogin ? 'Create one now' : 'Sign in instead'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;

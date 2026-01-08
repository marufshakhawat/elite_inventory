
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, CheckCircle2, Lock, Smartphone, ClipboardCheck, Info, Camera, X, ImageIcon, Phone, Mail } from 'lucide-react';
import { useApp } from '../store/AppContext';

const Checkout: React.FC = () => {
  const { cart, clearCart, addOrder, user } = useApp();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad'>('bKash');
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: '',
    zip: '',
    mfsNumber: '',
    trxId: '',
    screenshot: ''
  });

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 1500 ? 0 : 150;
  const total = subtotal + shipping;

  const mfsAccounts = {
    bKash: '+880 1626-881259',
    Nagad: '+880 1626-881259'
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setScreenshotPreview(base64String);
        setFormData(prev => ({ ...prev, screenshot: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeScreenshot = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScreenshotPreview(null);
    setFormData(prev => ({ ...prev, screenshot: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleComplete = () => {
    if (!formData.mfsNumber || !formData.trxId) {
      alert("Please provide your payment details.");
      return;
    }

    const newOrder = {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      userId: user?.id || 'guest',
      items: [...cart],
      total: total,
      status: 'pending' as const,
      date: new Date().toISOString(),
      shippingAddress: `${formData.address}, ${formData.city}, ${formData.zip}`,
      paymentMethod: paymentMethod,
      mfsSenderNumber: formData.mfsNumber,
      mfsTransactionId: formData.trxId,
      screenshotUrl: formData.screenshot
    };
    
    addOrder(newOrder);
    setStep(3);
    setTimeout(() => {
      clearCart();
    }, 500);
  };

  if (cart.length === 0 && step !== 3) {
    return <div className="p-20 text-center">Your cart is empty. <button onClick={() => navigate('/shop')} className="text-slate-900 font-bold underline">Shop now</button></div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12 w-full max-w-sm mx-auto">
        {[1, 2, 3].map(i => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                step >= i ? 'bg-slate-900 text-white shadow-lg scale-110' : 'bg-slate-200 text-slate-400'
              }`}>
                {step > i ? <CheckCircle2 className="w-6 h-6" /> : i}
              </div>
            </div>
            {i < 3 && <div className={`flex-1 h-1 mx-2 rounded ${step > i ? 'bg-slate-900' : 'bg-slate-200'}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden">
        {step === 1 && (
          <div className="p-6 sm:p-8 space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 tracking-tight"><Truck className="text-slate-900" /> Fulfillment Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" placeholder="Full Name" 
                className="col-span-1 md:col-span-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all text-sm"
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <div className="relative col-span-1 md:col-span-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="email" placeholder="Email (For License Delivery)" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all text-sm"
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="relative col-span-1 md:col-span-1">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" placeholder="Phone Number" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all text-sm"
                  value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <input 
                type="text" placeholder="Street Address" 
                className="col-span-1 md:col-span-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all text-sm"
                value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}
              />
              <input 
                type="text" placeholder="City" 
                className="p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all text-sm"
                value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})}
              />
              <input 
                type="text" placeholder="ZIP Code" 
                className="p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all text-sm"
                value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})}
              />
            </div>
            <button 
              onClick={() => setStep(2)}
              className="w-full bg-slate-900 text-white py-4 sm:py-5 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg text-sm sm:text-base uppercase tracking-widest"
            >
              Continue to Payment
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="p-6 sm:p-8 space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 tracking-tight"><Smartphone className="text-slate-900" /> MFS Payment</h2>
              <div className="text-left sm:text-right">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Payable Amount</p>
                <p className="text-xl font-bold text-slate-900">৳{total.toLocaleString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setPaymentMethod('bKash')}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'bKash' ? 'border-[#D12053] bg-[#D12053]/5' : 'border-slate-100 hover:border-slate-200'}`}
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${paymentMethod === 'bKash' ? 'bg-[#D12053] text-white' : 'bg-slate-100'}`}>
                  <span className="font-black text-[10px]">bKash</span>
                </div>
                <span className={`text-[10px] sm:text-xs font-bold ${paymentMethod === 'bKash' ? 'text-[#D12053]' : 'text-slate-400'}`}>bKash Personal</span>
              </button>
              <button 
                onClick={() => setPaymentMethod('Nagad')}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'Nagad' ? 'border-[#F7941E] bg-[#F7941E]/5' : 'border-slate-100 hover:border-slate-200'}`}
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${paymentMethod === 'Nagad' ? 'bg-[#F7941E] text-white' : 'bg-slate-100'}`}>
                   <span className="font-black text-[10px]">Nagad</span>
                </div>
                <span className={`text-[10px] sm:text-xs font-bold ${paymentMethod === 'Nagad' ? 'text-[#F7941E]' : 'text-slate-400'}`}>Nagad Personal</span>
              </button>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-2 text-[#94a3b8] uppercase text-[10px] font-bold tracking-widest">
                <Info className="w-3 h-3" /> Instructions
              </div>
              <ol className="text-[11px] sm:text-xs space-y-2 list-decimal list-inside text-slate-300 leading-relaxed">
                <li>Go to your {paymentMethod} App or Dial USSD.</li>
                <li>Choose "Send Money" option.</li>
                <li>Enter our number: <span className="text-white font-bold select-all">{mfsAccounts[paymentMethod]}</span></li>
                <li>Enter Amount: <span className="text-white font-bold">৳{total.toLocaleString()}</span></li>
                <li>Complete transaction and keep the Transaction ID.</li>
              </ol>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Your {paymentMethod} Number</label>
                  <input 
                    type="text" placeholder="01XXXXXXXXX" 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all text-sm"
                    value={formData.mfsNumber} onChange={e => setFormData({...formData, mfsNumber: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Transaction ID (TRXID)</label>
                  <input 
                    type="text" placeholder="8K293LAS0X" 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all font-mono uppercase text-sm"
                    value={formData.trxId} onChange={e => setFormData({...formData, trxId: e.target.value.toUpperCase()})}
                  />
                </div>
              </div>

              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
              />
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-3xl hover:border-slate-300 transition-colors cursor-pointer group relative min-h-[100px]"
              >
                {screenshotPreview ? (
                  <div className="flex items-center gap-4 w-full">
                    <img src={screenshotPreview} className="w-16 h-16 object-cover rounded-lg border border-slate-200" alt="Preview" />
                    <div className="flex-1">
                      <p className="text-[10px] font-bold text-slate-900 uppercase">Screenshot Attached</p>
                      <button 
                        onClick={removeScreenshot}
                        className="text-[10px] text-red-500 font-bold uppercase mt-1 hover:underline flex items-center gap-1"
                      >
                        <X className="w-3 h-3" /> Remove File
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Camera className="w-6 h-6 text-slate-300 mx-auto mb-2 group-hover:text-slate-400" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Attach Screenshot (Optional)</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => setStep(1)}
                className="w-full sm:flex-1 bg-slate-100 text-slate-600 py-4 sm:py-5 rounded-2xl font-bold hover:bg-slate-200 transition-all text-xs uppercase tracking-widest"
              >
                Back
              </button>
              <button 
                onClick={handleComplete}
                className="w-full sm:flex-[2] bg-slate-900 text-white py-4 sm:py-5 rounded-2xl font-bold hover:bg-slate-800 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg"
              >
                <ClipboardCheck className="w-5 h-5" /> Place Order
              </button>
            </div>
            <p className="text-center text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">Verified Secure Manual Gateway</p>
          </div>
        )}

        {step === 3 && (
          <div className="p-10 sm:p-16 text-center space-y-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 text-slate-900 rounded-full border border-slate-200 flex items-center justify-center mx-auto mb-8 animate-bounce">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Processing Payment</h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-sm mx-auto leading-relaxed">Your order is currently "Pending Verification". Our team will verify your {paymentMethod} Transaction ID within 30-90 minutes.</p>
            
            <div className="bg-slate-50 p-6 sm:p-8 rounded-[2rem] max-w-md mx-auto border border-slate-100 space-y-4">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Order Reference</p>
                <p className="text-lg sm:text-xl font-mono font-bold text-slate-900">EI-{Math.floor(1000 + Math.random() * 9000)}-INV</p>
              </div>
              <div className="h-px bg-slate-200 w-12 mx-auto" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Transaction ID</p>
                <p className="text-xs sm:text-sm font-mono font-bold text-slate-700">{formData.trxId}</p>
              </div>
            </div>

            <button 
              onClick={() => navigate('/dashboard')}
              className="mt-8 bg-slate-900 text-white px-10 sm:px-12 py-4 sm:py-5 rounded-full font-bold hover:bg-slate-800 transition-all text-xs uppercase tracking-widest shadow-xl"
            >
              Track Order Status
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;


import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Layers, Clock, Users } from 'lucide-react';
import { useApp } from '../store/AppContext';

const Cart: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart } = useApp();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 1500 ? 0 : 150;
  const total = subtotal + shipping;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f1f5f9'%3E%3Canimate attributeName='stop-color' values='%23f1f5f9;%23f8fafc;%23f1f5f9' dur='2s' repeatCount='indefinite' /%3E%3C/stop%3E%3Cstop offset='100%25' style='stop-color:%23e2e8f0'%3E%3Canimate attributeName='stop-color' values='%23e2e8f0;%23f1f5f9;%23e2e8f0' dur='2s' repeatCount='indefinite' /%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23g)' /%3E%3C/svg%3E";
  };

  if (cart.length === 0) return (
    <div className="max-w-7xl mx-auto px-4 py-20 sm:py-32 text-center">
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center mx-auto mb-6">
        <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Your cart is empty</h2>
      <p className="text-slate-500 mt-2 mb-8 max-w-sm mx-auto text-sm sm:text-base">Looks like you haven't added anything to your cart yet. Go ahead and explore our collection.</p>
      <Link to="/shop" className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all inline-block text-sm">
        Start Shopping
      </Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 sm:mb-10">Your Shopping Bag</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {cart.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="bg-white p-4 sm:p-6 rounded-[2rem] sm:rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
              <div className="w-32 h-32 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 shimmer">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  onError={handleImageError}
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex-1 w-full min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate pr-4">{item.name}</h3>
                  <button 
                    onClick={() => removeFromCart(idx.toString())}
                    className="p-2 text-slate-400 hover:text-slate-900 transition-colors shrink-0"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Variant Display */}
                <div className="flex flex-wrap gap-2 mb-4 justify-center sm:justify-start">
                  {item.selectedAccountType && (
                    <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-600 uppercase border border-slate-100">
                      <Layers className="w-3 h-3" /> {item.selectedAccountType}
                    </span>
                  )}
                  {item.selectedDuration && (
                    <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-600 uppercase border border-slate-100">
                      <Clock className="w-3 h-3" /> {item.selectedDuration}
                    </span>
                  )}
                  {item.selectedSlots && (
                    <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-600 uppercase border border-slate-100">
                      <Users className="w-3 h-3" /> {item.selectedSlots}
                    </span>
                  )}
                </div>

                <p className="text-slate-900 font-bold mb-4">৳{item.price.toLocaleString()}</p>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center border border-slate-200 rounded-full px-2 py-1 bg-slate-50">
                    <button 
                      onClick={() => updateCartQuantity(idx.toString(), item.quantity - 1)}
                      className="p-1 text-slate-500 hover:text-slate-900"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-bold text-sm text-slate-900">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartQuantity(idx.toString(), item.quantity + 1)}
                      className="p-1 text-slate-500 hover:text-slate-900"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm font-bold text-slate-900 sm:ml-auto">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-[2rem] shadow-xl sticky top-24">
            <h3 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">Order Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-400 text-sm">
                <span>Subtotal</span>
                <span className="text-white font-medium">৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-sm">
                <span>Shipping</span>
                <span className="text-white font-medium">{shipping === 0 ? 'FREE' : `৳${shipping.toLocaleString()}`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-[10px] text-slate-400 font-medium">Add ৳{(1500 - subtotal).toLocaleString()} more for free shipping!</p>
              )}
              <div className="h-px bg-slate-800 my-4" />
              <div className="flex justify-between text-base sm:text-lg font-bold">
                <span>Total</span>
                <span className="text-white">৳{total.toLocaleString()}</span>
              </div>
            </div>
            <Link to="/checkout" className="w-full bg-white text-slate-900 py-4 rounded-full font-bold flex items-center justify-center hover:bg-slate-100 transition-all text-sm uppercase tracking-widest">
              Checkout <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <p className="text-center text-[10px] text-slate-500 mt-6 uppercase tracking-widest font-bold">Secure Manual MFS Checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

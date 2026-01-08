import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Zap, Shield, RotateCcw, Minus, Plus, ShoppingBag, Heart, Mail, Info } from 'lucide-react';
import { useApp } from '../store/AppContext';
import ProductCard from '../components/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, wishlist, toggleWishlist, isAuth } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = products.find(p => p.id === id);
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== id).slice(0, 4);

  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h2 className="text-2xl font-bold">Product not found</h2>
      <button onClick={() => navigate('/shop')} className="mt-4 text-slate-400 font-bold hover:text-slate-900 transition-colors">Back to shop</button>
    </div>
  );

  const isWishlisted = wishlist.includes(product.id);

  const handleBuyNow = () => {
    if (!isAuth) {
      navigate('/login');
      return;
    }
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f1f5f9'%3E%3Canimate attributeName='stop-color' values='%23f1f5f9;%23f8fafc;%23f1f5f9' dur='2s' repeatCount='indefinite' /%3E%3C/stop%3E%3Cstop offset='100%25' style='stop-color:%23e2e8f0'%3E%3Canimate attributeName='stop-color' values='%23e2e8f0;%23f1f5f9;%23e2e8f0' dur='2s' repeatCount='indefinite' /%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23g)' /%3E%3C/svg%3E";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Product Display */}
        <div className="space-y-4">
          <div className="aspect-square bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm relative flex items-center justify-center p-8 shimmer">
            <img 
              src={product.image} 
              alt={product.name} 
              onError={handleImageError}
              className="w-full h-full object-contain" 
            />
            <div className="absolute top-4 right-4 bg-slate-900 text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-yellow-400" /> Instant
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-8 flex flex-col justify-center">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest bg-slate-100 text-slate-500">{product.category}</span>
              <div className="flex items-center text-slate-400">
                <Star className="w-3 h-3 fill-current text-slate-900" />
                <span className="ml-1 text-slate-900 font-bold text-xs">{product.rating}</span>
                <span className="ml-1 text-slate-400 text-[10px] font-medium uppercase tracking-tighter">Verified License</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{product.name}</h1>
            <p className="text-xl font-bold text-slate-900">৳{product.price.toLocaleString()}</p>
            <p className="text-slate-500 leading-relaxed text-sm max-w-lg">{product.description}</p>
          </div>

          <div className="space-y-6 pt-6 border-t border-slate-100">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start gap-3">
              <Mail className="w-4 h-4 text-slate-900 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[11px] font-bold text-slate-900 uppercase tracking-wide">Digital Delivery</p>
                <p className="text-[10px] text-slate-500 mt-0.5">The credentials or license key will be sent to your email within 5-10 minutes post-purchase.</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center border border-slate-200 rounded-full px-2 py-1">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-1.5 text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-slate-900 text-sm">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className="p-1.5 text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Availability: <span className="text-slate-900 font-bold">{product.stock} keys</span></p>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={handleBuyNow}
                className="flex-1 bg-slate-900 text-white py-4 rounded-full font-bold flex items-center justify-center hover:bg-slate-800 transition-all text-sm uppercase tracking-widest"
              >
                <ShoppingBag className="mr-2 w-4 h-4" /> Buy License
              </button>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className={`p-4 rounded-full border transition-all ${isWishlisted ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-200 text-slate-400 hover:text-slate-900'}`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2">
            {[
              { icon: Zap, label: 'Instant', sub: 'Automated' },
              { icon: Shield, label: 'Secure', sub: 'Official' },
              { icon: RotateCcw, label: 'Support', sub: '24/7' }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <item.icon className="w-4 h-4 text-slate-900 mb-1" />
                <p className="text-[9px] font-bold text-slate-900 uppercase tracking-wider">{item.label}</p>
                <p className="text-[8px] text-slate-400 uppercase">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-20">
        <div className="flex border-b border-slate-200 mb-8">
          {['description', 'activation', 'reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-bold text-[11px] uppercase tracking-[0.2em] transition-all relative ${
                activeTab === tab ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab === 'activation' ? 'How to Activate' : tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900 rounded-full" />}
            </button>
          ))}
        </div>
        
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm leading-relaxed text-slate-500 text-sm font-light">
          {activeTab === 'description' && (
            <div className="space-y-4 max-w-2xl">
              <p>The <span className="font-bold text-slate-900">{product.name}</span> offers premium utility within its domain. Our sourcing protocols ensure that all assets are genuine, official, and provided through legitimate channels.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3"><Info className="w-3 h-3 text-slate-900" /> Regional availability: Global access</li>
                <li className="flex items-center gap-3"><Info className="w-3 h-3 text-slate-900" /> Support: Included for duration of license</li>
                <li className="flex items-center gap-3"><Info className="w-3 h-3 text-slate-900" /> Delivery: Encrypted credentials transfer</li>
              </ul>
            </div>
          )}
          {activeTab === 'activation' && (
            <div className="space-y-4 max-w-2xl">
              <p className="font-bold text-slate-900 uppercase text-xs tracking-wider">Redemption Protocol:</p>
              <ol className="space-y-4">
                <li className="flex gap-4"><span className="w-6 h-6 flex-shrink-0 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px] font-bold">1</span> Monitor your registered email for the Lumina Luxe delivery packet.</li>
                <li className="flex gap-4"><span className="w-6 h-6 flex-shrink-0 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px] font-bold">2</span> Extract the provided credentials or unique license key.</li>
                <li className="flex gap-4"><span className="w-6 h-6 flex-shrink-0 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px] font-bold">3</span> Access the official vendor gateway and input the data.</li>
                <li className="flex gap-4"><span className="w-6 h-6 flex-shrink-0 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px] font-bold">4</span> Infrastructure activation is immediate upon verification.</li>
              </ol>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="text-center py-10 max-w-md mx-auto">
              <Shield className="w-8 h-8 text-slate-200 mx-auto mb-4" />
              <p className="font-bold text-slate-900 uppercase text-xs tracking-widest">Network Verified</p>
              <p className="text-slate-400 mt-2 text-xs">Verified buyers rate this asset {product.rating}/5.0</p>
              <button className="mt-6 border border-slate-200 text-slate-900 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all">Submit Feedback</button>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold tracking-tight">Similar Assets</h2>
            <Link to="/shop" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">See all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
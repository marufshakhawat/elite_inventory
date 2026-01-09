
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Zap, AlertTriangle } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../store/AppContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist, isAuth } = useApp();
  const navigate = useNavigate();
  const isWishlisted = wishlist.includes(product.id);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f1f5f9'%3E%3Canimate attributeName='stop-color' values='%23f1f5f9;%23f8fafc;%23f1f5f9' dur='2s' repeatCount='indefinite' /%3E%3C/stop%3E%3Cstop offset='100%25' style='stop-color:%23e2e8f0'%3E%3Canimate attributeName='stop-color' values='%23e2e8f0;%23f1f5f9;%23e2e8f0' dur='2s' repeatCount='indefinite' /%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23g)' /%3E%3C/svg%3E";
  };

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuth) {
      navigate('/login');
      return;
    }
    addToCart(product, 1);
    navigate('/checkout');
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 transition-all hover:shadow-2xl hover:shadow-slate-500/10 product-card flex flex-col h-full">
      <Link to={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden bg-slate-100 shimmer flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Visual Stock Warning */}
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute top-0 left-0 w-full bg-rose-600 text-white text-[9px] font-semibold py-1.5 flex items-center justify-center gap-1 uppercase tracking-widest z-10 animate-pulse">
            <AlertTriangle className="w-3 h-3" /> Only {product.stock} keys remaining
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
             <span className="bg-white text-slate-900 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest">Out of Stock</span>
          </div>
        )}
        
        {/* Quick Buy Overlay */}
        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <button 
            onClick={handleQuickBuy}
            disabled={product.stock === 0}
            className="bg-white text-slate-900 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-2xl hover:bg-slate-50 active:scale-95 disabled:opacity-0"
          >
            <Zap className="w-4 h-4 fill-slate-900" />
            Quick Buy
          </button>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{product.category}</p>
          <div className="flex items-center bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">
            <Star className="w-3 h-3 text-slate-900 fill-slate-900 mr-1" />
            <span className="text-[10px] font-semibold text-slate-900">{product.rating}</span>
          </div>
        </div>
        
        <Link to={`/product/${product.slug}`} className="flex-1">
          <h3 className="text-slate-900 font-semibold text-base mb-4 group-hover:text-slate-600 transition-colors line-clamp-2 min-h-[3rem] leading-tight">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
          <span className="text-xl font-semibold text-slate-900">৳{product.price.toLocaleString()}</span>
          <div className="flex space-x-2">
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-2.5 rounded-full border transition-all ${isWishlisted ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-400 hover:text-slate-900'}`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
            </button>
            <button
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
              className="p-2.5 bg-slate-900 text-white rounded-full hover:bg-slate-800 hover:scale-110 transition-all shadow-lg shadow-slate-200 disabled:opacity-30"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

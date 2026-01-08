
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, LayoutGrid, ShoppingBag } from 'lucide-react';
import { useApp } from '../store/AppContext';
import ProductCard from '../components/ProductCard';

const Wishlist: React.FC = () => {
  const { products, wishlist } = useApp();
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Saved Assets</h1>
          <p className="text-slate-500 mt-2">Monitor restocks for your favorite premium licenses.</p>
        </div>
        <Link to="/shop" className="text-xs font-bold text-slate-900 uppercase tracking-widest hover:opacity-70 transition-opacity">
          Back to Shop
        </Link>
      </div>

      {wishlistedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
          <div className="w-20 h-20 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-slate-300" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Your wishlist is empty</h2>
          <p className="text-slate-500 mt-2 mb-8 max-w-sm mx-auto">Explore our inventory and save high-demand licenses for later purchase.</p>
          <Link to="/shop" className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold hover:bg-slate-800 transition-all inline-block uppercase text-xs tracking-widest shadow-xl">
            Explore Inventory
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;


import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { Filter, LayoutGrid, Search, X, CircleDollarSign } from 'lucide-react';
import { useApp } from '../store/AppContext';
import ProductCard from '../components/ProductCard';
import { slugify } from '../utils/mockData.ts';

const Shop: React.FC = () => {
  const { products } = useApp();
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const categories = useMemo(() => ['All', ...new Set(products.map(p => p.category))], [products]);
  
  // Find current category from slug
  const currentCategory = useMemo(() => {
    if (!categorySlug) return 'All';
    return categories.find(c => slugify(c) === categorySlug) || 'All';
  }, [categorySlug, categories]);

  const [sort, setSort] = useState('newest');
  const [maxPrice, setMaxPrice] = useState(10000);

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchesCategory = currentCategory === 'All' || p.category === currentCategory;
        const matchesSearch = p.name.toLowerCase().includes(query.toLowerCase()) || 
                             p.description.toLowerCase().includes(query.toLowerCase());
        const matchesPrice = p.price <= maxPrice;
        return matchesCategory && matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        if (sort === 'lowToHigh') return a.price - b.price;
        if (sort === 'highToLow') return b.price - a.price;
        if (sort === 'topRated') return b.rating - a.rating;
        return 0; // default newest
      });
  }, [products, currentCategory, query, sort, maxPrice]);

  const handleCategoryChange = (cat: string) => {
    if (cat === 'All') {
      navigate('/shop');
    } else {
      navigate(`/category/${slugify(cat)}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">
          {currentCategory === 'All' ? 'ELITE MARKETPLACE' : currentCategory.toUpperCase()}
        </h1>
        <p className="text-slate-500 font-medium">Curated premium digital resources for power users.</p>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-72 space-y-8 sticky top-24 flex-shrink-0">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="flex items-center gap-2 mb-8">
              <Filter className="w-5 h-5 text-slate-900" />
              <h3 className="font-bold text-lg uppercase tracking-widest">Filters</h3>
            </div>

            <div className="space-y-10">
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Categories</h4>
                <div className="space-y-1">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`block w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        currentCategory === cat ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-4">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                     <CircleDollarSign className="w-3 h-3" /> Budget Control
                   </div>
                   <span className="text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded">৳{maxPrice.toLocaleString()}</span>
                </div>
                <div className="relative h-6 flex items-center group">
                  <input 
                    type="range" 
                    min="0" 
                    max="10000" 
                    step="100"
                    value={maxPrice}
                    onChange={e => setMaxPrice(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900 group-hover:bg-slate-200 transition-all"
                  />
                </div>
                <div className="flex justify-between mt-3 text-[10px] font-bold text-slate-300 uppercase tracking-tighter">
                  <span>৳0</span>
                  <span>৳10,000+</span>
                </div>
              </div>

              <button 
                onClick={() => { handleCategoryChange('All'); setMaxPrice(10000); setSort('newest'); }}
                className="w-full py-4 border border-slate-100 text-slate-400 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 hover:text-slate-900 transition-all"
              >
                Reset Selection
              </button>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm gap-6">
            <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              Inventory Snapshot: <span className="text-slate-900">{filteredProducts.length} Results</span>
              {query && <span className="ml-2 bg-slate-100 px-2 py-1 rounded text-slate-900 italic">"{query}"</span>}
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <select 
                value={sort} 
                onChange={e => setSort(e.target.value)}
                className="flex-1 sm:flex-none bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold px-5 py-3 outline-none focus:ring-2 focus:ring-slate-900 appearance-none pr-10 cursor-pointer uppercase tracking-widest"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
                <option value="topRated">Top Rated</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
              <div className="mx-auto w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <X className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Zero Matches</h3>
              <p className="text-slate-400 mt-2 font-medium">Your filter parameters returned no active inventory.</p>
              <button 
                onClick={() => { handleCategoryChange('All'); setMaxPrice(10000); }}
                className="mt-8 bg-slate-900 text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 shadow-xl transition-all"
              >
                Clear Restrictions
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;

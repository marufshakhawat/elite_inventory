
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, LayoutGrid, Search } from 'lucide-react';
import { useApp } from '../store/AppContext';
import ProductCard from '../components/ProductCard';

const Shop: React.FC = () => {
  const { products } = useApp();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'All';

  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  // Sync state with URL changes (for navigation drawer clicks)
  useEffect(() => {
    setCategory(searchParams.get('category') || 'All');
  }, [searchParams]);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchesCategory = category === 'All' || p.category === category;
        const matchesSearch = p.name.toLowerCase().includes(query.toLowerCase()) || 
                             p.description.toLowerCase().includes(query.toLowerCase());
        const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
        return matchesCategory && matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        if (sort === 'lowToHigh') return a.price - b.price;
        if (sort === 'highToLow') return b.price - a.price;
        if (sort === 'topRated') return b.rating - a.rating;
        return 0; // default newest
      });
  }, [products, category, query, sort, priceRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {category === 'All' ? 'Discover All Tools' : category}
        </h1>
        <p className="text-slate-500">Premium digital resources and software for professionals.</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-64 space-y-8 sticky top-24">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-slate-900" />
              <h3 className="font-bold text-lg">Filters</h3>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-sm mb-4">Categories</h4>
                <div className="space-y-1">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        category === cat ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-4">Price Range</h4>
                <input 
                  type="range" 
                  min="0" 
                  max="10000" 
                  step="100"
                  value={priceRange[1]}
                  onChange={e => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                />
                <div className="flex justify-between mt-2 text-xs font-bold text-slate-500">
                  <span>৳0</span>
                  <span>Up to ৳{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm gap-4">
            <div className="text-slate-500 text-sm">
              Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> products
              {query && <span> for "<span className="text-slate-900 font-medium">{query}</span>"</span>}
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              {/* Responsive search input in case main nav is hidden on tiny screens */}
              <div className="relative flex-1 sm:hidden">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search our inventory..." 
                  className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-lg text-sm outline-none focus:ring-1 focus:ring-slate-900"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                       const val = (e.target as HTMLInputElement).value;
                       window.location.hash = `#/shop?q=${val}`;
                    }
                  }}
                />
              </div>

              <select 
                value={sort} 
                onChange={e => setSort(e.target.value)}
                className="bg-slate-100 border-none rounded-lg text-sm px-4 py-2 outline-none focus:ring-2 focus:ring-slate-900 appearance-none pr-8 cursor-pointer"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
                <option value="topRated">Top Rated</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
              <div className="mx-auto w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <LayoutGrid className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">No products found</h3>
              <p className="text-slate-500 mt-2">Try adjusting your filters or search terms.</p>
              <button 
                onClick={() => { setCategory('All'); setPriceRange([0, 10000]); setSort('newest'); }}
                className="mt-6 text-slate-900 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;

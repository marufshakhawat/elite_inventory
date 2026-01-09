
import React, { useState, useMemo } from 'react';
import { 
  Plus, Edit2, Trash2, Package, Search, LayoutDashboard, Database, 
  ShoppingCart, Users, X, Smartphone, Info, ImageIcon, Eye, 
  Settings as SettingsIcon, AlertCircle, TrendingUp, CheckCircle2, 
  Clock, Filter, ShieldAlert, ArrowUpRight, Copy, ExternalLink,
  Key as KeyIcon, Link as LinkIcon, Layers
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { Product, Order, User } from '../types';
import { slugify } from '../utils/mockData.ts';

type AdminTab = 'dashboard' | 'products' | 'orders' | 'users' | 'settings';

const Admin: React.FC = () => {
  const { 
    products, deleteProduct, addProduct, updateProduct, 
    orders, updateOrderStatus, deleteOrder, settings, updateSettings, fulfillOrder
  } = useApp();
  
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFulfillmentModalOpen, setIsFulfillmentModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fulfillingOrder, setFulfillingOrder] = useState<Order | null>(null);
  const [fulfillmentInput, setFulfillmentInput] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');

  // Analytics
  const analytics = useMemo(() => {
    const delivered = orders.filter(o => o.status === 'delivered');
    const revenue = delivered.reduce((acc, o) => acc + o.total, 0);
    const pendingCount = orders.filter(o => o.status === 'pending').length;
    
    return {
      revenue,
      totalOrders: orders.length,
      pendingCount,
      outOfStock: products.filter(p => p.stock === 0).length,
      lowStock: products.filter(p => p.stock > 0 && p.stock < 5).length
    };
  }, [orders, products]);

  const stats = [
    { label: 'Revenue', value: '৳' + analytics.revenue.toLocaleString(), icon: Database, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Orders', value: analytics.totalOrders, icon: ShoppingCart, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Total Products', value: products.length, icon: Package, color: 'text-slate-700', bg: 'bg-slate-100' },
    { label: 'Pending Orders', value: analytics.pendingCount, icon: ShieldAlert, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f1f5f9'%3E%3Canimate attributeName='stop-color' values='%23f1f5f9;%23f8fafc;%23f1f5f9' dur='2s' repeatCount='indefinite' /%3E%3C/stop%3E%3Cstop offset='100%25' style='stop-color:%23e2e8f0'%3E%3Canimate attributeName='stop-color' values='%23e2e8f0;%23f1f5f9;%23e2e8f0' dur='2s' repeatCount='indefinite' /%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23g)' /%3E%3C/svg%3E";
  };

  const handleSaveProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const product: Product = {
      id: editingProduct?.id || `ELT-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      slug: editingProduct?.slug || slugify(name),
      name: name,
      price: parseFloat(formData.get('price') as string),
      category: formData.get('category') as string,
      image: formData.get('image') as string || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600',
      stock: parseInt(formData.get('stock') as string),
      rating: editingProduct?.rating || 4.5,
      description: formData.get('description') as string,
      featured: formData.get('featured') === 'on',
      is_shared_personal_enabled: formData.get('is_shared_personal_enabled') === 'on',
      is_duration_enabled: formData.get('is_duration_enabled') === 'on',
      is_slots_enabled: formData.get('is_slots_enabled') === 'on'
    };

    if (editingProduct) updateProduct(product);
    else addProduct(product);
    
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleStatusChange = (order: Order, newStatus: string) => {
    if (newStatus === 'delivered') {
      setFulfillingOrder(order);
      setFulfillmentInput(order.fulfillmentData || '');
      setIsFulfillmentModalOpen(true);
    } else {
      updateOrderStatus(order.id, newStatus as any);
    }
  };

  const submitFulfillment = () => {
    if (fulfillingOrder && fulfillmentInput.trim()) {
      fulfillOrder(fulfillingOrder.id, fulfillmentInput.trim());
      setIsFulfillmentModalOpen(false);
      setFulfillingOrder(null);
      setFulfillmentInput('');
    }
  };

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(orderSearch.toLowerCase()) || 
    (o.mfsTransactionId && o.mfsTransactionId.toLowerCase().includes(orderSearch.toLowerCase()))
  );

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-64 flex flex-col gap-4">
          <div className="bg-slate-900 rounded-[2rem] p-6 text-white">
            <h2 className="text-xl font-semibold tracking-tight">Admin Panel</h2>
          </div>

          <nav className="bg-white p-2 rounded-[2rem] border border-slate-100 shadow-sm space-y-1 overflow-x-auto no-scrollbar flex lg:flex-col items-center lg:items-stretch">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'products', label: 'Products', icon: Package },
              { id: 'orders', label: 'Orders', icon: ShoppingCart },
              { id: 'users', label: 'Customers', icon: Users },
              { id: 'settings', label: 'Settings', icon: SettingsIcon },
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex items-center gap-3 w-auto lg:w-full p-4 rounded-2xl text-left transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <tab.icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-semibold text-sm">{tab.label}</span>
                {tab.id === 'orders' && analytics.pendingCount > 0 && (
                  <span className="ml-auto hidden lg:inline-block bg-rose-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    {analytics.pendingCount}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Interface */}
        <main className="flex-1 space-y-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{stat.label}</p>
                      <p className="text-xl font-semibold text-slate-900">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-semibold text-slate-900">Recent Orders</h3>
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="divide-y divide-slate-100 overflow-x-auto">
                    <div className="min-w-[400px]">
                      {orders.slice(0, 5).map(o => (
                        <div key={o.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${o.status === 'delivered' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                              {o.status === 'delivered' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-900">Order {o.id}</p>
                              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">{o.status}</p>
                            </div>
                          </div>
                          <p className="font-semibold text-slate-900">৳{o.total.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 space-y-6">
                  <h3 className="font-semibold text-slate-900">Stock Status</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-rose-50 rounded-2xl border border-rose-100 text-rose-700">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="w-5 h-5" />
                        <span className="text-sm font-semibold">Out of Stock Products</span>
                      </div>
                      <span className="text-xl font-semibold">{analytics.outOfStock}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-amber-50 rounded-2xl border border-amber-100 text-amber-700">
                      <div className="flex items-center gap-3">
                        <Info className="w-5 h-5" />
                        <span className="text-sm font-semibold">Low Stock Warning</span>
                      </div>
                      <span className="text-xl font-semibold">{analytics.lowStock}</span>
                    </div>
                  </div>
                  <button onClick={() => setActiveTab('products')} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-semibold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all">Manage Products</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-fadeIn">
              <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="relative flex-1 max-w-sm w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={productSearch}
                    onChange={e => setProductSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-slate-900 outline-none transition-all" 
                  />
                </div>
                <button 
                  onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
                  className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-2xl font-semibold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg"
                >
                  <Plus className="w-4 h-4" /> Add Product
                </button>
              </div>

              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left min-w-[900px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 text-[10px] font-semibold uppercase tracking-widest border-b border-slate-100">
                      <th className="px-8 py-5">Product Details</th>
                      <th className="px-8 py-5">Category</th>
                      <th className="px-8 py-5">Price</th>
                      <th className="px-8 py-5">Availability</th>
                      <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-100 flex-shrink-0">
                              <img src={p.image} onError={handleImageError} className="w-full h-full object-cover" />
                            </div>
                            <div>
                               <p className="font-semibold text-slate-900 text-sm">{p.name}</p>
                               <p className="text-[10px] font-mono text-slate-400 uppercase tracking-tight">{p.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">{p.category}</span>
                        </td>
                        <td className="px-8 py-6 text-sm font-semibold text-slate-900">৳{p.price.toLocaleString()}</td>
                        <td className="px-8 py-6">
                          <span className={`text-[10px] font-semibold px-3 py-1 rounded-full uppercase ${p.stock < 10 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                            {p.stock} units
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => { setEditingProduct(p); setIsModalOpen(true); }}
                              className="p-3 bg-white text-slate-400 hover:text-indigo-600 rounded-xl border border-slate-100 hover:border-indigo-100 transition-all"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => deleteProduct(p.id)}
                              className="p-3 bg-white text-slate-400 hover:text-rose-600 rounded-xl border border-slate-100 hover:border-rose-100 transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-fadeIn">
               <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <h2 className="text-xl font-semibold text-slate-900">Manage Orders</h2>
                <div className="relative flex-1 max-md w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="Search by Order ID or Transaction ID..." 
                    value={orderSearch}
                    onChange={e => setOrderSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-slate-900 outline-none" 
                  />
                </div>
              </div>
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left min-w-[1000px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 text-[10px] font-semibold uppercase tracking-widest border-b border-slate-100">
                      <th className="px-8 py-5">Order ID</th>
                      <th className="px-8 py-5">Customer Phone</th>
                      <th className="px-8 py-5">Payment Proof</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredOrders.map(o => (
                      <tr key={o.id} className="group hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="space-y-1">
                            <p className="font-mono text-[10px] font-semibold text-slate-900 select-all uppercase">{o.id}</p>
                            <p className="text-xs font-semibold text-slate-500 uppercase">{o.paymentMethod}</p>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-2">
                             <Smartphone className="w-3.5 h-3.5 text-slate-300" />
                             <span className="text-xs font-semibold text-slate-700">{o.mfsSenderNumber || 'Anonymous'}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded select-all uppercase border border-slate-200">
                              {o.mfsTransactionId || 'MISSING'}
                            </span>
                            {o.screenshotUrl && (
                              <button 
                                onClick={() => setPreviewImage(o.screenshotUrl || null)}
                                className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-md flex items-center gap-2"
                              >
                                <Eye className="w-4 h-4" />
                                <span className="text-[10px] font-semibold uppercase tracking-widest">View Photo</span>
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                           <span className={`text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-widest ${
                            o.status === 'delivered' ? 'bg-emerald-50 text-emerald-600' : 
                            o.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <select 
                              value={o.status}
                              onChange={(e) => handleStatusChange(o, e.target.value)}
                              className="text-[10px] font-semibold uppercase bg-white border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-slate-900 transition-all cursor-pointer shadow-sm"
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Verifying</option>
                              <option value="shipped">Shipping</option>
                              <option value="delivered">Delivered</option>
                            </select>
                            <button onClick={() => deleteOrder(o.id)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-fadeIn">
              <div className="p-8 border-b border-slate-100">
                <h2 className="text-xl font-semibold text-slate-900">Customer List</h2>
              </div>
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left min-w-[700px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 text-[10px] font-semibold uppercase tracking-widest border-b border-slate-100">
                      <th className="px-8 py-5">Customer Name</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5">Contact</th>
                      <th className="px-8 py-5 text-right">Manage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-slate-900 flex-shrink-0 flex items-center justify-center text-white font-semibold">EU</div>
                          <div>
                            <p className="font-semibold text-slate-900 text-sm">eliteuser</p>
                            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Joined 2024</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest">Active Member</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-1">
                          <p className="text-xs font-semibold text-slate-900">user@eliteinventory.store</p>
                          <p className="text-[10px] text-slate-400 font-semibold">+880 1700-000000</p>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">View Profile</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 sm:p-10 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-lg">Payment Settings</h3>
                      <p className="text-xs text-slate-400">Update bKash and Nagad numbers.</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest ml-1">bKash Number</label>
                      <input 
                        type="text" 
                        value={settings.bkashNumber}
                        onChange={e => updateSettings({ bkashNumber: e.target.value })}
                        className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all font-mono" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest ml-1">Nagad Number</label>
                      <input 
                        type="text" 
                        value={settings.nagadNumber}
                        onChange={e => updateSettings({ nagadNumber: e.target.value })}
                        className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all font-mono" 
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 sm:p-10 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-lg">Site Announcements</h3>
                      <p className="text-xs text-slate-400">Manage site-wide messages.</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest ml-1">Banner Message</label>
                      <textarea 
                        rows={3}
                        value={settings.announcement}
                        onChange={e => updateSettings({ announcement: e.target.value })}
                        className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all text-sm leading-relaxed"
                      ></textarea>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                       <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest">Maintenance Mode</span>
                       <button 
                        onClick={() => updateSettings({ maintenanceMode: !settings.maintenanceMode })}
                        className={`w-12 h-6 rounded-full transition-all relative ${settings.maintenanceMode ? 'bg-rose-500' : 'bg-slate-300'}`}
                       >
                         <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.maintenanceMode ? 'right-1' : 'left-1'}`} />
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Screenshot Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-[110] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn" onClick={() => setPreviewImage(null)}>
          <div className="relative w-full max-w-2xl bg-white p-2 rounded-2xl shadow-2xl" onClick={e => e.stopPropagation()}>
            <button onClick={() => setPreviewImage(null)} className="absolute -top-4 -right-4 bg-slate-900 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
              <X className="w-5 h-5" />
            </button>
            <img src={previewImage} onError={handleImageError} className="w-full h-auto rounded-lg max-h-[80vh] object-contain" alt="Payment Proof" />
            <div className="p-4 sm:p-6 bg-white border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Payment Evidence</p>
                <p className="text-sm font-semibold text-slate-900">Transaction Screenshot</p>
              </div>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-semibold uppercase tracking-widest hover:bg-slate-800">
                <ExternalLink className="w-4 h-4" /> Open Full-Res
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Delivery Modal */}
      {isFulfillmentModalOpen && fulfillingOrder && (
        <div className="fixed inset-0 z-[120] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl animate-scaleIn">
            <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
               <div className="flex items-center gap-3">
                 <div className="p-3 bg-emerald-500 text-white rounded-2xl">
                   <KeyIcon className="w-5 h-5" />
                 </div>
                 <div>
                   <h3 className="text-lg sm:text-xl font-semibold text-slate-900">Order Delivery</h3>
                   <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-widest">Order ID: {fulfillingOrder.id}</p>
                 </div>
               </div>
               <button onClick={() => setIsFulfillmentModalOpen(false)} className="text-slate-400 hover:text-slate-900 transition-colors p-2">
                 <X className="w-6 h-6" />
               </button>
            </div>
            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-start gap-3">
                  <Info className="w-4 h-4 text-indigo-600 mt-0.5" />
                  <p className="text-[11px] text-indigo-700 leading-relaxed font-medium">Enter the product license or delivery instructions. The customer will receive this immediately in their dashboard.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest ml-1">Delivery Details (Key or Link)</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-4 text-slate-400 w-4 h-4" />
                    <textarea 
                      placeholder="Paste license key, credentials, or secure download link..."
                      rows={4}
                      value={fulfillmentInput}
                      onChange={e => setFulfillmentInput(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all font-mono text-xs sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setIsFulfillmentModalOpen(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-semibold uppercase text-[10px] tracking-widest hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={submitFulfillment}
                  disabled={!fulfillmentInput.trim()}
                  className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-semibold uppercase text-[10px] tracking-widest hover:bg-slate-800 transition-all shadow-xl disabled:opacity-50"
                >
                  Complete Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Management Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-[2rem] sm:rounded-[3rem] w-full max-w-2xl overflow-y-auto max-h-[90vh] shadow-2xl animate-scaleIn no-scrollbar">
            <div className="sticky top-0 z-10 p-6 sm:p-8 border-b border-slate-100 flex justify-between items-center bg-white">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-slate-900 text-white rounded-2xl">
                  {editingProduct ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-widest">Product Editor</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-900 p-2 hover:bg-slate-100 rounded-full transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSaveProduct} className="p-6 sm:p-10 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest ml-1">Product Name</label>
                  <input name="name" defaultValue={editingProduct?.name} required placeholder="e.g. ChatGPT Plus Official" className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all font-semibold text-slate-900 text-sm" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest ml-1">Price (৳)</label>
                  <input name="price" type="number" step="1" defaultValue={editingProduct?.price} required className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all font-semibold text-sm" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest ml-1">Stock Level</label>
                  <input name="stock" type="number" defaultValue={editingProduct?.stock} required className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all font-semibold text-sm" />
                </div>
              </div>

              {/* Product Options */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400 uppercase tracking-widest ml-1">
                  <Layers className="w-3 h-3" /> Product Variant Options
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-semibold text-slate-600 uppercase">Shared/Personal</span>
                    <input type="checkbox" name="is_shared_personal_enabled" defaultChecked={editingProduct?.is_shared_personal_enabled} className="w-5 h-5 rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
                  </div>
                  <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-semibold text-slate-600 uppercase">Duration</span>
                    <input type="checkbox" name="is_duration_enabled" defaultChecked={editingProduct?.is_duration_enabled} className="w-5 h-5 rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
                  </div>
                  <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-semibold text-slate-600 uppercase">Profile Slots</span>
                    <input type="checkbox" name="is_slots_enabled" defaultChecked={editingProduct?.is_slots_enabled} className="w-5 h-5 rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest ml-1">Category Selection</label>
                  <select name="category" defaultValue={editingProduct?.category} className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all appearance-none font-semibold text-slate-700 text-sm">
                    <option value="Writing Tools">Writing Tools</option>
                    <option value="Educational Tools">Educational Tools</option>
                    <option value="Graphics Tools">Graphics Tools</option>
                    <option value="Graphics Resources">Graphics Resources</option>
                    <option value="Premium VPN">Premium VPN</option>
                    <option value="Software & Apps">Software & Apps</option>
                    <option value="Marketing Tools">Marketing Tools</option>
                    <option value="Web Elements">Web Elements</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Streaming Platform">Streaming Platform</option>
                    <option value="Gift Card">Gift Card</option>
                  </select>
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest ml-1">Product Image URL</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input name="image" defaultValue={editingProduct?.image} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all text-xs" placeholder="https://image-url.com/photo.jpg" />
                  </div>
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest ml-1">Product Description</label>
                  <textarea name="description" defaultValue={editingProduct?.description} rows={3} required className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all text-sm leading-relaxed" />
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-indigo-500" />
                  <label htmlFor="featured" className="text-[10px] font-semibold text-slate-900 uppercase tracking-widest cursor-pointer">Featured Product</label>
                </div>
                <input type="checkbox" name="featured" id="featured" defaultChecked={editingProduct?.featured} className="w-6 h-6 rounded-lg border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-4 pb-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-full sm:flex-1 py-4 sm:py-5 bg-slate-100 rounded-2xl font-semibold text-slate-600 hover:bg-slate-200 transition-all uppercase text-[10px] tracking-widest">Cancel</button>
                <button type="submit" className="w-full sm:flex-[2] py-4 sm:py-5 bg-slate-900 text-white rounded-2xl font-semibold hover:bg-slate-800 transition-all shadow-xl uppercase text-[10px] tracking-widest">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

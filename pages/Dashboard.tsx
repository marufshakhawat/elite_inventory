
import React, { useState, useRef } from 'react';
import { User as UserIcon, Package, Settings, MapPin, CreditCard, LogOut, ChevronRight, Key, Mail, Shield, CheckCircle2, Clock, Copy, ExternalLink, Smartphone, Camera, X, Lock, AlertTriangle, Phone } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingDots } from '../App';

type DashboardTab = 'info' | 'purchases' | 'history' | 'settings';
type ActiveModal = 'password' | 'deactivate' | null;

const Dashboard: React.FC = () => {
  const { user, logout, orders, updateUser, addToast, updatePassword, isLoading } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<DashboardTab>('purchases');
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [modalLoading, setModalLoading] = useState(false);
  
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const [passwordForm, setPasswordForm] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  if (isLoading || !user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <LoadingDots />
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Restoring Session...</p>
      </div>
    );
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(profileForm);
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword.length < 6) {
      addToast('Password should be at least 6 characters.', 'error');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      addToast('Passwords do not match', 'error');
      return;
    }
    
    setModalLoading(true);
    const success = await updatePassword(passwordForm.newPassword);
    setModalLoading(false);
    
    if (success) {
      setActiveModal(null);
      setPasswordForm({ newPassword: '', confirmPassword: '' });
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateUser({ avatar: base64String });
        addToast('Profile photo updated', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    addToast('License data copied to clipboard', 'info');
  };

  const handleDeactivate = () => {
    addToast('Account deactivation requested', 'info');
    logout();
    navigate('/');
  };

  const deliveredOrders = orders.filter(o => o.status === 'delivered');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-80 space-y-4">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
            <div className="relative inline-block mb-4 group cursor-pointer" onClick={() => photoInputRef.current?.click()}>
              <img 
                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=0f172a&color=fff`} 
                alt={user?.name} 
                className="w-24 h-24 rounded-full border-4 border-slate-50 object-cover transition-opacity group-hover:opacity-75" 
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white drop-shadow-md" />
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-slate-900 border-4 border-white rounded-full flex items-center justify-center">
                <Shield className="w-2.5 h-2.5 text-white" />
              </div>
              <input type="file" ref={photoInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">{user?.name}</h3>
            <p className="text-slate-500 text-sm mb-6 font-medium">{user?.email}</p>
            <button onClick={logout} className="flex items-center justify-center gap-2 w-full py-3 bg-slate-50 text-slate-900 rounded-xl font-bold hover:bg-slate-100 border border-slate-100 transition-colors text-[10px] uppercase tracking-widest">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>

          <nav className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-2 space-y-1">
            {[
              { id: 'info', icon: UserIcon, label: 'Identity' },
              { id: 'purchases', icon: Key, label: 'My Purchases' },
              { id: 'history', icon: Package, label: 'Order History' },
              { id: 'settings', icon: Settings, label: 'Account Settings' },
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={() => setActiveTab(item.id as DashboardTab)}
                className={`flex items-center gap-3 w-full p-4 rounded-2xl text-left transition-all ${
                  activeTab === item.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-bold text-sm tracking-tight">{item.label}</span>
                {activeTab === item.id && <ChevronRight className="ml-auto w-4 h-4 opacity-50" />}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: 'Active Assets', value: deliveredOrders.length, icon: Key },
              { label: 'Total Orders', value: orders.length, icon: Package },
              { label: 'Total Spent', value: '৳' + orders.reduce((acc, o) => acc + o.total, 0).toLocaleString(), icon: CreditCard },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
                </div>
                <stat.icon className="w-8 h-8 text-slate-100" />
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden min-h-[500px]">
            {activeTab === 'info' && (
              <div className="p-8 md:p-12 space-y-8 animate-fadeIn">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Identity</h2>
                  <p className="text-sm text-slate-500 mt-1 font-medium">Manage your personal details and delivery address.</p>
                </div>
                
                <form onSubmit={handleProfileUpdate} className="space-y-6 max-w-xl">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      type="text" 
                      value={profileForm.name}
                      onChange={e => setProfileForm({...profileForm, name: e.target.value})}
                      className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all text-sm font-bold" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                      type="email" 
                      disabled
                      value={profileForm.email}
                      className="w-full px-4 py-4 bg-slate-100 border border-slate-100 rounded-2xl outline-none text-sm font-bold text-slate-500 cursor-not-allowed" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                    <input 
                      type="text" 
                      value={profileForm.phone}
                      onChange={e => setProfileForm({...profileForm, phone: e.target.value})}
                      className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all text-sm font-bold" 
                    />
                  </div>
                  <button type="submit" className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all text-[10px] uppercase tracking-[0.2em] shadow-lg">
                    Update Profile
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'purchases' && (
              <div className="p-8 md:p-12 space-y-8 animate-fadeIn">
                <div className="flex justify-between items-end">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Products</h2>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {deliveredOrders.length > 0 ? deliveredOrders.flatMap(o => o.items.map(item => {
                    const fulfillmentValue = o.fulfillmentData || `EI-${o.id.split('-')[1]}-PENDING`;
                    return (
                      <div key={`${o.id}-${item.id}`} className="bg-slate-50 rounded-3xl p-6 border border-slate-100 group">
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                          <div className="flex gap-4">
                            <div className="w-16 h-16 bg-white rounded-2xl border border-slate-100 flex items-center justify-center p-3 shadow-sm">
                              <img src={item.image} className="w-full h-full object-contain" alt={item.name} />
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900 tracking-tight">{item.name}</h4>
                              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Date: {new Date(o.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          
                          <div className="flex-1 max-w-md">
                            <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-4 font-mono text-[10px]">
                               <span className="text-slate-700 truncate font-bold">{fulfillmentValue}</span>
                               <button onClick={() => copyToClipboard(fulfillmentValue)} className="p-2 text-slate-400 hover:text-slate-900">
                                 <Copy className="w-4 h-4" />
                               </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })) : (
                    <div className="py-20 text-center space-y-4">
                      <Key className="w-12 h-12 text-slate-200 mx-auto" />
                      <p className="text-slate-400 text-sm italic font-medium">You haven't purchased any products yet.</p>
                      <Link to="/shop" className="inline-block bg-slate-900 text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl">Explore Marketplace</Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="p-8 md:p-12 animate-fadeIn">
                <h2 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight">Transaction History</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                        <th className="px-8 py-5">Order ID</th>
                        <th className="px-8 py-5">Date</th>
                        <th className="px-8 py-5">Status</th>
                        <th className="px-8 py-5 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {orders.length > 0 ? orders.map(o => (
                        <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-8 py-6 font-mono text-xs font-bold text-slate-900">{o.id}</td>
                          <td className="px-8 py-6 text-sm text-slate-500">{new Date(o.date).toLocaleDateString()}</td>
                          <td className="px-8 py-6">
                             <span className={`text-[10px] font-bold uppercase tracking-wider ${o.status === 'delivered' ? 'text-green-600' : 'text-amber-600'}`}>
                               {o.status}
                             </span>
                          </td>
                          <td className="px-8 py-6 text-right font-bold text-slate-900">৳{o.total.toLocaleString()}</td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={4} className="py-20 text-center text-slate-400 italic text-sm">No transactions found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="p-8 md:p-12 space-y-12 animate-fadeIn">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                  <h4 className="font-bold text-slate-900 tracking-tight">Account Password</h4>
                  <button onClick={() => setActiveModal('password')} className="w-full py-3 bg-white text-slate-900 rounded-xl border border-slate-200 text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm">
                    Change Password
                  </button>
                </div>
                <div className="p-6 bg-rose-50 rounded-3xl border border-rose-100 space-y-4">
                  <h4 className="font-bold text-rose-900 tracking-tight">Danger Zone</h4>
                  <button onClick={() => setActiveModal('deactivate')} className="w-full py-3 bg-rose-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm">
                    Deactivate Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      {activeModal === 'password' && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold tracking-tight">Update Password</h3>
              <button onClick={() => setActiveModal(null)}><X className="w-6 h-6 text-slate-400" /></button>
            </div>
            <form onSubmit={handlePasswordUpdate} className="p-8 space-y-6">
              <input 
                type="password" 
                placeholder="New Password"
                value={passwordForm.newPassword}
                onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-sm" 
              />
              <input 
                type="password" 
                placeholder="Confirm Password"
                value={passwordForm.confirmPassword}
                onChange={e => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-sm" 
              />
              <button type="submit" disabled={modalLoading} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase text-[10px] tracking-widest flex items-center justify-center">
                {modalLoading ? <LoadingDots color="text-white" /> : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

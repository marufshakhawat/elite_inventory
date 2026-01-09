
import React, { useState, useRef } from 'react';
import { User as UserIcon, Package, Settings, MapPin, CreditCard, LogOut, ChevronRight, Key, Mail, Shield, CheckCircle2, Clock, Copy, ExternalLink, Smartphone, Camera, X, Lock, AlertTriangle, Phone, Loader2 } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { Link, useNavigate } from 'react-router-dom';

type DashboardTab = 'info' | 'purchases' | 'history' | 'settings';
type ActiveModal = 'password' | 'deactivate' | null;

const Dashboard: React.FC = () => {
  const { user, logout, orders, updateUser, addToast, updatePassword } = useApp();
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

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(profileForm);
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
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
            <h3 className="text-xl font-bold text-slate-900">{user?.name}</h3>
            <p className="text-slate-500 text-sm mb-6">{user?.email}</p>
            <button onClick={logout} className="flex items-center justify-center gap-2 w-full py-3 bg-slate-50 text-slate-900 rounded-xl font-bold hover:bg-slate-100 border border-slate-100 transition-colors text-xs uppercase tracking-widest">
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
                <span className="font-bold text-sm">{item.label}</span>
                {activeTab === item.id && <ChevronRight className="ml-auto w-4 h-4 opacity-50" />}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 space-y-8">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: 'Active Assets', value: deliveredOrders.length, icon: Key },
              { label: 'Total Orders', value: orders.length, icon: Package },
              { label: 'Total Spent', value: '৳' + orders.reduce((acc, o) => acc + o.total, 0).toLocaleString(), icon: CreditCard },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <stat.icon className="w-8 h-8 text-slate-100" />
              </div>
            ))}
          </div>

          {/* Active Tab Content */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden min-h-[500px]">
            {activeTab === 'info' && (
              <div className="p-8 md:p-12 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Identity</h2>
                  <p className="text-sm text-slate-500 mt-1">Manage your personal details and delivery address.</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-12">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative group cursor-pointer" onClick={() => photoInputRef.current?.click()}>
                      <img 
                        src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=0f172a&color=fff`} 
                        className="w-32 h-32 rounded-3xl object-cover border-4 border-slate-50 shadow-md group-hover:opacity-75 transition-opacity" 
                        alt="Profile" 
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-8 h-8 text-white drop-shadow-md" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-2 rounded-xl shadow-lg">
                        <Camera className="w-4 h-4" />
                      </div>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Click to update</p>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="flex-1 space-y-6 max-w-xl">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                      <div className="relative">
                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        <input 
                          type="text" 
                          placeholder="Full Name"
                          value={profileForm.name}
                          onChange={e => setProfileForm({...profileForm, name: e.target.value})}
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all text-sm font-medium" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        <input 
                          type="email" 
                          disabled
                          value={profileForm.email}
                          className="w-full pl-12 pr-4 py-4 bg-slate-100 border border-slate-100 rounded-2xl outline-none text-sm font-medium text-slate-500 cursor-not-allowed" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        <input 
                          type="text" 
                          placeholder="+880 1XXX-XXXXXX"
                          value={profileForm.phone}
                          onChange={e => setProfileForm({...profileForm, phone: e.target.value})}
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all text-sm font-medium" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Shipping Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-5 w-4 h-4 text-slate-300" />
                        <textarea 
                          rows={3}
                          value={profileForm.address}
                          onChange={e => setProfileForm({...profileForm, address: e.target.value})}
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all text-sm font-medium"
                        ></textarea>
                      </div>
                    </div>
                    <button type="submit" className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all text-xs uppercase tracking-widest shadow-lg">
                      Update Profile
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'purchases' && (
              <div className="p-8 md:p-12 space-y-8">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Products</h2>
                    <p className="text-sm text-slate-500 mt-1">Access your purchased professional digital assets.</p>
                  </div>
                  <Link to="/shop" className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em] border-b-2 border-slate-900 pb-1">Buy More</Link>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {deliveredOrders.length > 0 ? deliveredOrders.flatMap(o => o.items.map(item => {
                    const fulfillmentValue = o.fulfillmentData || `ELITE-${o.id.split('-')[1]}-X92B-4K9L-V6P1`;
                    return (
                      <div key={`${o.id}-${item.id}`} className="bg-slate-50 rounded-3xl p-6 border border-slate-100 group hover:border-slate-300 transition-all">
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                          <div className="flex gap-4">
                            <div className="w-16 h-16 bg-white rounded-2xl border border-slate-100 flex items-center justify-center p-3 shadow-sm">
                              <img src={item.image} className="w-full h-full object-contain" alt={item.name} />
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900">{item.name}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase bg-green-100 text-green-700">Delivered</span>
                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Date: {new Date(o.date).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex-1 max-w-md">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Asset Fulfillment Data</p>
                            <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-4 font-mono text-xs">
                               <span className="text-slate-700 truncate">{fulfillmentValue}</span>
                               <button 
                                onClick={() => copyToClipboard(fulfillmentValue)}
                                className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-900 transition-all"
                                title="Copy Content"
                               >
                                 <Copy className="w-4 h-4" />
                               </button>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {fulfillmentValue.startsWith('http') ? (
                              <a href={fulfillmentValue} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900 text-white rounded-xl border border-slate-900 hover:bg-slate-800 transition-all shadow-sm" title="Download / Open">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            ) : (
                              <button className="p-3 bg-white text-slate-900 rounded-xl border border-slate-100 hover:border-slate-900 transition-all shadow-sm" title="Redemption Guide">
                                <ExternalLink className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })) : (
                    <div className="py-20 text-center space-y-4">
                      <Key className="w-12 h-12 text-slate-200 mx-auto" />
                      <p className="text-slate-400 text-sm italic">You haven't purchased any products yet.</p>
                      <Link to="/shop" className="inline-block bg-slate-50 text-slate-900 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest border border-slate-100 hover:bg-slate-100 transition-all">Explore Marketplace</Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="p-8 md:p-12 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Transaction History</h2>
                </div>

                <div className="overflow-hidden border border-slate-100 rounded-[2rem]">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                        <th className="px-8 py-5">Order ID</th>
                        <th className="px-8 py-5">Date</th>
                        <th className="px-8 py-5">Payment</th>
                        <th className="px-8 py-5">Status</th>
                        <th className="px-8 py-5 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {orders.length > 0 ? orders.map(o => (
                        <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-8 py-6">
                            <span className="font-mono text-xs font-bold text-slate-900 select-all uppercase">{o.id}</span>
                          </td>
                          <td className="px-8 py-6 text-sm text-slate-500">{new Date(o.date).toLocaleDateString()}</td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-2">
                              <Smartphone className="w-3.5 h-3.5 text-slate-300" />
                              <span className="text-xs font-bold text-slate-700">{o.paymentMethod || 'Manual'}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-2">
                               {o.status === 'delivered' ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> : <Clock className="w-3.5 h-3.5 text-amber-500" />}
                               <span className={`text-[10px] font-bold uppercase tracking-wider ${o.status === 'delivered' ? 'text-green-600' : 'text-amber-600'}`}>
                                 {o.status}
                               </span>
                             </div>
                          </td>
                          <td className="px-8 py-6 text-right font-bold text-slate-900">৳{o.total.toLocaleString()}</td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={5} className="py-20 text-center text-slate-400 italic text-sm">No transactions found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="p-8 md:p-12 space-y-12">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Security & Settings</h2>
                    <p className="text-sm text-slate-500 mt-1">Manage your account security and authentication.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100">
                        <Shield className="w-5 h-5 text-slate-900" />
                      </div>
                      <h4 className="font-bold text-slate-900">Account Password</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Update your password to keep your account and license keys secure.</p>
                      <button 
                        onClick={() => setActiveModal('password')}
                        className="w-full py-3 bg-white text-slate-900 rounded-xl border border-slate-200 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-100 transition-all"
                      >
                        Change Password
                      </button>
                    </div>

                    <div className="p-6 bg-red-50 rounded-3xl border border-red-100 space-y-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      </div>
                      <h4 className="font-bold text-red-900">Danger Zone</h4>
                      <p className="text-xs text-red-700 leading-relaxed">Permanently close your account and remove access to all purchases.</p>
                      <button 
                        onClick={() => setActiveModal('deactivate')}
                        className="w-full py-3 bg-red-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 transition-all shadow-sm"
                      >
                        Deactivate Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      {activeModal === 'password' && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl animate-scaleIn">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-xl text-slate-900"><Lock className="w-5 h-5" /></div>
                <h3 className="text-xl font-bold tracking-tight">Update Password</h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-slate-50 rounded-full transition-all"><X className="w-6 h-6 text-slate-400" /></button>
            </div>
            <form onSubmit={handlePasswordUpdate} className="p-8 space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">New Secure Password</label>
                <input 
                  type="password" 
                  required 
                  value={passwordForm.newPassword}
                  onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                <input 
                  type="password" 
                  required 
                  value={passwordForm.confirmPassword}
                  onChange={e => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 transition-all" 
                />
              </div>
              <button 
                type="submit" 
                disabled={modalLoading}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all uppercase text-xs tracking-widest shadow-lg flex items-center justify-center"
              >
                {modalLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Update Credentials'}
              </button>
            </form>
          </div>
        </div>
      )}

      {activeModal === 'deactivate' && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-[2.5rem] w-full max-sm overflow-hidden shadow-2xl animate-scaleIn">
            <div className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto border border-red-100">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">Final Confirmation</h3>
                <p className="text-xs text-slate-500 leading-relaxed px-4">This action is permanent. You will lose access to all purchased digital assets and your transaction history.</p>
              </div>
              <div className="space-y-3 pt-4">
                <button onClick={handleDeactivate} className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all uppercase text-xs tracking-widest shadow-lg">
                  Confirm Deactivation
                </button>
                <button onClick={() => setActiveModal(null)} className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all uppercase text-xs tracking-widest">
                  Abort Protocol
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

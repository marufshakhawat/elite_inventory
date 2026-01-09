
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, User, Order, AppSettings } from '../types';
import { INITIAL_PRODUCTS, slugify } from '../utils/mockData.ts';
import { supabase } from '../utils/supabase.ts';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  user: User | null;
  orders: Order[];
  isAuth: boolean;
  isLoading: boolean;
  toasts: Toast[];
  settings: AppSettings;
  isChatOpen: boolean;
  addToCart: (product: Product, quantity?: number, variants?: Partial<CartItem>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  login: (email: string, pass: string) => Promise<boolean>;
  signup: (email: string, pass: string, name: string) => Promise<boolean>;
  resendVerification: (email: string) => Promise<void>;
  updatePassword: (newPass: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  addOrder: (order: Order) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
  fulfillOrder: (orderId: string, data: string) => Promise<void>;
  updateSettings: (newSettings: Partial<AppSettings>) => Promise<void>;
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: number) => void;
  setChatOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_SETTINGS: AppSettings = {
  bkashNumber: '+880 1626-881259',
  nagadNumber: '+880 1626-881259',
  maintenanceMode: false,
  announcement: 'Elite Assets restocked! Use code ELITE10 for discounts.'
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Core function to sync user profile and orders
  const syncUserSession = async (userId: string | null) => {
    if (!userId) {
      setUser(null);
      setIsAuth(false);
      setOrders([]);
      return;
    }

    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (profileError) {
        console.error('Session sync error:', profileError);
        // If profile doesn't exist yet, we might need to wait for the trigger or retry
        return;
      }

      setIsAuth(true);
      setUser(profile);

      // Fetch orders for this user
      const isAdmin = profile.role === 'admin';
      const orderQuery = supabase.from('orders').select('*').order('date', { ascending: false });
      if (!isAdmin) {
        orderQuery.eq('userId', userId);
      }
      
      const { data: orderData } = await orderQuery;
      setOrders(orderData || []);
    } catch (err) {
      console.error('Critical sync error:', err);
    }
  };

  useEffect(() => {
    const initApp = async () => {
      setIsLoading(true);
      try {
        // 1. Initial Session Check
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await syncUserSession(session.user.id);
        }

        // 2. Load Global Data
        const [prodRes, settRes] = await Promise.all([
          supabase.from('products').select('*'),
          supabase.from('settings').select('*').eq('key', 'global').single()
        ]);

        if (prodRes.data && prodRes.data.length > 0) setProducts(prodRes.data);
        else setProducts(INITIAL_PRODUCTS);

        if (settRes.data?.value) setSettings(settRes.data.value);
      } catch (e) {
        console.error('Init error:', e);
        setProducts(INITIAL_PRODUCTS);
      } finally {
        setIsLoading(false);
      }
    };

    initApp();

    // 3. Auth Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        if (session?.user) {
          await syncUserSession(session.user.id);
        }
      } else if (event === 'SIGNED_OUT') {
        setIsAuth(false);
        setUser(null);
        setOrders([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addToCart = (product: Product, quantity: number = 1, variants: Partial<CartItem> = {}) => {
    setCart(prev => {
      const existing = prev.find(item => 
        item.id === product.id && 
        item.selectedAccountType === variants.selectedAccountType &&
        item.selectedDuration === variants.selectedDuration &&
        item.selectedSlots === variants.selectedSlots
      );

      if (existing) {
        return prev.map(item => 
          (item.id === product.id && 
           item.selectedAccountType === variants.selectedAccountType &&
           item.selectedDuration === variants.selectedDuration &&
           item.selectedSlots === variants.selectedSlots)
          ? { ...item, quantity: item.quantity + quantity } 
          : item
        );
      }

      const newItem: CartItem = { ...product, quantity, ...variants };
      return [...prev, newItem];
    });
    addToast(`${product.name} added to cart`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter((_, idx) => idx.toString() !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map((item, idx) => idx.toString() === cartItemId ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    const isAdding = !wishlist.includes(productId);
    setWishlist(prev => isAdding ? [...prev, productId] : prev.filter(id => id !== productId));
    addToast(isAdding ? `Saved to wishlist` : `Removed from wishlist`, 'info');
  };

  const login = async (email: string, pass: string): Promise<boolean> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) {
      addToast(error.message, 'error');
      return false;
    }
    return true;
  };

  const signup = async (email: string, pass: string, name: string): Promise<boolean> => {
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password: pass,
      options: { 
        data: { full_name: name }, 
        emailRedirectTo: window.location.origin + '/dashboard' 
      }
    });
    
    if (error) {
      if (error.message.toLowerCase().includes('already registered') || error.status === 400) {
        addToast('Email already registered. Switching to login...', 'info');
        setTimeout(() => {
          window.location.href = `/login?registered=true`;
        }, 1500);
      } else {
        addToast(error.message, 'error');
      }
      return false;
    }
    if (data.user) {
      addToast('Success! Verification email sent.', 'success');
    }
    return true;
  };

  const resendVerification = async (email: string) => {
    const { error } = await supabase.auth.resend({ type: 'signup', email });
    if (error) addToast(error.message, 'error');
    else addToast('Verification email resent.', 'success');
  };

  const updatePassword = async (newPass: string): Promise<boolean> => {
    const { error } = await supabase.auth.updateUser({ password: newPass });
    if (error) {
      addToast(error.message, 'error');
      return false;
    }
    addToast('Password updated.', 'success');
    return true;
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      // Force clear local state immediately
      setIsAuth(false);
      setUser(null);
      setOrders([]);
      addToast('Signed out successfully.');
    } catch (e) {
      console.error('Logout error:', e);
      // Even if API fails, clear local state
      setIsAuth(false);
      setUser(null);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return;
    const { error } = await supabase.from('profiles').update(userData).eq('id', user.id);
    if (error) addToast(error.message, 'error');
    else {
      setUser({ ...user, ...userData });
      addToast('Profile updated.');
    }
  };

  const addOrder = async (order: Order) => {
    const { error } = await supabase.from('orders').insert([order]);
    if (error) addToast('Failed to place order.', 'error');
    else {
      setOrders(prev => [order, ...prev]);
      addToast('Order placed! Awaiting verification.');
    }
  };

  const deleteOrder = async (id: string) => {
    const { error } = await supabase.from('orders').delete().eq('id', id);
    if (error) addToast(error.message, 'error');
    else setOrders(prev => prev.filter(o => o.id !== id));
  };

  const addProduct = async (product: Product) => {
    const productWithSlug = { ...product, slug: product.slug || slugify(product.name) };
    const { error } = await supabase.from('products').insert([productWithSlug]);
    if (error) addToast(error.message, 'error');
    else {
      setProducts(prev => [productWithSlug, ...prev]);
      addToast('Product added.');
    }
  };

  const updateProduct = async (product: Product) => {
    const productWithSlug = { ...product, slug: slugify(product.name) };
    const { error } = await supabase.from('products').update(productWithSlug).eq('id', product.id);
    if (error) addToast(error.message, 'error');
    else {
      setProducts(prev => prev.map(p => p.id === product.id ? productWithSlug : p));
      addToast('Inventory updated.');
    }
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) addToast(error.message, 'error');
    else {
      setProducts(prev => prev.filter(p => p.id !== id));
      addToast('Product removed.');
    }
  };
  
  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    const { error } = await supabase.from('orders').update({ status }).eq('id', orderId);
    if (error) addToast(error.message, 'error');
    else setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const fulfillOrder = async (orderId: string, data: string) => {
    const { error } = await supabase.from('orders').update({ 
      status: 'delivered', 
      fulfillmentData: data 
    }).eq('id', orderId);
    
    if (error) addToast(error.message, 'error');
    else {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'delivered', fulfillmentData: data } : o));
      addToast('Order fulfilled.');
    }
  };

  const updateSettings = async (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    const { error } = await supabase.from('settings').upsert({ key: 'global', value: updated });
    if (error) addToast(error.message, 'error');
    else {
      setSettings(updated);
      addToast('Settings updated.');
    }
  };

  return (
    <AppContext.Provider value={{
      products, cart, wishlist, user, orders, isAuth, isLoading, toasts, settings, isChatOpen,
      addToCart, removeFromCart, updateCartQuantity, clearCart, toggleWishlist,
      login, signup, resendVerification, updatePassword, logout, updateUser, addOrder, deleteOrder, updateProduct, deleteProduct, addProduct, updateOrderStatus,
      fulfillOrder, updateSettings, addToast, removeToast, setChatOpen: setIsChatOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

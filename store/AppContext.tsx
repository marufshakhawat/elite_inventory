
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, User, Order, AppSettings } from '../types';
import { INITIAL_PRODUCTS, DUMMY_USER, DEMO_ACCOUNTS } from '../utils/mockData';

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
  toasts: Toast[];
  settings: AppSettings;
  isChatOpen: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  login: (emailOrUsername: string, pass: string) => boolean;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  addOrder: (order: Order) => void;
  deleteOrder: (id: string) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addProduct: (product: Product) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  fulfillOrder: (orderId: string, data: string) => void;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
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
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });
  const [isAuth, setIsAuth] = useState(() => !!localStorage.getItem('user'));
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 3000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    addToast(`${product.name} added to cart`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    const product = products.find(p => p.id === productId);
    const isAdding = !wishlist.includes(productId);
    setWishlist(prev => isAdding ? [...prev, productId] : prev.filter(id => id !== productId));
    if (product) {
      addToast(isAdding ? `Saved to wishlist` : `Removed from wishlist`, 'info');
    }
  };

  const login = (emailOrUsername: string, pass: string): boolean => {
    const matchedAccount = DEMO_ACCOUNTS.find(
      acc => acc.username === emailOrUsername && acc.password === pass
    );

    if (matchedAccount) {
      const newUser: User = {
        ...matchedAccount.data,
        role: matchedAccount.role
      };
      setUser(newUser);
      setIsAuth(true);
      addToast(`Authenticated as ${matchedAccount.role}`);
      return true;
    }

    if (pass === '1234' || emailOrUsername.includes('@')) {
       const role: 'user' | 'admin' = emailOrUsername.includes('admin') ? 'admin' : 'user';
       const newUser: User = { ...DUMMY_USER, email: emailOrUsername, role };
       setUser(newUser);
       setIsAuth(true);
       addToast(`Authenticated as ${role}`);
       return true;
    }

    addToast('Invalid credentials provided', 'error');
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuth(false);
    localStorage.removeItem('user');
    addToast('Logged out safely');
  };

  const updateUser = (userData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...userData } : null);
    addToast('Profile updated successfully');
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    addToast('Order record removed', 'info');
  };

  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
    addToast('New product added to inventory');
  };

  const updateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
    addToast('Product updated successfully');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    addToast('Product removed from inventory', 'info');
  };
  
  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    addToast(`Order ${orderId} status changed to ${status}`);
  };

  const fulfillOrder = (orderId: string, data: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'delivered', fulfillmentData: data } : o));
    addToast(`Order ${orderId} fulfilled successfully`, 'success');
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    addToast('System settings updated');
  };

  const setChatOpen = (open: boolean) => setIsChatOpen(open);

  return (
    <AppContext.Provider value={{
      products, cart, wishlist, user, orders, isAuth, toasts, settings, isChatOpen,
      addToCart, removeFromCart, updateCartQuantity, clearCart, toggleWishlist,
      login, logout, updateUser, addOrder, deleteOrder, updateProduct, deleteProduct, addProduct, updateOrderStatus,
      fulfillOrder, updateSettings, addToast, removeToast, setChatOpen
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

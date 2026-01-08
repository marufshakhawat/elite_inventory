
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
  rating: number;
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
  avatar?: string;
  address?: string;
  status?: 'active' | 'suspended';
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  shippingAddress: string;
  paymentMethod?: 'bKash' | 'Nagad';
  mfsSenderNumber?: string;
  mfsTransactionId?: string;
  screenshotUrl?: string;
  fulfillmentData?: string;
}

export interface AppSettings {
  bkashNumber: string;
  nagadNumber: string;
  maintenanceMode: boolean;
  announcement: string;
}

export interface AppState {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  user: User | null;
  orders: Order[];
  isAuth: boolean;
  settings: AppSettings;
}

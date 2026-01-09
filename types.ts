
export interface Product {
  id: string;
  slug: string; // SEO-friendly URL part
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
  rating: number;
  featured?: boolean;
  // Variant configurations (matching DB snake_case)
  is_shared_personal_enabled?: boolean;
  is_duration_enabled?: boolean;
  is_slots_enabled?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  // User selections (camelCase is fine for local app state)
  selectedAccountType?: 'Shared' | 'Personal';
  selectedDuration?: '1 Month' | '6 Months' | '1 Year' | 'Lifetime';
  selectedSlots?: '1 Profile' | '2 Profiles' | '5 Profiles' | 'Bulk';
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

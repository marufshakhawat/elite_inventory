
import { Product, User } from '../types';

export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'w1',
    slug: 'chatgpt-plus-subscription-shared',
    name: 'ChatGPT Plus Subscription (Shared)',
    price: 750,
    description: 'Get access to GPT-4, DALL-E, and faster response times. 1 month shared account access.',
    category: 'Writing Tools',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600',
    stock: 5,
    rating: 4.9,
    featured: true,
    is_shared_personal_enabled: true,
    is_duration_enabled: true,
    is_slots_enabled: false
  },
  {
    id: 'w2',
    slug: 'grammarly-premium-shared',
    name: 'Grammarly Premium (Shared)',
    price: 450,
    description: '1 month access to Grammarly Premium. Improve your writing and grammar instantly.',
    category: 'Writing Tools',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600',
    stock: 40,
    rating: 4.7,
    is_shared_personal_enabled: true,
    is_duration_enabled: true,
    is_slots_enabled: false
  },
  {
    id: 'w3',
    slug: 'quillbot-premium-1-month',
    name: 'Quillbot Premium (1 Month)',
    price: 400,
    description: 'Paraphrasing tool that helps you write better, faster, and clearer.',
    category: 'Writing Tools',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=600',
    stock: 35,
    rating: 4.6,
    is_shared_personal_enabled: false,
    is_duration_enabled: true,
    is_slots_enabled: false
  },
  {
    id: 'e1',
    slug: 'skillshare-premium-3-months',
    name: 'Skillshare Premium (3 Months)',
    price: 1800,
    description: 'Learn anything with unlimited access to thousands of creative classes.',
    category: 'Educational Tools',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=600',
    stock: 60,
    rating: 4.7,
    is_shared_personal_enabled: false,
    is_duration_enabled: true,
    is_slots_enabled: false
  },
  {
    id: 'e2',
    slug: 'linkedin-learning-premium',
    name: 'LinkedIn Learning Premium',
    price: 1200,
    description: 'Access to 16,000+ expert-led courses. Enhance your professional skills.',
    category: 'Educational Tools',
    image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&q=80&w=600',
    stock: 25,
    rating: 4.8,
    is_shared_personal_enabled: false,
    is_duration_enabled: true,
    is_slots_enabled: false
  },
  {
    id: 'g1',
    slug: 'canva-pro-lifetime-access',
    name: 'Canva Pro - Lifetime Access',
    price: 1200,
    description: 'Join our premium team for lifetime access to all Canva Pro features and templates.',
    category: 'Graphics Tools',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=600',
    stock: 200,
    rating: 4.8,
    featured: true,
    is_shared_personal_enabled: false,
    is_duration_enabled: false,
    is_slots_enabled: false
  },
  {
    id: 'v1',
    slug: 'nordvpn-1-year-premium',
    name: 'NordVPN 1 Year Premium',
    price: 2400,
    description: 'Ultra-fast VPN with military-grade encryption. Access content globally with ease.',
    category: 'Premium VPN',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600',
    stock: 150,
    rating: 4.6,
    featured: true,
    is_shared_personal_enabled: false,
    is_duration_enabled: true,
    is_slots_enabled: false
  },
  {
    id: 'st1',
    slug: 'netflix-premium-4k-shared-profile',
    name: 'Netflix Premium 4K (Shared Profile)',
    price: 600,
    description: '1 month access to 1 private profile on a shared Netflix Premium account.',
    category: 'Streaming Platform',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80&w=600',
    stock: 8,
    rating: 4.8,
    is_shared_personal_enabled: false,
    is_duration_enabled: true,
    is_slots_enabled: true
  }
];

export const DUMMY_USER: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  phone: '+880 1711-000000',
  role: 'admin',
  avatar: 'https://i.pravatar.cc/150?u=u1',
  address: 'Digital Citizen St, Tech City'
};

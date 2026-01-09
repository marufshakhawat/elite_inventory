
import { Product } from '../types';

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
    slug: 'chatgpt-plus-shared',
    name: 'ChatGPT Plus Subscription (Shared)',
    price: 750,
    description: 'Instant access to GPT-4o and advanced AI tools. Shared profile.',
    category: 'Writing Tools',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600',
    stock: 5,
    rating: 4.9,
    featured: true,
    is_shared_personal_enabled: true,
    is_duration_enabled: true
  },
  {
    id: 'g1',
    slug: 'canva-pro-lifetime',
    name: 'Canva Pro - Lifetime Access',
    price: 1200,
    description: 'Lifetime access to all Canva Pro features through our premium team.',
    category: 'Graphics Tools',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=600',
    stock: 200,
    rating: 4.8,
    featured: true
  },
  {
    id: 'v1',
    slug: 'nordvpn-1-year',
    name: 'NordVPN 1 Year Premium',
    price: 2400,
    description: 'Military-grade encryption for your digital security.',
    category: 'Premium VPN',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600',
    stock: 150,
    rating: 4.6,
    featured: true,
    is_duration_enabled: true
  },
  {
    id: 'yt1',
    slug: 'youtube-premium-family',
    name: 'YouTube Premium Family Slot',
    price: 200,
    description: 'Ad-free YouTube experience and music.',
    category: 'Streaming Platform',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c205?auto=format&fit=crop&q=80&w=600',
    stock: 25,
    rating: 4.8,
    is_duration_enabled: true
  }
];

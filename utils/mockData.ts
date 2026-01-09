
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
  // Writing Tools
  {
    id: 'w1',
    slug: 'chatgpt-plus-shared',
    name: 'ChatGPT Plus Subscription (Shared)',
    price: 750,
    description: 'Get access to GPT-4o, DALL-E, and advanced data analysis. 1 month shared account access.',
    category: 'Writing Tools',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600',
    stock: 12,
    rating: 4.9,
    featured: true,
    is_shared_personal_enabled: true,
    is_duration_enabled: true
  },
  {
    id: 'w2',
    slug: 'grammarly-premium-shared',
    name: 'Grammarly Premium (Shared)',
    price: 450,
    description: 'Elevate your writing with advanced grammar, tone, and clarity suggestions.',
    category: 'Writing Tools',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600',
    stock: 40,
    rating: 4.7,
    is_shared_personal_enabled: true
  },
  {
    id: 'w3',
    slug: 'quillbot-premium-1-year',
    name: 'QuillBot Premium (1 Year)',
    price: 1250,
    description: 'The ultimate paraphrasing tool. Unlock all modes, unlimited words, and plagiarism checker.',
    category: 'Writing Tools',
    image: 'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?auto=format&fit=crop&q=80&w=600',
    stock: 25,
    rating: 4.8,
    is_duration_enabled: true
  },
  // Educational Tools
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
    is_duration_enabled: true
  },
  {
    id: 'e2',
    slug: 'coursera-plus-monthly',
    name: 'Coursera Plus (Monthly)',
    price: 1200,
    description: 'Unlimited access to 7,000+ world-class courses and certificate programs.',
    category: 'Educational Tools',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600',
    stock: 15,
    rating: 4.8
  },
  {
    id: 'e3',
    slug: 'linkedin-learning-lifetime',
    name: 'LinkedIn Learning Premium',
    price: 3500,
    description: 'Access thousands of professional courses. Valid on your personal LinkedIn account.',
    category: 'Educational Tools',
    image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=600',
    stock: 5,
    rating: 4.9,
    featured: true
  },
  // Graphics Tools
  {
    id: 'ad1',
    slug: 'adobe-creative-cloud-all-apps',
    name: 'Adobe Creative Cloud (All Apps)',
    price: 1500,
    description: 'Access 20+ creative apps including Photoshop, Illustrator, and Premiere Pro.',
    category: 'Graphics Tools',
    image: 'https://images.unsplash.com/photo-1626785774625-ddc7c82a1e5e?auto=format&fit=crop&q=80&w=600',
    stock: 8,
    rating: 4.8,
    is_shared_personal_enabled: true
  },
  {
    id: 'g1',
    slug: 'canva-pro-lifetime',
    name: 'Canva Pro - Lifetime Access',
    price: 1200,
    description: 'Join our premium team for lifetime access to all Canva Pro features and templates.',
    category: 'Graphics Tools',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=600',
    stock: 200,
    rating: 4.8,
    featured: true
  },
  // Graphics Resources
  {
    id: 'gr1',
    slug: 'freepik-premium-shared',
    name: 'Freepik Premium (Shared)',
    price: 350,
    description: 'Download premium vectors, stock photos, and PSD files with no attribution.',
    category: 'Graphics Resources',
    image: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=600',
    stock: 45,
    rating: 4.6
  },
  {
    id: 'gr2',
    slug: 'envato-elements-30-days',
    name: 'Envato Elements (30 Days)',
    price: 850,
    description: 'Unlimited downloads of creative assets, templates, and premium fonts.',
    category: 'Graphics Resources',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=600',
    stock: 30,
    rating: 4.9,
    featured: true
  },
  // Premium VPN
  {
    id: 'v1',
    slug: 'nordvpn-1-year',
    name: 'NordVPN 1 Year Premium',
    price: 2400,
    description: 'Ultra-fast VPN with military-grade encryption. Access content globally.',
    category: 'Premium VPN',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600',
    stock: 150,
    rating: 4.6,
    featured: true,
    is_duration_enabled: true
  },
  {
    id: 'v2',
    slug: 'surfshark-vpn-shared',
    name: 'Surfshark VPN (2 Year Shared)',
    price: 950,
    description: 'Secure your digital life with an award-winning VPN. Shared account access.',
    category: 'Premium VPN',
    image: 'https://images.unsplash.com/photo-1633265485768-30691b195860?auto=format&fit=crop&q=80&w=600',
    stock: 25,
    rating: 4.7
  },
  {
    id: 'v3',
    slug: 'expressvpn-premium-private',
    name: 'ExpressVPN Premium (Private)',
    price: 2800,
    description: 'High-speed VPN for streaming and gaming. Private account login.',
    category: 'Premium VPN',
    image: 'https://images.unsplash.com/photo-1633265485501-49509432659e?auto=format&fit=crop&q=80&w=600',
    stock: 10,
    rating: 4.9
  },
  // Software & Apps
  {
    id: 'cc1',
    slug: 'capcut-pro-lifetime',
    name: 'CapCut Pro - Lifetime Access',
    price: 800,
    description: 'Unlock all pro features, AI effects, and 4K exports on the best mobile editor.',
    category: 'Software & Apps',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=600',
    stock: 50,
    rating: 4.9,
    featured: true
  },
  {
    id: 'cc2',
    slug: 'idm-lifetime-key',
    name: 'Internet Download Manager (IDM)',
    price: 1850,
    description: 'Genuine lifetime license key for the world\'s fastest download manager.',
    category: 'Software & Apps',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
    stock: 15,
    rating: 4.9
  },
  {
    id: 'sa1',
    slug: 'microsoft-365-family-1-year',
    name: 'Microsoft 365 Family (1 Year Slot)',
    price: 950,
    description: 'Word, Excel, PowerPoint, and 1TB OneDrive cloud storage. Genuine invitation.',
    category: 'Software & Apps',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600',
    stock: 50,
    rating: 4.8
  },
  // Gaming
  {
    id: 'gm1',
    slug: 'discord-nitro-1-month',
    name: 'Discord Nitro 1 Month (Gift)',
    price: 1150,
    description: 'HD streaming, 2 Server Boosts, and custom emojis.',
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1614680376739-414d95ff43df?auto=format&fit=crop&q=80&w=600',
    stock: 15,
    rating: 4.9
  },
  {
    id: 'gm2',
    slug: 'steam-gift-card-5-usd',
    name: 'Steam Gift Card 5 USD (Global)',
    price: 680,
    description: 'Instantly add funds to your Steam wallet. Global region activation.',
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80&w=600',
    stock: 100,
    rating: 4.9
  },
  {
    id: 'gm3',
    slug: 'xbox-game-pass-ultimate-1-month',
    name: 'Xbox Game Pass Ultimate',
    price: 1450,
    description: 'Play hundreds of high-quality games on console, PC and cloud.',
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1605902711622-cfb43c443ffb?auto=format&fit=crop&q=80&w=600',
    stock: 20,
    rating: 4.8,
    is_duration_enabled: true
  },
  // Streaming Platform
  {
    id: 'sp1',
    slug: 'spotify-premium-individual',
    name: 'Spotify Premium Individual',
    price: 150,
    description: 'Ad-free music listening, offline playback. Private account.',
    category: 'Streaming Platform',
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=600',
    stock: 100,
    rating: 4.9,
    featured: true
  },
  {
    id: 'yt1',
    slug: 'youtube-premium-family',
    name: 'YouTube Premium Family Slot',
    price: 200,
    description: 'Ad-free YouTube, background play, and offline downloads.',
    category: 'Streaming Platform',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c205?auto=format&fit=crop&q=80&w=600',
    stock: 25,
    rating: 4.8,
    is_duration_enabled: true
  },
  {
    id: 'st1',
    slug: 'netflix-premium-4k-shared',
    name: 'Netflix Premium 4K (Shared Profile)',
    price: 600,
    description: '1 month access to 1 private profile on a shared 4K account.',
    category: 'Streaming Platform',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80&w=600',
    stock: 10,
    rating: 4.8,
    is_slots_enabled: true
  },
  {
    id: 'st2',
    slug: 'disney-plus-premium-shared',
    name: 'Disney+ Premium (Shared)',
    price: 450,
    description: 'Stream Marvel, Pixar, Star Wars, and Disney classics in 4K UHD.',
    category: 'Streaming Platform',
    image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=600',
    stock: 15,
    rating: 4.7
  },
  // Gift Card
  {
    id: 'gc1',
    slug: 'razer-gold-5-usd',
    name: 'Razer Gold 5 USD (Global)',
    price: 650,
    description: 'Virtual credit for gamers worldwide.',
    category: 'Gift Card',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=600',
    stock: 200,
    rating: 5.0
  },
  {
    id: 'gc2',
    slug: 'apple-gift-card-10-usd',
    name: 'Apple Gift Card 10 USD (US)',
    price: 1350,
    description: 'Valid for US App Store, iTunes, and iCloud subscriptions.',
    category: 'Gift Card',
    image: 'https://images.unsplash.com/photo-1620288627223-53302f4e8c74?auto=format&fit=crop&q=80&w=600',
    stock: 40,
    rating: 4.9
  }
];

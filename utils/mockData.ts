
import { Product, User } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // Writing Tools
  {
    id: 'w1',
    name: 'ChatGPT Plus Subscription (Shared)',
    price: 750,
    description: 'Get access to GPT-4, DALL-E, and faster response times. 1 month shared account access.',
    category: 'Writing Tools',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600',
    stock: 50,
    rating: 4.9,
    featured: true
  },
  {
    id: 'w2',
    name: 'Grammarly Premium (Shared)',
    price: 450,
    description: '1 month access to Grammarly Premium. Improve your writing and grammar instantly.',
    category: 'Writing Tools',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600',
    stock: 40,
    rating: 4.7
  },
  {
    id: 'w3',
    name: 'Quillbot Premium (1 Month)',
    price: 400,
    description: 'Paraphrasing tool that helps you write better, faster, and clearer.',
    category: 'Writing Tools',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=600',
    stock: 35,
    rating: 4.6
  },

  // Educational Tools
  {
    id: 'e1',
    name: 'Skillshare Premium (3 Months)',
    price: 1800,
    description: 'Learn anything with unlimited access to thousands of creative classes.',
    category: 'Educational Tools',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=600',
    stock: 60,
    rating: 4.7
  },
  {
    id: 'e2',
    name: 'LinkedIn Learning Premium',
    price: 1200,
    description: 'Access to 16,000+ expert-led courses. Enhance your professional skills.',
    category: 'Educational Tools',
    image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&q=80&w=600',
    stock: 25,
    rating: 4.8
  },

  // Graphics Tools
  {
    id: 'g1',
    name: 'Canva Pro - Lifetime Access',
    price: 1200,
    description: 'Join our premium team for lifetime access to all Canva Pro features and templates.',
    category: 'Graphics Tools',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=600',
    stock: 200,
    rating: 4.8,
    featured: true
  },
  {
    id: 'g2',
    name: 'Adobe Creative Cloud All Apps (Shared)',
    price: 1800,
    description: 'Access to Photoshop, Illustrator, Premiere Pro, and more for 1 month.',
    category: 'Graphics Tools',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600',
    stock: 20,
    rating: 4.5
  },

  // Graphics Resources
  {
    id: 'gr1',
    name: 'Envato Elements (1 Month)',
    price: 1450,
    description: 'Millions of creative assets, unlimited downloads of stock photos, videos, and fonts.',
    category: 'Graphics Resources',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f08e7f17?auto=format&fit=crop&q=80&w=600',
    stock: 25,
    rating: 4.9
  },
  {
    id: 'gr2',
    name: 'Freepik Premium (1 Month)',
    price: 950,
    description: 'Access to premium vectors, stock photos, and PSD files for all your projects.',
    category: 'Graphics Resources',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=600',
    stock: 45,
    rating: 4.7
  },

  // Premium VPN
  {
    id: 'v1',
    name: 'NordVPN 1 Year Premium',
    price: 2400,
    description: 'Ultra-fast VPN with military-grade encryption. Access content globally with ease.',
    category: 'Premium VPN',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600',
    stock: 150,
    rating: 4.6,
    featured: true
  },
  {
    id: 'v2',
    name: 'ExpressVPN 1 Month Premium',
    price: 850,
    description: 'High speed, secure & anonymous. The #1 trusted leader in VPN.',
    category: 'Premium VPN',
    image: 'https://images.unsplash.com/photo-1633265485768-30698f1d11bc?auto=format&fit=crop&q=80&w=600',
    stock: 80,
    rating: 4.9
  },

  // Software & Apps
  {
    id: 's1',
    name: 'Microsoft Office 365 Personal (1 Year)',
    price: 3000,
    description: 'Official license key for Word, Excel, PowerPoint, and 1TB OneDrive storage.',
    category: 'Software & Apps',
    image: 'https://images.unsplash.com/photo-1633114128174-2f8aa49759b0?auto=format&fit=crop&q=80&w=600',
    stock: 100,
    rating: 4.7,
    featured: true
  },
  {
    id: 's2',
    name: 'Windows 11 Pro Retail Key',
    price: 1500,
    description: 'Permanent activation retail key. Link to your Microsoft account. Instant delivery.',
    category: 'Software & Apps',
    image: 'https://images.unsplash.com/photo-1662016744418-f60a3a7d5c6c?auto=format&fit=crop&q=80&w=600',
    stock: 500,
    rating: 4.9
  },
  {
    id: 's3',
    name: 'IDM (Internet Download Manager) Lifetime',
    price: 2200,
    description: 'Increase download speeds by up to 5 times, resume and schedule downloads.',
    category: 'Software & Apps',
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&q=80&w=600',
    stock: 120,
    rating: 4.8
  },

  // Marketing Tools
  {
    id: 'm1',
    name: 'SEMrush Guru Account (Shared)',
    price: 1100,
    description: 'Professional SEO and marketing toolkit for keyword research and site audits.',
    category: 'Marketing Tools',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
    stock: 15,
    rating: 4.6
  },
  {
    id: 'm2',
    name: 'Ahrefs Premium (Shared Access)',
    price: 1500,
    description: 'The ultimate tool for SEO, backlinks analysis, and competitor research.',
    category: 'Marketing Tools',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=600',
    stock: 10,
    rating: 4.5
  },

  // Web Elements
  {
    id: 'we1',
    name: 'Premium UI Kit - SaaS Edition',
    price: 5400,
    description: 'High-quality React/Tailwind web elements for building modern SaaS dashboards.',
    category: 'Web Elements',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=600',
    stock: 200,
    rating: 4.9
  },
  {
    id: 'we2',
    name: 'WordPress Premium Theme Bundle',
    price: 3500,
    description: 'Access to 50+ premium responsive WordPress themes for various industries.',
    category: 'Web Elements',
    image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&q=80&w=600',
    stock: 100,
    rating: 4.7
  },

  // Gaming
  {
    id: 'gm1',
    name: 'Minecraft Java Edition Key',
    price: 2650,
    description: 'Official global key for the original Minecraft experience on PC.',
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=600',
    stock: 50,
    rating: 4.8
  },
  {
    id: 'gm2',
    name: 'Discord Nitro (1 Month)',
    price: 1100,
    description: 'Enhance your Discord experience with custom emojis, larger uploads, and HD streaming.',
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=600',
    stock: 75,
    rating: 4.9
  },

  // Streaming Platform
  {
    id: 'st1',
    name: 'Netflix Premium 4K (Shared Profile)',
    price: 600,
    description: '1 month access to 1 private profile on a shared Netflix Premium account.',
    category: 'Streaming Platform',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80&w=600',
    stock: 30,
    rating: 4.8
  },
  {
    id: 'st2',
    name: 'Spotify Premium (1 Year Plan)',
    price: 1400,
    description: 'Listen to music ad-free, offline, and with high-quality audio.',
    category: 'Streaming Platform',
    image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80&w=600',
    stock: 100,
    rating: 5.0
  },
  {
    id: 'st3',
    name: 'YouTube Premium (1 Month)',
    price: 300,
    description: 'Watch videos without ads, play in the background, and download for offline viewing.',
    category: 'Streaming Platform',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=600',
    stock: 200,
    rating: 4.9
  },

  // Gift Card
  {
    id: 'gc1',
    name: 'Amazon Gift Card $50',
    price: 6000,
    description: 'Prepaid gift card for use on Amazon.com globally.',
    category: 'Gift Card',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=600',
    stock: 100,
    rating: 5.0
  },
  {
    id: 'gc2',
    name: 'Google Play Gift Card $10',
    price: 1250,
    description: 'Official US Region gift card for the Google Play Store.',
    category: 'Gift Card',
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=600',
    stock: 80,
    rating: 4.8
  }
];

export const DEMO_ACCOUNTS = [
  {
    username: 'eliteuser',
    password: '1234userektachor',
    role: 'user' as const,
    data: {
      id: 'u-elite',
      name: 'Elite Customer',
      email: 'user@eliteinventory.store',
      phone: '+880 1700-000000',
      address: 'Banani, Dhaka'
    }
  },
  {
    username: 'eliteadmin',
    password: 'tekalagboteka',
    role: 'admin' as const,
    data: {
      id: 'a-elite',
      name: 'Elite Administrator',
      email: 'admin@eliteinventory.store',
      phone: '+880 1600-000000',
      address: 'HQ, Digital District'
    }
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

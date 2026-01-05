
import { Product } from './types';

export const CATEGORIES = [
  { name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1470&auto=format&fit=crop', span: 'col-span-1 row-span-1' },
  { name: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1374&auto=format&fit=crop', span: 'col-span-2 row-span-1' },
  { name: 'Earrings', image: 'https://images.unsplash.com/photo-1630019058353-524027bc9d8d?q=80&w=1376&auto=format&fit=crop', span: 'col-span-1 row-span-2' },
  { name: 'Bangles', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1470&auto=format&fit=crop', span: 'col-span-1 row-span-1' },
  { name: 'Chains', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1470&auto=format&fit=crop', span: 'col-span-1 row-span-1' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Eternal Blossom Diamond Ring',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1491336477066-31156b5e4f35?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=800&auto=format&fit=crop'
    ],
    category: 'Rings',
    metal: 'Gold',
    purity: '18k',
    weight: '4.5g',
    description: 'A masterpiece of craftsmanship, featuring a central solitaire surrounded by delicate diamond petals.',
    occasion: 'Wedding',
    isDiamond: true,
    collection: 'Blossom'
  },
  {
    id: '2',
    name: 'Majestic Heritage Gold Necklace',
    price: 245000,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610664921890-ebad05086414?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=800&auto=format&fit=crop'
    ],
    category: 'Necklaces',
    metal: 'Gold',
    purity: '22k',
    weight: '24.2g',
    description: 'Inspired by royal heritage, this intricate 22k gold necklace embodies elegance and tradition.',
    occasion: 'Wedding',
    collection: 'Heritage'
  },
  {
    id: '3',
    name: 'Luminous Pearl Drop Earrings',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1630019058353-524027bc9d8d?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1630019058353-524027bc9d8d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?q=80&w=800&auto=format&fit=crop'
    ],
    category: 'Earrings',
    metal: 'Rose Gold',
    purity: '18k',
    weight: '2.1g',
    description: 'Simple yet sophisticated, these pearl drops are perfect for daily elegance.',
    occasion: 'Daily Wear',
    collection: 'Modern'
  },
  {
    id: '4',
    name: 'Sleek Platinum Band',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1588444839799-eb64299bba24?q=80&w=800&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1603561591411-0e7320b97d33?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1588444839799-eb64299bba24?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603561591411-0e7320b97d33?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1491336477066-31156b5e4f35?q=80&w=800&auto=format&fit=crop'
    ],
    category: 'Rings',
    metal: 'Platinum',
    purity: 'PT950',
    weight: '6.5g',
    description: 'Timeless platinum band with a mirror finish. Ideal for those who value understated luxury.',
    occasion: 'Daily Wear',
    collection: 'Modern'
  },
  {
    id: '5',
    name: 'Glimmering Diamond Tennis Bracelet',
    price: 125000,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1573408302185-91ff65181613?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573408302185-91ff65181613?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610664921890-ebad05086414?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop'
    ],
    category: 'Bracelets',
    metal: 'Platinum',
    purity: 'PT950',
    weight: '12.5g',
    description: 'A continuous line of brilliance. This tennis bracelet features over 3 carats of G-H color diamonds.',
    occasion: 'Party',
    isDiamond: true,
    collection: 'Modern'
  },
  {
    id: '6',
    name: 'Starlight Diamond Pendant',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?q=80&w=800&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610664921890-ebad05086414?q=80&w=800&auto=format&fit=crop'
    ],
    category: 'Others',
    metal: 'Gold',
    purity: '18k',
    weight: '3.2g',
    description: 'A singular star of light. This diamond pendant is designed to be worn close to the heart.',
    occasion: 'Daily Wear',
    isDiamond: true,
    collection: 'Blossom'
  },
  {
    id: '7',
    name: 'Lunar Radiance Silver Choker',
    price: 18500,
    image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?q=80&w=800&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?q=80&w=800&auto=format&fit=crop'
    ],
    category: 'Necklaces',
    metal: 'Silver',
    purity: '925 Sterling',
    weight: '18.5g',
    description: 'A sophisticated sterling silver choker with a moonlit glow, perfect for modern evening wear.',
    occasion: 'Party',
    collection: 'Modern'
  },
  {
    id: '8',
    name: 'Vintage Sterling Silver Jhumkas',
    price: 9800,
    image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=800&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1630019058353-524027bc9d8d?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1630019058353-524027bc9d8d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?q=80&w=800&auto=format&fit=crop'
    ],
    category: 'Earrings',
    metal: 'Silver',
    purity: '925 Sterling',
    weight: '12.2g',
    description: 'Ornate handcrafted silver jhumkas inspired by ancient temple architecture.',
    occasion: 'Daily Wear',
    collection: 'Heritage'
  },
  {
    id: '9',
    name: 'Sleek Silver Infinity Band',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1603561591411-0e7320b97d33?q=80&w=800&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1603561591411-0e7320b97d33?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1491336477066-31156b5e4f35?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?q=80&w=800&auto=format&fit=crop'
    ],
    category: 'Rings',
    metal: 'Silver',
    purity: '925 Sterling',
    weight: '3.8g',
    description: 'A minimal infinity band in sterling silver, embodying eternal elegance.',
    occasion: 'Daily Wear',
    collection: 'Modern'
  }
];


import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { MOCK_PRODUCTS } from '../constants';
import { Filter } from 'lucide-react';

interface CollectionsPageProps {
  onProductClick: (product: Product) => void;
  onQuickView: (product: Product) => void;
  t: any;
  isProductWishlisted: (id: string) => boolean;
  toggleWishlist: (product: Product) => void;
}

const CollectionsPage: React.FC<CollectionsPageProps> = ({ 
  onProductClick, 
  onQuickView, 
  t,
  isProductWishlisted,
  toggleWishlist
}) => {
  const [activeCollection, setActiveCollection] = useState<string>('All');

  const collections = ['All', 'Heritage', 'Modern', 'Blossom', 'Bridal'];

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => 
      activeCollection === 'All' || p.collection === activeCollection
    );
  }, [activeCollection]);

  return (
    <div className="min-h-screen">
      {/* Editorial Hero */}
      <section className="mb-16">
        <div className="relative h-[40vh] lg:h-[70vh] rounded-3xl lg:rounded-5xl overflow-hidden shadow-2xl group">
          <img 
            src="https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" 
            alt="Artisan Collections" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent flex flex-col justify-end p-6 lg:p-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-9xl font-serif text-white mb-4 lg:mb-8 leading-tight tracking-tighter">{t.collections_title}</h1>
              <p className="text-white/80 text-base lg:text-2xl font-serif italic leading-relaxed max-w-lg hidden sm:block">
                Every collection is a chapter in our history of craftsmanship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Navigation */}
      <section className="mb-12">
        <div className="flex flex-col items-center">
          <h2 className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-gold mb-10">The Archives</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 w-full max-w-4xl px-4">
            {collections.map((col) => (
              <button
                key={col}
                onClick={() => setActiveCollection(col)}
                className={`py-4 lg:py-6 rounded-2xl text-xs font-serif italic transition-all duration-500 border-2 ${
                  activeCollection === col 
                  ? 'bg-white border-gold text-charcoal shadow-xl scale-105' 
                  : 'bg-transparent border-cream text-charcoal/40 hover:border-gold/20 hover:text-charcoal'
                }`}
              >
                {col === 'All' ? t.all_pieces : col}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-20">
        <div className="flex justify-between items-center mb-10 border-b border-cream pb-6">
           <h3 className="text-2xl font-serif text-charcoal">{activeCollection === 'All' ? t.all_pieces : activeCollection} {t.results}</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => onProductClick(product)}
              onQuickView={onQuickView}
              isWishlisted={isProductWishlisted(product.id)}
              onToggleWishlist={toggleWishlist}
              t={t}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CollectionsPage;

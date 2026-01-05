
import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { MOCK_PRODUCTS } from '../constants';
import { Sparkles, Moon, LayoutGrid, Square } from 'lucide-react';
import { motion, LayoutGroup } from 'framer-motion';

interface SilverJewelleryPageProps {
  onProductClick: (product: Product) => void;
  onQuickView: (product: Product) => void;
  t: any;
  isProductWishlisted: (id: string) => boolean;
  toggleWishlist: (product: Product) => void;
}

const SilverJewelleryPage: React.FC<SilverJewelleryPageProps> = ({ 
  onProductClick, 
  onQuickView, 
  t,
  isProductWishlisted,
  toggleWishlist
}) => {
  const [activeSubCategory, setActiveSubCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState('Featured');
  const [mobileGridMode, setMobileGridMode] = useState<'single' | 'double'>('double');

  const subCategories = ['All', 'Necklaces', 'Rings', 'Earrings', 'Bangles', 'Bracelets'];

  const silverProducts = useMemo(() => {
    let products = MOCK_PRODUCTS.filter(p => 
      p.metal === 'Silver' && (activeSubCategory === 'All' || p.category === activeSubCategory)
    );

    if (sortOption === 'Price: Low to High') products.sort((a, b) => a.price - b.price);
    else if (sortOption === 'Price: High to Low') products.sort((a, b) => b.price - a.price);
    else if (sortOption === 'Newest Arrivals') products.sort((a, b) => parseInt(b.id) - parseInt(a.id));

    return products;
  }, [activeSubCategory, sortOption]);

  return (
    <div className="min-h-screen">
      {/* Editorial Hero */}
      <section className="mb-16">
        <div className="relative h-[40vh] lg:h-[60vh] rounded-3xl lg:rounded-5xl overflow-hidden shadow-2xl group">
          <img 
            src="https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-110 grayscale-[0.2]" 
            alt="Silver Radiance" 
          />
          <div className="absolute inset-0 bg-charcoal/30 flex items-center px-6 lg:px-24">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4 lg:mb-6">
                <div className="w-10 h-[1px] bg-white/50" />
                <span className="text-[9px] font-sans font-bold uppercase tracking-[0.4em] text-white">Sterling Selection</span>
              </div>
              <h1 className="text-4xl lg:text-8xl font-serif text-white mb-4 lg:mb-8 leading-tight tracking-tighter">{t.silver_sophistication}</h1>
              <p className="text-white/80 text-sm lg:text-xl font-serif italic max-w-lg leading-relaxed hidden sm:block">
                Pure, moonlit beauty captured in 925 sterling silver. Discover contemporary forms and heritage designs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-category Filter */}
      <section className="mb-12">
        <div className="flex flex-col items-center">
          <h2 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-charcoal/40 mb-6 italic">{t.refine_archive}</h2>
          <div className="flex flex-wrap justify-center gap-2 lg:gap-3 overflow-x-auto no-scrollbar max-w-full px-4">
            {subCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveSubCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-[9px] font-sans font-bold uppercase tracking-widest transition-all duration-500 border ${
                  activeSubCategory === cat 
                  ? 'bg-charcoal text-white border-charcoal shadow-lg' 
                  : 'bg-white text-charcoal/60 border-cream hover:border-charcoal/30 hover:text-charcoal'
                }`}
              >
                {cat === 'All' ? t.all_pieces : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Header */}
      <section className="pb-20">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 border-b border-cream pb-6 gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
             <h3 className="text-xl lg:text-2xl font-serif text-charcoal">{activeSubCategory === 'All' ? t.all_pieces : activeSubCategory}</h3>
             <span className="px-3 py-1 bg-charcoal/5 rounded-full text-[8px] font-sans font-bold uppercase text-charcoal/60 tracking-widest">{silverProducts.length} {t.results}</span>
             
             {/* Mobile View Toggle */}
             <div className="flex lg:hidden bg-cream p-1 rounded-full border border-cream shadow-inner ml-auto">
                <button 
                  onClick={() => setMobileGridMode('single')}
                  className={`p-2 rounded-full transition-all ${mobileGridMode === 'single' ? 'bg-white shadow-sm text-gold' : 'text-charcoal/30'}`}
                >
                  <Square size={16} />
                </button>
                <button 
                  onClick={() => setMobileGridMode('double')}
                  className={`p-2 rounded-full transition-all ${mobileGridMode === 'double' ? 'bg-white shadow-sm text-gold' : 'text-charcoal/30'}`}
                >
                  <LayoutGrid size={16} />
                </button>
             </div>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <span className="hidden sm:inline text-[10px] font-sans font-bold uppercase tracking-widest text-charcoal/30">{t.sort_by}:</span>
            <select 
              className="flex-grow sm:flex-grow-0 bg-white px-6 py-2.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest shadow-sm outline-none cursor-pointer border border-cream hover:border-gold transition-colors"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="Featured">{t.sort_featured}</option>
              <option value="Newest Arrivals">{t.sort_newest}</option>
              <option value="Price: Low to High">{t.sort_price_low}</option>
              <option value="Price: High to Low">{t.sort_price_high}</option>
            </select>
          </div>
        </div>

        {silverProducts.length > 0 ? (
          <LayoutGroup>
            <motion.div 
              layout
              className={`grid gap-4 lg:gap-10 
                ${mobileGridMode === 'single' ? 'grid-cols-1' : 'grid-cols-2'} 
                sm:grid-cols-2 lg:grid-cols-4`}
            >
              {silverProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onClick={() => onProductClick(product)}
                  onQuickView={onQuickView}
                  isWishlisted={isProductWishlisted(product.id)}
                  onToggleWishlist={toggleWishlist}
                  t={t}
                  isCompact={mobileGridMode === 'double'}
                />
              ))}
            </motion.div>
          </LayoutGroup>
        ) : (
          <div className="py-24 flex flex-col items-center justify-center text-center">
            <Moon size={40} className="text-charcoal/10 mb-4" />
            <p className="text-xl font-serif italic text-charcoal/30">{t.more_treasures}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default SilverJewelleryPage;

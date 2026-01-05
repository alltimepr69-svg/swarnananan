
import React, { useMemo } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { Heart, ArrowRight, ShieldCheck, ReceiptText } from 'lucide-react';

interface WishlistPageProps {
  wishlist: Product[];
  onProductClick: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onNavigateHome: () => void;
  t: any;
}

const WishlistPage: React.FC<WishlistPageProps> = ({ 
  wishlist, 
  onProductClick, 
  onQuickView, 
  onToggleWishlist,
  onNavigateHome,
  t
}) => {
  // Calculate valuation metrics
  const valuation = useMemo(() => {
    const subtotal = wishlist.reduce((acc, item) => acc + item.price, 0);
    const taxes = subtotal * 0.18; // 18% GST estimate
    const total = subtotal + taxes;
    return { subtotal, taxes, total };
  }, [wishlist]);

  return (
    <div className="min-h-screen pb-20">
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-red-50 text-red-500 rounded-full mb-6 animate-pulse">
          <Heart size={28} fill="currentColor" />
        </div>
        <h1 className="text-4xl lg:text-7xl font-serif text-charcoal tracking-tight mb-4">{t.my_vault}</h1>
        <p className="text-lg font-serif italic text-charcoal/40 max-w-lg">
          {t.vault_description}
        </p>
      </div>

      {wishlist.length > 0 ? (
        <>
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 mb-20">
            {wishlist.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                isWishlisted={true}
                onToggleWishlist={onToggleWishlist}
                onClick={() => onProductClick(product)}
                onQuickView={onQuickView}
                t={t}
              />
            ))}
          </div>

          {/* Vault Valuation Summary - Moved to end of list */}
          <div className="max-w-4xl mx-auto animate-fade-in border-t border-cream pt-16">
            <div className="bg-white rounded-4xl border border-gold/10 p-8 lg:p-12 shadow-xl relative overflow-hidden group">
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-16 relative z-10">
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                    <ReceiptText size={16} className="text-gold" />
                    <h2 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-gold">Vault Valuation</h2>
                  </div>
                  <p className="text-sm font-serif italic text-charcoal/50">Estimated investment for your curated selection.</p>
                </div>

                <div className="flex flex-wrap justify-center lg:justify-end gap-6 lg:gap-12 w-full lg:w-auto">
                  <div className="text-center lg:text-right">
                    <p className="text-[9px] font-sans font-bold uppercase tracking-widest text-charcoal/30 mb-1">Subtotal</p>
                    <p className="text-xl font-sans font-medium text-charcoal">₹{valuation.subtotal.toLocaleString()}</p>
                  </div>
                  <div className="text-center lg:text-right">
                    <p className="text-[9px] font-sans font-bold uppercase tracking-widest text-charcoal/30 mb-1">GST (18%)</p>
                    <p className="text-xl font-sans font-medium text-charcoal/60">₹{valuation.taxes.toLocaleString()}</p>
                  </div>
                  <div className="text-center lg:text-right px-6 py-3 bg-gold/5 rounded-2xl border border-gold/10">
                    <p className="text-[9px] font-sans font-bold uppercase tracking-widest text-gold mb-1">Grand Total</p>
                    <p className="text-3xl font-serif font-bold text-gold">₹{valuation.total.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-cream flex items-center justify-center lg:justify-start gap-3 opacity-60">
                <ShieldCheck size={14} className="text-green-600" />
                <p className="text-[9px] font-sans font-bold uppercase tracking-widest text-charcoal/40">Includes insured shipping & authentic hallmark certification</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-5xl border border-cream p-12 lg:p-32 flex flex-col items-center text-center max-w-3xl mx-auto shadow-sm">
          <div className="w-20 h-[1px] bg-gold mb-12" />
          <h2 className="text-2xl lg:text-4xl font-serif text-charcoal mb-6">{t.vault_empty}</h2>
          <p className="text-base text-charcoal/50 font-serif italic mb-12 leading-relaxed">
            {t.vault_empty_desc}
          </p>
          <button 
            onClick={onNavigateHome}
            className="px-12 py-5 bg-charcoal text-white text-[11px] font-bold tracking-[0.2em] uppercase rounded-full hover:bg-gold transition-all duration-500 shadow-xl flex items-center gap-3"
          >
            {t.explore_masterpieces} <ArrowRight size={16} />
          </button>
        </div>
      )}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default WishlistPage;

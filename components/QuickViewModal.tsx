
import React, { useState } from 'react';
import { X, ShoppingBag, ArrowRight, ShieldCheck, Star, Sparkles, MapPin, ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
  onViewDetails: (product: Product) => void;
  t: any;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose, onViewDetails, t }) => {
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState<string | null>(null);

  const checkDelivery = () => {
    if (pincode.length === 6) {
      setDeliveryStatus('Delivery available in 3-5 business days');
    } else {
      setDeliveryStatus('Please enter a valid 6-digit pincode');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8">
      {/* Immersive Glass Backdrop */}
      <div 
        className="absolute inset-0 bg-charcoal/40 backdrop-blur-xl transition-opacity duration-700" 
        onClick={onClose}
      />
      
      {/* Ultra-Rounded Modal Container */}
      <div className="relative w-full max-w-6xl bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] rounded-4xl lg:rounded-5xl overflow-hidden flex flex-col lg:flex-row h-[90vh] lg:h-auto animate-modal-pop">
        
        {/* Floating Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-[110] p-3 bg-white/90 backdrop-blur rounded-full text-charcoal hover:bg-gold hover:text-white transition-all shadow-lg border border-cream"
        >
          <X size={20} />
        </button>

        {/* Left: Product Visuals */}
        <div className="w-full lg:w-[48%] h-[40%] lg:h-auto bg-cream relative overflow-hidden group">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
          />
          
          {/* Virtual Try-On Overlay */}
          <div className="absolute bottom-8 left-8 right-8">
            <button className="w-full py-4 bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center gap-3 text-[11px] font-sans font-bold uppercase tracking-widest text-gold border border-gold/20 hover:bg-gold hover:text-white transition-all shadow-xl group/btn">
              <Sparkles size={18} className="group-hover/btn:animate-pulse" />
              {t.virtual_try_on}
            </button>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/10 to-transparent pointer-events-none" />
        </div>

        {/* Right: Modern Product Shop */}
        <div className="w-full lg:w-[52%] p-8 lg:p-14 flex flex-col overflow-y-auto no-scrollbar bg-white">
          <div className="flex-grow">
            {/* Header Info */}
            <div className="flex items-center gap-3 mb-6">
               <span className="bg-gold/10 text-gold text-[9px] font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-gold/10">
                 {product.category}
               </span>
               <div className="flex text-gold">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
              </div>
            </div>
            
            <h2 className="text-3xl lg:text-5xl font-serif text-charcoal mb-4 leading-tight tracking-tight">
              {product.name}
            </h2>
            
            <p className="text-3xl lg:text-4xl font-sans font-light text-charcoal mb-8">
              ₹{product.price.toLocaleString()}
            </p>

            {/* Specifications Cards */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              <div className="p-5 bg-cream rounded-3xl border border-cream/50 flex flex-col justify-center">
                <p className="text-[9px] font-sans font-bold uppercase tracking-widest text-gold/60 mb-1">{t.composition}</p>
                <p className="text-sm font-sans font-bold text-charcoal">{product.metal} {product.purity}</p>
              </div>
              <div className="p-5 bg-cream rounded-3xl border border-cream/50 flex flex-col justify-center">
                <p className="text-[9px] font-sans font-bold uppercase tracking-widest text-gold/60 mb-1">{t.gross_weight}</p>
                <p className="text-sm font-sans font-bold text-charcoal">{product.weight}</p>
              </div>
            </div>

            {/* Pincode Validator */}
            <div className="mb-10 bg-cream/30 p-6 rounded-3xl border border-cream">
               <div className="flex items-center gap-2 mb-4">
                  <MapPin size={16} className="text-gold" />
                  <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-charcoal/60">{t.check_delivery}</p>
               </div>
               <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder={t.enter_pincode}
                    className="flex-grow bg-white px-5 py-3 rounded-2xl text-xs font-sans outline-none border border-transparent focus:border-gold/30 transition-all"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    maxLength={6}
                  />
                  <button 
                    onClick={checkDelivery}
                    className="px-6 py-3 bg-charcoal text-white text-[10px] font-bold uppercase tracking-widest rounded-2xl hover:bg-gold transition-colors"
                  >
                    Check
                  </button>
               </div>
               {deliveryStatus && (
                 <p className={`mt-3 text-[10px] font-sans font-medium ${deliveryStatus.includes('available') ? 'text-green-600' : 'text-red-400'}`}>
                   {deliveryStatus}
                 </p>
               )}
            </div>

            {/* Product description */}
            <div className="mb-12">
              <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-charcoal/30 mb-4 border-b border-cream pb-3">{t.inspiration}</p>
              <p className="text-base lg:text-lg text-charcoal/80 font-serif italic leading-relaxed">
                "{product.description}"
              </p>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-cream">
            <button className="flex-[2] py-5 bg-charcoal text-white text-[11px] font-bold tracking-[0.2em] uppercase rounded-full hover:bg-gold transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl shadow-charcoal/20 active:scale-95">
              <ShoppingBag size={18} /> {t.add_to_selection}
            </button>
            <button 
              onClick={() => { onClose(); onViewDetails(product); }}
              className="flex-1 py-5 border-2 border-cream text-charcoal text-[11px] font-bold tracking-[0.2em] uppercase rounded-full hover:border-gold hover:text-gold transition-all duration-500 flex items-center justify-center gap-2 group"
            >
              {t.full_story} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modal-pop {
          from { opacity: 0; transform: scale(0.9) translateY(40px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-pop {
          animation: modal-pop 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default QuickViewModal;

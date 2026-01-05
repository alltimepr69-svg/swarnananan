
import React, { useState } from 'react';
import { Heart, Eye, ArrowUpRight } from 'lucide-react';
import { Product } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onQuickView: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
  t: any;
  isCompact?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onClick, 
  onQuickView, 
  isWishlisted = false,
  onToggleWishlist,
  t,
  isCompact = false
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const gallery = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product.image, product.hoverImage];

  // Logic to show the second image on hover
  const displayIndex = isHovered && gallery.length > 1 ? 1 : 0;

  return (
    <motion.div 
      layout
      className={`group flex flex-col cursor-pointer bg-white rounded-3xl lg:rounded-4xl shadow-sm hover:shadow-2xl transition-all duration-1000 
        ${isCompact ? 'p-1.5' : 'p-2 lg:p-3'}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative aspect-[1/1] overflow-hidden rounded-2xl lg:rounded-3xl bg-cream border border-cream/50 
        ${isCompact ? 'mb-3' : 'mb-5'}`}>
        
        {/* Parallax Image Layer Container */}
        <div className="absolute inset-0 w-full h-full">
          <AnimatePresence initial={false}>
            {gallery.map((img, idx) => (
              (idx === displayIndex) && (
                <motion.img 
                  key={img}
                  src={img} 
                  alt={`${product.name} ${idx + 1}`}
                  initial={{ 
                    opacity: 0, 
                    scale: 1.15,
                    x: idx === 1 ? 20 : -20, // Initial offset for parallax shift
                    y: 10
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: isHovered ? 1.1 : 1.0,
                    x: isHovered ? (idx === 1 ? 0 : -10) : 0,
                    y: isHovered ? -5 : 0
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 1.15,
                    x: idx === 1 ? -20 : 20,
                    transition: { duration: 0.8 }
                  }}
                  transition={{ 
                    duration: 1.2, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="absolute inset-0 w-full h-full object-cover transform-gpu"
                />
              )
            ))}
          </AnimatePresence>
        </div>
        
        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-charcoal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10" />

        {/* Wishlist Button */}
        <button 
          className={`absolute top-2 right-2 lg:top-4 lg:right-4 z-20 rounded-full flex items-center justify-center transition-all duration-700 shadow-sm
            ${isCompact ? 'w-8 h-8' : 'w-10 h-10'}
            ${isWishlisted 
              ? 'bg-red-50 text-red-500 border border-red-100 opacity-100 scale-110' 
              : 'bg-white/80 text-charcoal opacity-0 lg:group-hover:opacity-100 hover:text-red-500 hover:scale-110'}`}
          onClick={(e) => { 
            e.stopPropagation(); 
            onToggleWishlist?.(product);
          }}
        >
          <Heart size={isCompact ? 14 : 18} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {/* Quick View Button */}
        {!isCompact && (
          <div className="absolute inset-0 z-20 bg-charcoal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center hidden lg:flex">
              <motion.button 
                onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                className="px-6 py-3 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-sans font-bold uppercase tracking-widest text-charcoal shadow-xl hover:bg-gold hover:text-white transition-all duration-500 flex items-center gap-2"
              >
                <Eye size={14} /> {t.quick_view}
              </motion.button>
          </div>
        )}
      </div>

      <div className={`flex flex-col ${isCompact ? 'px-1 pb-2' : 'px-4 pb-4'}`}>
        <div className="flex justify-between items-start mb-1 lg:mb-2">
          <div className="max-w-[85%]">
            <p className={`font-sans text-gold font-bold tracking-[0.2em] uppercase mb-0.5 
              ${isCompact ? 'text-[7px]' : 'text-[10px]'}`}>
              {product.metal}
            </p>
            <h4 className={`font-serif text-charcoal leading-snug group-hover:text-gold transition-colors truncate
              ${isCompact ? 'text-[11px]' : 'text-base lg:text-lg'}`}>
              {product.name}
            </h4>
          </div>
          {!isCompact && (
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-cream flex items-center justify-center group-hover:bg-gold group-hover:border-gold group-hover:rotate-12 transition-all duration-700 hidden sm:flex">
               <ArrowUpRight size={16} className="text-gray-300 group-hover:text-white" />
            </div>
          )}
        </div>
        <p className={`font-sans font-medium text-charcoal ${isCompact ? 'text-sm' : 'text-xl'}`}>
          ₹{product.price.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;

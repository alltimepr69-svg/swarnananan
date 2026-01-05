
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroProps {
  t: any;
}

const Hero: React.FC<HeroProps> = ({ t }) => {
  const [activeSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2070&auto=format&fit=crop',
      title: t.hero_title_1,
      subtitle: t.hero_subtitle_1,
      cta: t.hero_cta
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative h-[100svh] bg-charcoal lg:px-6 lg:pb-6 pt-0 overflow-hidden">
      <div className="relative w-full h-full overflow-hidden lg:rounded-5xl shadow-2xl transition-all duration-1000">
        <AnimatePresence mode="wait">
          {slides.map((slide, idx) => idx === activeSlide && (
            <motion.div 
              key={idx}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal/70 z-10" />
              
              <motion.img 
                src={slide.image} 
                alt={slide.title}
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 15, ease: "linear" }}
                className="w-full h-full object-cover object-center"
              />
              
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 sm:px-10">
                <div className="transform -translate-y-8 lg:-translate-y-12 flex flex-col items-center w-full">
                  
                  {/* Brand & Location Identifier */}
                  <motion.div variants={itemVariants} className="flex flex-col items-center mb-10 lg:mb-14">
                    <span className="text-white text-3xl lg:text-7xl font-brand font-black tracking-[0.3em] uppercase mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                      SWARNA <span className="text-gold">MAHAL</span>
                    </span>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2.5 px-5 py-2.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-sm transition-all hover:bg-white/10 group cursor-default"
                    >
                      <MapPin size={14} className="text-gold group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] lg:text-[12px] font-sans font-bold uppercase tracking-[0.4em] text-white/90">Bellary, Karnataka</span>
                    </motion.div>
                  </motion.div>

                  <div className="overflow-hidden mb-4 sm:mb-6">
                    <motion.p variants={itemVariants} className="text-white text-[9px] sm:text-[11px] font-sans font-bold tracking-[0.4em] sm:tracking-[0.7em] uppercase opacity-90">
                      Modern Heritage Since 1994
                    </motion.p>
                  </div>

                  <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl lg:text-9xl text-white font-serif mb-6 sm:mb-8 leading-[1.1] sm:leading-tight tracking-tighter max-w-[95vw] lg:max-w-7xl mx-auto">
                    {slide.title}
                  </motion.h1>

                  <motion.p variants={itemVariants} className="text-white/90 text-base sm:text-xl lg:text-2xl font-serif italic mb-10 sm:mb-12 max-w-sm sm:max-w-lg mx-auto leading-relaxed">
                    {slide.subtitle}
                  </motion.p>

                  <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full px-8 sm:px-0">
                    <motion.button 
                      whileHover={{ scale: 1.02, backgroundColor: '#C5A059', color: '#FFFFFF' }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full sm:w-auto px-10 sm:px-12 py-4 sm:py-5 bg-white text-charcoal font-sans text-[10px] sm:text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-500 shadow-2xl"
                    >
                      {slide.cta}
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.02, backgroundColor: '#FFFFFF', color: '#2D2926' }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full sm:w-auto px-10 sm:px-12 py-4 sm:py-5 bg-transparent border border-white/40 backdrop-blur-sm text-white font-sans text-[10px] sm:text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-500 shadow-xl"
                    >
                      {t.hero_visit}
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
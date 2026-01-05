
import React from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../constants';

interface CategoryGridProps {
  t: any;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ t }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="py-20 lg:py-32 bg-cream px-4 lg:px-6">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-16 px-2 sm:px-4"
        >
          <div className="max-w-xl">
            <h2 className="text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.4em] uppercase text-gold mb-3 lg:mb-4">{t.category_subtitle}</h2>
            <h3 className="text-3xl sm:text-4xl lg:text-6xl font-serif text-charcoal leading-tight tracking-tight">{t.category_title}</h3>
          </div>
          <p className="mt-6 md:mt-0 text-xs sm:text-sm font-serif italic text-charcoal/50 max-w-xs md:text-right">
            Discover the artistry of fine jewelry crafted with modern sensibilities and ancient roots.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 auto-rows-[300px] sm:auto-rows-[300px] lg:auto-rows-[400px]"
        >
          {CATEGORIES.map((cat, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className={`group relative overflow-hidden cursor-pointer rounded-4xl lg:rounded-5xl shadow-sm hover:shadow-2xl transition-all duration-700 ${cat.span} sm:col-span-1 lg:${cat.span}`}
            >
              <img 
                src={cat.image} 
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent flex flex-col justify-end p-6 sm:p-8 lg:p-12">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                  <p className="text-white/60 text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-[0.3em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity">Explore</p>
                  <h4 className="text-xl sm:text-2xl lg:text-4xl text-white font-serif tracking-tight">{cat.name}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryGrid;
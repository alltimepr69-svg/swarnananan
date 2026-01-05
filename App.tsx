
import React, { useState, useEffect, useMemo } from 'react';
import GoldRateTicker from './components/GoldRateTicker';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ProductCard from './components/ProductCard';
import QuickViewModal from './components/QuickViewModal';
import GoldJewelleryPage from './components/GoldJewelleryPage';
import DiamondJewelleryPage from './components/DiamondJewelleryPage';
import SilverJewelleryPage from './components/SilverJewelleryPage';
import CollectionsPage from './components/CollectionsPage';
import WishlistPage from './components/WishlistPage';
import ReviewSection from './components/ReviewSection';
import LanguageGateway from './components/LanguageGateway';
import { MOCK_PRODUCTS } from './constants';
import { Page, Product } from './types';
import { Language, translations } from './translations';
import { ArrowLeft, Star, Truck, ShieldCheck, ShoppingBag, Heart, ChevronRight, ChevronLeft, Zap, LayoutGrid, Square } from 'lucide-react';
import { motion, LayoutGroup } from 'framer-motion';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language | null>(() => {
    const saved = localStorage.getItem('swarna_mahal_lang');
    return (saved === 'en' || saved === 'kn' || saved === 'hi') ? saved as Language : null;
  });

  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [plpSort, setPlpSort] = useState('Featured');
  const [mobileGridMode, setMobileGridMode] = useState<'single' | 'double'>('double');

  const t = language ? translations[language] : translations.en;

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentImageIndex(0);
  }, [currentPage, selectedProduct]);

  useEffect(() => {
    if (quickViewProduct || isChangingLanguage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [quickViewProduct, isChangingLanguage]);

  const sortedPlpProducts = useMemo(() => {
    const products = [...MOCK_PRODUCTS];
    if (plpSort === 'Price: Low to High') return products.sort((a, b) => a.price - b.price);
    if (plpSort === 'Price: High to Low') return products.sort((a, b) => b.price - a.price);
    if (plpSort === 'Newest Arrivals') return products.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    return products;
  }, [plpSort]);

  const handleSelectLanguage = (lang: Language) => {
    localStorage.setItem('swarna_mahal_lang', lang);
    setLanguage(lang);
    setIsChangingLanguage(false);
  };

  const handleNavigate = (page: string) => {
    if (page === 'plp') setCurrentPage(Page.PLP);
    if (page === 'home') setCurrentPage(Page.Home);
    if (page === 'quiz') setCurrentPage(Page.Quiz);
    if (page === 'gold') setCurrentPage(Page.Gold);
    if (page === 'diamond') setCurrentPage(Page.Diamond);
    if (page === 'silver') setCurrentPage(Page.Silver);
    if (page === 'collections') setCurrentPage(Page.Collections);
    if (page === 'wishlist') setCurrentPage(Page.Wishlist);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage(Page.PDP);
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isProductWishlisted = (id: string) => wishlist.some(item => item.id === id);

  const productGallery = selectedProduct ? [selectedProduct.image, selectedProduct.hoverImage, selectedProduct.image] : [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productGallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productGallery.length) % productGallery.length);
  };

  const BackButton = ({ label = "Back", target = 'home' }: { label?: string, target?: string }) => (
    <button 
      onClick={() => handleNavigate(target)} 
      className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 bg-white border border-cream rounded-full text-[10px] font-sans font-bold uppercase tracking-widest text-charcoal hover:text-gold hover:border-gold transition-all shadow-sm active:scale-95"
    >
      <ArrowLeft size={14} /> {label}
    </button>
  );

  const GridToggleControl = () => (
    <div className="flex lg:hidden bg-cream p-1 rounded-full border border-cream shadow-inner ml-auto sm:ml-0">
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
  );

  if (!language || isChangingLanguage) {
    return (
      <LanguageGateway 
        onSelect={handleSelectLanguage} 
        onClose={() => setIsChangingLanguage(false)} 
        showClose={!!language} 
      />
    );
  }

  return (
    <div 
      className={`min-h-screen flex flex-col font-sans selection:bg-gold/20 font-dynamic-serif`}
      data-lang={language}
    >
      <GoldRateTicker t={t} />
      <Header 
        onNavigate={handleNavigate} 
        wishlistCount={wishlist.length} 
        t={t} 
        onChangeLanguage={() => setIsChangingLanguage(true)}
        currentPage={currentPage}
      />

      <main className="flex-grow pt-[100px] lg:pt-[130px]">
        {currentPage === Page.Home && (
          <>
            <Hero t={t} />
            
            <section className="py-20 lg:py-32 bg-white px-6">
              <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 lg:mb-16 gap-6 px-2">
                  <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-3 sm:mb-4">
                       <Zap size={14} className="text-gold" fill="currentColor" />
                       <h2 className="text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase text-gold">{t.seasonal_drops}</h2>
                    </div>
                    <h3 className="text-3xl sm:text-4xl lg:text-7xl font-serif text-charcoal tracking-tighter">{t.latest_wonders}</h3>
                  </div>
                  <button 
                    onClick={() => setCurrentPage(Page.PLP)} 
                    className="w-full sm:w-auto px-10 py-4 border-2 border-cream rounded-full text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-widest hover:border-gold hover:text-gold transition-all transform active:scale-95"
                  >
                    {t.view_all}
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-10">
                  {MOCK_PRODUCTS.slice(0, 4).map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onClick={() => handleProductClick(product)}
                      onQuickView={handleQuickView}
                      isWishlisted={isProductWishlisted(product.id)}
                      onToggleWishlist={toggleWishlist}
                      t={t}
                      isCompact={true}
                    />
                  ))}
                </div>
              </div>
            </section>

            <CategoryGrid t={t} />

            <section className="py-24 lg:py-48 bg-charcoal text-white text-center px-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-gold blur-[200px]" />
              </div>
              <div className="max-w-4xl mx-auto relative z-10">
                <div className="flex justify-center gap-1 mb-8 sm:mb-12 text-gold">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <h3 className="text-xl sm:text-3xl lg:text-6xl font-serif mb-8 sm:mb-12 italic leading-[1.4] tracking-tight px-4 lg:px-0">
                  "Jewelry is more than adornment; it is the physical manifestation of our most cherished memories."
                </h3>
                <div className="w-16 sm:w-20 h-[1px] bg-gold mx-auto mb-6 sm:mb-8" />
                <p className="text-[9px] sm:text-[11px] font-sans font-bold tracking-[0.3em] sm:tracking-[0.5em] uppercase text-gold">Swarna Mahal Philosophy</p>
              </div>
            </section>
          </>
        )}

        {currentPage === Page.Gold && (
          <div className="container mx-auto px-4 lg:px-6">
            <BackButton />
            <GoldJewelleryPage 
              onProductClick={handleProductClick} 
              onQuickView={handleQuickView}
              t={t}
              isProductWishlisted={isProductWishlisted}
              toggleWishlist={toggleWishlist}
            />
          </div>
        )}

        {currentPage === Page.Diamond && (
          <div className="container mx-auto px-4 lg:px-6">
            <BackButton />
            <DiamondJewelleryPage 
              onProductClick={handleProductClick} 
              onQuickView={handleQuickView} 
              t={t}
              isProductWishlisted={isProductWishlisted}
              toggleWishlist={toggleWishlist}
            />
          </div>
        )}

        {currentPage === Page.Silver && (
          <div className="container mx-auto px-4 lg:px-6">
            <BackButton />
            <SilverJewelleryPage 
              onProductClick={handleProductClick} 
              onQuickView={handleQuickView} 
              t={t}
              isProductWishlisted={isProductWishlisted}
              toggleWishlist={toggleWishlist}
            />
          </div>
        )}

        {currentPage === Page.Collections && (
          <div className="container mx-auto px-4 lg:px-6">
            <BackButton />
            <CollectionsPage 
              onProductClick={handleProductClick} 
              onQuickView={handleQuickView} 
              t={t}
              isProductWishlisted={isProductWishlisted}
              toggleWishlist={toggleWishlist}
            />
          </div>
        )}

        {currentPage === Page.Wishlist && (
          <div className="container mx-auto px-4 lg:px-6">
            <BackButton />
            <WishlistPage 
              wishlist={wishlist}
              onProductClick={handleProductClick}
              onQuickView={handleQuickView}
              onToggleWishlist={toggleWishlist}
              onNavigateHome={() => handleNavigate('home')}
              t={t}
            />
          </div>
        )}

        {currentPage === Page.PLP && (
          <div className="container mx-auto px-4 lg:px-6 pb-20">
            <BackButton />
             <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                <aside className="hidden lg:block w-72 flex-shrink-0">
                  <div className="sticky top-32 p-8 bg-white rounded-4xl shadow-sm border border-cream">
                    <h2 className="text-2xl font-serif mb-10">Refine Archives</h2>
                    <div className="space-y-10">
                       <div>
                         <h4 className="text-[11px] font-sans font-bold uppercase tracking-widest text-gold mb-6">Category</h4>
                         <div className="flex flex-col gap-4">
                            {['Rings', 'Necklaces', 'Earrings'].map(c => (
                              <button key={c} className="text-left text-sm font-sans font-medium text-charcoal/60 hover:text-gold transition-colors flex items-center justify-between group">
                                {c} <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                              </button>
                            ))}
                         </div>
                       </div>
                    </div>
                  </div>
                </aside>

                <div className="flex-grow">
                   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 pb-8 border-b border-cream gap-4">
                      <p className="text-lg font-serif italic text-charcoal/40 order-2 sm:order-1">{t.all_pieces}: {MOCK_PRODUCTS.length}</p>
                      <div className="flex items-center gap-4 w-full sm:w-auto order-1 sm:order-2">
                         <GridToggleControl />
                         <select 
                          className="flex-grow sm:flex-grow-0 bg-white px-6 py-3 rounded-full text-[11px] font-sans font-bold uppercase tracking-widest shadow-sm outline-none cursor-pointer border border-cream hover:border-gold transition-colors"
                          value={plpSort}
                          onChange={(e) => setPlpSort(e.target.value)}
                        >
                          <option value="Featured">{t.sort_featured}</option>
                          <option value="Newest Arrivals">{t.sort_newest}</option>
                          <option value="Price: Low to High">{t.sort_price_low}</option>
                          <option value="Price: High to Low">{t.sort_price_high}</option>
                        </select>
                      </div>
                   </div>
                   
                   <LayoutGroup>
                    <motion.div 
                      layout
                      className={`grid gap-4 lg:gap-8 
                        ${mobileGridMode === 'single' ? 'grid-cols-1' : 'grid-cols-2'} 
                        sm:grid-cols-2 lg:grid-cols-3`}
                    >
                        {sortedPlpProducts.map(product => (
                          <ProductCard 
                            key={product.id} 
                            product={product} 
                            onClick={() => handleProductClick(product)}
                            onQuickView={handleQuickView}
                            isWishlisted={isProductWishlisted(product.id)}
                            onToggleWishlist={toggleWishlist}
                            t={t}
                            isCompact={mobileGridMode === 'double'}
                          />
                        ))}
                    </motion.div>
                   </LayoutGroup>
                </div>
             </div>
          </div>
        )}

        {currentPage === Page.PDP && selectedProduct && (
          <div className="pb-32 container mx-auto px-4 lg:px-6">
             <BackButton label={t.view_all} target="plp" />
             
             <div className="bg-white rounded-4xl lg:rounded-5xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-cream mb-24">
                <div className="lg:w-1/2 p-4 lg:p-12 flex flex-col">
                   <div className="aspect-square bg-cream rounded-3xl lg:rounded-4xl overflow-hidden shadow-inner relative group">
                      {productGallery.map((img, idx) => (
                        <img 
                          key={idx}
                          src={img} 
                          alt={`${selectedProduct.name} ${idx}`} 
                          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${idx === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`} 
                        />
                      ))}

                      <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center text-charcoal opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all z-10">
                        <ChevronLeft size={20} />
                      </button>
                      <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center text-charcoal opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all z-10">
                        <ChevronRight size={20} />
                      </button>
                   </div>

                   <div className="grid grid-cols-3 gap-3 mt-6">
                      {productGallery.map((img, idx) => (
                         <div 
                           key={idx} 
                           onClick={() => setCurrentImageIndex(idx)}
                           className={`aspect-square bg-cream rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${idx === currentImageIndex ? 'border-gold' : 'border-transparent opacity-60'}`}
                         >
                            <img src={img} className="w-full h-full object-cover" />
                         </div>
                      ))}
                   </div>
                </div>

                <div className="lg:w-1/2 p-6 lg:p-20 flex flex-col">
                   <div className="flex items-center gap-2 mb-4">
                     <div className="h-[2px] w-6 bg-gold" />
                     <p className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-gold">{selectedProduct.category}</p>
                   </div>
                   <div className="flex justify-between items-start mb-6">
                      <h1 className="text-3xl lg:text-7xl font-serif text-charcoal leading-tight tracking-tighter max-w-[80%]">{selectedProduct.name}</h1>
                      <button 
                        onClick={() => toggleWishlist(selectedProduct)}
                        className={`p-4 rounded-full transition-all duration-500 shadow-sm border ${isProductWishlisted(selectedProduct.id) ? 'bg-red-50 text-red-500 border-red-100' : 'bg-cream text-charcoal border-cream hover:text-red-500'}`}
                      >
                        <Heart size={24} fill={isProductWishlisted(selectedProduct.id) ? "currentColor" : "none"} />
                      </button>
                   </div>
                   
                   <div className="flex items-center gap-6 mb-10">
                      <span className="text-2xl lg:text-5xl font-sans font-light text-charcoal">₹{selectedProduct.price.toLocaleString()}</span>
                   </div>

                   <div className="space-y-8 mb-12">
                      <div className="grid grid-cols-2 gap-3">
                         <div className="p-5 bg-cream rounded-2xl">
                            <p className="text-[9px] font-sans font-bold uppercase tracking-widest text-gold/60 mb-1">{t.composition}</p>
                            <p className="text-sm font-sans font-bold">{selectedProduct.metal} {selectedProduct.purity}</p>
                         </div>
                         <div className="p-5 bg-cream rounded-2xl">
                            <p className="text-[9px] font-sans font-bold uppercase tracking-widest text-gold/60 mb-1">{t.gross_weight}</p>
                            <p className="text-sm font-sans font-bold">{selectedProduct.weight}</p>
                         </div>
                      </div>
                      
                      <div className="border-t border-cream pt-8">
                         <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-charcoal/30 mb-4">{t.product_story}</p>
                         <p className="text-base lg:text-xl text-charcoal/70 font-serif italic leading-relaxed">
                            "{selectedProduct.description}"
                         </p>
                      </div>

                      <ReviewSection t={t} />
                   </div>

                   <div className="flex flex-col sm:flex-row gap-4 mb-10">
                      <button className="flex-[3] py-5 bg-charcoal text-white text-[11px] font-bold tracking-[0.15em] uppercase rounded-full hover:bg-gold transition-all duration-500 shadow-xl active:scale-95 flex items-center justify-center gap-3">
                         <ShoppingBag size={18} /> {t.reserve_piece}
                      </button>
                      <button 
                        onClick={() => toggleWishlist(selectedProduct)}
                        className={`flex-1 py-5 border rounded-full flex items-center justify-center transition-all ${isProductWishlisted(selectedProduct.id) ? 'bg-red-50 border-red-100 text-red-500' : 'border-cream text-charcoal hover:bg-cream'}`}
                      >
                         <Heart size={18} fill={isProductWishlisted(selectedProduct.id) ? "currentColor" : "none"} />
                      </button>
                   </div>

                   <div className="grid grid-cols-2 gap-6 pt-8 border-t border-cream">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center text-gold"><Truck size={18} /></div>
                         <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-charcoal/40">Express Global</span>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center text-gold"><ShieldCheck size={18} /></div>
                         <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-charcoal/40">Authentic BIS</span>
                      </div>
                   </div>
                </div>
             </div>

             {/* You May Also Like Section */}
             <section className="mt-32">
                <div className="flex items-center justify-between mb-12 border-b border-cream pb-8 px-4">
                  <h3 className="text-3xl lg:text-5xl font-serif text-charcoal tracking-tight">{t.related_masterpieces}</h3>
                  <button onClick={() => setCurrentPage(Page.PLP)} className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold hover:text-charcoal transition-colors">
                    {t.view_all} Archives
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-10">
                   {MOCK_PRODUCTS
                      .filter(p => p.id !== selectedProduct.id && (p.category === selectedProduct.category || p.collection === selectedProduct.collection))
                      .slice(0, 4)
                      .map(product => (
                         <ProductCard 
                           key={product.id} 
                           product={product} 
                           onClick={() => handleProductClick(product)}
                           onQuickView={handleQuickView}
                           isWishlisted={isProductWishlisted(product.id)}
                           onToggleWishlist={toggleWishlist}
                           t={t}
                           isCompact={true}
                         />
                      ))
                   }
                </div>
             </section>
          </div>
        )}
      </main>

      {quickViewProduct && (
        <QuickViewModal 
          product={quickViewProduct} 
          onClose={() => setQuickViewProduct(null)} 
          onViewDetails={handleProductClick}
          t={t}
        />
      )}

      <footer className="bg-white border-t border-cream pt-20 pb-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:mb-24">
            <div className="text-center md:text-left">
              <h4 className="text-2xl font-brand tracking-[0.2em] uppercase mb-6">SWARNA <span className="text-gold">MAHAL</span></h4>
              <p className="text-sm text-charcoal/40 font-serif italic leading-relaxed">{t.footer_philosophy}</p>
            </div>
            <div className="hidden lg:block">
               <h5 className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold mb-6">{t.nav_collections}</h5>
               <ul className="space-y-3 text-xs font-sans font-medium text-charcoal/50">
                  <li><button onClick={() => handleNavigate('gold')} className="hover:text-gold transition-colors">{t.nav_gold}</button></li>
                  <li><button onClick={() => handleNavigate('diamond')} className="hover:text-gold transition-colors">{t.nav_diamond}</button></li>
                  <li><button onClick={() => handleNavigate('silver')} className="hover:text-gold transition-colors">{t.nav_silver}</button></li>
                  <li><button onClick={() => handleNavigate('collections')} className="hover:text-gold transition-colors">{t.nav_collections}</button></li>
               </ul>
            </div>
            <div className="hidden lg:block">
               <h5 className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold mb-6">Client Care</h5>
               <ul className="space-y-3 text-xs font-sans font-medium text-charcoal/50">
                  <li><button className="hover:text-gold transition-colors">Virtual Styling</button></li>
                  <li><button className="hover:text-gold transition-colors">Store Locator</button></li>
                  <li><button className="hover:text-gold transition-colors">Lifetime Warranty</button></li>
               </ul>
            </div>
            <div>
               <h5 className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold mb-6">Stay Inspired</h5>
               <div className="flex bg-cream p-1 rounded-full pl-5">
                 <input type="email" placeholder="Email" className="bg-transparent flex-grow text-[10px] font-sans outline-none" />
                 <button className="bg-charcoal text-white px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest">Join</button>
               </div>
            </div>
          </div>
          <div className="flex flex-col items-center pt-8 border-t border-cream text-[9px] font-sans font-bold tracking-[0.2em] uppercase text-charcoal/20">
            <p>© 2024 Swarna Mahal • {t.footer_rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

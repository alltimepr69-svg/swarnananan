
import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, Languages } from 'lucide-react';
import { Page } from '../types';

interface HeaderProps {
  onNavigate: (page: string) => void;
  wishlistCount: number;
  t: any;
  onChangeLanguage: () => void;
  currentPage: Page;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, wishlistCount, t, onChangeLanguage, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = currentPage === Page.Home;
  
  // Text color logic: Only use white text at the top of the Home page hero.
  // Everywhere else (scrolled, subpages, language gateway), use charcoal.
  const textColor = (isHome && !isScrolled) ? 'text-white' : 'text-charcoal';
  const navBackground = (isHome && !isScrolled) 
    ? 'bg-white/10 backdrop-blur-sm' 
    : (isScrolled ? 'glass scale-[0.98] lg:scale-90 translate-y-1' : 'bg-white');

  return (
    <header className="fixed top-[32px] left-0 right-0 z-[50] transition-all duration-700 pointer-events-none px-4 lg:px-0">
      <div className="container mx-auto flex justify-center">
        <div className={`
          flex items-center justify-between w-full max-w-7xl px-4 lg:px-10 h-14 lg:h-20
          rounded-full pointer-events-auto transition-all duration-700 pill-shadow
          ${navBackground} ${textColor}
        `}>
          
          <div className="flex lg:hidden">
            <button onClick={() => setIsMenuOpen(true)} className="p-2 transition-colors hover:text-gold">
              <Menu size={20} />
            </button>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-[10px] font-sans font-medium tracking-[0.15em] uppercase">
            <button onClick={() => onNavigate('gold')} className="hover:text-gold transition-colors">{t.nav_gold}</button>
            <button onClick={() => onNavigate('diamond')} className="hover:text-gold transition-colors">{t.nav_diamond}</button>
            <button onClick={() => onNavigate('silver')} className="hover:text-gold transition-colors">{t.nav_silver}</button>
            <button onClick={() => onNavigate('collections')} className="hover:text-gold transition-colors">{t.nav_collections}</button>
          </nav>

          <div className="absolute left-1/2 -translate-x-1/2">
            <button 
              onClick={() => onNavigate('home')} 
              className="flex items-center justify-center transition-colors hover:opacity-80"
            >
              <span className="text-base lg:text-xl font-brand tracking-[0.2em] leading-none uppercase">
                SWARNA <span className="text-gold">MAHAL</span>
              </span>
            </button>
          </div>

          <div className="flex items-center gap-3 lg:gap-6">
            <button onClick={() => setIsSearchOpen(true)} className="hover:text-gold transition-colors p-1"><Search size={18} /></button>
            <button 
              onClick={() => onNavigate('wishlist')}
              className="hover:text-gold transition-colors p-1 relative"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div className="fixed inset-0 bg-cream/95 backdrop-blur-xl z-[100] p-6 flex flex-col items-center animate-fade-in pointer-events-auto">
          <button onClick={() => setIsSearchOpen(false)} className="absolute top-6 right-6 text-charcoal p-3 bg-white rounded-full shadow-lg">
            <X size={20} />
          </button>
          <div className="w-full max-w-2xl mt-24 lg:mt-32">
            <h2 className="text-2xl lg:text-5xl font-serif mb-8 lg:mb-12 text-center text-charcoal">Find your sparkle</h2>
            <div className="relative border-b-2 border-gold/30 pb-4 focus-within:border-gold transition-colors">
              <input 
                type="text" 
                placeholder="Search archives..."
                className="w-full bg-transparent outline-none text-lg lg:text-2xl font-sans"
                autoFocus
              />
              <Search className="absolute right-0 top-1 text-gold" size={20} />
            </div>
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-[110] flex flex-col animate-slide-in pointer-events-auto rounded-none lg:hidden">
           <div className="p-6 flex items-center justify-between border-b border-cream">
             <button onClick={() => { onNavigate('home'); setIsMenuOpen(false); }} className="text-lg font-brand tracking-widest uppercase text-charcoal">SWARNA <span className="text-gold">MAHAL</span></button>
             <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-cream rounded-full text-charcoal"><X size={20} /></button>
           </div>
           <div className="flex-grow flex flex-col justify-center px-10 gap-8">
              <button onClick={() => { onNavigate('gold'); setIsMenuOpen(false); }} className="text-3xl font-brand text-left text-charcoal hover:text-gold transition-colors">{t.nav_gold}</button>
              <button onClick={() => { onNavigate('diamond'); setIsMenuOpen(false); }} className="text-3xl font-brand text-left text-charcoal hover:text-gold transition-colors">{t.nav_diamond}</button>
              <button onClick={() => { onNavigate('silver'); setIsMenuOpen(false); }} className="text-3xl font-brand text-left text-charcoal hover:text-gold transition-colors">{t.nav_silver}</button>
              <button onClick={() => { onNavigate('collections'); setIsMenuOpen(false); }} className="text-3xl font-brand text-left text-charcoal hover:text-gold transition-colors">{t.nav_collections}</button>
              <button onClick={() => { onNavigate('wishlist'); setIsMenuOpen(false); }} className="text-3xl font-brand text-left text-charcoal hover:text-gold transition-colors flex items-center gap-4">
                {t.nav_wishlist} {wishlistCount > 0 && <span className="text-sm bg-red-500 text-white px-3 py-1 rounded-full">{wishlistCount}</span>}
              </button>
              <button 
                onClick={() => { onChangeLanguage(); setIsMenuOpen(false); }} 
                className="text-xl font-sans font-bold uppercase tracking-widest text-gold flex items-center gap-3 border-t border-cream pt-8"
              >
                <Languages size={20} /> Change Language
              </button>
           </div>
           <div className="p-10 border-t border-cream flex gap-4 overflow-x-auto no-scrollbar">
              <button className="px-6 py-3 bg-cream rounded-full whitespace-nowrap text-[10px] font-sans font-bold uppercase tracking-widest text-charcoal">Support</button>
              <button className="px-6 py-3 bg-gold text-white rounded-full whitespace-nowrap text-[10px] font-sans font-bold uppercase tracking-widest">Stores</button>
           </div>
        </div>
      )}
    </header>
  );
};

export default Header;

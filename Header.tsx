
import React, { useState, useEffect } from 'react';
import { Search, Heart, User, ShoppingBag, Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 pointer-events-none`}>
      <div className="container mx-auto px-4 py-4 lg:py-8 flex justify-center">
        <div className={`
          flex items-center justify-between w-full max-w-7xl px-6 lg:px-10 h-16 lg:h-20
          rounded-full pointer-events-auto transition-all duration-700 pill-shadow
          ${isScrolled ? 'glass scale-95 lg:scale-90 translate-y-2' : 'bg-white lg:bg-white/10 lg:backdrop-blur-sm lg:text-white'}
        `}>
          
          {/* Left: Desktop Menu / Mobile Menu Trigger */}
          <div className="flex items-center lg:hidden">
            <button onClick={() => setIsMenuOpen(true)} className={isScrolled ? 'text-charcoal' : 'text-charcoal lg:text-white'}>
              <Menu size={22} />
            </button>
          </div>

          <nav className="hidden lg:flex items-center gap-10 text-[11px] font-sans font-medium tracking-[0.15em] uppercase">
            <button onClick={() => onNavigate('gold')} className="hover:text-gold transition-colors">Gold</button>
            <button onClick={() => onNavigate('diamond')} className="hover:text-gold transition-colors">Diamond</button>
            <button onClick={() => onNavigate('silver')} className="hover:text-gold transition-colors">Silver</button>
            <button onClick={() => onNavigate('collections')} className="hover:text-gold transition-colors">Collections</button>
          </nav>

          {/* Center: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <button onClick={() => onNavigate('home')} className={`text-xl lg:text-2xl font-serif tracking-tight transition-colors ${isScrolled ? 'text-charcoal' : 'text-charcoal lg:text-white'}`}>
              SWARNA<span className="text-gold italic">MAHAL</span>
            </button>
          </div>

          {/* Right: Icons */}
          <div className={`flex items-center gap-4 lg:gap-6 ${isScrolled ? 'text-charcoal' : 'text-charcoal lg:text-white'}`}>
            <button onClick={() => setIsSearchOpen(true)} className="hover:text-gold transition-colors"><Search size={19} /></button>
            <button className="hidden sm:block hover:text-gold transition-colors"><Heart size={19} /></button>
            <button className="hover:text-gold transition-colors relative">
              <ShoppingBag size={19} />
              <span className="absolute -top-1.5 -right-1.5 bg-gold text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">0</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modern Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-cream/95 backdrop-blur-xl z-[60] p-6 flex flex-col items-center animate-fade-in pointer-events-auto">
          <button onClick={() => setIsSearchOpen(false)} className="absolute top-8 right-8 text-charcoal p-3 bg-white rounded-full shadow-lg">
            <X size={24} />
          </button>
          <div className="w-full max-w-2xl mt-32">
            <h2 className="text-3xl lg:text-5xl font-serif mb-12 text-center text-charcoal">Find your sparkle</h2>
            <div className="relative border-b-2 border-gold/30 pb-4 focus-within:border-gold transition-colors">
              <input 
                type="text" 
                placeholder="Search our archives..."
                className="w-full bg-transparent outline-none text-xl lg:text-2xl font-sans"
                autoFocus
              />
              <Search className="absolute right-0 top-1 text-gold" />
            </div>
            <div className="mt-12">
              <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold mb-6 text-center">Trending Searches</p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Wedding Bands', 'Rose Gold', 'Pendants', 'Solitaires'].map(tag => (
                  <button key={tag} className="px-5 py-2.5 bg-white rounded-full text-xs font-sans font-medium text-charcoal hover:bg-gold hover:text-white transition-all shadow-sm">{tag}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rounded Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-[70] flex flex-col animate-slide-in pointer-events-auto rounded-none lg:hidden">
           <div className="p-6 flex items-center justify-between">
             <button onClick={() => onNavigate('home')} className="text-2xl font-serif">SWARNA<span className="text-gold italic">MAHAL</span></button>
             <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-cream rounded-full"><X size={24} /></button>
           </div>
           <div className="flex-grow flex flex-col justify-center px-10 gap-8">
              <button onClick={() => { onNavigate('gold'); setIsMenuOpen(false); }} className="text-4xl font-serif text-left hover:text-gold transition-colors">Gold</button>
              <button onClick={() => { onNavigate('diamond'); setIsMenuOpen(false); }} className="text-4xl font-serif text-left hover:text-gold transition-colors">Diamond</button>
              <button onClick={() => { onNavigate('silver'); setIsMenuOpen(false); }} className="text-4xl font-serif text-left hover:text-gold transition-colors">Silver</button>
              <button onClick={() => { onNavigate('collections'); setIsMenuOpen(false); }} className="text-4xl font-serif text-left hover:text-gold transition-colors">Collections</button>
           </div>
           <div className="p-10 border-t border-cream flex gap-6 overflow-x-auto no-scrollbar">
              <button className="px-6 py-3 bg-cream rounded-full whitespace-nowrap text-xs font-sans font-bold uppercase tracking-widest">Track Order</button>
              <button className="px-6 py-3 bg-gold text-white rounded-full whitespace-nowrap text-xs font-sans font-bold uppercase tracking-widest">Store Locator</button>
           </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in { from { transform: translateY(-100%); } to { transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        .animate-slide-in { animation: slide-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </header>
  );
};

export default Header;

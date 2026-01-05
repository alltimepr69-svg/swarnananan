
import React from 'react';
import { X } from 'lucide-react';
import { Language, translations } from '../translations';

interface LanguageGatewayProps {
  onSelect: (lang: Language) => void;
  onClose?: () => void;
  showClose?: boolean;
}

const LanguageGateway: React.FC<LanguageGatewayProps> = ({ onSelect, onClose, showClose }) => {
  return (
    <div className="fixed inset-0 z-[1000] bg-cream flex flex-col items-center justify-center p-6 text-center animate-fade-in">
      {showClose && onClose && (
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-4 bg-white rounded-full shadow-lg text-charcoal hover:text-gold transition-all active:scale-95 border border-cream"
        >
          <X size={24} />
        </button>
      )}
      
      <div className="max-w-xl w-full">
        <div className="mb-16">
          <h1 className="text-3xl lg:text-5xl font-brand tracking-[0.3em] uppercase mb-4">
            SWARNA <span className="text-gold">MAHAL</span>
          </h1>
          <div className="w-12 h-[2px] bg-gold mx-auto mb-8" />
        </div>

        <h2 className="text-2xl lg:text-3xl font-serif text-charcoal mb-4 italic">
          Heritage Archive
        </h2>
        <p className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-charcoal/40 mb-16">
          Choose your language
        </p>

        <div className="grid grid-cols-1 gap-4">
          <button 
            onClick={() => onSelect('en')}
            className="group py-6 border-b border-cream hover:border-gold transition-all duration-500"
          >
            <span className="text-xs font-sans font-bold uppercase tracking-[0.4em] text-charcoal/60 group-hover:text-gold">English</span>
          </button>
          <button 
            onClick={() => onSelect('kn')}
            className="group py-6 border-b border-cream hover:border-gold transition-all duration-500"
          >
            <span className="text-xl font-kannada text-charcoal/60 group-hover:text-gold">ಕನ್ನಡ</span>
          </button>
          <button 
            onClick={() => onSelect('hi')}
            className="group py-6 border-b border-cream hover:border-gold transition-all duration-500"
          >
            <span className="text-xl font-hindi text-charcoal/60 group-hover:text-gold">हिन्दी</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default LanguageGateway;

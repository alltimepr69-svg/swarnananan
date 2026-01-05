
import React, { useState } from 'react';
import { Sparkles, Loader2, RefreshCcw, ChevronRight } from 'lucide-react';
import { getGiftRecommendation } from '../services/gemini';
import { QuizState } from '../types';

interface GiftFinderProps {
  t: any;
}

const GiftFinder: React.FC<GiftFinderProps> = ({ t }) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const [quizData, setQuizData] = useState<QuizState>({
    occasion: '',
    budget: '',
    style: ''
  });

  const steps = [
    { 
      id: 'occasion', 
      label: 'Select Occasion', 
      options: ['Anniversary', 'Wedding', 'Engagement', 'Daily Glow'] 
    },
    { 
      id: 'budget', 
      label: 'Define Budget', 
      options: ['Under ₹50k', '₹50k - ₹2L', 'Above ₹2L'] 
    },
    { 
      id: 'style', 
      label: 'Aesthetic Tone', 
      options: ['Minimalist', 'Classic Heritage', 'Bold Statement'] 
    }
  ];

  const handleSelect = async (option: string) => {
    const currentStep = steps[step];
    const newData = { ...quizData, [currentStep.id]: option };
    setQuizData(newData);

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      const recommendation = await getGiftRecommendation(newData);
      setResults(recommendation);
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(0);
    setResults(null);
    setQuizData({ occasion: '', budget: '', style: '' });
  };

  return (
    <section className="py-24 lg:py-48 bg-cream px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="bg-white p-10 lg:p-24 shadow-2xl rounded-5xl border border-cream relative">
          
          {!results && !loading && (
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                   <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold"><Sparkles size={24} /></div>
                   <h2 className="text-[11px] font-sans font-bold tracking-[0.4em] uppercase text-gold">{t.concierge_ai}</h2>
                </div>
                <h3 className="text-4xl lg:text-6xl font-serif text-charcoal mb-6 leading-tight tracking-tight">{t.concierge_title}</h3>
                <p className="text-lg lg:text-xl text-charcoal/40 font-serif italic mb-10 leading-relaxed">{t.concierge_desc}</p>
              </div>

              <div className="lg:w-1/2 w-full">
                <div className="bg-cream/30 p-8 lg:p-12 rounded-4xl border border-cream">
                  <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold mb-8 flex items-center gap-2">
                    {t.step} {step + 1} of 3 <ChevronRight size={14} />
                  </p>
                  <h4 className="text-2xl font-serif text-charcoal mb-10">{steps[step].label}</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {steps[step].options.map(option => (
                      <button
                        key={option}
                        onClick={() => handleSelect(option)}
                        className="group w-full py-5 px-8 bg-white border-2 border-transparent hover:border-gold rounded-full transition-all duration-500 text-left flex justify-between items-center shadow-sm hover:shadow-xl active:scale-95"
                      >
                        <span className="text-xs font-sans font-bold uppercase tracking-widest text-charcoal/70 group-hover:text-gold transition-colors">{option}</span>
                        <ChevronRight size={18} className="text-gold opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="relative mb-12">
                <Loader2 className="animate-spin text-gold/20" size={100} strokeWidth={1} />
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold animate-pulse" size={32} />
              </div>
              <p className="text-2xl lg:text-3xl font-serif italic text-charcoal text-center px-4 animate-bounce">Curating your legacy pieces...</p>
            </div>
          )}

          {results && (
            <div className="animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-16 px-4">
                <div>
                  <h3 className="text-4xl lg:text-5xl font-serif text-charcoal tracking-tight mb-2">{t.bespoke_selection}</h3>
                  <p className="text-sm font-serif italic text-charcoal/40">{t.bespoke_desc}</p>
                </div>
                <button onClick={reset} className="px-8 py-4 bg-cream rounded-full flex items-center gap-3 text-[11px] font-sans font-bold uppercase tracking-widest text-charcoal hover:bg-gold hover:text-white transition-all shadow-sm active:scale-95">
                  <RefreshCcw size={14} /> {t.reset_selection}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {results.map((item, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-4xl border border-cream flex flex-col h-full shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 group">
                    <div className="w-12 h-12 bg-gold/5 rounded-2xl flex items-center justify-center text-gold mb-8 group-hover:bg-gold group-hover:text-white transition-all">
                       <Sparkles size={20} />
                    </div>
                    <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-gold mb-3 block">{item.category}</span>
                    <h4 className="text-2xl font-serif text-charcoal mb-6 leading-tight">{item.title}</h4>
                    <p className="text-sm text-charcoal/50 font-sans font-medium leading-relaxed mb-10 flex-grow italic">"{item.reason}"</p>
                    <button className="w-full py-5 bg-charcoal text-white text-[11px] font-bold tracking-widest uppercase rounded-full hover:bg-gold transition-all shadow-xl active:scale-95">
                       {t.reserve_piece}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GiftFinder;

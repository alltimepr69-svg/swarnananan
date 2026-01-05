
import React, { useState, useEffect } from 'react';

interface GoldRateTickerProps {
  t: any;
}

const GoldRateTicker: React.FC<GoldRateTickerProps> = ({ t }) => {
  const [rates, setRates] = useState({ gold24k: 7250, gold22k: 6650 });

  useEffect(() => {
    const interval = setInterval(() => {
      setRates(prev => ({
        gold24k: prev.gold24k + (Math.random() - 0.5) * 5,
        gold22k: prev.gold22k + (Math.random() - 0.5) * 5
      }));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-charcoal text-white py-2 overflow-hidden whitespace-nowrap text-xs font-sans tracking-widest uppercase">
      <div className="flex animate-scroll items-center gap-12">
        <div className="flex items-center gap-2">
          <span className="text-gold font-bold">{t.ticker_gold24}:</span>
          <span>₹{rates.gold24k.toFixed(2)}/g</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gold font-bold">{t.ticker_gold22}:</span>
          <span>₹{rates.gold22k.toFixed(2)}/g</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gold font-bold">{t.ticker_silver}:</span>
          <span>₹92.50/g</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gold font-bold">{t.ticker_gold24}:</span>
          <span>₹{rates.gold24k.toFixed(2)}/g</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gold font-bold">{t.ticker_gold22}:</span>
          <span>₹{rates.gold22k.toFixed(2)}/g</span>
        </div>
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: inline-flex;
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default GoldRateTicker;

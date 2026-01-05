
import React, { useState } from 'react';
import { Star, Send, User, MessageSquare } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewSectionProps {
  t: any;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Ananya Sharma',
    rating: 5,
    comment: 'Absolutely stunning piece. The craftsmanship on the gold petals is unlike anything I have seen before. Truly a heritage piece.',
    date: '2 Oct 2023'
  },
  {
    id: '2',
    name: 'Vikram Mehta',
    rating: 4,
    comment: 'The weight is perfect and the shine is brilliant. My wife loved it for our anniversary.',
    date: '15 Jan 2024'
  }
];

const ReviewSection: React.FC<ReviewSectionProps> = ({ t }) => {
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const review: Review = {
      id: Date.now().toString(),
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setReviews([review, ...reviews]);
    setNewReview({ name: '', rating: 5, comment: '' });
  };

  return (
    <div className="mt-20 border-t border-cream pt-16">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Reviews List */}
        <div className="lg:w-3/5">
          <div className="flex items-center gap-3 mb-10">
            <MessageSquare size={18} className="text-gold" />
            <h3 className="text-[11px] font-sans font-bold uppercase tracking-[0.4em] text-gold">{t.client_reflections}</h3>
          </div>
          
          <div className="space-y-12">
            {reviews.map((review) => (
              <div key={review.id} className="animate-fade-in group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-serif text-charcoal mb-1">{review.name}</h4>
                    <p className="text-[10px] font-sans font-bold text-charcoal/30 uppercase tracking-widest">{review.date}</p>
                  </div>
                  <div className="flex gap-1 text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={12} 
                        fill={i < review.rating ? "currentColor" : "none"} 
                        className={i < review.rating ? "" : "text-gold/30"}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-base text-charcoal/60 font-serif italic leading-relaxed group-hover:text-charcoal transition-colors">
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Review Form */}
        <div className="lg:w-2/5">
          <div className="bg-cream/50 p-8 lg:p-10 rounded-4xl border border-cream shadow-sm">
            <h4 className="text-2xl font-serif text-charcoal mb-2">{t.share_story}</h4>
            <p className="text-xs font-sans text-charcoal/40 mb-8 uppercase tracking-widest">Your experience matters to the legacy.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-[9px] font-sans font-bold uppercase tracking-widest text-gold mb-2 block">Your Name</label>
                <input 
                  type="text" 
                  value={newReview.name}
                  onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                  className="w-full bg-white px-6 py-4 rounded-2xl text-sm font-sans outline-none border border-transparent focus:border-gold/30 transition-all shadow-inner"
                  placeholder="E.g. J. Doe"
                  required
                />
              </div>

              <div>
                <label className="text-[9px] font-sans font-bold uppercase tracking-widest text-gold mb-2 block">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setNewReview({...newReview, rating: star})}
                      className="transition-transform active:scale-90"
                    >
                      <Star 
                        size={24} 
                        className={`transition-colors ${ (hoverRating || newReview.rating) >= star ? 'text-gold' : 'text-gold/20' }`}
                        fill={(hoverRating || newReview.rating) >= star ? "currentColor" : "none"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[9px] font-sans font-bold uppercase tracking-widest text-gold mb-2 block">Comment</label>
                <textarea 
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  className="w-full bg-white px-6 py-4 rounded-2xl text-sm font-sans outline-none border border-transparent focus:border-gold/30 transition-all shadow-inner min-h-[120px] resize-none"
                  placeholder="Tell us about the piece..."
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-charcoal text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded-full hover:bg-gold transition-all duration-500 flex items-center justify-center gap-3 shadow-xl active:scale-95"
              >
                <Send size={14} /> {t.submit_reflection}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;

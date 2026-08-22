import React, { useEffect, useState } from 'react';
import { getProductsForPlacement } from '../data/products';
import ProductCard from './ProductCard';
import { trackEvent } from '../services/analytics';

type Trigger =
  | { type: 'timer'; delayMs: number }
  | { type: 'scroll'; targetId: string };

interface ProductBottomSheetProps {
  trigger: Trigger;
  listName: string;
  context: 'tossing' | 'result'; // also selects which products to show (see data/products.ts placement field)
  message: string;
  heading?: string; // omit for a leaner sheet (e.g. the tossing companion message already explains itself)
  progress?: { current: number; total: number }; // renders a dot tracker, e.g. hào 1-6 while tossing
}

// Mobile-only, dismissible bottom sheet — a true bottom sheet (flush to the device edge,
// rounded top corners only), not a floating card, so it reads as part of the app rather
// than an ad. Two trigger modes:
// - 'timer': fixed delay after mount (used during TOSSING — dead time while the coins animate)
// - 'scroll': fires when a given element id scrolls into view (used on RESULT — "Gia Đạo" card,
//   a stronger engagement signal than a fixed timer since it means the user is actually reading)
const ProductBottomSheet: React.FC<ProductBottomSheetProps> = ({ trigger, listName, context, message, heading, progress }) => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Sheet is CSS-hidden on desktop (lg:hidden) — skip entirely so desktop sessions
    // never fire product_sheet_shown/dismissed.
    if (!window.matchMedia('(max-width: 1023px)').matches) return;

    if (trigger.type === 'timer') {
      const timer = setTimeout(() => {
        setVisible(true);
        trackEvent('product_sheet_shown', { context });
      }, trigger.delayMs);
      return () => clearTimeout(timer);
    }

    const target = document.getElementById(trigger.targetId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          trackEvent('product_sheet_shown', { context });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(target);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger.type, trigger.type === 'timer' ? trigger.delayMs : trigger.targetId]);

  const handleDismiss = () => {
    setDismissed(true);
    trackEvent('product_sheet_dismissed', { context });
  };

  const isOpen = visible && !dismissed;

  return (
    <div
      className={`lg:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-500 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full pointer-events-none'}`}
    >
      <div className="relative rounded-t-[22px] bg-[#140b28]/80 backdrop-blur-xl overflow-hidden pt-3 px-4 pb-5 animate-sheet-breathe">
        {/* light seam along the top edge — where the sheet "meets" the ritual above */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-sheet-seam" />
        {/* soft sheen sweep */}
        <div className="pointer-events-none absolute inset-y-0 -left-[60%] w-2/5 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-sheet-sheen" />

        <div className="relative z-10 w-9 h-1 rounded-full bg-white/20 mx-auto mb-3" />

        <button
          onClick={handleDismiss}
          aria-label="Đóng"
          className="absolute top-3 right-4 z-10 p-1 -m-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        {heading && (
          <h3 className="relative z-10 flex items-center gap-2 text-sm font-semibold text-white mb-1 pr-6">
            <svg className="w-4 h-4 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 9.75V7.5m0 0H6.375a1.125 1.125 0 01-1.125-1.125v-1.5A1.125 1.125 0 016.375 3.75h11.25c.621 0 1.125.504 1.125 1.125v1.5A1.125 1.125 0 0117.625 7.5H12"></path></svg>
            {heading}
          </h3>
        )}

        <p className="relative z-10 text-xs text-slate-300 leading-relaxed mb-3 pr-6">
          {message}
        </p>

        {progress && (
          <div className="relative z-10 flex gap-1.5 mb-3">
            {Array.from({ length: progress.total }).map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i < progress.current ? 'bg-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.9)]' : 'bg-white/15'}`}
              />
            ))}
          </div>
        )}

        {/* Vertical snap-scroll feed, one product filling the view at a time — swipe up for
            the next, like scrolling TikTok. A sliver of the next card peeks at the bottom
            as a "there's more" affordance. */}
        <div className="relative z-10 h-[46vh] flex flex-col gap-3 overflow-y-auto snap-y snap-mandatory -mx-1 px-1">
          {getProductsForPlacement(context).map((product, idx) => (
            <ProductCard
              key={idx}
              product={product}
              index={idx}
              listName={listName}
              variant="feed"
              className="snap-start shrink-0 h-[88%]"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductBottomSheet;

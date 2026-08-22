import React, { useEffect, useState } from 'react';
import { getProductsForPlacement } from '../data/products';
import ProductCard from './ProductCard';
import { trackEvent } from '../services/analytics';

interface ProductSlideInProps {
  delayMs: number;
  listName: string;
  context: 'tossing' | 'result'; // also selects which products to show (see data/products.ts placement field)
  message: string;
  progress?: { current: number; total: number };
}

// Desktop-only counterpart to ProductBottomSheet: during TOSSING, slides in from the
// right edge after delayMs — same "give the ritual a moment first" reasoning as the
// mobile sheet's timer trigger, just as a fixed side panel instead of a bottom sheet
// (desktop has room beside the centered toss animation, no need to overlay it).
const ProductSlideIn: React.FC<ProductSlideInProps> = ({ delayMs, listName, context, message, progress }) => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(min-width: 1024px)').matches) return; // mobile has its own ProductBottomSheet

    const timer = setTimeout(() => {
      setVisible(true);
      trackEvent('product_sheet_shown', { context });
    }, delayMs);
    return () => clearTimeout(timer);
  }, [delayMs, context]);

  const handleDismiss = () => {
    setDismissed(true);
    trackEvent('product_sheet_dismissed', { context });
  };

  const isOpen = visible && !dismissed;

  return (
    <div
      className={`hidden lg:block fixed top-1/2 -translate-y-1/2 right-6 z-40 w-72 max-h-[calc(100vh-140px)] overflow-y-auto transition-all duration-700 ease-out ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0 pointer-events-none'}`}
    >
      <div className="relative rounded-2xl bg-[#140b28]/85 backdrop-blur-xl border border-white/10 overflow-hidden p-5 animate-panel-breathe">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-sheet-seam" />
        <div className="pointer-events-none absolute inset-y-0 -left-[60%] w-2/5 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-sheet-sheen" />

        <button
          onClick={handleDismiss}
          aria-label="Đóng"
          className="absolute top-4 right-4 z-10 p-1 -m-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <h3 className="relative z-10 flex items-center gap-2 text-base font-semibold text-white mb-2 pr-6">
          <svg className="w-5 h-5 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 9.75V7.5m0 0H6.375a1.125 1.125 0 01-1.125-1.125v-1.5A1.125 1.125 0 016.375 3.75h11.25c.621 0 1.125.504 1.125 1.125v1.5A1.125 1.125 0 0117.625 7.5H12"></path></svg>
          Vật Phẩm Hộ Mệnh Gợi Ý
        </h3>

        <p className="relative z-10 text-xs text-slate-300 leading-relaxed mb-4">
          {message}
        </p>

        {progress && (
          <div className="relative z-10 flex gap-1.5 mb-4">
            {Array.from({ length: progress.total }).map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i < progress.current ? 'bg-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.9)]' : 'bg-white/15'}`}
              />
            ))}
          </div>
        )}

        <div className="relative z-10 flex flex-col gap-2.5">
          {getProductsForPlacement(context).map((product, idx) => (
            <ProductCard key={idx} product={product} index={idx} listName={listName} variant="compact" className="w-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSlideIn;

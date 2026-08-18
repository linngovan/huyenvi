import React, { useEffect, useState } from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import { trackEvent } from '../services/analytics';

const SHOW_DELAY_MS = 5000;

// Mobile-only: appears as a dismissible bottom sheet once the user has stayed on the
// result screen for SHOW_DELAY_MS (a proxy for "actually reading, not just skimming").
const ProductBottomSheet: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      trackEvent('product_sheet_shown');
    }, SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    trackEvent('product_sheet_dismissed');
  };

  const isOpen = visible && !dismissed;

  return (
    <div
      className={`lg:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-500 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full pointer-events-none'}`}
    >
      <div className="mx-3 mb-3 bg-[#140b28]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_-4px_30px_rgba(0,0,0,0.4)]">
        <div className="flex items-start justify-between mb-1">
          <h3 className="flex items-center gap-2 text-base font-semibold text-white">
            <svg className="w-5 h-5 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 9.75V7.5m0 0H6.375a1.125 1.125 0 01-1.125-1.125v-1.5A1.125 1.125 0 016.375 3.75h11.25c.621 0 1.125.504 1.125 1.125v1.5A1.125 1.125 0 0117.625 7.5H12"></path></svg>
            Vật Phẩm Hộ Mệnh Gợi Ý
          </h3>
          <button
            onClick={handleDismiss}
            aria-label="Đóng"
            className="p-1 -m-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <p className="text-slate-500 text-[11px] font-light mb-3">
          Nội dung dưới đây có thể chứa liên kết tiếp thị liên kết.
        </p>

        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-1 -mx-1 px-1">
          {PRODUCTS.map((product, idx) => (
            <ProductCard
              key={idx}
              product={product}
              index={idx}
              listName="Bottom Sheet Vật Phẩm Gợi Ý"
              className="snap-start shrink-0 w-36"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductBottomSheet;

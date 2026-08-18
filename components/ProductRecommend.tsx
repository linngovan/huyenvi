import React from 'react';
import { PRODUCTS } from '../data/products';
import { trackEvent } from '../services/analytics';

const ProductRecommend: React.FC = () => {
  return (
    <div className="order-2 lg:order-none lg:col-span-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-1">
        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 9.75V7.5m0 0H6.375a1.125 1.125 0 01-1.125-1.125v-1.5A1.125 1.125 0 016.375 3.75h11.25c.621 0 1.125.504 1.125 1.125v1.5A1.125 1.125 0 0117.625 7.5H12"></path></svg>
        Vật Phẩm Hộ Mệnh Gợi Ý
      </h3>
      <p className="text-slate-500 text-xs font-light mb-5">
        Nội dung dưới đây có thể chứa liên kết tiếp thị liên kết.
      </p>

      {/* Mobile: horizontal scroll carousel. Desktop (lg): vertical stacked list, page scrolls to reveal more. */}
      <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible snap-x lg:snap-none snap-mandatory pb-2 lg:pb-0 -mx-1 px-1 lg:mx-0 lg:px-0">
        {PRODUCTS.map((product, idx) => (
          <a
            key={idx}
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={() => trackEvent('select_item', {
              item_list_name: 'Vật Phẩm Hộ Mệnh Gợi Ý',
              product_name: product.name,
              affiliate_link: product.affiliateLink,
              items: [{ item_name: product.name, index: idx }],
            })}
            className="snap-start lg:snap-align-none shrink-0 w-40 md:w-48 lg:w-full bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/40 transition-colors group"
          >
            <div className="aspect-square w-full overflow-hidden bg-white/5">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-3">
              <p className="text-slate-200 text-xs font-normal leading-snug line-clamp-2 mb-1.5 min-h-[2.2em]">
                {product.name}
              </p>
              <p className="text-slate-400 text-[11px] font-normal leading-snug mb-3">
                {product.summary}
              </p>
              <span className="block text-center text-[11px] font-semibold uppercase tracking-widest text-purple-300 group-hover:text-white bg-purple-500/10 group-hover:bg-purple-600 rounded-full py-2 transition-colors">
                Mua Ngay
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProductRecommend;

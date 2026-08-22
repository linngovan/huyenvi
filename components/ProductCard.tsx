import React from 'react';
import { Product } from '../data/products';
import { trackEvent } from '../services/analytics';

interface ProductCardProps {
  product: Product;
  index: number;
  listName: string;
  variant?: 'full' | 'compact' | 'feed';
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index, listName, variant = 'full', className = '' }) => {
  const handleClick = () => trackEvent('select_item', {
    item_list_name: listName,
    product_name: product.name,
    affiliate_link: product.affiliateLink,
    items: [{ item_name: product.name, index }],
  });

  if (variant === 'compact') {
    return (
      <a
        href={product.affiliateLink}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={handleClick}
        className={`flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-2 pr-3 hover:border-purple-500/40 transition-colors group ${className}`}
      >
        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-white/5">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-slate-200 font-normal leading-snug line-clamp-2 mb-1.5">
            {product.name}
          </p>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-white bg-purple-600 group-hover:bg-purple-500 rounded-full px-2.5 py-1 transition-colors">
            Xem Trên <img src="/icons/tiktok-logo.png" alt="TikTok" className="h-3 w-auto" /> →
          </span>
        </div>
      </a>
    );
  }

  if (variant === 'feed') {
    // For a parent with an explicit fixed height (e.g. a vertical snap-scroll feed) — the
    // image fills whatever space is left over after the text/button, instead of forcing
    // its own aspect-square height, which would starve the text of room.
    return (
      <a
        href={product.affiliateLink}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={handleClick}
        className={`flex flex-col bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/40 transition-colors group ${className}`}
      >
        <div className="flex-1 min-h-0 w-full overflow-hidden bg-white/5 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="p-3 shrink-0">
          <p className="text-slate-200 text-sm font-normal leading-snug line-clamp-2 mb-2">
            {product.name}
          </p>
          <span className="flex items-center justify-center gap-1.5 text-center text-xs font-semibold uppercase tracking-widest text-white bg-purple-600 group-hover:bg-purple-500 rounded-full py-2.5 shadow-[0_2px_10px_rgba(124,58,237,0.4)] transition-colors">
            Xem Trên <img src="/icons/tiktok-logo.png" alt="TikTok" className="h-3.5 w-auto" />
          </span>
        </div>
      </a>
    );
  }

  return (
    <a
      href={product.affiliateLink}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      className={`flex flex-col bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/40 transition-colors group ${className}`}
    >
      <div className="aspect-square w-full overflow-hidden bg-white/5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-3 flex flex-col flex-1">
        <p className="text-slate-200 text-xs font-normal leading-snug line-clamp-2 mb-1.5 min-h-[2.2em]">
          {product.name}
        </p>
        {product.summary && (
          <p className="text-slate-400 text-[11px] font-normal leading-snug mb-3">
            {product.summary}
          </p>
        )}
        <span className="mt-auto flex items-center justify-center gap-1.5 text-center text-xs font-semibold uppercase tracking-widest text-white bg-purple-600 group-hover:bg-purple-500 rounded-full py-2.5 shadow-[0_2px_10px_rgba(124,58,237,0.4)] transition-colors">
          Xem Trên <img src="/icons/tiktok-logo.png" alt="TikTok" className="h-3.5 w-auto" />
        </span>
      </div>
    </a>
  );
};

export default ProductCard;

import React from 'react';
import { Product } from '../data/products';
import { trackEvent } from '../services/analytics';

interface ProductCardProps {
  product: Product;
  index: number;
  listName: string;
  variant?: 'full' | 'compact';
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
        className={`flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl p-1.5 pr-3 hover:border-purple-500/40 transition-colors group ${className}`}
      >
        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white/5">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] text-slate-200 font-normal truncate mb-0.5">
            {product.name}
          </p>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-purple-300 group-hover:text-white transition-colors">
            Mua Ngay →
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
      className={`bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/40 transition-colors group ${className}`}
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
  );
};

export default ProductCard;

import React from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';

// Desktop-only sidebar (see ProductBottomSheet for the mobile equivalent).
const ProductRecommend: React.FC = () => {
  return (
    <div className="hidden lg:block lg:col-span-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-1">
        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 9.75V7.5m0 0H6.375a1.125 1.125 0 01-1.125-1.125v-1.5A1.125 1.125 0 016.375 3.75h11.25c.621 0 1.125.504 1.125 1.125v1.5A1.125 1.125 0 0117.625 7.5H12"></path></svg>
        Vật Phẩm Hộ Mệnh Gợi Ý
      </h3>
      <p className="text-slate-500 text-xs font-light mb-5">
        Nội dung dưới đây có thể chứa liên kết tiếp thị liên kết.
      </p>

      <div className="flex flex-col gap-4">
        {PRODUCTS.map((product, idx) => (
          <ProductCard key={idx} product={product} index={idx} listName="Sidebar Vật Phẩm Gợi Ý" className="w-full" />
        ))}
      </div>
    </div>
  );
};

export default ProductRecommend;

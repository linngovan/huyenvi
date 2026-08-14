export interface Product {
  name: string;
  summary: string;
  image: string;
  affiliateLink: string;
}

// Synced from the product Google Sheet. Same list shown for every hexagram for now (no tag mapping yet).
export const PRODUCTS: Product[] = [
  {
    name: "Sách - Combo 3 Vở Sổ chép kinh in mờ cao cấp Kinh Địa Tạng, Chú Đại Bi, Kinh Sám Hối (TẶNG KÈM BÚT VIẾT) - Anan Books",
    summary: "Sổ chép kinh Địa Tạng giúp người dùng gieo duyên lành, tích phước báu, thanh lọc tâm hồn và giải tỏa căng thẳng hiệu quả.",
    image: "/products/so_chep_kinh_dia_tang.webp",
    affiliateLink: "https://vt.tiktok.com/ZS9kNAwBYmoaT-PE6Yq/",
  },
  {
    name: "Nhang Khuynh diệp Mộc Thảo An Hương 20, 30, 40 cm thơm dịu | Nhang thơm thờ cúng",
    summary: "Nhang Khuynh Diệp Mộc Thảo An mang lại không gian ít khói với hương thơm tự nhiên, giúp thanh lọc không khí, khử mùi và hỗ trợ phòng ngừa cảm lạnh.",
    image: "/products/nhang_khuynh_diep.webp",
    affiliateLink: "https://vt.tiktok.com/ZS9kYR515FedP-NlWTW/",
  },
];

import { LineType } from './types';

export interface Hexagram {
    id: number;
    name: string;
    pattern: [LineType, LineType, LineType, LineType, LineType, LineType];
    upperTrigram: string;
    lowerTrigram: string;
}

/**
 * 64 Hexagrams of I Ching (Kinh Dịch) - King Wen Sequence
 * Pattern format: [Line1, Line2, Line3, Line4, Line5, Line6] (bottom to top)
 * 0 = Yin (Âm - broken line --  --), 1 = Yang (Dương - solid line ——)
 * 
 * Trigrams:
 * Càn ☰ (111), Đoài ☱ (011), Ly ☲ (101), Chấn ☳ (001)
 * Tốn ☴ (110), Khảm ☵ (010), Cấn ☶ (100), Khôn ☷ (000)
 */
export const HEXAGRAMS: Hexagram[] = [
    { id: 1, name: "Thuần Càn", pattern: [1, 1, 1, 1, 1, 1], upperTrigram: "Càn", lowerTrigram: "Càn" },
    { id: 2, name: "Thuần Khôn", pattern: [0, 0, 0, 0, 0, 0], upperTrigram: "Khôn", lowerTrigram: "Khôn" },
    { id: 3, name: "Thủy Lôi Truân", pattern: [1, 0, 0, 0, 1, 0], upperTrigram: "Khảm", lowerTrigram: "Chấn" },
    { id: 4, name: "Sơn Thủy Mông", pattern: [0, 1, 0, 1, 0, 0], upperTrigram: "Cấn", lowerTrigram: "Khảm" },
    { id: 5, name: "Thủy Thiên Nhu", pattern: [1, 1, 1, 0, 1, 0], upperTrigram: "Khảm", lowerTrigram: "Càn" },
    { id: 6, name: "Thiên Thủy Tụng", pattern: [0, 1, 0, 1, 1, 1], upperTrigram: "Càn", lowerTrigram: "Khảm" },
    { id: 7, name: "Địa Thủy Sư", pattern: [0, 1, 0, 0, 0, 0], upperTrigram: "Khôn", lowerTrigram: "Khảm" },
    { id: 8, name: "Thủy Địa Tỷ", pattern: [0, 0, 0, 0, 1, 0], upperTrigram: "Khảm", lowerTrigram: "Khôn" },
    { id: 9, name: "Phong Thiên Tiểu Súc", pattern: [1, 1, 1, 0, 1, 1], upperTrigram: "Tốn", lowerTrigram: "Càn" },
    { id: 10, name: "Thiên Trạch Lý", pattern: [1, 1, 0, 1, 1, 1], upperTrigram: "Càn", lowerTrigram: "Đoài" },

    { id: 11, name: "Địa Thiên Thái", pattern: [1, 1, 1, 0, 0, 0], upperTrigram: "Khôn", lowerTrigram: "Càn" },
    { id: 12, name: "Thiên Địa Bĩ", pattern: [0, 0, 0, 1, 1, 1], upperTrigram: "Càn", lowerTrigram: "Khôn" },
    { id: 13, name: "Thiên Hỏa Đồng Nhân", pattern: [1, 0, 1, 1, 1, 1], upperTrigram: "Càn", lowerTrigram: "Ly" },
    { id: 14, name: "Hỏa Thiên Đại Hữu", pattern: [1, 1, 1, 1, 0, 1], upperTrigram: "Ly", lowerTrigram: "Càn" },
    { id: 15, name: "Địa Sơn Khiêm", pattern: [1, 0, 0, 0, 0, 0], upperTrigram: "Khôn", lowerTrigram: "Cấn" },
    { id: 16, name: "Lôi Địa Dự", pattern: [0, 0, 0, 1, 0, 0], upperTrigram: "Chấn", lowerTrigram: "Khôn" },
    { id: 17, name: "Trạch Lôi Tùy", pattern: [1, 0, 0, 1, 1, 0], upperTrigram: "Đoài", lowerTrigram: "Chấn" },
    { id: 18, name: "Sơn Phong Cổ", pattern: [0, 1, 1, 1, 0, 0], upperTrigram: "Cấn", lowerTrigram: "Tốn" },
    { id: 19, name: "Địa Trạch Lâm", pattern: [1, 1, 0, 0, 0, 0], upperTrigram: "Khôn", lowerTrigram: "Đoài" },
    { id: 20, name: "Phong Địa Quan", pattern: [0, 0, 0, 0, 1, 1], upperTrigram: "Tốn", lowerTrigram: "Khôn" },

    { id: 21, name: "Hỏa Lôi Phệ Hạp", pattern: [1, 0, 0, 1, 0, 1], upperTrigram: "Ly", lowerTrigram: "Chấn" },
    { id: 22, name: "Sơn Hỏa Bí", pattern: [1, 0, 1, 1, 0, 0], upperTrigram: "Cấn", lowerTrigram: "Ly" },
    { id: 23, name: "Sơn Địa Bác", pattern: [0, 0, 0, 0, 0, 1], upperTrigram: "Cấn", lowerTrigram: "Khôn" },
    { id: 24, name: "Địa Lôi Phục", pattern: [1, 0, 0, 0, 0, 0], upperTrigram: "Khôn", lowerTrigram: "Chấn" },
    { id: 25, name: "Thiên Lôi Vô Vọng", pattern: [1, 0, 0, 1, 1, 1], upperTrigram: "Càn", lowerTrigram: "Chấn" },
    { id: 26, name: "Sơn Thiên Đại Súc", pattern: [1, 1, 1, 1, 0, 0], upperTrigram: "Cấn", lowerTrigram: "Càn" },
    { id: 27, name: "Sơn Lôi Di", pattern: [1, 0, 0, 1, 0, 0], upperTrigram: "Cấn", lowerTrigram: "Chấn" },
    { id: 28, name: "Trạch Phong Đại Quá", pattern: [0, 1, 1, 1, 1, 0], upperTrigram: "Đoài", lowerTrigram: "Tốn" },
    { id: 29, name: "Thuần Khảm", pattern: [0, 1, 0, 0, 1, 0], upperTrigram: "Khảm", lowerTrigram: "Khảm" },
    { id: 30, name: "Thuần Ly", pattern: [1, 0, 1, 1, 0, 1], upperTrigram: "Ly", lowerTrigram: "Ly" },

    { id: 31, name: "Trạch Sơn Hàm", pattern: [1, 0, 0, 1, 1, 0], upperTrigram: "Đoài", lowerTrigram: "Cấn" },
    { id: 32, name: "Lôi Phong Hằng", pattern: [0, 1, 1, 1, 0, 0], upperTrigram: "Chấn", lowerTrigram: "Tốn" },
    { id: 33, name: "Thiên Sơn Độn", pattern: [1, 0, 0, 1, 1, 1], upperTrigram: "Càn", lowerTrigram: "Cấn" },
    { id: 34, name: "Lôi Thiên Đại Tráng", pattern: [1, 1, 1, 1, 0, 0], upperTrigram: "Chấn", lowerTrigram: "Càn" },
    { id: 35, name: "Hỏa Địa Tấn", pattern: [0, 0, 0, 1, 0, 1], upperTrigram: "Ly", lowerTrigram: "Khôn" },
    { id: 36, name: "Địa Hỏa Minh Di", pattern: [1, 0, 1, 0, 0, 0], upperTrigram: "Khôn", lowerTrigram: "Ly" },
    { id: 37, name: "Phong Hỏa Gia Nhân", pattern: [1, 0, 1, 0, 1, 1], upperTrigram: "Tốn", lowerTrigram: "Ly" },
    { id: 38, name: "Hỏa Trạch Khuê", pattern: [1, 1, 0, 1, 0, 1], upperTrigram: "Ly", lowerTrigram: "Đoài" },
    { id: 39, name: "Thủy Sơn Kiển", pattern: [1, 0, 0, 0, 1, 0], upperTrigram: "Khảm", lowerTrigram: "Cấn" },
    { id: 40, name: "Lôi Thủy Giải", pattern: [0, 1, 0, 1, 0, 0], upperTrigram: "Chấn", lowerTrigram: "Khảm" },

    { id: 41, name: "Sơn Trạch Tổn", pattern: [1, 1, 0, 1, 0, 0], upperTrigram: "Cấn", lowerTrigram: "Đoài" },
    { id: 42, name: "Phong Lôi Ích", pattern: [1, 0, 0, 0, 1, 1], upperTrigram: "Tốn", lowerTrigram: "Chấn" },
    { id: 43, name: "Trạch Thiên Quải", pattern: [1, 1, 1, 1, 1, 0], upperTrigram: "Đoài", lowerTrigram: "Càn" },
    { id: 44, name: "Thiên Phong Cấu", pattern: [0, 1, 1, 1, 1, 1], upperTrigram: "Càn", lowerTrigram: "Tốn" },
    { id: 45, name: "Trạch Địa Tụy", pattern: [0, 0, 0, 1, 1, 0], upperTrigram: "Đoài", lowerTrigram: "Khôn" },
    { id: 46, name: "Địa Phong Thăng", pattern: [0, 1, 1, 0, 0, 0], upperTrigram: "Khôn", lowerTrigram: "Tốn" },
    { id: 47, name: "Trạch Thủy Khốn", pattern: [0, 1, 0, 1, 1, 0], upperTrigram: "Đoài", lowerTrigram: "Khảm" },
    { id: 48, name: "Thủy Phong Tỉnh", pattern: [0, 1, 1, 0, 1, 0], upperTrigram: "Khảm", lowerTrigram: "Tốn" },
    { id: 49, name: "Trạch Hỏa Cách", pattern: [1, 0, 1, 1, 1, 0], upperTrigram: "Đoài", lowerTrigram: "Ly" },
    { id: 50, name: "Hỏa Phong Đỉnh", pattern: [0, 1, 1, 1, 0, 1], upperTrigram: "Ly", lowerTrigram: "Tốn" },

    { id: 51, name: "Thuần Chấn", pattern: [1, 0, 0, 1, 0, 0], upperTrigram: "Chấn", lowerTrigram: "Chấn" },
    { id: 52, name: "Thuần Cấn", pattern: [0, 0, 1, 0, 0, 1], upperTrigram: "Cấn", lowerTrigram: "Cấn" },
    { id: 53, name: "Phong Sơn Tiệm", pattern: [1, 0, 0, 0, 1, 1], upperTrigram: "Tốn", lowerTrigram: "Cấn" },
    { id: 54, name: "Lôi Trạch Quy Muội", pattern: [1, 1, 0, 1, 0, 0], upperTrigram: "Chấn", lowerTrigram: "Đoài" },
    { id: 55, name: "Lôi Hỏa Phong", pattern: [1, 0, 1, 1, 0, 0], upperTrigram: "Chấn", lowerTrigram: "Ly" },
    { id: 56, name: "Hỏa Sơn Lữ", pattern: [0, 0, 1, 1, 0, 1], upperTrigram: "Ly", lowerTrigram: "Cấn" },
    { id: 57, name: "Thuần Tốn", pattern: [0, 1, 1, 0, 1, 1], upperTrigram: "Tốn", lowerTrigram: "Tốn" },
    { id: 58, name: "Thuần Đoài", pattern: [1, 1, 0, 1, 1, 0], upperTrigram: "Đoài", lowerTrigram: "Đoài" },
    { id: 59, name: "Phong Thủy Hoán", pattern: [0, 1, 0, 0, 1, 1], upperTrigram: "Tốn", lowerTrigram: "Khảm" },
    { id: 60, name: "Thủy Trạch Tiết", pattern: [1, 1, 0, 0, 1, 0], upperTrigram: "Khảm", lowerTrigram: "Đoài" },

    { id: 61, name: "Phong Trạch Trung Phu", pattern: [1, 1, 0, 0, 1, 1], upperTrigram: "Tốn", lowerTrigram: "Đoài" },
    { id: 62, name: "Lôi Sơn Tiểu Quá", pattern: [0, 0, 1, 1, 0, 0], upperTrigram: "Chấn", lowerTrigram: "Cấn" },
    { id: 63, name: "Thủy Hỏa Ký Tế", pattern: [1, 0, 1, 0, 1, 0], upperTrigram: "Khảm", lowerTrigram: "Ly" },
    { id: 64, name: "Hỏa Thủy Vị Tế", pattern: [0, 1, 0, 1, 0, 1], upperTrigram: "Ly", lowerTrigram: "Khảm" },
];

/**
 * Get hexagram name from line pattern
 * @param lines Array of 6 lines (bottom to top)
 * @returns Hexagram name in Vietnamese
 */
export function getHexagramName(lines: LineType[]): string {
    if (lines.length !== 6) {
        console.warn('Invalid hexagram: must have exactly 6 lines');
        return 'Quẻ Chưa Xác Định';
    }

    // Find matching hexagram
    const hexagram = HEXAGRAMS.find(h =>
        h.pattern.every((line, index) => line === lines[index])
    );

    if (!hexagram) {
        console.warn('Hexagram pattern not found:', lines);
        return 'Quẻ Chưa Xác Định';
    }

    return hexagram.name;
}

/**
 * Get full hexagram data from line pattern
 * @param lines Array of 6 lines (bottom to top)
 * @returns Hexagram object or null if not found
 */
export function getHexagram(lines: LineType[]): Hexagram | null {
    if (lines.length !== 6) {
        return null;
    }

    return HEXAGRAMS.find(h =>
        h.pattern.every((line, index) => line === lines[index])
    ) || null;
}

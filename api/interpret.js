import { GoogleGenAI, Type } from "@google/genai";

// Inline hexagram data - all 64 I Ching hexagrams
const HEXAGRAMS = [
    { id: 1, name: "Thuần Càn", pattern: [1, 1, 1, 1, 1, 1] },
    { id: 2, name: "Thuần Khôn", pattern: [0, 0, 0, 0, 0, 0] },
    { id: 3, name: "Thủy Lôi Truân", pattern: [1, 0, 0, 0, 1, 0] },
    { id: 4, name: "Sơn Thủy Mông", pattern: [0, 1, 0, 1, 0, 0] },
    { id: 5, name: "Thủy Thiên Nhu", pattern: [1, 1, 1, 0, 1, 0] },
    { id: 6, name: "Thiên Thủy Tụng", pattern: [0, 1, 0, 1, 1, 1] },
    { id: 7, name: "Địa Thủy Sư", pattern: [0, 1, 0, 0, 0, 0] },
    { id: 8, name: "Thủy Địa Tỷ", pattern: [0, 0, 0, 0, 1, 0] },
    { id: 9, name: "Phong Thiên Tiểu Súc", pattern: [1, 1, 1, 0, 1, 1] },
    { id: 10, name: "Thiên Trạch Lý", pattern: [1, 1, 0, 1, 1, 1] },
    { id: 11, name: "Địa Thiên Thái", pattern: [1, 1, 1, 0, 0, 0] },
    { id: 12, name: "Thiên Địa Bĩ", pattern: [0, 0, 0, 1, 1, 1] },
    { id: 13, name: "Thiên Hỏa Đồng Nhân", pattern: [1, 0, 1, 1, 1, 1] },
    { id: 14, name: "Hỏa Thiên Đại Hữu", pattern: [1, 1, 1, 1, 0, 1] },
    { id: 15, name: "Địa Sơn Khiêm", pattern: [1, 0, 0, 0, 0, 0] },
    { id: 16, name: "Lôi Địa Dự", pattern: [0, 0, 0, 1, 0, 0] },
    { id: 17, name: "Trạch Lôi Tùy", pattern: [1, 0, 0, 1, 1, 0] },
    { id: 18, name: "Sơn Phong Cổ", pattern: [0, 1, 1, 1, 0, 0] },
    { id: 19, name: "Địa Trạch Lâm", pattern: [1, 1, 0, 0, 0, 0] },
    { id: 20, name: "Phong Địa Quan", pattern: [0, 0, 0, 0, 1, 1] },
    { id: 21, name: "Hỏa Lôi Phệ Hạp", pattern: [1, 0, 0, 1, 0, 1] },
    { id: 22, name: "Sơn Hỏa Bí", pattern: [1, 0, 1, 1, 0, 0] },
    { id: 23, name: "Sơn Địa Bác", pattern: [0, 0, 0, 0, 0, 1] },
    { id: 24, name: "Địa Lôi Phục", pattern: [1, 0, 0, 0, 0, 0] },
    { id: 25, name: "Thiên Lôi Vô Vọng", pattern: [1, 0, 0, 1, 1, 1] },
    { id: 26, name: "Sơn Thiên Đại Súc", pattern: [1, 1, 1, 1, 0, 0] },
    { id: 27, name: "Sơn Lôi Di", pattern: [1, 0, 0, 1, 0, 0] },
    { id: 28, name: "Trạch Phong Đại Quá", pattern: [0, 1, 1, 1, 1, 0] },
    { id: 29, name: "Thuần Khảm", pattern: [0, 1, 0, 0, 1, 0] },
    { id: 30, name: "Thuần Ly", pattern: [1, 0, 1, 1, 0, 1] },
    { id: 31, name: "Trạch Sơn Hàm", pattern: [1, 0, 0, 1, 1, 0] },
    { id: 32, name: "Lôi Phong Hằng", pattern: [0, 1, 1, 1, 0, 0] },
    { id: 33, name: "Thiên Sơn Độn", pattern: [1, 0, 0, 1, 1, 1] },
    { id: 34, name: "Lôi Thiên Đại Tráng", pattern: [1, 1, 1, 1, 0, 0] },
    { id: 35, name: "Hỏa Địa Tấn", pattern: [0, 0, 0, 1, 0, 1] },
    { id: 36, name: "Địa Hỏa Minh Di", pattern: [1, 0, 1, 0, 0, 0] },
    { id: 37, name: "Phong Hỏa Gia Nhân", pattern: [1, 0, 1, 0, 1, 1] },
    { id: 38, name: "Hỏa Trạch Khuê", pattern: [1, 1, 0, 1, 0, 1] },
    { id: 39, name: "Thủy Sơn Kiển", pattern: [1, 0, 0, 0, 1, 0] },
    { id: 40, name: "Lôi Thủy Giải", pattern: [0, 1, 0, 1, 0, 0] },
    { id: 41, name: "Sơn Trạch Tổn", pattern: [1, 1, 0, 1, 0, 0] },
    { id: 42, name: "Phong Lôi Ích", pattern: [1, 0, 0, 0, 1, 1] },
    { id: 43, name: "Trạch Thiên Quải", pattern: [1, 1, 1, 1, 1, 0] },
    { id: 44, name: "Thiên Phong Cấu", pattern: [0, 1, 1, 1, 1, 1] },
    { id: 45, name: "Trạch Địa Tụy", pattern: [0, 0, 0, 1, 1, 0] },
    { id: 46, name: "Địa Phong Thăng", pattern: [0, 1, 1, 0, 0, 0] },
    { id: 47, name: "Trạch Thủy Khốn", pattern: [0, 1, 0, 1, 1, 0] },
    { id: 48, name: "Thủy Phong Tỉnh", pattern: [0, 1, 1, 0, 1, 0] },
    { id: 49, name: "Trạch Hỏa Cách", pattern: [1, 0, 1, 1, 1, 0] },
    { id: 50, name: "Hỏa Phong Đỉnh", pattern: [0, 1, 1, 1, 0, 1] },
    { id: 51, name: "Thuần Chấn", pattern: [1, 0, 0, 1, 0, 0] },
    { id: 52, name: "Thuần Cấn", pattern: [0, 0, 1, 0, 0, 1] },
    { id: 53, name: "Phong Sơn Tiệm", pattern: [1, 0, 0, 0, 1, 1] },
    { id: 54, name: "Lôi Trạch Quy Muội", pattern: [1, 1, 0, 1, 0, 0] },
    { id: 55, name: "Lôi Hỏa Phong", pattern: [1, 0, 1, 1, 0, 0] },
    { id: 56, name: "Hỏa Sơn Lữ", pattern: [0, 0, 1, 1, 0, 1] },
    { id: 57, name: "Thuần Tốn", pattern: [0, 1, 1, 0, 1, 1] },
    { id: 58, name: "Thuần Đoài", pattern: [1, 1, 0, 1, 1, 0] },
    { id: 59, name: "Phong Thủy Hoán", pattern: [0, 1, 0, 0, 1, 1] },
    { id: 60, name: "Thủy Trạch Tiết", pattern: [1, 1, 0, 0, 1, 0] },
    { id: 61, name: "Phong Trạch Trung Phu", pattern: [1, 1, 0, 0, 1, 1] },
    { id: 62, name: "Lôi Sơn Tiểu Quá", pattern: [0, 0, 1, 1, 0, 0] },
    { id: 63, name: "Thủy Hỏa Ký Tế", pattern: [1, 0, 1, 0, 1, 0] },
    { id: 64, name: "Hỏa Thủy Vị Tế", pattern: [0, 1, 0, 1, 0, 1] },
];

function getHexagramName(lines) {
    if (lines.length !== 6) {
        return 'Quẻ Chưa Xác Định';
    }
    const hexagram = HEXAGRAMS.find(h =>
        h.pattern.every((line, index) => line === lines[index])
    );
    return hexagram ? hexagram.name : 'Quẻ Chưa Xác Định';
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { lines } = req.body;

        if (!lines || !Array.isArray(lines)) {
            return res.status(400).json({ error: 'Invalid input' });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("GEMINI_API_KEY is not set");
            return res.status(500).json({ error: 'Server configuration error' });
        }

        const hexagramName = getHexagramName(lines);
        const ai = new GoogleGenAI({ apiKey });
        const visualLines = lines.map(l => l === 1 ? "Dương (—)" : "Âm (- -)").join(", ");

        const prompt = `
      Bạn là bậc thầy Kinh Dịch uyên bác. Tôi đã gieo được quẻ "${hexagramName}".
      Các hào từ dưới lên trên (Hào 1 đến Hào 6) là: [${visualLines}]

      Hãy luận giải quẻ này cho người xin quẻ với giọng văn cổ kính, trang trọng nhưng dễ hiểu, sâu sắc.

      Trả về kết quả dưới dạng JSON theo cấu trúc sau (không cần markdown block, chỉ trả về JSON thuần):
      {
        "hexagramName": "${hexagramName}",
        "originalText": "Một câu thơ hoặc ý nghĩa cốt lõi ngắn gọn của quẻ ${hexagramName}",
        "generalMeaning": "Luận giải tổng quan về ý nghĩa của quẻ ${hexagramName} trong thời điểm hiện tại.",
        "career": "Luận giải về công danh, sự nghiệp, tài lộc.",
        "love": "Luận giải về tình duyên, gia đạo.",
        "advice": "Lời khuyên hành động cụ thể cho người xin quẻ."
      }
    `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [{
                role: 'user',
                parts: [{ text: prompt }]
            }],
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        hexagramName: { type: Type.STRING },
                        originalText: { type: Type.STRING },
                        generalMeaning: { type: Type.STRING },
                        career: { type: Type.STRING },
                        love: { type: Type.STRING },
                        advice: { type: Type.STRING },
                    },
                    required: ["hexagramName", "generalMeaning", "advice"]
                }
            }
        });

        const text = response.text;
        if (!text) throw new Error("No response from AI");

        const result = typeof text === 'string' ? JSON.parse(text) : text;

        if (result.hexagramName !== hexagramName) {
            result.hexagramName = hexagramName;
        }

        return res.status(200).json(result);

    } catch (error) {
        console.error("Error in API:", error);
        return res.status(500).json({
            error: 'Failed to interpret hexagram',
            details: error instanceof Error ? error.message : String(error)
        });
    }
}

import { GoogleGenAI, Type } from "@google/genai";

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

        const ai = new GoogleGenAI({ apiKey });

        // Map lines (0/1) to visual string
        // 1 = Yang (Dương), 0 = Yin (Âm)
        const visualLines = lines.map(l => l === 1 ? "Dương (—)" : "Âm (- -)").join(", ");

        const prompt = `
      Tôi vừa gieo một quẻ Kinh Dịch. Các hào từ dưới lên trên (Hào 1 đến Hào 6) là:
      [${visualLines}]

      Hãy đóng vai một bậc thầy về Kinh Dịch và Phong Thủy học uyên bác, giọng văn cổ kính, trang trọng nhưng dễ hiểu, sâu sắc.
      Hãy xác định tên quẻ (Ví dụ: Thuần Càn, Hỏa Thủy Vị Tế, Địa Thiên Thái...).
      Sau đó bình giải quẻ này cho người gieo.

      Trả về kết quả dưới dạng JSON theo cấu trúc sau (không cần markdown block, chỉ trả về JSON thuần):
      {
        "hexagramName": "Tên quẻ (Hán Việt)",
        "originalText": "Một câu thơ hoặc ý nghĩa cốt lõi ngắn gọn của quẻ (ví dụ: Nguyên hanh lợi trinh...)",
        "generalMeaning": "Luận giải tổng quan về ý nghĩa của quẻ trong thời điểm hiện tại.",
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

        // Check if response.text is a function or property
        const text = response.text;

        if (!text) throw new Error("No response from AI");

        // Parse JSON if it's a string, otherwise return as is
        const result = typeof text === 'string' ? JSON.parse(text) : text;

        return res.status(200).json(result);

    } catch (error) {
        console.error("Error in API:", error);
        return res.status(500).json({
            error: 'Failed to interpret hexagram',
            details: error instanceof Error ? error.message : String(error)
        });
    }
}

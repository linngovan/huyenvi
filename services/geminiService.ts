import { GoogleGenAI, Type } from "@google/genai";
import { LineType } from "../types";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const interpretHexagram = async (lines: LineType[]): Promise<any> => {
  // Convert lines array (0,1) to visual representation for the prompt
  // Note: Lines in array are Bottom -> Top
  const visualLines = lines.map(l => l === LineType.Yang ? "Dương (—)" : "Âm (- -)").join(", ");

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

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
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
    
    return JSON.parse(text);

  } catch (error) {
    console.error("Error interpreting hexagram:", error);
    // Fallback in case of error
    return {
      hexagramName: "Huyền Vi Chi Tượng",
      originalText: "Tâm thành tắc linh.",
      generalMeaning: "Hiện tại thiên cơ chưa thể tiết lộ. Vui lòng thử lại sau giây lát hoặc tịnh tâm hơn.",
      career: "Kiên nhẫn chờ đợi thời cơ.",
      love: "Vạn sự tùy duyên.",
      advice: "Hãy giữ tâm an lạc."
    };
  }
};
import { LineType } from "../types";

export const interpretHexagram = async (lines: LineType[]): Promise<any> => {
  try {
    const response = await fetch('/api/interpret', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lines }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API request failed with status ${response.status}`);
    }

    return await response.json();

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
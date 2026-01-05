
import { GoogleGenAI, Type } from "@google/genai";
import { QuizState } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getGiftRecommendation(quizData: QuizState) {
  try {
    const prompt = `Act as a luxury jewelry expert. Based on the following preferences:
    Occasion: ${quizData.occasion}
    Budget: ${quizData.budget}
    Style: ${quizData.style}
    
    Recommend 3 types of jewelry pieces that would be perfect. Provide the response as a JSON array of objects with 'title', 'reason', and 'category'.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              reason: { type: Type.STRING },
              category: { type: Type.STRING, enum: ['Rings', 'Earrings', 'Necklaces', 'Bangles', 'Chains'] }
            },
            required: ['title', 'reason', 'category']
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
}

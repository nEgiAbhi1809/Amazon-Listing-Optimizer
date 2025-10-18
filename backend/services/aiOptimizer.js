import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  throw new Error("❌ Missing Gemini (AIza...) API key in .env file");
}

const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY);

/**
 * Use Gemini to optimize Amazon listing details
 * @param {Object} original - { title, bullets, description }
 * @returns {Object} optimized listing JSON
 */
export async function optimizeContent(original) {
  const prompt = `
You are an Amazon listing optimization expert. Given:

Title: ${original.title || "N/A"}
Bullets: ${original.bullets || "N/A"}
Description: ${original.description || "N/A"}

Generate an improved version in this exact JSON format:

{
  "optimizedTitle": "string (keyword-rich, human readable)",
  "optimizedBullets": ["string", "string", "string"],
  "optimizedDescription": "string (persuasive but compliant)",
  "keywords": ["keyword1", "keyword2", "keyword3"]
}
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Clean markdown fences and trim
    const clean = text.replace(/```json|```/g, "").trim();

    try {
      const parsed = JSON.parse(clean);
      console.log("✅ Gemini response parsed successfully!");
      return parsed;
    } catch (err) {
      console.warn("⚠️ Gemini returned non-JSON output, returning fallback.");
      return {
        optimizedTitle: "Optimized title unavailable",
        optimizedBullets: ["Bullet generation failed"],
        optimizedDescription: clean.slice(0, 200),
        keywords: ["optimization", "ai", "listing"],
      };
    }
  } catch (error) {
    console.error("❌ Gemini API error:", error.message);
    throw new Error("Gemini model request failed");
  }
}

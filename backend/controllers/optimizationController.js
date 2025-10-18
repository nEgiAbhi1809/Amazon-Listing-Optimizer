import { validateASIN } from "../utils/validateASIN.js";
import { fetchAmazonDetails } from "../services/amazonScraper.js";
import { optimizeContent } from "../services/aiOptimizer.js";
import Optimization from "../models/Optimization.js";




export const optimizeListing = async (req, res) => {
  try {
    const { asin } = req.body;
    console.log("➡️ Received ASIN:", asin);

    // basic validation (accept lowercase too)
    if (!asin || asin.length < 5) {
      return res.status(400).json({ error: "Invalid ASIN" });
    }

    console.log("🔍 Fetching product details...");
    const product = await fetchAmazonDetails(asin);
    console.log("✅ Fetched product:", product.title?.slice(0, 60) || "no title");

    console.log("🤖 Optimizing via Gemini...");
    const optimized = await optimizeContent(product);
    console.log("✅ Got optimized data:", optimized.optimizedTitle?.slice(0, 60));

    const record = await Optimization.create({
      asin,
      originalTitle: product.title || "",
      originalBullets: product.bullets || "",
      originalDescription: product.description || "",
      optimizedTitle: optimized.optimizedTitle || "",
      optimizedBullets: (optimized.optimizedBullets || []).join("\n"),
      optimizedDescription: optimized.optimizedDescription || "",
      keywords: (optimized.keywords || []).join(", "),
    });

    console.log("💾 Saved optimization in DB");
    res.json(record);
  } catch (err) {
    console.error("❌ Backend crash:", err.message);
    res.status(500).json({ error: err.message });
  }
};


export const getHistory = async (req, res) => {
  try {
    const { asin } = req.params;
    if (!asin) return res.status(400).json({ error: "ASIN required" });

    const records = await Optimization.findAll({
      where: { asin },
      order: [["createdAt", "DESC"]],
    });

    res.json(records);
  } catch (err) {
    console.error("❌ Error fetching history:", err.message);
    res.status(500).json({ error: "Failed to fetch history" });
  }
};

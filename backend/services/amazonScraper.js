import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchAmazonDetails(asin) {
  const url = `https://www.amazon.in/dp/${asin}`;
  const { data } = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
  });

  const $ = cheerio.load(data);

  const title = $("#productTitle").text().trim();
  const bullets = $("#feature-bullets ul li")
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(Boolean)
    .join("\n");
  const description = $("#productDescription").text().trim();

  return { title, bullets, description };
}

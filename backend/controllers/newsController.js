const axios = require("axios");
const NodeCache = require("node-cache");

const cache = new NodeCache({
  stdTTL: parseInt(process.env.CACHE_TTL_NEWS) || 900,
});

async function getTopHeadlines(req, res) {
  try {
    const {
      sources = "techcrunch",
      category,
      pageSize = 12,
      page = 1,
    } = req.query;

    if (!process.env.NEWS_API_KEY) {
      return res.status(500).json({
        success: false,
        error: "NewsAPI key not configured",
      });
    }

    const cacheKey = `headlines_${sources}_${category || "all"}_${page}_${pageSize}`;

    const cacheValue = cache.get(cacheKey);
    if (cacheValue) {
      console.log(`Saved NewsAPi Value: ${cacheKey}`);
    } else {
      console.log("Saving new value...");
    }
    console.log("Fetching NewsAPI: ");

    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        sources,
        category,
        pageSize,
        page,
        apiKey: process.env.NEWS_API_KEY,
      },
      timeout: 10000,
    });

    const articles = response.data.articles.map((article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      imageUrl: article.urlToImage,
      source: article.source.name,
      publishedAt: article.publishedAt,
      author: article.author,
    }));

    cache.set(cacheKey, articles);
    console.log(`Fetched ${articles.length} articles`);

    res.json({
      success: true,
      data: articles,
      cached: false,
    });
  } catch (error) {
    console.error("NewsAPI Error:", error.message);

    if (error.response?.status === 401) {
      return res.status(401).json({
        success: false,
        error: "Invalid API key",
      });
    }

    if (error.response?.status === 429) {
      return res.status(429).json({
        success: false,
        error: "Rate limit exceeded",
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to fetch news",
      message: error.message,
    });
  }
}

module.exports = { getTopHeadlines };

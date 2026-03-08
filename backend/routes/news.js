const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");

// console.log("newsController:", newsController);
// console.log("getTopHeadlines:", typeof newsController.getTopHeadlines);
// console.log("searchNews:", typeof newsController.searchNews);

router.get("/headlines", newsController.getTopHeadlines);

module.exports = router;

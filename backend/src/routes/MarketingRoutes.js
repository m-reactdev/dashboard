const express = require("express");
const {
  createMarketing,
  fetchMarketing,
  updateMarketing,
  deleteMarketing,
} = require("../controllers/MarketingControllers");
const router = express.Router();

router.post("/create-marketing", createMarketing);

router.get("/fetch-marketing", fetchMarketing);

router.put("/update-marketing", updateMarketing);

router.delete("/delete-marketing/:id", deleteMarketing);

module.exports = router;

const express = require("express");
const {
  createSalesTarget,
  fetchSalesTarget,
  updateSalesTarget,
  deleteSalesTarget,
} = require("../controllers/SalesTargetControllers");
const router = express.Router();

router.post("/create-sales-target", createSalesTarget);

router.get("/fetch-sales-target", fetchSalesTarget);

router.put("/update-sales-target", updateSalesTarget);

router.delete("/delete-sales-target/:id", deleteSalesTarget);

module.exports = router;

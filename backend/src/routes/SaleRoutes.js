const express = require("express");
const {
  createSale,
  fetchSales,
  updateSale,
  deleteSale,
} = require("../controllers/SaleControllers");
const router = express.Router();

router.post("/create-sale", createSale);

router.get("/fetch-sales", fetchSales);

router.put("/update-sale", updateSale);

router.delete("/delete-sale/:id", deleteSale);

module.exports = router;

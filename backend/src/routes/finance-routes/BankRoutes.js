const express = require("express");
const {
  createBank,
  fetchBank,
  updateBank,
  deleteBank,
} = require("../../controllers/finance-controllers/BankControllers");
const router = express.Router();

router.post("/create-bank", createBank);

router.get("/fetch-bank", fetchBank);

router.put("/update-bank", updateBank);

router.delete("/delete-bank/:id", deleteBank);

module.exports = router;

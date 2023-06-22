const express = require("express");
const router = express.Router();
const {
  createBudget,
  fetchBudget,
  updateBudget,
  deleteBudget,
} = require("../../controllers/finance-controllers/BudgetControllers");

router.post("/create-budget", createBudget);

router.get("/fetch-budget", fetchBudget);

router.put("/update-budget", updateBudget);

router.delete("/delete-budget/:id", deleteBudget);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  createExpense,
  fetchExpenses,
  updateExpense,
  deleteExpense,
} = require("../../controllers/finance-controllers/ExpenseControllers");

router.post("/create-expense", createExpense);

router.get("/fetch-expenses", fetchExpenses);

router.put("/update-expense", updateExpense);

router.delete("/delete-expense/:id", deleteExpense);

module.exports = router;

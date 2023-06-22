const mongoose = require("mongoose");

let budgetSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    amount: Number,
    pdfFile: String,
    fileName: String,
    timeStamp: String,
    status: String,
    rejectedDescription: String,
    description: String,
    date: String,
    code: String,
    seen: Boolean,
  },
  { collection: "budget" }
);

let BudgetModel = mongoose.model("budget", budgetSchema);

module.exports = BudgetModel;

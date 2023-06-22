const mongoose = require("mongoose");

let expenseSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    amount: Number,
    pdfFile: String,
    fileName: String,
    timeStamp: String,
    status: String,
    type: String,
    rejectedDescription: String,
    description: String,
    date: String,
    code: String,
    seen: Boolean,
  },
  { collection: "expenses" }
);

let ExpModel = mongoose.model("expenses", expenseSchema);

module.exports = ExpModel;

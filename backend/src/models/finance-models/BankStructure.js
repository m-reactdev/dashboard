const mongoose = require("mongoose");

let bankSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    amount: Number,
    refId: String,
    pdfFile: String,
    fileName: String,
    type: String,
    timeStamp: String,
    description: String,
    date: String,
    code: String,
  },
  { collection: "bank" }
);

let BankModel = mongoose.model("bank", bankSchema);

module.exports = BankModel;

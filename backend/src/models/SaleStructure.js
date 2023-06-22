const mongoose = require("mongoose");

let salesSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    amount: Number,
    timeStamp: String,
    description: String,
    status: String,
    date: String,
    code: String,
  },
  { collection: "sales" }
);

let SalesModel = mongoose.model("sales", salesSchema);

module.exports = SalesModel;

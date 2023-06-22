const mongoose = require("mongoose");

let salesTargetSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    target: Number,
    limit: Number,
    timeStamp: String,
    description: String,
    unit: String,
    date: String,
    code: String,
  },
  { collection: "sales-target" }
);

let SalesTargetModel = mongoose.model("sales-target", salesTargetSchema);

module.exports = SalesTargetModel;

const mongoose = require("mongoose");

let ComplianceSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    amount: Number,
    timeStamp: String,
    description: String,
    type: String,
    date: String,
    code: String,
  },
  { collection: "compliance" }
);

let ComplianceModel = mongoose.model("compliance", ComplianceSchema);

module.exports = ComplianceModel;

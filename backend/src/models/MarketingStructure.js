const mongoose = require("mongoose");

let marketingSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    amount: Number,
    timeStamp: String,
    description: String,
    date: String,
    code: String,
  },
  { collection: "marketing" }
);

let MarketingModel = mongoose.model("marketing", marketingSchema);

module.exports = MarketingModel;

const mongoose = require("mongoose");

let vendorSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    amount: Number,
    timeStamp: String,
    description: String,
    unit: String,
    date: String,
    code: String,
    pdfFile: String,
    fileName: String,
  },
  { collection: "us-vendor" }
);

let VendorModel = mongoose.model("us-vendor", vendorSchema);

module.exports = VendorModel;

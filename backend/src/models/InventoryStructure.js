const mongoose = require("mongoose");

let inventorySchema = new mongoose.Schema(
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
  { collection: "inventory" }
);

let InventoryModel = mongoose.model("inventory", inventorySchema);

module.exports = InventoryModel;

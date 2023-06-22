const express = require("express");
const {
  createVendor,
  fetchVendors,
  deleteVendor,
  updateVendor,
} = require("../controllers/VendorControllers");

const router = express.Router();

router.post("/create-vendor", createVendor);

router.get("/fetch-vendors", fetchVendors);

router.put("/update-vendor", updateVendor);

router.delete("/delete-vendor/:id", deleteVendor);

module.exports = router;

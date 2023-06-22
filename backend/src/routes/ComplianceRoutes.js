const express = require("express");
const router = express.Router();
const {
  deleteCompliance,
  createCompliance,
  fetchCompliances,
  updateCompliance,
} = require("../controllers/ComplianceControllers");

router.post("/create-compliance", createCompliance);

router.get("/fetch-compliances", fetchCompliances);

router.put("/update-compliance", updateCompliance);

router.delete("/delete-compliance/:id", deleteCompliance);

module.exports = router;

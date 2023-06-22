const express = require("express");
const router = express.Router();
const {
  createInventory,
  fetchInventory,
  updateInventory,
  deleteInventory,
} = require("../controllers/InventoryControllers");

router.post("/create-inventory", createInventory);

router.get("/fetch-inventory", fetchInventory);

router.put("/update-inventory", updateInventory);

router.delete("/delete-inventory/:id", deleteInventory);

// router.post("/login-user", loginUser);

// router.get("/fetch-users", fetchUsers);

module.exports = router;

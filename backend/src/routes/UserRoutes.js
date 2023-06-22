const express = require("express");
const {
  registerUser,
  loginUser,
  fetchUsers,
  updateUser,
  deleteUser,
  logoutUser,
} = require("../controllers/UserControllers");

const router = express.Router();

router.post("/create-user", registerUser);

router.post("/login-user", loginUser);

router.put("/logout-user", logoutUser);

router.get("/fetch-users", fetchUsers);

router.put("/update-user", updateUser);

router.delete("/delete-user/:id", deleteUser);

module.exports = router;

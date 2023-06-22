const mongoose = require("mongoose");

let userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    status: String,
    role: String,
    userRights: Array,
  },
  { collection: "users" }
);

let UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;

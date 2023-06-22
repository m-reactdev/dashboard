const mongoose = require("mongoose");
const dbUrl = process.env.DATABASE;

mongoose
  .connect(dbUrl, { dbName: "dashboard" })
  .then(() => console.log("Database connect successfully..."))
  .catch((dbError) => console.log("Error Found...", dbError));

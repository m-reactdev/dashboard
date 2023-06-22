require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { sockets } = require("./src/socket/Socket");
let port = process.env.PORT || 4000;

require("./src/config/db");

app.use(express.json({ limit: "25mb" }));
app.use(cors());
app.use(morgan("short"));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", sockets);

app.use((req, res, next) => {
  // console.log("A request came: ", req.body);
  next();
});

app.get("/", (req, res) => {
  res.send("Mern Stack Project Of Sale Dashboard.");
});

app.use("/api/users", require("./src/routes/UserRoutes"));

app.use("/api/budget", require("./src/routes/finance-routes/BudgetRoutes"));

app.use("/api/bank", require("./src/routes/finance-routes/BankRoutes"));

app.use("/api/expense", require("./src/routes/finance-routes/ExpenseRoutes"));

app.use("/api/inventory", require("./src/routes/InventoryRoutes"));

app.use("/api/vendor", require("./src/routes/VendorRoutes"));

app.use("/api/sale", require("./src/routes/SaleRoutes"));

app.use("/api/marketing", require("./src/routes/MarketingRoutes"));

app.use("/api/compliance", require("./src/routes/ComplianceRoutes"));

app.use("/api/target", require("./src/routes/SalesTargetRoutes"));

server.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});

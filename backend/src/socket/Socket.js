const sockets = (socket) => {
  // console.log(`User Connected: ${socket.id}`);

  socket.on("fetch_budget", (data) => {
    socket.broadcast.emit("fetch_budget_message", data);
  });

  socket.on("create_budget", (data) => {
    socket.broadcast.emit("create_budget_message", data);
  });

  socket.on("update_budget", (data) => {
    socket.broadcast.emit("update_budget_message", data);
  });

  socket.on("delete_budget", (data) => {
    socket.broadcast.emit("delete_budget_message", data);
  });

  socket.on("fetch_bank", (data) => {
    socket.broadcast.emit("fetch_bank_message", data);
  });

  socket.on("login_user", (data) => {
    socket.broadcast.emit("login_user_message", data);
  });

  socket.on("logout_user", (data) => {
    socket.broadcast.emit("logout_user_message", data);
  });

  socket.on("fetch_expense", (data) => {
    socket.broadcast.emit("fetch_expense_message", data);
  });

  socket.on("create_expense", (data) => {
    socket.broadcast.emit("create_expense_message", data);
  });

  socket.on("update_expense", (data) => {
    socket.broadcast.emit("update_expense_message", data);
  });

  socket.on("delete_expense", (data) => {
    socket.broadcast.emit("delete_expense_message", data);
  });
};

module.exports = { sockets };

const ExpModel = require("../../models/finance-models/ExpenseStructure");

const createExpense = async (req, res) => {
  let {
    name,
    email,
    amount,
    description,
    pdfFile,
    fileName,
    type,
    timeStamp,
    date,
    status,
    rejectedDescription,
    code,
    seen,
  } = req.body;

  let newExpense = new ExpModel({
    name: name,
    email: email,
    amount: amount,
    description: description,
    pdfFile: pdfFile,
    fileName: fileName,
    type: type,
    timeStamp: timeStamp,
    date: date,
    status: status,
    rejectedDescription: rejectedDescription,
    code: code,
    seen: seen,
  });

  newExpense
    .save()
    .then((success) => {
      if (success) {
        return res.status(200).send({
          status: true,
          message: "Expense has been created successfully.",
          data: newExpense,
        });
      }
    })
    .catch((dbError) => {
      if (dbError) {
        return res.status(500).send({
          status: false,
          message: "Something went wrong to create expense.",
        });
      }
      console.log("Something went wrong to create expense ", dbError);
    });
};

const fetchExpenses = async (req, res) => {
  const session = await ExpModel.find();
  if (session) {
    return res.status(200).send({
      status: true,
      data: session,
    });
  } else {
    return res.status(500).send({
      status: false,
      message: "Server Issues",
    });
  }
};

const updateExpense = async (req, res) => {
  let {
    _id,
    name,
    email,
    amount,
    description,
    pdfFile,
    fileName,
    type,
    timeStamp,
    date,
    status,
    rejectedDescription,
    code,
    seen,
  } = req.body;

  let updateExpense = {
    _id: _id,
    name: name,
    email: email,
    amount: amount,
    description: description,
    pdfFile: pdfFile,
    fileName: fileName,
    type: type,
    timeStamp: timeStamp,
    date: date,
    status: status,
    rejectedDescription: rejectedDescription,
    code: code,
    seen: seen,
  };

  const session = await ExpModel.findByIdAndUpdate(_id, updateExpense, {
    new: true,
  });

  if (session) {
    return res.status(200).send({
      status: true,
      message: "Expense has been updated",
      data: session,
    });
  } else {
    return res.status(500).send({
      status: false,
      message: "Server Issues",
    });
  }
};

const deleteExpense = async (req, res) => {
  let { id } = req.params;

  const session = await ExpModel.findByIdAndRemove(id);

  if (session) {
    return res.status(200).send({
      status: true,
      message: "Expense has been deleted",
    });
  } else {
    return res.status(500).send({
      status: false,
      message: "Server Issues",
    });
  }
};

module.exports = { createExpense, fetchExpenses, updateExpense, deleteExpense };

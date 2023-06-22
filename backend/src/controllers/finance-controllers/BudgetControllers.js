const BudgetModel = require("../../models/finance-models/BudgetStructure");

const createBudget = async (req, res) => {
  let {
    name,
    email,
    amount,
    description,
    pdfFile,
    fileName,
    timeStamp,
    date,
    status,
    rejectedDescription,
    code,
    seen,
  } = req.body;

  let hasBudgetDateExist = await BudgetModel.findOne({ date: date });

  if (hasBudgetDateExist) {
    return res.status(501).send({
      status: false,
      message: "This date has already exist...!",
    });
  }

  let newBudget = new BudgetModel({
    name: name,
    email: email,
    amount: amount,
    description: description,
    pdfFile: pdfFile,
    fileName: fileName,
    timeStamp: timeStamp,
    date: date,
    status: status,
    rejectedDescription: rejectedDescription,
    code: code,
    seen: seen,
  });

  newBudget
    .save()
    .then((success) => {
      if (success) {
        return res.status(200).send({
          status: true,
          message: "Your budget has been created successfully.",
          data: newBudget,
        });
      }
    })
    .catch((dbError) => {
      if (dbError) {
        return res.status(500).send({
          status: false,
          message: "Something went wrong to create budget.",
        });
      }
      console.log("Something went wrong to create budget ", dbError);
    });
};

const fetchBudget = async (req, res) => {
  const session = await BudgetModel.find();
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

const updateBudget = async (req, res) => {
  let {
    _id,
    name,
    email,
    amount,
    description,
    pdfFile,
    fileName,
    timeStamp,
    date,
    status,
    rejectedDescription,
    code,
    seen,
  } = req.body;

  let updateBudget = {
    _id: _id,
    name: name,
    email: email,
    amount: amount,
    description: description,
    pdfFile: pdfFile,
    fileName: fileName,
    timeStamp: timeStamp,
    date: date,
    status: status,
    rejectedDescription: rejectedDescription,
    code: code,
    seen: seen,
  };

  let hasBudgetDateExist = await BudgetModel.findOne({ date: date });

  if (hasBudgetDateExist) {
    if (hasBudgetDateExist._id == _id) {
      const session = await BudgetModel.findByIdAndUpdate(_id, updateBudget, {
        new: true,
      });

      if (session) {
        return res.status(200).send({
          status: true,
          message: "Budget has been updated",
          data: session,
        });
      } else {
        return res.status(500).send({
          status: false,
          message: "Server Issues",
        });
      }
    }

    return res.status(501).send({
      status: false,
      message: "This date has already exist...!",
    });
  }

  const session = await BudgetModel.findByIdAndUpdate(_id, updateBudget, {
    new: true,
  });

  if (session) {
    return res.status(200).send({
      status: true,
      message: "Budget has been updated",
      data: session,
    });
  } else {
    return res.status(500).send({
      status: false,
      message: "Server Issues",
    });
  }
};

const deleteBudget = async (req, res) => {
  let { id } = req.params;

  const session = await BudgetModel.findByIdAndRemove(id);

  if (session) {
    return res.status(200).send({
      status: true,
      message: "Budget has been deleted",
    });
  } else {
    return res.status(500).send({
      status: false,
      message: "Server Issues",
    });
  }
};

module.exports = { createBudget, fetchBudget, updateBudget, deleteBudget };

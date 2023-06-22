const BankModel = require("../../models/finance-models/BankStructure");

const createBank = async (req, res) => {
  let {
    name,
    email,
    amount,
    description,
    refId,
    pdfFile,
    fileName,
    type,
    timeStamp,
    date,
    code,
  } = req.body;

  let newBank = new BankModel({
    name: name,
    email: email,
    amount: amount,
    description: description,
    refId: refId,
    pdfFile: pdfFile,
    fileName: fileName,
    type: type,
    timeStamp: timeStamp,
    date: date,
    code: code,
  });

  newBank
    .save()
    .then((success) => {
      if (success) {
        return res.status(200).send({
          status: true,
          message: "Your bank has been created successfully.",
          data: newBank,
        });
      }
    })
    .catch((dbError) => {
      if (dbError) {
        return res.status(500).send({
          status: false,
          message: "Something went wrong to create bank.",
        });
      }
      console.log("Something went wrong to create bank ", dbError);
    });
};

const fetchBank = async (req, res) => {
  const session = await BankModel.find();
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

const updateBank = async (req, res) => {
  let {
    _id,
    name,
    email,
    amount,
    description,
    refId,
    pdfFile,
    fileName,
    type,
    timeStamp,
    date,
    code,
  } = req.body;

  let updateBudget = {
    _id: _id,
    name: name,
    email: email,
    amount: amount,
    description: description,
    refId: refId,
    pdfFile: pdfFile,
    fileName: fileName,
    type: type,
    timeStamp: timeStamp,
    date: date,
    code: code,
  };

  const session = await BankModel.findByIdAndUpdate(_id, updateBudget, {
    new: true,
  });

  if (session) {
    return res.status(200).send({
      status: true,
      message: "Bank has been updated",
      data: session,
    });
  } else {
    return res.status(500).send({
      status: false,
      message: "Server Issues",
    });
  }
};

const deleteBank = async (req, res) => {
  let { id } = req.params;

  const session = await BankModel.findByIdAndRemove(id);

  if (session) {
    return res.status(200).send({
      status: true,
      message: "Bank has been deleted",
    });
  } else {
    return res.status(500).send({
      status: false,
      message: "Server Issues",
    });
  }
};

module.exports = { createBank, fetchBank, updateBank, deleteBank };

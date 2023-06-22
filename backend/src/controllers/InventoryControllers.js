const InventoryModel = require("../models/InventoryStructure");

const createInventory = async (req, res) => {
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

  let newInventory = new InventoryModel({
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

  newInventory
    .save()
    .then((success) => {
      if (success) {
        return res.status(200).send({
          status: true,
          message: "Your inventory has been created successfully.",
          data: newInventory,
        });
      }
    })
    .catch((dbError) => {
      if (dbError) {
        return res.status(500).send({
          status: false,
          message: "Something went wrong to create inventory.",
        });
      }
      console.log("Something went wrong to create inventory ", dbError);
    });
};

const fetchInventory = async (req, res) => {
  const session = await InventoryModel.find();
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

const updateInventory = async (req, res) => {
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

  let updatedInventory = {
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

  const session = await InventoryModel.findByIdAndUpdate(
    _id,
    updatedInventory,
    {
      new: true,
    }
  );

  if (session) {
    return res.status(200).send({
      status: true,
      message: "Inventory has been updated",
      data: session,
    });
  } else {
    return res.status(500).send({
      status: false,
      message: "Server Issues",
    });
  }
};

const deleteInventory = async (req, res) => {
  let { id } = req.params;

  const session = await InventoryModel.findByIdAndRemove(id);

  if (session) {
    return res.status(200).send({
      status: true,
      message: "Inventory has been deleted",
    });
  } else {
    return res.status(500).send({
      status: false,
      message: "Server Issues",
    });
  }
};

module.exports = {
  createInventory,
  fetchInventory,
  updateInventory,
  deleteInventory,
};

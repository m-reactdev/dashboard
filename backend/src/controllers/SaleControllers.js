const SalesModel = require("../models/SaleStructure");

const createSale = async (req, res) => {
  let { name, email, amount, timeStamp, description, date, status, code } =
    req.body;

  let newSale = new SalesModel({
    amount: amount,
    description: description,
    name: name,
    email: email,
    timeStamp: timeStamp,
    date: date,
    status: status,
    code: code,
  });

  let hasDateExist = await SalesModel.findOne({ date: date });

  if (hasDateExist) {
    return res.status(501).send({
      status: false,
      message: "Data of this selected date has already exist...!",
    });
  }

  newSale
    .save()
    .then((success) => {
      if (success) {
        return res.status(200).send({
          status: true,
          message: "Data has been created successfully.",
          data: newSale,
        });
      }
    })
    .catch((dbError) => {
      if (dbError) {
        return res.status(500).send({
          status: false,
          message: "Something went wrong.",
        });
      }
      console.log("Something went wrong. ", dbError);
    });
};

const fetchSales = async (req, res) => {
  const session = await SalesModel.find();
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

const updateSale = async (req, res) => {
  let { _id, name, email, amount, timeStamp, description, date, status, code } =
    req.body;

  let updatedSale = {
    _id: _id,
    amount: amount,
    description: description,
    name: name,
    email: email,
    timeStamp: timeStamp,
    date: date,
    status: status,
    code: code,
  };

  let hasDateExist = await SalesModel.findOne({ date: date });

  if (hasDateExist) {
    if (hasDateExist._id != _id) {
      return res.status(501).send({
        status: false,
        message: "Data of this selected date has already exist...!",
      });
    }
  }

  const session = await SalesModel.findByIdAndUpdate(_id, updatedSale, {
    new: true,
  });

  if (session) {
    return res.status(200).send({
      status: true,
      message: "Data has been updated",
      data: session,
    });
  } else {
    return res.status(500).send({
      status: false,
      message: "Server Issues",
    });
  }
};

const deleteSale = async (req, res) => {
  let { id } = req.params;

  const session = await SalesModel.findByIdAndRemove(id);

  if (session) {
    return res.status(200).send({
      status: true,
      message: "Data has been deleted",
    });
  } else {
    return res.status(500).send({
      status: false,
      message: "Server Issues",
    });
  }
};

module.exports = {
  createSale,
  fetchSales,
  deleteSale,
  updateSale,
};

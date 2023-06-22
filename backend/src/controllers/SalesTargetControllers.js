const SalesTargetModel = require("../models/SalesTargetStructure");

const createSalesTarget = async (req, res) => {
  let { name, email, target, limit, timeStamp, description, unit, date, code } =
    req.body;

  let newTarget = new SalesTargetModel({
    target: target,
    limit: limit,
    description: description,
    name: name,
    email: email,
    unit: unit,
    timeStamp: timeStamp,
    date: date,
    code: code,
  });

  let hasDateExist = await SalesTargetModel.findOne({ date: date });

  if (hasDateExist) {
    return res.status(501).send({
      status: false,
      message: "This sales target has already exist...!",
    });
  }

  newTarget
    .save()
    .then((success) => {
      if (success) {
        return res.status(200).send({
          status: true,
          message: "Your unit target has been created successfully.",
          data: newTarget,
        });
      }
    })
    .catch((dbError) => {
      if (dbError) {
        return res.status(500).send({
          status: false,
          message: "Something went wrong to create unit target.",
        });
      }
      console.log("Something went wrong to create unit target ", dbError);
    });
};

const fetchSalesTarget = async (req, res) => {
  const session = await SalesTargetModel.find();
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

const updateSalesTarget = async (req, res) => {
  let {
    _id,
    name,
    email,
    target,
    limit,
    timeStamp,
    description,
    unit,
    date,
    code,
  } = req.body;

  let updatedSalesTarget = {
    _id: _id,
    target: target,
    limit: limit,
    description: description,
    name: name,
    email: email,
    unit: unit,
    timeStamp: timeStamp,
    date: date,
    code: code,
  };

  const session = await SalesTargetModel.findByIdAndUpdate(
    _id,
    updatedSalesTarget,
    {
      new: true,
    }
  );

  if (session) {
    return res.status(200).send({
      status: true,
      message: "Sales target has been updated",
      data: session,
    });
  } else {
    return res.status(500).send({
      status: false,
      message: "Server Issues",
    });
  }
};

const deleteSalesTarget = async (req, res) => {
  let { id } = req.params;

  const session = await SalesTargetModel.findByIdAndRemove(id);

  if (session) {
    return res.status(200).send({
      status: true,
      message: "Vendor has been deleted",
    });
  } else {
    return res.status(500).send({
      status: false,
      message: "Server Issues",
    });
  }
};

module.exports = {
  createSalesTarget,
  fetchSalesTarget,
  deleteSalesTarget,
  updateSalesTarget,
};

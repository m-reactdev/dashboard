const VendorModel = require("../models/VendorStructure");

const createVendor = async (req, res) => {
  let {
    name,
    email,
    amount,
    timeStamp,
    description,
    unit,
    date,
    code,
    pdfFile,
    fileName,
  } = req.body;

  let hasDateExist = await VendorModel.findOne({ date: date });

  if (hasDateExist) {
    return res.status(501).send({
      status: false,
      message: "This vendor has already exist...!",
    });
  }

  let newVendor = new VendorModel({
    amount: amount,
    description: description,
    name: name,
    email: email,
    unit: unit,
    timeStamp: timeStamp,
    date: date,
    code: code,
    pdfFile: pdfFile,
    fileName: fileName,
  });

  newVendor
    .save()
    .then((success) => {
      if (success) {
        return res.status(200).send({
          status: true,
          message: "Your vendor has been created successfully.",
          data: newVendor,
        });
      }
    })
    .catch((dbError) => {
      if (dbError) {
        return res.status(500).send({
          status: false,
          message: "Something went wrong to create vendor.",
        });
      }
      console.log("Something went wrong to create vendor ", dbError);
    });
};

const fetchVendors = async (req, res) => {
  const session = await VendorModel.find();
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

const updateVendor = async (req, res) => {
  let {
    _id,
    name,
    email,
    amount,
    timeStamp,
    description,
    unit,
    date,
    code,
    pdfFile,
    fileName,
  } = req.body;

  let hasDateExist = await VendorModel.findOne({
    date: date,
  });

  let updatedVendor = {
    _id: _id,
    amount: amount,
    description: description,
    name: name,
    email: email,
    unit: unit,
    timeStamp: timeStamp,
    date: date,
    code: code,
    pdfFile: pdfFile,
    fileName: fileName,
  };

  if (hasDateExist) {
    if (hasDateExist._id == _id) {
      const session = await VendorModel.findByIdAndUpdate(_id, updatedVendor, {
        new: true,
      });

      if (session) {
        return res.status(200).send({
          status: true,
          message: "Vendor has been updated",
          data: session,
        });
      } else {
        return res.status(500).send({
          status: false,
          message: "Server Issues",
        });
      }
    } else {
      return res.status().send({
        status: false,
        message: "This vendor  has already exist...!",
      });
    }
  } else {
    const session = await VendorModel.findByIdAndUpdate(_id, updatedVendor, {
      new: true,
    });

    if (session) {
      return res.status(200).send({
        status: true,
        message: "Vendor has been updated",
        data: session,
      });
    } else {
      return res.status(500).send({
        status: false,
        message: "Server Issues",
      });
    }
  }
};

const deleteVendor = async (req, res) => {
  let { id } = req.params;

  const session = await VendorModel.findByIdAndRemove(id);

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
  createVendor,
  fetchVendors,
  deleteVendor,
  updateVendor,
};

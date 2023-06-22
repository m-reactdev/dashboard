const ComplianceModel = require("../models/ComplianceStructure");

const createCompliance = async (req, res) => {
  let { name, email, amount, timeStamp, description, type, date, code } =
    req.body;

  // let hasDateExist = await ComplianceModel.findOne({ date: date });

  // if (hasDateExist) {
  //   return res.status(501).send({
  //     status: false,
  //     message: "This vendor has already exist...!",
  //   });
  // }

  let newCompliance = new ComplianceModel({
    amount: amount,
    description: description,
    name: name,
    email: email,
    type: type,
    timeStamp: timeStamp,
    date: date,
    code: code,
  });

  newCompliance
    .save()
    .then((success) => {
      if (success) {
        return res.status(200).send({
          status: true,
          message: "Your compliance has been created successfully.",
          data: newCompliance,
        });
      }
    })
    .catch((dbError) => {
      if (dbError) {
        return res.status(500).send({
          status: false,
          message: "Something went wrong to create compliance.",
        });
      }
      console.log("Something went wrong to create compliance ", dbError);
    });
};

const fetchCompliances = async (req, res) => {
  const session = await ComplianceModel.find();
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

const updateCompliance = async (req, res) => {
  let { _id, name, email, amount, timeStamp, description, type, date, code } =
    req.body;

  // let hasDateExist = await ComplianceModel.findOne({
  //   date: date,
  // });

  let updatedVendor = {
    _id: _id,
    amount: amount,
    description: description,
    name: name,
    email: email,
    type: type,
    timeStamp: timeStamp,
    date: date,
    code: code,
  };

  const session = await ComplianceModel.findByIdAndUpdate(_id, updatedVendor, {
    new: true,
  });

  if (session) {
    return res.status(200).send({
      status: true,
      message: "Compliance has been updated",
      data: session,
    });
  } else {
    return res.status(500).send({
      status: false,
      message: "Server Issues",
    });
  }

  // if (hasDateExist) {
  //   if (hasDateExist._id == _id) {
  //     const session = await ComplianceModel.findByIdAndUpdate(
  //       _id,
  //       updatedVendor,
  //       {
  //         new: true,
  //       }
  //     );

  //     if (session) {
  //       return res.status(200).send({
  //         status: true,
  //         message: "Compliance has been updated",
  //         data: session,
  //       });
  //     } else {
  //       return res.status(500).send({
  //         status: false,
  //         message: "Server Issues",
  //       });
  //     }
  //   } else {
  //     return res.status().send({
  //       status: false,
  //       message: "This compliance has already exist...!",
  //     });
  //   }
  // } else {
  //   const session = await ComplianceModel.findByIdAndUpdate(
  //     _id,
  //     updatedVendor,
  //     {
  //       new: true,
  //     }
  //   );

  //   if (session) {
  //     return res.status(200).send({
  //       status: true,
  //       message: "Vendor has been updated",
  //       data: session,
  //     });
  //   } else {
  //     return res.status(500).send({
  //       status: false,
  //       message: "Server Issues",
  //     });
  //   }
  // }
};

const deleteCompliance = async (req, res) => {
  let { id } = req.params;

  const session = await ComplianceModel.findByIdAndRemove(id);

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
  createCompliance,
  fetchCompliances,
  deleteCompliance,
  updateCompliance,
};

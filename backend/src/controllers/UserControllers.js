const UserModel = require("../models/UserStructure");

const registerUser = async (req, res) => {
  let { name, email, password, role, status, userRights } = req.body;

  password = btoa(password);

  let hasUserEmailExist = await UserModel.findOne({ email: email });

  if (hasUserEmailExist) {
    return res.status(501).send({
      status: false,
      message: "This user has already exist...!",
    });
  }

  let newUser = new UserModel({
    name: name,
    email: email,
    password: password,
    status: status,
    role: role,
    userRights: userRights,
  });

  newUser
    .save()
    .then((success) => {
      if (success) {
        return res.status(200).send({
          status: true,
          message: "Your user has been created successfully.",
          data: newUser,
        });
      }
    })
    .catch((dbError) => {
      if (dbError) {
        return res.status(500).send({
          status: false,
          message: "Something went wrong to create user.",
        });
      }
      console.log("Something went wrong to create user ", dbError);
    });
};

const loginUser = async (req, res) => {
  let { email, password } = req.body;

  try {
    let hasUserEmailExist = await UserModel.findOne({
      email: email,
    });

    if (hasUserEmailExist) {
      let newPassword = atob(hasUserEmailExist.password);

      if (newPassword === password) {
        hasUserEmailExist.status = "Active";
        hasUserEmailExist.password = btoa(password);

        if (hasUserEmailExist.status === "Active") {
          const session = await UserModel.findByIdAndUpdate(
            hasUserEmailExist._id,
            hasUserEmailExist,
            {
              new: true,
            }
          );
          if (session) {
            return res.status(200).send({
              status: true,
              message: "Login Successfully...!",
              data: session,
            });
          } else {
            return res.status(500).send({
              status: false,
              message: "Server Issues",
            });
          }
        }
      }

      return res.status(501).send({
        status: false,
        message: "Incorrect Password...!",
      });
    }

    return res.status(500).send({
      status: false,
      message: "No user found with this email...!",
    });
  } catch (error) {
    console.log(error);
  }
};

const logoutUser = async (req, res) => {
  let { _id, name, email, password, role } = req.body;

  let updatedUser = {
    _id: _id,
    name: name,
    email: email,
    password: password,
    role: role,
    status: "Logout",
  };

  const session = await UserModel.findByIdAndUpdate(_id, updatedUser, {
    new: true,
  });

  if (session) {
    return res.status(200).send({
      status: true,
      message: "Logout Successfully...",
      data: session,
    });
  } else {
    return res.status(500).send({
      status: false,
      message: "Server Issues",
    });
  }
};

const fetchUsers = async (req, res) => {
  const session = await UserModel.find();
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

const updateUser = async (req, res) => {
  let { _id, name, email, password, role, status, userRights } = req.body;

  let passwordSecure = btoa(password);

  let updatedUser = {
    _id: _id,
    name: name,
    email: email,
    password: passwordSecure,
    role: role,
    status: status,
    userRights: userRights,
  };

  const session = await UserModel.findByIdAndUpdate(_id, updatedUser, {
    new: true,
  });

  if (session) {
    return res.status(200).send({
      status: true,
      message: "User has been updated",
      data: session,
    });
  } else {
    return res.status(500).send({
      status: false,
      message: "Server Issues",
    });
  }
};

const deleteUser = async (req, res) => {
  let { id } = req.params;

  const session = await UserModel.findByIdAndRemove(id);

  if (session) {
    return res.status(200).send({
      status: true,
      message: "User has been deleted",
    });
  } else {
    return res.status(500).send({
      status: false,
      message: "Server Issues",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  fetchUsers,
  updateUser,
  deleteUser,
};

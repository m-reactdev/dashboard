const INIT_STATE = {
  user: null,
  allUser: [],
};

const AuthReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      let authUser = action.payload;

      return {
        ...state,
        user: authUser,
      };

    case "LOGOUT_USER":
      let emptyUser = null;

      return {
        ...state,
        user: emptyUser,
      };

    case "FETCH_USERS":
      let fetchUsers = action.payload;

      return {
        ...state,
        allUser: fetchUsers,
      };

    // case "UPDATE_USERS":
    //   let updateCloneUsers = [...state.allUser];
    //   updateCloneUsers = updateCloneUsers.filter(
    //     (e) => e._id !== action.payload._id
    //   );
    //   updateCloneUsers.push(action.payload);

    //   return {
    //     ...state,
    //     allUser: updateCloneUsers,
    //   };

    // case "DELETE_USER":
    //   let deleteCloneUsers = [...state.allUser];
    //   deleteCloneUsers = deleteCloneUsers.filter(
    //     (e) => e._id !== action.payload
    //   );

    //   return {
    //     ...state,
    //     allUser: deleteCloneUsers,
    //   };

    default:
      return state;
  }
};

export { AuthReducer };

const INIT_STATE = {
  allInventories: [],
  counterArray: [],
};

const InventoryReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "FETCH_INVENTORY":
      let fetchInventories = action.payload;

      return {
        ...state,
        allInventories: fetchInventories,
      };

    case "INVENTORY_NOTIFY":
      let filterArray = action.payload;

      return {
        ...state,
        counterArray: filterArray,
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

export { InventoryReducer };

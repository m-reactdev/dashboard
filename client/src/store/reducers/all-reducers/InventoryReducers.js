const INIT_STATE = {
  allInventories: [],
};

const InventoryReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "FETCH_INVENTORY":
      let fetchInventories = action.payload;

      return {
        ...state,
        allInventories: fetchInventories,
      };

    default:
      return state;
  }
};

export { InventoryReducer };

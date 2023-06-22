const INIT_STATE = {
  allVendors: [],
};

const VendorReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "FETCH_VENDORS":
      let fetchVendors = action.payload;

      return {
        ...state,
        allVendors: fetchVendors,
      };

    default:
      return state;
  }
};

export { VendorReducer };

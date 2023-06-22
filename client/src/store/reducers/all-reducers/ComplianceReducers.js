const INIT_STATE = {
  allCompliance: [],
};

const ComplianceReducers = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "FETCH_VENDORS":
      let fetchCompliance = action.payload;

      return {
        ...state,
        allCompliance: fetchCompliance,
      };

    default:
      return state;
  }
};

export { ComplianceReducers };

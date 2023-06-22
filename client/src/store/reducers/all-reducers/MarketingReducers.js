const INIT_STATE = {
  marketingData: [],
};

const MarketingReducers = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "FETCH_MARKETING":
      let fetchMarketing = action.payload;

      return {
        ...state,
        marketingData: fetchMarketing,
      };

    default:
      return state;
  }
};

export { MarketingReducers };

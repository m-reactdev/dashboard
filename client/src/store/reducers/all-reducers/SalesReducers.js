const INIT_STATE = {
  salesData: [],
};

const SalesReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "FETCH_SALES":
      let fetchSales = action.payload;

      return {
        ...state,
        salesData: fetchSales,
      };

    default:
      return state;
  }
};

export { SalesReducer };

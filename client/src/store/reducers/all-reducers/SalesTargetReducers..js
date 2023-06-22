const INIT_STATE = {
  salesTargetData: [],
};

const SalesTargetReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "FETCH_SALES_TARGET":
      let fetchSalesTarget = action.payload;

      return {
        ...state,
        salesTargetData: fetchSalesTarget,
      };

    default:
      return state;
  }
};

export { SalesTargetReducer };

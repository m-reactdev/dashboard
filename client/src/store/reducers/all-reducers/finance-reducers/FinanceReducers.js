import {
  FETCH_BANK,
  FETCH_BUDGET,
  FETCH_EXPENSES,
} from "../../../actions/actions-types/ActionType";

const INIT_STATE = {
  budgetData: [],
  bankData: [],
  expData: [],
};

const FinanceReducers = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_BUDGET:
      let budgetData = action.payload;

      return {
        ...state,
        budgetData: budgetData,
      };

    case FETCH_BANK:
      let bankData = action.payload;

      return {
        ...state,
        bankData: bankData,
      };

    case FETCH_EXPENSES:
      let expData = action.payload;

      return {
        ...state,
        expData: expData,
      };

    default:
      return state;
  }
};

export { FinanceReducers };

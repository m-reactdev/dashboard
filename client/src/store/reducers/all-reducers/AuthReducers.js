import {
  FETCH_USERS,
  LOGIN_USER,
  LOGOUT_USER,
} from "../../actions/actions-types/ActionType";

const INIT_STATE = {
  user: null,
  allUser: [],
};

const AuthReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      let authUser = action.payload;

      return {
        ...state,
        user: authUser,
      };

    case LOGOUT_USER:
      let emptyUser = null;

      return {
        ...state,
        user: emptyUser,
      };

    case FETCH_USERS:
      let fetchUsers = action.payload;

      return {
        ...state,
        allUser: fetchUsers,
      };

    default:
      return state;
  }
};

export { AuthReducer };

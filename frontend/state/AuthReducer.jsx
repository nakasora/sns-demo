export const AuthReducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: payload,
        error: false,
      };
    case "LOGIN_ERROR":
      return {
        user: null,
        isFetching: false,
        error: payload,
      };
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};

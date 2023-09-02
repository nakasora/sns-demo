export const LoginStart = () => ({
  type: "LOGIN_START",
});
export const LoginSuccess = () => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});
export const LoginError = () => ({
  type: "LOGIN_ERROR",
  payload: error,
});

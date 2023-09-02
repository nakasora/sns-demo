import { createContext, useContext, useEffect, useReducer } from "react";
import { AuthReducer } from "./AuthReducer";

// 最初のユーザ状態を定義
const initialStaste = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

const AuthContext = createContext(initialStaste);
const AuthDispatchContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialStaste);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);
  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
const useAuthDispatch = () => useContext(AuthDispatchContext);
export { useAuth, useAuthDispatch, AuthContextProvider };

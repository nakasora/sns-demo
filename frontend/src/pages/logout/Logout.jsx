import React, { useContext, useRef } from "react";
import "./Logout.css";
import { useNavigate } from "react-router-dom";
import { useAuthDispatch } from "../../../state/AuthContext";
import { logoutCall } from "../../actionCalls";

const Logout = () => {
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    logoutCall(dispatch);
    navigate("/login");
  };
  return (
    <button className="logoutButton" onClick={logout}>
      ログアウト
    </button>
  );
};

export default Logout;

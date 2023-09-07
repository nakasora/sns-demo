import React, { useRef } from "react";
import "./Login.css";
import { loginCall } from "../../actionCalls";
import { useAuthDispatch } from "../../../state/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      {
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
    );
  };

  const buttonHandler = () => {
    navigate("/register");
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Real SNS</h3>
          <span className="loginDesc">本格的なSNSを、自分の手で</span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <form onSubmit={(e) => handleSubmit(e)} className="loginForm">
              <p className="loginMsg">ログインはこちら</p>
              <input
                type="email"
                className="loginInput"
                placeholder="Eメール"
                required
                ref={email}
              />
              <input
                type="password"
                className="loginInput"
                placeholder="パスワード"
                required
                minLength={8}
                ref={password}
              />
              <div className="loginFlexContainer">
                <button className="loginButton">ログイン</button>
                <span className="loginForgot">パスワードを忘れた方へ</span>
              </div>
            </form>
            <button
              className="loginRegisterButton"
              onClick={() => {
                buttonHandler();
              }}
            >
              アカウント作成
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import { Navigate } from "react-router-dom";
import Header from "./Header";

const Login = () => {
  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const [err, setErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onChangeHandler = (e) => {
    setLoginData((prevLoginData) => {
      return {
        ...prevLoginData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(passwordRegex.test(loginData.password));
    if (!passwordRegex.test(loginData.password)) {
      setPasswordErr(
        "Password should be minimum eight characters, at least one letter and one number"
      );
      return;
    }
    setPasswordErr("");
    setEmailErr("");
    axios.defaults.withCredentials = true;
    axios
      .post(`${SERVER_HOST}/users/login`, {
        email: loginData.email,
        password: loginData.password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.name) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage);
            console.log("here");
          } // user successfully logged in
          else {
            console.log("User logged in");
            sessionStorage.name = res.data.name;
            sessionStorage.email = loginData.email;
            localStorage.token = res.data.token;
            sessionStorage.accessLevel = res.data.accessLevel;
            setErr("");
            setIsLoggedIn(true);
          }
        } else {
          setErr("Please enter valid credentials!");
        }
      });
  };

  return (
    <>
      <Header />
      <div className="login">
        {isLoggedIn ? <Navigate to="/" /> : null}
        {err ? <h3 className="error">{err}</h3> : null}
        {emailErr ? <h3 className="error">{emailErr}</h3> : null}
        {passwordErr ? <h3 className="error">{passwordErr}</h3> : null}
        <form onSubmit={onSubmitHandler}>
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={onChangeHandler}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={onChangeHandler}
          />
          <input type="submit" value="Log In" />
        </form>
      </div>
    </>
  );
};

export default Login;

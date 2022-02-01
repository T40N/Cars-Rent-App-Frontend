import { useState } from "react";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import { Navigate } from "react-router-dom";

const Login = () => {
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
    axios.defaults.withCredentials = true;
    axios
      .post(`${SERVER_HOST}/users/login`, {
        email: loginData.email,
        password: loginData.password,
      })
      .then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage);
          } // user successfully logged in
          else {
            console.log("User logged in");

            sessionStorage.name = res.data.name;
            sessionStorage.email = this.state.email;
            localStorage.token = res.data.token;
            sessionStorage.accessLevel = res.data.accessLevel;

            setIsLoggedIn(true);
          }
        } else {
          console.log("Login failed");
        }
      });
  };

  return (
    <div>
      {isLoggedIn ? <Navigate to="/" /> : null}
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
  );
};

export default Login;

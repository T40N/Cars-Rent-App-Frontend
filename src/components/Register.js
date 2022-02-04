import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { SERVER_HOST } from "../config/global_constants";
import Header from "./Header";

const Register = () => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const [passwordErr, setPasswordErr] = useState("");
  const [registerData, setRegisterData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isRegistered, setIsRegistered] = useState(false);

  const onChangeHandler = (e) => {
    setRegisterData((prevRegisterData) => {
      return {
        ...prevRegisterData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!passwordRegex.test(registerData.password)) {
      setPasswordErr(
        "Password should be minimum eight characters, at least one letter and one number"
      );
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      setPasswordErr("Password and confirm password should be identical");
      return;
    }
    setPasswordErr("");
    axios.defaults.withCredentials = true;
    axios
      .post(`${SERVER_HOST}/users/register`, {
        name: registerData.name,
        surname: registerData.surname,
        email: registerData.email,
        password: registerData.password,
      })
      .then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage);
          } else {
            console.log("User registered and logged in");

            sessionStorage.name = res.data.name;
            sessionStorage.accessLevel = res.data.accessLevel;
            setIsRegistered(true);
          }
        } else {
          console.log("Registration failed");
        }
      });
  };

  return (
    <>
      <Header />
      <div className="login">
        {isRegistered ? <Navigate to="/" /> : null}
        {passwordErr ? <h3 className="error">{passwordErr}</h3> : null}
        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            name="name"
            placeholder="name"
            onChange={onChangeHandler}
          />
          <input
            type="text"
            name="surname"
            placeholder="surname"
            onChange={onChangeHandler}
          />
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="confirmPassword"
            onChange={onChangeHandler}
          />
          <input type="submit" value="Register" />
        </form>
      </div>
    </>
  );
};

export default Register;

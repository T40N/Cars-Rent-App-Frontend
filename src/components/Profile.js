import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";

const Profile = () => {
  const [state, setState] = useState({
    name: "",
    surname: "",
    email: "",
    accessLevel: "",
  });

  useEffect(() => {
    console.log("here");
    axios.defaults.withCredentials = true;
    axios.get(`${SERVER_HOST}/users/${sessionStorage.email}`).then((res) => {
      console.log(res.data);
      setState({
        name: res.data.name,
        surname: res.data.surname,
        email: res.data.email,
        accessLevel: res.data.accessLevel,
      });
    });
  }, []);

  return (
    <>
      <Header />
      <div className="profile">
        <div className="border">
          <h1>Welcom to your Profile this are your cridentials!</h1>
          <h1>Name: {state.name}</h1>
          <h1>Surname: {state.surname}</h1>
          <h1>Email: {state.email}</h1>
        </div>
      </div>
    </>
  );
};

export default Profile;

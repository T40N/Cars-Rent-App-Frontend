import { useState } from "react";
import { ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants";
import { Navigate } from "react-router-dom";
import axios from "axios";

const User = (props) => {
  const [redirect, setRedirect] = useState(false);

  const onUserDeleteHandler = () => {
    axios.defaults.withCredentials = true;
    axios.delete(`${SERVER_HOST}/Users/${props.id}/${props.email}`).then(() => {
      props.onDelete();
      setRedirect(true);
    });
  };

  return (
    <div className="car">
      {redirect ? (
        <>
          <Navigate to="/" /> {setRedirect(false)}{" "}
        </>
      ) : null}
      <h3>{props.name} </h3>
      <h3>{props.surname}</h3>
      <h3>{props.email}</h3>

      {sessionStorage.accessLevel == ACCESS_LEVEL_ADMIN &&
      sessionStorage.email != props.email ? (
        <button onClick={onUserDeleteHandler} value="Remove user">
          Remove user
        </button>
      ) : null}
    </div>
  );
};

export default User;

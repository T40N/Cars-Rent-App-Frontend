import { useEffect, useState } from "react";
import { SERVER_HOST } from "../config/global_constants";
import axios from "axios";
import UsersDisplay from "./UsersDisplay";
import Header from "./Header";

const DeleteUser = () => {
  const [users, setUsers] = useState([]);
  const [usersChanged, setUsersChanged] = useState(false);
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get(`${SERVER_HOST}/Users`).then((res) => {
      setUsers(res.data);
    });
  }, [usersChanged]);

  const onUserDeleteHandler = () => {
    setUsersChanged((prevUsersChanged) => {
      return !prevUsersChanged;
    });
  };

  console.log(users);
  return (
    <>
      <Header />
      <div className="cardelete">
        <UsersDisplay usersData={users} onDelete={onUserDeleteHandler} />
      </div>
    </>
  );
};

export default DeleteUser;

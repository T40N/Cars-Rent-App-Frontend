import axios from "axios";

const USERS_REST_API_URL = "http://localhost:4000/users";

class UsersService {
  options = {
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  getUsers = () => {
    return axios.get(USERS_REST_API_URL);
  };

  getUsersByEmail = (email) => {
    return axios.get(USERS_REST_API_URL + "/" + email);
  };

  updateUser = (user, email) => {
    return axios.put(
      USERS_REST_API_URL + "/" + email,
      {
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
      },
      this.options
    );
  };

  deleteUser = (email) => {
    axios.delete(USERS_REST_API_URL + "/" + email, this.options);
  };
}

export default new UsersService();
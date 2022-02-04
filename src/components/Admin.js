import Header from "./Header"
import CarsDisplay from "./CarsDisplay";
import { useEffect, useState } from "react";
import CarsService from "../services/carsService";
import UsersDisplay from "./UsersDisplay";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";

const Admin = () => {

    const [cars, setCars] = useState([]);
    const [carsChanged, setCarsChanged] = useState(false);
    useEffect(() => {
      CarsService.getCars().then((res) => {
        setCars(res.data);
      });
    }, [carsChanged]);

    const onCarDeleteHandler = () => {
        setCarsChanged(prevCarsChanged => {
          return !prevCarsChanged;
        })
      }

    const [users, setUsers] = useState([]);
    const [usersChanged, setUsersChanged] = useState(false);
    useEffect(()=>{
      axios.defaults.withCredentials = true;
      axios.get(`${SERVER_HOST}/Users`)
      .then((res)=>{
          setUsers({
              name: res.data.name,
              surname: res.data.surname,
              email: res.data.email,
              accessLevel: res.data.accessLevel
          })
      })
  }, [])

  const [state, setState] = useState({
    name: "",
    surname: "",
    email: "",
    accessLevel: "",
})

useEffect(()=>{
    axios.defaults.withCredentials = true;
    axios.get(`${SERVER_HOST}/Users/${sessionStorage.email}`)
    .then((res)=>{
        setState({
            name: res.data.name,
            surname: res.data.surname,
            email: res.data.email,
            accessLevel: res.data.accessLevel
        })
    })
}, [])

    const onUserDeleteHandler = () => {
      setUsersChanged(prevUsersChanged => {
        return !prevUsersChanged;
      })
    }

    return (

        <div>
            <Header />
            <h1>Name: {state.name}</h1>
            <h1>Surname: {state.surname}</h1>
            <h1>Email: {state.email}</h1>
            <h2>Access level: {state.accessLevel}</h2>
            <h5>0 - Guest</h5>  
            <h5>1 - Normal User</h5>  
            <h5>2 - Admin</h5>  
            <CarsDisplay carsData = {cars} onDelete={onCarDeleteHandler}/>
            <UsersDisplay userData = {users} onDelete={onUserDeleteHandler} />
            
        </div>
    );
  
}

export default Admin;
import { useEffect, useState } from "react";
import Header from "./Header"
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";

const Profile = () => {


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

        </div>
    );
  
}

export default Profile;
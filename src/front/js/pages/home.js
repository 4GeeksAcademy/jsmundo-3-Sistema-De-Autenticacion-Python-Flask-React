import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);
 const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")
 const navigate = useNavigate()
 
 useEffect(() => {
     const fetchUsers = async () => {
      try {
        const response = await fetch(process.env.BACKEND_URL + '/api/users')
        if(!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
         const data = await response.json();
         console.log("Usuarios:", data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error.message);
      }
     };
     fetchUsers();
 }, [])
 


  function handleSubmit(e) {
    e.preventDefault();
    actions.login(email, password, navigate);
}
  

  return (
    <div className="text-center mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>
       
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


 export const PrivatePage = () => {
    const{actions} = useContext(Context);
    const navigate = useNavigate();


    const handleLogout = () =>{
        actions.logout();
        navigate("/")
    }
    return(
        <div className="container mt-5">
            <h1>Vista Privada</h1>
            <p>Solo los usuarios autenticados pueden ver esta pagina.</p>
              <button onClick={handleLogout} className="btn btn-danger">
                 logout
              </button>
        </div>
    );
};

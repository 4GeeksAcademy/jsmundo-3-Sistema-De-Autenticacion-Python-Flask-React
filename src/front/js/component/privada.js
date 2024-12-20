import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";

const Privada = ({children}) => {
    const {store} = useContext(Context);
    // verifica autenticacion 
    const token = localStorage.getItem("token");

    // si no esta autenticado lo redirecciona al login
    if (!store.isAuthenticated || !token) {
        return <Navigate to="/" />;
    }
     // dirigir ala pagina  protegida si ya esta autenticado
     return children;
};
 export default Privada;
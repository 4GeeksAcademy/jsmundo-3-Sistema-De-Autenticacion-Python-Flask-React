import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/registro.css"

const Registro = () => {
    const {actions, store} = useContext(Context);
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const [name, setName] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // llamo a mi funcion resgistro de mi flux
    const success = await actions.registro(email, password);
   
    if(success) {
        alert("Usuario registrado exitosamente. Ahora puedes iniciar sesión.");
        navigate("/");
    } else{
        alert(store.message || "Error al registrar el usuario.");
    }
    };

    return (
      <div className="registro-container">
          <div className="registro-card">
              <h2>Registro</h2>
              <form className="registro-form" onSubmit={handleSubmit}>
                  <div>
                      <label htmlFor="email" className="form-label">
                          Correo Electrónico
                      </label>
                      <input
                          type="email"
                          id="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                      />
                  </div>
                  <div>
                      <label htmlFor="password" className="form-label">
                          Contraseña
                      </label>
                      <input
                          type="password"
                          id="password"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                      />
                  </div>
                  <div>
                      <label htmlFor="name" className="form-label">
                          Nombre
                      </label>
                      <input
                          type="text"
                          id="name"
                          className="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                      />
                  </div>
                  <button type="submit">
                      Registrarse
                  </button>
              </form>
          </div>
      </div>
  );
};

export default Registro;
import React, { useState } from "react";
import { useNavigate  } from 'react-router-dom';

import styles from "../styles/Sign.module.css";

export default function SignIn({ handleCambiarVista }) {
  const [correo, setCorreo] = useState("");
  const [contraseña, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/arri/login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, contraseña }),
      });
      const data = await response.json();
      
      if (data.token) {
        
        // Almacenar el token en el localStorage
        const token = data.token;
        localStorage.setItem("token", token);
        navigate("/Dashboard/CargueDatos", { replace: true });
      } else {
        console.log("Error en el inicio de sesión");
      }
    } catch (error) {
      console.log("Error en la solicitud:", error);
    }
  };

  return (
    <div className={styles.form}>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="correo"
          type="email"
          placeholder="Correo"
          minLength={13}
          required
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          minLength={8}
          maxLength={20}
          required
          value={contraseña}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.Blogin} type="submit">
          Iniciar Sesión
        </button>
      </form>

      <button
        className={styles.Bregistro}
        onClick={() => handleCambiarVista("/SignUp")}
      >
        ¿No tienes cuenta? Registrate aquí
      </button>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../styles/Sign.module.css";

export default function SignUp({ handleCambiarVista }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (contraseña === confirmarContraseña) {
        const response = await fetch(
          "http://localhost:4000/api/arri/register",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },

            body: JSON.stringify({ nombre, correo, contraseña }),
          }
        );

        const data = await response.json();
        console.log(data);
        if (data.token) {
          // Almacenar el token en el localStorage
          const token = data.token;
          localStorage.setItem("token", token);
          navigate("/Dashboard/CargueDatos", { replace: true });
        } else {
          console.log("Error correo ya existe");
        }
      } else {
        console.log("Error contraseñas no coinciden");
      }
    } catch (error) {
      console.log("Error en la solicitud:", error);
    }
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <h1>REGISTRO</h1>
        <input
          name="nombre"
          type="text"
          placeholder="Nombre"
          minLength={3}
          maxLength={40}
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          name="correo"
          type="email"
          placeholder="Correo"
          minLength={13}
          maxLength={70}
          required
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          name="contraseña"
          type="password"
          placeholder="Contraseña"
          minLength={8}
          maxLength={20}
          required
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
        />
        <input
          name="confirmarContraseña"
          type="password"
          placeholder="Confirmar Contraseña"
          minLength={8}
          maxLength={20}
          required
          value={confirmarContraseña}
          onChange={(e) => setConfirmarContraseña(e.target.value)}
        />

        <button className={styles.Blogin} type="submit">
          Registrarme
        </button>
      </form>
      <button
        className={styles.Bregistro}
        onClick={() => handleCambiarVista("/Sign")}
      >
        Ya tengo una Cuenta!
      </button>
    </div>
  );
}

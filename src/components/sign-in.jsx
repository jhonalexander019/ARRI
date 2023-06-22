import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import styles from "../styles/Sign.module.css";
import Modales from "./Modales";

export default function SignIn({ handleCambiarVista }) {
  const [correo, setCorreo] = useState("");
  const [contraseña, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Estado para controlar la visibilidad del CircularProgress
  const navigate = useNavigate();
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Mostrar CircularProgress al enviar la solicitud

      const response = await fetch("http://localhost:4000/api/arri/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, contraseña }),
      });
      const data = await response.json();
      console.log(data.nombre, data.token);

      if (data.token) {
        // Almacenar el token en el localStorage
        const token = data.token;
        const nombre = data.nombre;
        localStorage.setItem("token", token);
        localStorage.setItem("nombre", nombre);
        navigate("/Dashboard/CargueDatos", { replace: true });
      } else {
        setOpenModal(true);
        setErrorTitle("Credenciales Incorrectas!!");
        setErrorMessage(
          "El correo y/o la contraseña proporcionado son incorrectos. Por favor, intenta nuevamente."
        );
      }
    } catch (error) {
      setOpenModal(true);
      setErrorTitle("Error en la solicitud!!");
      setErrorMessage("Por favor, intenta nuevamente.");
    } finally {
      setLoading(false); // Ocultar CircularProgress después de recibir la respuesta
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

        {loading ? (
          <div className={styles.circularProgressContainer}>
            <CircularProgress
              color="inherit" // Establecer el color del CircularProgress en negro
              size={24} // Tamaño del CircularProgress
              thickness={4} // Grosor del CircularProgress
            />
          </div>
        ) : (
          <button className={styles.Blogin} type="submit">
            Iniciar Sesión
          </button>
        )}
      </form>

      <button
        className={styles.Bregistro}
        onClick={() => handleCambiarVista("/SignUp")}
      >
        ¿No tienes cuenta? Registrate aquí
      </button>

      <Modales
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        errorTitle={errorTitle}
        errorMessage={errorMessage}
      />
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import styles from "../styles/Sign.module.css";
import Modales from "./Modales";
import ServerRequest from "./api";

export default function SignIn({ handleCambiarVista }) {
  const [correo, setCorreo] = useState("");
  const [contraseña, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Estado para controlar la visibilidad del CircularProgress
  const navigate = useNavigate();
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const serverRequest = new ServerRequest();

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Mostrar CircularProgress al enviar la solicitud

      const data = await serverRequest.login(correo, contraseña);

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
      setErrorTitle("Error al iniciar sesion!!");
      setErrorMessage("Verifique su conexion a internet e intente nuevamente.");
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
            <CircularProgress size={24} thickness={4} />
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

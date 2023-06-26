import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import styles from "../styles/Sign.module.css";
import Modales from "./Modales";
import ServerRequest from "./api";

export default function SignUp({ handleCambiarVista }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
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

    if (contraseña !== confirmarContraseña) {
      setOpenModal(true);
      setErrorTitle("Contraseñas Incorrectas!!");
      setErrorMessage(
        "Las contraseñas proporcionadas son incorrectas. Por favor, intenta nuevamente."
      );
    } else {
      try {
        setLoading(true); // Mostrar CircularProgress al enviar la solicitud

        const data = await serverRequest.register(nombre, correo, contraseña);

        if (data.token) {
          // Almacenar el token en el localStorage
          const token = data.token;
          const nombre = data.nombre;

          localStorage.setItem("token", token);
          localStorage.setItem("nombre", nombre);

          navigate("/Dashboard", { replace: true });
        } else {
          setOpenModal(true);
          setErrorTitle("Correo existente!!");
          setErrorMessage(
            "El correo proporcionado ya está en uso. Por favor, intenta nuevamente."
          );
        }
      } catch (error) {
        setOpenModal(true);
        setErrorTitle("Error al registrarse!!");
        setErrorMessage("Verifique su conexion a internet e intente nuevamente.");
      } finally {
        setLoading(false); // Ocultar CircularProgress después de recibir la respuesta
      }
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

        {loading ? (
          <div className={styles.circularProgressContainer}>
            <CircularProgress
              size={24} // Tamaño del CircularProgress
              thickness={4} // Grosor del CircularProgress
            />
          </div>
        ) : (
          <button className={styles.Blogin} type="submit">
            Registrarme
          </button>
        )}
      </form>
      <button
        className={styles.Bregistro}
        onClick={() => handleCambiarVista("/Sign")}
      >
        Ya tengo una Cuenta!
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

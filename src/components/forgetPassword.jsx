import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import styles from "../styles/Sign.module.css";
import Modales from "./Modales";
import ServerRequest from "./api";

export default function ForgetPassword({ handleCambiarVista }) {
  const [correo, setCorreo] = useState("");
  const [loading, setLoading] = useState(false); // Estado para controlar la visibilidad del CircularProgress
  const navigate = useNavigate();
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const serverRequest = new ServerRequest();

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleRecuperarContraseña = () => {
    setLoading(true);
  
    setTimeout(() => {
      setOpenModal(true);
      setErrorTitle("Recuperacion de Contraseña");
      setErrorMessage("El link de recuperacion ya fue enviado al correo ingresado");
      setTimeout(() => {
        setLoading(false);
        setOpenModal(false);
        navigate("/", { replace: true });
      }, 3000); // Esperar 3 segundos adicionales antes de redirigir
    }, 3000); // Esperar 3 segundos antes de mostrar el modal
  };

  return (
    <div className={styles.form}>
      <h1>Recuperar Contraseña</h1>
      <form>
        <input
          name="correo"
          type="email"
          placeholder="Correo"
          minLength={13}
          required
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        {loading ? (
          <div className={styles.circularProgressContainer}>
            <CircularProgress size={24} thickness={4} />
          </div>
        ) : (
          <div>
            <button
              style={{ width: "95%" }}
              onClick={handleRecuperarContraseña}
            >
              Recuperar contraseña
            </button>
          </div>
        )}
      </form>

      <Modales
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        errorTitle={errorTitle}
        errorMessage={errorMessage}
      />
    </div>
  );
}

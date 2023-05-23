import React from "react";
import styles from "../styles/Sign.module.css";

export default function SignUp({ handleCambiarVista }) {
  return (
    <form action="">
      <div className={styles.form}>
        <h1>REGISTRO</h1>
        <input type="email" placeholder="Correo" />
        <input type="password" placeholder="Contraseña" />
        <input type="password" placeholder="Contraseña" />
        <button className={styles.Bregistro} clasnClick={() => handleCambiarVista("/Sign")}>
          Ya tengo una Cuenta!
        </button>
        <button className={styles.Blogin}>Registrarme</button>
      </div>
    </form>
  );
}

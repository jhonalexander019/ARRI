import React from "react";
import styles from "../styles/Sign.module.css";

export default function SignIn({ handleCambiarVista }) {
  return (
    <form action="">
      <div className={styles.form}>
        <h1>LOGIN</h1>
        <input type="email" placeholder="Correo" minLength={13} required/>
        <input type="password" placeholder="Contraseña"  minLength={8} maxLength={20} required/>
        
        <button className={styles.Bregistro} onClick={() => handleCambiarVista("/SignUp")}>
          ¿No tienes cuenta? Registrate aqui    
        </button>
        
        <button className={styles.Blogin}>Iniciar Sesion</button>
      </div>
    </form>
  );
}

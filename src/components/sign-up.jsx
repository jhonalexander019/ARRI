import React from "react";
import styles from "../styles/Sign.module.css"

export default function SignUp({ handleCambiarVista }){
    return(
        <div className={styles.form}>
            <p>REGISTRO</p>
            <input type="text" placeholder="Correo"/>
            <input type="password" placeholder="Contraseña"/>
            <button onClick={() => handleCambiarVista("/Sign")}>
            Ir a la vista /Sign
          </button>
            <button>Iniciar Sesion</button>
        </div>
    );
}
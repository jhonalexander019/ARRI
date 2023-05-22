import React from "react";
import styles from "../styles/Sign.module.css"

export default function SignIn({ handleCambiarVista }){
    return(
        <div className={styles.form}>
            <p>LOGIN</p>
            <input type="text" placeholder="Correo"/>
            <input type="password" placeholder="Contraseña"/>
            <button onClick={() => handleCambiarVista("/SignUp")}>
            Ir a la vista /Sign
          </button>
            <button>Iniciar Sesion</button>
        </div>
    );
}
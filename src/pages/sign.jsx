import React, { useState } from "react";
import styles from "../styles/Sign.module.css";
import SignIn from "../components/sign-in";
import SignUp from "../components/sign-up";
import Candado from "../img/candado.png";
import Git from "../img/signo-de-github.png";

export function Sign() {
  const [rutaActual, setRutaActual] = useState("/Sign"); // Cambiado el valor inicial a "/Sign"

  const handleCambiarVista = (vista) => {
    setRutaActual(vista);
  };

  return (
    
    <div className={styles.contenedor}>

      <div className={styles.card}>
        <div className={`${styles.fade} ${styles.fadeEnter}`}>
          
            {rutaActual === "/Sign" ? (
              <div>
                <SignIn handleCambiarVista={handleCambiarVista} />
              </div>
            ) : (
              <img src={Candado} alt="" />
            )}
        </div>

        <div className={`${styles.fade} ${styles.fadeEnter}`}>
          {rutaActual === "/SignUp" ? (
            <div>
              <SignUp handleCambiarVista={handleCambiarVista} />
            </div>
          ) : (
            <img src={Git} alt="" />
          )}
        </div>
      </div>
    </div>
  );
}

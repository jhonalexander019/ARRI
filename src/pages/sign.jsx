import React, { useState } from "react";
import styles from "../styles/Sign.module.css";
import SignIn from "../components/sign-in";
import SignUp from "../components/sign-up";
import signIn from "../img/sign_in.png";
import signUp from "../img/sign_up.png";

export function Sign() {
  const token = localStorage.getItem("token");

  console.log(token);

  const [rutaActual, setRutaActual] = useState("/Sign"); // Cambiado el valor inicial a "/Sign"

  const handleCambiarVista = (vista) => {
    setRutaActual(vista);
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.card}>
        {rutaActual === "/Sign" ? (
          <div>
            <SignIn handleCambiarVista={handleCambiarVista} />
          </div>
        ) : (
          <img src={signUp} className={`${styles.img}`} alt="" />
        )}

        <div>
          {rutaActual === "/SignUp" ? (
            <div>
              <SignUp handleCambiarVista={handleCambiarVista} />
            </div>
          ) : (
            <img src={signIn} className={`${styles.img}`} alt="" />
          )}
        </div>
      </div>
    </div>
  );
}

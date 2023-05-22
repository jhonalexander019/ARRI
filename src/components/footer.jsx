import { Link } from "react-router-dom";
import styles from "../styles/Footer.module.css";
import candado from "../img/candado.png";
import github from "../img/signo-de-github.png";
import terminos from "../img/terminos-y-condiciones.png";


export function Footer() {
  return (
    <div className={styles.footer}>
      <Link to={"/"}><p> <img src={terminos} alt="" /> Terminos y Condiciones  </p></Link>
      <Link to={"/"}><p> <img src={candado} alt="" /> Privacidad</p></Link>
      <Link to={"/"}><p> <img src={github} alt="" /> Repositorio</p></Link>
    </div>
  );
}

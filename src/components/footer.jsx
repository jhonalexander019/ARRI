import { Link } from "react-router-dom";
import styles from "../styles/Footer.module.css";
import github from "../img/signo-de-github.png";
import terminos from "../img/terminos-y-condiciones.png";


export function Footer() {
  return (
    <div className={styles.footer}>
      <Link to={"/"}><p> <img src={terminos} alt="" /> Terminos y Condiciones  </p></Link>
      <Link to={"https://github.com/jhonalexander019/ARRI-App.git"}><p> <img src={github} alt="" /> Repositorio-Mobile</p></Link>
      <Link to={"https://github.com/jhonalexander019/ARRI-Web.git"}><p> <img src={github} alt="" /> Repositorio-Web</p></Link>
    </div>
  );
}

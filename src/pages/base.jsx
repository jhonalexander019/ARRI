import { BrowserRouter, useLocation } from "react-router-dom";
import styles from "../styles/HomeInformativo.module.css";
import { NavBar } from "../components/menu";
import { Footer } from "../components/footer";
import { Rutas } from "../route";
import logo from "../img/logo.png";

function Base() {
  const location = useLocation();

  const mostrarFooter = location.pathname === "/sign";

  return (
    <div className={styles.principal}>
      <div className={styles.fondo}>
        <div className={styles.forma}></div>
      </div>
      <header>
        <img src={logo} alt="" />
        <NavBar />
      </header>

      <body>
        <Rutas />
      </body>

      {!mostrarFooter && (
        <footer>
          <Footer />
        </footer>
      )}
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Base />
    </BrowserRouter>
  );
}

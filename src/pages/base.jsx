import { BrowserRouter, useLocation } from "react-router-dom";
import styles from "../styles/HomeInformativo.module.css";
import { NavBar } from "../components/menu";
import { Footer } from "../components/footer";
import { Rutas } from "../route";
import logo from "../img/logo.png";

function Base() {
  const location = useLocation();

  const mostrarFooter = location.pathname === "/sign" || location.pathname.includes("/Dashboard");

  return (
    <div className={styles.principal}>
      <header>
        <img src={logo} alt="" />
        <NavBar />
      </header>

      <div>
        <Rutas />
      </div>

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

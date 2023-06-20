import { Link, useLocation } from 'react-router-dom';
import '../styles/Menu.module.css';

export function Menu() {
  const location = useLocation();

  // Verificar si la URL actual es exactamente "/sign"
  const isHomeInPage = location.pathname === "/";
  const isSignInPage = location.pathname === "/sign";
  const isDashboardPage = location.pathname.includes("/Dashboard");
  // const isSignInPage = location.pathname === "/sign";


  return (
    <ul data-animation="center">
      {!isHomeInPage && !isDashboardPage && <li><Link to="/">Inicio</Link></li>}
      {!isSignInPage && !isDashboardPage && <li><Link to="/sign">Iniciar Sesión</Link></li>}
      { isDashboardPage && <li><Link to="/Dashboard/CargueDatos">Datos</Link></li>}
      { isDashboardPage && <li><Link to="/">Cerrar Sesion</Link></li>}


    </ul>
  );
}

import React from "react";
import { Link, useLocation } from "react-router-dom";
import style from "../styles/Menu.module.css";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import { Margin } from "@mui/icons-material";

export function NavBar() {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    // Eliminar el token almacenado en localStorage
    localStorage.removeItem("token");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
  };

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const nombre = capitalize(localStorage.getItem("nombre"));

  // Verificar si la URL actual es exactamente "/sign"
  const isHomeInPage = location.pathname === "/";
  const isSignInPage = location.pathname === "/sign";
  const isDashboardPage = location.pathname.includes("/Dashboard");

  React.useEffect(() => {
    setIsMenuOpen(false); // Cerrar el menú al cargar la página
  }, [location.pathname]);

  return (
    <div>
      <ul className={style.menuLista} data-animation="center">
        {!isHomeInPage && !isDashboardPage && (
          <li>
            <Link to="/" replace>
              Inicio
            </Link>
          </li>
        )}
        {!isSignInPage && !isDashboardPage && (
          <li>
            <Link to="/sign" replace>
              Iniciar Sesión
            </Link>
          </li>
        )}
        {isDashboardPage && (
          <>
            <li>
              <Link to="/Dashboard/CargueDatos" replace>
                Datos
              </Link>
            </li>
            <li>
              <Link to="/Dashboard/Estadisticas" replace>
                Estadisticas
              </Link>
            </li>
            <li>
              <Link to="/Dashboard/Reporte" replace>
                Reporte
              </Link>
            </li>
            <li
              style={{ margin: "0 !important" }}
              onMouseEnter={handleMenuOpen}
              onMouseLeave={handleMenuClose}
              className={style.menuLink}
            >
              {nombre}
              {isMenuOpen && (
                <Menu
                  anchorEl={anchorEl}
                  open={isMenuOpen}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  getContentAnchorEl={null}
                  disableAutoFocusItem // Deshabilita el enfoque automático
                  sx={{
                    borderRadius: "8px", // Ajusta este valor según tus necesidades
                  }}
                >
                  <MenuItem component={Link} to="/configuracion">
                    Configuración
                  </MenuItem>
                  <MenuItem component={Link} to="/sign" onClick={handleLogout}>
                    Cerrar Sesión
                  </MenuItem>
                </Menu>
              )}
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

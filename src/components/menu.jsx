import { Link } from 'react-router-dom';
import '../styles/Menu.module.css';

export function Menu(){
    return (
        <ul  data-animation="center">
            <li><Link to="/">Inicio</Link></li>
            {/* <li><Link to="/About">Generar Reporte</Link></li> */}
            <li><Link to="/Sign">Iniciar Sesion</Link></li>
          </ul>
    )
}

import styles from "../styles/Dashboard.module.css";
import { RutasDashboard } from "../route";

export function Dashboard() {
  return (
    <div className={styles.contenedor}>
      <div className={styles.lista}>
        <h3>Lista de Bases de Datos</h3>
        <div className={styles.listas}>
          <ul>
            <li>InstitucionEducativa1.csv</li>
            <li>InstitucionEducativa2.csv</li>
            <li>InstitucionEducativa3.csv</li>
          </ul>
        </div>
      </div>

      <RutasDashboard />
    </div>
  );
}

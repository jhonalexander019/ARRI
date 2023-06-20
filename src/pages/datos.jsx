import styles from "../styles/Dashboard.module.css";

export function Datos() {
  return (
    <div className={styles.contenedor}>
      <div className={styles.lista}>
        <h3>Lista de Bases de Datos</h3>
      </div>

      <div className={styles.tabla}>
        <h3>Tabla de Datos</h3>
        <table>
          <thead>
            <tr>
              <th>Campo 1</th>
              <th>Campo 2</th>
              <th>Campo 3</th>
              <th>Campo 4</th>
              <th>Campo 5</th>
              <th>Campo 6</th>
              <th>Campo 7</th>
              <th>Campo 8</th>
              <th>Campo 9</th>
              <th>Campo 10</th>
              <th>Campo 11</th>
              <th>Campo 12</th>
              <th>Campo 13</th>
              <th>Campo 14</th>
              <th>Campo 15</th>
              <th>Campo 16</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dato 1</td>
              <td>Dato 2</td>
              <td>Dato 3</td>
              <td>Dato 4</td>
              <td>Dato 5</td>
              <td>Dato 6</td>
              <td>Dato 7</td>
              <td>Dato 8</td>
              <td>Dato 9</td>
              <td>Dato 10</td>
              <td>Dato 11</td>
              <td>Dato 12</td>
              <td>Dato 13</td>
              <td>Dato 14</td>
              <td>Dato 15</td>
              <td>Dato 16</td>
            </tr>
            {/* Aquí puedes agregar más filas de datos si es necesario */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

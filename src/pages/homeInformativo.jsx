import styles from "../styles/HomeInformativo.module.css";
import OP from "../img/op.png";
import TA from "../img/ta.png";

export function PaginaInformativa() {
  return (
    <div className={styles.contenedor}>
      <h1>Analisis y Reporte de Resultados ICFES</h1>
      <h3>
        "La educación es el arma más poderosa que puedes usar para cambiar el
        mundo." - Nelson Mandela
      </h3>

      <div className={`${styles.infor} ${styles.left}`}>
        <img src={TA} className={`${styles.img}`} alt="" />
        <p className={styles.textoInformativo}>
          El proyecto de Tecnologías Avanzadas se enfoca en el desarrollo de una
          página web y una aplicación móvil utilizando React y React Native,
          respectivamente, con una arquitectura por capas. Se busca una
          estructura modularizada y organizada, separando las responsabilidades
          de presentación, lógica de negocio y manipulación de datos. Esto
          permite un código mantenible y escalable, facilitando la colaboración
          entre equipos de desarrollo y asegurando un enfoque avanzado en el uso
          de tecnologías modernas.
        </p>
      </div>
      <div className={`${styles.infor} ${styles.right}`}>
        <p className={styles.textoInformativo}>
          El proyecto de optimización, enfocado en la materia de optimización,
          se centra en utilizar la técnica ETL (Extract, Transform, Load) como
          punto de partida para el tratamiento de información proveniente de una
          base de datos. Esta técnica permite extraer los datos, transformarlos
          según las necesidades del análisis, y cargarlos en un repositorio
          adecuado para su procesamiento y obtención de insights. El objetivo es
          optimizar el rendimiento y la eficiencia del proceso, asegurando la
          calidad y confiabilidad de los datos utilizados.
        </p>
        <img src={OP} className={`${styles.img}`} alt="" />

      </div>
    </div>
  );
}

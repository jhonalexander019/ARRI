import styles from "../styles/HomeInformativo.module.css";
import Figure from "../components/figure";

export function PaginaInformativa() {
  return (
    <div className={styles.contenedor}>
      <div className={`${styles.infor} ${styles.left}`}>
        <Figure text="TECNOLOGIAS AVANZADAS" />
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
        <Figure text="OPTIMIZACION" />
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
      </div>
      <div className={`${styles.infor} ${styles.left}`}>
        <Figure text="SEGURIDAD DE LA INFORMACION" />
        <p className={styles.textoInformativo}>
          El proyecto de análisis y reporte de resultados ICFES, enfocado en la
          materia de seguridad de la información, se basa en garantizar la
          confidencialidad, integridad y disponibilidad de los datos sensibles.
          Se implementan medidas de seguridad como cifrado, autenticación y
          control de acceso para proteger la información. Además, se realizan
          análisis de vulnerabilidades y se establecen políticas de seguridad
          para mitigar riesgos y asegurar la protección de los datos del ICFES.
        </p>
      </div>
    </div>
  );
}

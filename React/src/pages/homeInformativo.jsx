import styles from "../styles/HomeInformativo.module.css";
import Figure from "../components/figure";


export function PaginaInformativa() {
  return (
    <div className={styles.contenedor}>
   
      <div className={`${styles.infor} ${styles.left}`}>
        <Figure text="TECNOLOGIAS AVANZADAS"/>
        <p className={styles.textoInformativo}>
          Monefy is a personal finance application that makes money management
          easy. The app is designed to streamline expense tracking and help you
          save money.
        </p>
      </div>
      <div className={`${styles.infor} ${styles.right}`}>
        <Figure text="OPTIMIZACION"/>
        <p className={styles.textoInformativo}>
          If you have ever tried tracking money before, you know that it can be
          extremely frustrating with the wrong tools. Monefy helps and empowers
          you by breaking down your expenses in a simple, intuitive, and
          understandable way. With Monefy, you'll quickly start to identify key
          spending patterns and effectively begin saving money.
        </p>
      </div>
      <div className={`${styles.infor} ${styles.left}`}>
         <Figure text="SEGURIDAD DE LA INFORMACION"/>
        <p className={styles.textoInformativo}>
          We have carefully curated the default categories to help you start
          tracking essential expenses right from the word “go.” No
          time-consuming setup process. No need to manually type in each
          category. Still feeling the need for some customization? We got you
          covered. Easily change the default categories, add new ones, select
          the currency you want to use, and choose the most convenient language
          for you, all through Monefy’s intuitive interface.
        </p>
      </div>
    </div>
  );
}

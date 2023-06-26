import styles from "../styles/Dashboard.module.css";
import { RutasDashboard } from "../route";
import React, { useState, useEffect } from "react";

export function Dashboard() {
  const [selectedOptionsList, setSelectedOptionsList] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [selectedItemData, setSelectedItemData] = useState([]);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
    setSelectedItemData([selectedOptionsList[index]]);
  };

  useEffect(() => {
    const storedOptionsList = JSON.parse(
      localStorage.getItem("selectedOptionsList")
    );
    if (storedOptionsList) {
      setSelectedOptionsList(storedOptionsList);
    }
  }, []);

  return (
    <div className={styles.contenedor}>
      <div className={styles.lista}>
        <h3>Lista de Bases de Datos</h3>
        <div className={styles.listas}>
          <ul>
            {selectedOptionsList.map((option, index) => (
              <li key={index} onClick={() => handleItemClick(option)}>
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <RutasDashboard selectedItemData={selectedItemIndex} />
    </div>
  );
}

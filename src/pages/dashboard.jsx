import styles from "../styles/Dashboard.module.css";
import { RutasDashboard } from "../route";
import React, { useState, useEffect, useRef } from "react";
import ServerRequest from "../components/api";
import Modales from "../components/Modales";
import { CircularProgress } from "@mui/material";
import isEqual from 'lodash/isEqual';


export function Dashboard() {
  const [selectedOptionsList, setSelectedOptionsList] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const serverRequest = new ServerRequest();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [prevOptionsList, setPrevOptionsList] = useState([]); // Almacena la lista anterior de opciones

  const fetchInstiUser = async () => {
    try {
      const data = await serverRequest.instiUser();
      const options = data.map((item) => ({ label: item.nombre_institucion }));
  
      if (!isEqual(prevOptionsList, options)) {
        setLoading(true);
        // Compara la lista anterior con la nueva lista
        setSelectedOptionsList(options);
      }
  
      setIsDataLoaded(true);
      setPrevOptionsList(options); // Actualiza la lista anterior con la nueva lista
    } catch (error) {
      // ...
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  
  // Observer para detectar cambios en el localStorage
  useEffect(() => {
      if (localStorage.getItem("selectedOption") == "cambio" || null || undefined) {
        fetchInstiUser();
      }

  }, []);

  return (
    <div className={styles.contenedor}>
      <div className={styles.lista}>
        <h3>Lista de Bases de Datos</h3>
        <div className={styles.listas}>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <ul>
              {selectedOptionsList.map((option, index) => (
                <li key={index} onClick={() => handleItemClick(option)}>
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className={styles.vista}>
      <RutasDashboard selectedItemData={selectedItemIndex || ""} />

      </div>
    </div>
  );
}

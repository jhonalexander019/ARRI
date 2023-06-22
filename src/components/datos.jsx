import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";

import styles from "../styles/Dashboard.module.css";

export function Datos() {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false); // Estado para controlar la visibilidad del CircularProgress

  useEffect(() => {
    setLoading(true); // Mostrar CircularProgress al enviar la solicitud

    // Obtener las opciones de la API
    fetch("http://localhost:4000/api/arri/instituciones", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Mapear los datos para extraer el valor de cada objeto JSON
        const options = data.map((item) => ({ label: item.nombre }));
        setOptions(options);
        console.log(options);
        setLoading(false); // Ocultar CircularProgress después de recibir la respuesta
      });
  }, []);

  const handleOptionChange = (event, value) => {
    setSelectedOption(value);
  };

  return (
    <div className={styles.tabla}>
      <h1>¡Ingresa una entidad educativa!</h1>
      <div className={styles.filt}>
        <Autocomplete
          value={selectedOption}
          onChange={handleOptionChange}
          options={options}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Buscar Entidad Educativa"
              sx={{
                width: 550,
                paddingRight: 0, // Elimina el espacio reservado para el botón desplegable
                "& .MuiAutocomplete-endAdornment": {
                  display: "none", // Oculta el botón desplegable
                },
              }}
            />
          )}
        />
      </div>

      {loading ? (
        <CircularProgress /> // Mostrar CircularProgress mientras se realiza la petición
      ) : (
        <table>
          <thead>
            <tr>
              <th>Periodo</th>
              <th>Instituto</th>
              <th>Genero</th>
              <th>Desempeño Ingles</th>
              <th>Ingles</th>
              <th>Matematicas</th>
              <th>Sociales Ciudadana</th>
              <th>Ciencias Naturales</th>
              <th>Lectura Critica</th>
              <th>Puntaje Global</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> -- </td>
              <td> -- </td>
              <td> -- </td>
              <td> -- </td>
              <td> -- </td>
              <td> -- </td>
              <td> -- </td>
              <td> -- </td>
              <td> -- </td>
              <td> -- </td>
            </tr>
            {/* Aquí puedes agregar más filas de datos si es necesario */}
          </tbody>
        </table>
      )}
    </div>
  );
}

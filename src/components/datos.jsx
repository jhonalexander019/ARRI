import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Box,
  Button,
  Typography,
} from "@mui/material";
import ServerRequest from "./api";
import Modales from "./Modales";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import styles from "../styles/Dashboard.module.css";

export function Datos(selectedItemData) {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [lastSelectedOption, setLastSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const serverRequest = new ServerRequest();
  const [jsonData, setJsonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const totalPages = Math.ceil(jsonData.length / itemsPerPage);
  const [selectedOptionsList, setSelectedOptionsList] = useState([]);

  const fetchOptions = async () => {
    try {
      setLoading(true);
      const data = await serverRequest.getInstituciones();
      const options = data.map((item) => ({ label: item.nombre }));
      setOptions(options);
      setLoading(false);
    } catch (error) {
      setOpenModal(true);
      setErrorTitle("Error al mostrar las instituciones!!");
      setErrorMessage("Verifique su conexion a internet e intente nuevamente.");
    }
  };

  const handleLoadData = async () => {
    try {
      setLoading(true);

      if (lastSelectedOption && selectedOption) {
        const data = await serverRequest.load(selectedOption);
        setJsonData(data);
        setLoading(false);
      } else {
        setOpenModal(true);
        setErrorTitle("Error al traer la informacion!!");
        setErrorMessage("Por favor seleccione una entidad academica.");
        setLoading(false);
      }
    } catch (error) {
      setOpenModal(true);
      setErrorTitle("Error al traer la informacion!!");
      setErrorMessage("Verifique su conexion a internet e intente nuevamente.");
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  useEffect(() => {
    const storedOptionsList = JSON.parse(
      localStorage.getItem("selectedOptionsList")
    );
    if (storedOptionsList) {
      setSelectedOptionsList(storedOptionsList);
    }
  }, []);

  const handleOptionChange = (event, value) => {
    setLastSelectedOption(value);
    setSelectedOption(value);

    if (
      !selectedOptionsList.find(
        (selectedOption) => selectedOption.label === value.label
      )
    ) {
      const updatedOptionsList = [...selectedOptionsList, value];
      setSelectedOptionsList(updatedOptionsList);
      localStorage.setItem(
        "selectedOptionsList",
        JSON.stringify(updatedOptionsList)
      );
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className={styles.vista}>
      <h1>¡Ingresa una entidad educativa!</h1>
      <div className={styles.filt}>
        <Autocomplete
          value={selectedOption}
          options={options}
          onChange={handleOptionChange}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Buscar Entidad Educativa"
              sx={{
                width: 550,
                paddingRight: 0,
                "& .MuiAutocomplete-endAdornment": {
                  display: "none",
                },
              }}
            />
          )}
        />
        <button onClick={handleLoadData}>Cargar datos</button>
      </div>

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
        <div>
          <Table sx={{ width: "auto", tableLayout: "auto" }}>
            <TableHead>
              <TableRow>
                <TableCell>Periodo</TableCell>
                <TableCell>Genero</TableCell>
                <TableCell>Desempeño Ingles</TableCell>
                <TableCell>Ingles</TableCell>
                <TableCell>Matematicas</TableCell>
                <TableCell>Sociales Ciudadana</TableCell>
                <TableCell>Ciencias Naturales</TableCell>
                <TableCell>Lectura Critica</TableCell>
                <TableCell>Puntaje Global</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jsonData.slice(firstIndex, lastIndex).map((dataItem) => (
                <TableRow key={dataItem.id}>
                  <TableCell>{dataItem.periodo || " -- "} </TableCell>
                  <TableCell>{dataItem.estu_genero || " -- "}</TableCell>
                  <TableCell>{dataItem.desemp_ingles || " -- "}</TableCell>
                  <TableCell>{dataItem.punt_ingles || " -- "}</TableCell>
                  <TableCell>{dataItem.punt_matematicas || " -- "}</TableCell>
                  <TableCell>
                    {dataItem.punt_sociales_ciudadanas || " -- "}
                  </TableCell>
                  <TableCell>{dataItem.punt_c_naturales || " -- "}</TableCell>
                  <TableCell>
                    {dataItem.punt_lectura_critica || " -- "}
                  </TableCell>
                  <TableCell>{dataItem.punt_global || " -- "}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box mt={2} display="flex" justifyContent="center">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Anterior
            </Button>
            <Typography variant="body2" mx={2}>
              Página {currentPage} de {totalPages}
            </Typography>
            <Button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Siguiente
            </Button>
          </Box>
        </div>
      )}
      <Modales
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        errorTitle={errorTitle}
        errorMessage={errorMessage}
      />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import ServerRequest from "./api";
import { CircularProgress, Select, MenuItem } from "@mui/material";
import styles from "../styles/Estadisticas.module.css";

export function Estadisticas(selectedItemData) {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState();
  const serverRequest = new ServerRequest();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [data1, setData1] = useState();
  const [data2, setData2] = useState();
  const [transformedData, setTransformedData] = useState([]);
  const [selectedPeriodo, setSelectedPeriodo] = useState("");
  const [selectedPeriodoSum, setSelectedPeriodoSum] = useState(0);

  const handleLoadData = async (parametro) => {
    try {
      setLoading(true);

      const data = await serverRequest.estadisticas(parametro);
      if (data.PromedioAreas && data.PromedioAreas.Promedios) {
        setData2(data.PromedioAreas.Promedios);
      } else {
        setData2({}); // Asignar un objeto vacío si los datos no están disponibles
      }
      if (data.PromedioPeriodos) {
        const transformedData = transformData(data.PromedioPeriodos);
        setTransformedData(transformedData);
      } else {
        setTransformedData([]);
      }

      // Generar gráficas utilizando los datos recibidos
      try {
        const promedioPorcentaje = data?.PromedioAreas?.Porcentaje || {};
        const promedioPromedios = data?.PromedioAreas?.Promedios || {};

        const tortaData1 = [];
        const tortaData2 = [];

        Object.entries(promedioPorcentaje).forEach(([name, value], index) => {
          if (name !== "Global") {
            tortaData1.push({
              name,
              value,
              color: generateColors(promedioPorcentaje.length)[
                index % promedioPorcentaje.length
              ],
            });
          }
        });

        Object.entries(promedioPromedios).forEach(([name, value], index) => {
          if (name !== "Global") {
            tortaData2.push({
              name,
              value,
              color: generateColors(promedioPromedios.length)[
                index % promedioPromedios.length
              ],
            });
          }
        });

        if (tortaData1.length === 0) {
          tortaData1.push({ name: "No Data", value: 0 });
        }

        if (tortaData2.length === 0) {
          tortaData2.push({ name: "No Data", value: 0 });
        }

        setChartData({ torta1: tortaData1, torta2: tortaData2 });
        setLoading(false);
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error al generar las gráficas:", error);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const transformData = (data) => {
    const uniqueData = data.filter((item, index, self) => {
      return (
        index ===
        self.findIndex(
          (i) => i.materia === item.materia && i.periodo === item.periodo
        )
      );
    });

    const transformedData = [];
    const periods = Array.from(new Set(data.map((item) => item.Periodo)));
    setData1(periods);
    console.log(data1);
    if (Array.isArray(uniqueData) && data.length > 0) {
      periods.forEach((period) => {
        const periodData = data
          .filter((item) => item.Periodo === period)
          .map((item, index) => {
            const subjects = Object.keys(item).filter(
              (key) => key !== "Periodo" && key !== "Global"
            ); // Excluir la materia "Global"
            const subjectData = subjects.map((subject) => ({
              materia: subject,
              periodo: period,
              nota: item[subject],
            }));
            return subjectData;
          })
          .flat();

        transformedData.push(...periodData);
      });
    }
    return transformedData;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const point = payload[0];
      return (
        <div style={{ backgroundColor: "white", padding: 3 }}>
          <p>Materia: {point.payload.materia}</p>
          <p>Nota: {point.payload.nota}</p>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    if (selectedItemData) {
      handleLoadData(selectedItemData);
    }
  }, [selectedItemData]);

  const generateColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
      // Convertir el color hexadecimal a componentes RGB
      const red = parseInt(color.slice(1, 3), 16);
      const green = parseInt(color.slice(3, 5), 16);
      const blue = parseInt(color.slice(5, 7), 16);
      // Calcular el brillo del color
      const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
      // Asegurarse de que el brillo sea menor que un umbral (puedes ajustar este valor según tus preferencias)
      const brightnessThreshold = 128;
      if (brightness < brightnessThreshold) {
        colors.push(color);
      } else {
        i--; // Repetir el bucle para generar otro color oscuro
      }
    }
    return colors;
  };

  const globalValue = Object.entries(data2 || {}).reduce(
    (total, [name, value]) => {
      if (name !== "Global") {
        return total + value;
      }
      return total;
    },
    0
  );

  const sortedData = transformedData.sort((a, b) => a.periodo - b.periodo);

  const handlePeriodoChange = (event) => {
    const selectedPeriodo = event.target.value;
    setSelectedPeriodo(selectedPeriodo);
    const selectedPeriodoData = transformedData.filter(
      (item) => item.periodo === selectedPeriodo
    );
    const sum = selectedPeriodoData.reduce(
      (total, item) => total + item.nota,
      0
    );
    setSelectedPeriodoSum(sum);
  };

  return (
    <div className={styles.contenedor}>
      <h1>
        {selectedItemData.selectedItemData.label
          ? `Estadisticas de ${JSON.stringify(
              selectedItemData.selectedItemData.label
            )}`
          : "¡Selecciona una Institucion de tu Lista!"}
      </h1>
      <br />
      <br />

      {(loading || !isDataLoaded) && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}

      {isDataLoaded && !loading && (
        <>
          <div className={styles.estadisticas}>
            <div>
              <Select
                value={selectedPeriodo}
                onChange={handlePeriodoChange}
                displayEmpty
                sx={{ width: "400px", textAlign: "center" }}
              >
                <MenuItem value="" disabled>
                  Selecciona un periodo de la institucion
                </MenuItem>
                {data1 &&
                  data1.map((periodo) => (
                    <MenuItem key={periodo} value={periodo}>
                      {periodo}
                    </MenuItem>
                  ))}
              </Select>
              <h4>puntaje Global: {selectedPeriodoSum}</h4>
              {selectedPeriodo ? (
                <ScatterChart width={500} height={300}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="materia" type="category" />
                  <YAxis dataKey="nota" type="number" />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Legend />
                  {transformedData.length > 0 ? (
                    <Scatter
                      name={selectedPeriodo}
                      data={transformedData.filter(
                        (item) => item.periodo === selectedPeriodo
                      )}
                      fill={generateColors(1)}
                      line={{
                        strokeWidth: 2,
                      }}
                    />
                  ) : (
                    <Scatter
                      name={selectedPeriodo}
                      data={[
                        {
                          materia: "Sin datos",
                          periodo: selectedPeriodo,
                          nota: 0,
                        },
                      ]}
                      fill={generateColors(1)}
                      line={{ strokeWidth: 2 }}
                    />
                  )}
                </ScatterChart>
              ) : null}
            </div>

            <div>
              <h2>Comportamiento a lo Largo de los Periodos</h2>
              <br />
              <br />
              <ScatterChart width={500} height={300}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={"periodo"} allowDuplicatedCategory={false} />
                <YAxis dataKey="nota" type="number" />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ strokeDasharray: "3 3" }}
                />
                <Legend />
                {Array.from(
                  new Set(sortedData.map((item) => item.materia))
                ).map((materia) => {
                  const dataForMateria = sortedData.filter(
                    (item) => item.materia === materia
                  );
                  const colors = generateColors(dataForMateria.length); // Generar colores para cada período

                  return (
                    <Scatter
                      key={materia}
                      name={materia}
                      data={dataForMateria}
                      fill={colors[0]} // Usar el primer color para todos los puntos de la materia
                      line={{ strokeWidth: 2 }}
                    >
                      {dataForMateria.map((item, index) => (
                        <Cell key={index} dataKey="nota" />
                      ))}
                    </Scatter>
                  );
                })}
              </ScatterChart>
            </div>
            <div>
              <h2>Porcentaje Notas Totales</h2>
              <h4>Puntaje Global: {globalValue}</h4>

              {chartData?.torta1.length > 0 ? (
                <PieChart width={400} height={400}>
                  <Pie
                    data={chartData.torta1}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, value }) =>
                      `${name}: ${parseInt(value, 10)}%`
                    }
                  >
                    {chartData.torta1.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={generateColors(1)[0]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              ) : (
                <p>No hay datos disponibles para mostrar.</p>
              )}
            </div>
            <div>
              <h2>Promedios Notas Totales</h2>
              <h4>Puntaje Global: {globalValue}</h4>

              {chartData?.torta2.length > 0 ? (
                <PieChart width={400} height={400}>
                  <Pie
                    data={chartData.torta2}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill={generateColors(1)[0]}
                    label={({ name, value }) =>
                      `${name}: ${parseInt(value, 10)}`
                    }
                  >
                    {chartData.torta1.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={generateColors(1)[0]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              ) : (
                <p>No hay datos disponibles para mostrar.</p>
              )}
            </div>

            <div>
              <h2>Puntaje Global</h2>

              {/* <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

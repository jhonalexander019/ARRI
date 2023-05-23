import React, { useEffect, useState } from "react";

// Define los patrones en un arreglo
const patterns = [
  "M12.3,-18C16.8,-13.7,21.7,-11.2,25.8,-6.5C30,-1.8,33.5,5.1,33.6,12.9C33.7,20.6,30.6,29.2,24.5,31.7C18.3,34.3,9.2,30.8,0.7,29.8C-7.7,28.8,-15.4,30.3,-22.2,28C-29.1,25.6,-35.1,19.5,-35.4,12.9C-35.6,6.2,-30.1,-0.9,-26.8,-8C-23.5,-15.1,-22.4,-22.2,-18.3,-26.6C-14.2,-30.9,-7.1,-32.6,-1.6,-30.4C3.9,-28.3,7.9,-22.3,12.3,-18Z",
  "M16.6,-15.7C23,-10.3,30.5,-5.1,32.8,2.3C35.1,9.7,32,19.3,25.7,22.2C19.3,25.1,9.7,21.3,-0.8,22.1C-11.3,22.9,-22.5,28.3,-28.8,25.4C-35.1,22.5,-36.5,11.3,-32.5,4C-28.5,-3.3,-19.1,-6.5,-12.8,-12C-6.5,-17.4,-3.3,-25,0.9,-25.9C5.1,-26.8,10.3,-21.1,16.6,-15.7Z",
];

// Genera un índice aleatorio para seleccionar un patrón del arreglo
const randomIndex = Math.floor(Math.random() * patterns.length);

// Obtiene el patrón seleccionado
const selectedPattern = patterns[randomIndex];

// Función para generar el path
function getRandomPath() {
  return selectedPattern;
}

function Figure({ text }) {
  const [randomPath, setRandomPath] = useState("");

  useEffect(() => {
    setRandomPath(getRandomPath());
  }, []);

  return (
    <figure>
      <svg viewBox="0 0 100 70">
        <defs>
          <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
            <stop
              id="stop1"
              stop-color="rgba(55.859, 61.207, 82.462, 0.69)"
              offset="0%"
            ></stop>
            <stop
              id="stop2"
              stop-color="rgba(31, 251, 246.652, 1)"
              offset="100%"
            ></stop>
          </linearGradient>
        </defs>
        <path
          fill="url(#sw-gradient)"
          d={randomPath}
          width="90%"
          height="90%"
          transform="translate(48 35)"
          stroke-width="0"
          stroke="url(#sw-gradient)"
        />
        <text x="46.5%" y="65%" textAnchor="middle" fill="#000000" fontSize="4">
          {text}
        </text>
      </svg>
    </figure>
  );
}
export default Figure;

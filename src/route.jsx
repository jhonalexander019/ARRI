import { Routes, Route, Navigate } from "react-router-dom";
import { PaginaInformativa } from "./pages/homeInformativo";
import { Sign } from "./pages/sign";
import { Dashboard } from "./pages/dashboard";
import { Datos } from "./components/datos";

function RutaProtegida({ children }) {
    const token = localStorage.getItem('token');
  
    if (token) {
      return children;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  export function Rutas() {
    return (
      <Routes>
        <Route path="/Dashboard/*" element={<RutaProtegida><Dashboard /></RutaProtegida>} />
        <Route path="/Sign" element={<Sign />} />
        <Route path="/*" element={<PaginaInformativa />} />
      </Routes>
    );
  }

export function RutasDashboard() {
  return (
    <Routes>
      <Route path="/CargueDatos" element={<RutaProtegida><Datos /></RutaProtegida>} />
      <Route path="/Estadisticas" element={<RutaProtegida><Dashboard /></RutaProtegida>} />
      <Route path="/Reportes" element={<RutaProtegida><Dashboard /></RutaProtegida>} />
    </Routes>
  );
}
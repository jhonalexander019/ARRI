import { Routes, Route } from "react-router-dom";
import { PaginaInformativa } from "./pages/homeInformativo";
import { Sign } from "./pages/sign";
import { Datos } from "./pages/datos";

export function Rutas() {
    return (
        <Routes>
        <Route path="/Dashboard/CargueDatos" element={<Datos />} />
        <Route path="/Sign" element={<Sign />} />
        <Route path="/*" element={<PaginaInformativa />} />
        </Routes>
    );
  }